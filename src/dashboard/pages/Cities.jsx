/** @format */

import  { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  IconButton,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
} from "@mui/material";
import {
  LocationCity as CityIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const Cities = () => {
  const [cities, setCities] = useState([]);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات الإضافة
  const [openAdd, setOpenAdd] = useState(false);
  const [newCity, setNewCity] = useState({ name: "", countryId: "" });
  const [addLoading, setAddLoading] = useState(false);

  // حالات التعديل
  const [openEdit, setOpenEdit] = useState(false);
  const [editCity, setEditCity] = useState({ id: "", name: "", countryId: "" });
  const [editLoading, setEditLoading] = useState(false);

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };
  // console.log("Token in Cities.jsx:", token); // 🔍 تحقق من وجود التوكن
  const fetchData = async () => {
    try {
      setLoading(true);
      const [citiesRes, countriesRes] = await Promise.all([
        axios.get(
          "http://umrahbooking.runasp.net/api/Dashboard/DashbordCities/GetCities",
          { headers }
        ),
        axios.get(
          "http://umrahbooking.runasp.net/api/Dashboard/DashbordCountries/GetCountries",
          { headers }
        ),
      ]);
      setCities(Array.isArray(citiesRes.data) ? citiesRes.data : []);
      setCountries(Array.isArray(countriesRes.data) ? countriesRes.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 1. إضافة مدينة
  const handleAddCity = async () => {
    if (!newCity.name || !newCity.countryId)
      return Swal.fire("تنبيه", "أكمل البيانات", "warning");
    try {
      setAddLoading(true);
      await axios.post(
        "http://umrahbooking.runasp.net/api/Dashboard/DashbordCities/CreateCity",
        newCity,
        { headers }
      );
      setOpenAdd(false);
      setNewCity({ name: "", countryId: "" });
      fetchData();
      Swal.fire("تم", "أضيفت المدينة بنجاح", "success");
    } catch (error) {
      Swal.fire("خطأ", "فشل إضافة المدينة", error.response?.data?.message || "حدث خطأ غير متوقع");
    } finally {
      setAddLoading(false);
    }
  };

  // 2. فتح نافذة التعديل
  const handleOpenEdit = (city) => {
    const parentCountry = countries.find(
      (country) =>
        country.cities && country.cities.some((c) => c.id === city.id)
    );

    setEditCity({
      id: city.id,
      name: city.name,
      countryId: parentCountry ? parentCountry.id : "",
    });
    setOpenEdit(true);
  };

  // 3. تنفيذ التعديل (Update) - متوافق مع الـ Schema الجديدة
  const handleUpdateCity = async () => {
    if (!editCity.name)
      return Swal.fire("تنبيه", "اسم المدينة مطلوب", "warning");

    try {
      setEditLoading(true);

      // الـ Body يحتوي فقط على الحقول الموجودة في الـ Schema الخاصة بالتعديل
      const body = {
        id: editCity.id,
        name: editCity.name,
      };

      await axios.put(
        `http://umrahbooking.runasp.net/api/Dashboard/DashbordCities/UpdateCity/${editCity.id}`,
        body,
        { headers }
      );

      Swal.fire({
        icon: "success",
        title: "تم التعديل بنجاح",
        timer: 1500,
        showConfirmButton: false,
      });
      setOpenEdit(false);
      fetchData();
    } catch (error) {
      console.error("Update Error:", error.response?.data);
      Swal.fire("خطأ", "فشل في تعديل المدينة", error.response?.data?.message || "حدث خطأ غير متوقع");
    } finally {
      setEditLoading(false);
    }
  };

  // 4. الحذف (Delete)
  const handleDeleteCity = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن الحذف!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(
            `http://umrahbooking.runasp.net/api/Dashboard/DashbordCities/DeleteCity/${id}`,
            { headers }
          );
          Swal.fire("تم الحذف!", "تم حذف المدينة بنجاح.", "success");
          fetchData();
        } catch (error) {
          Swal.fire("خطأ!", "حدث خطأ أثناء الحذف.", error.response?.data?.message || "حدث خطأ غير متوقع");
        }
      }
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CityIcon color='primary' sx={{ fontSize: 35 }} />
          <Typography variant='h4' fontWeight='bold'>
            إدارة المدن
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpenAdd(true)}>
          إضافة مدينة
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3 }}>
        <CardContent sx={{ p: 0 }}>
          {loading ? (
            <Box display='flex' justifyContent='center' p={10}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#fbfbfb" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 700 }}>#</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>اسم المدينة</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>
                      الدولة التابعة
                    </TableCell>
                    <TableCell align='center' sx={{ fontWeight: 700 }}>
                      الإجراءات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cities.map((city, index) => (
                    <TableRow key={city.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>
                        {city.name}
                      </TableCell>
                      <TableCell>
                        {(() => {
                          const foundCountry = countries.find(
                            (country) =>
                              country.cities &&
                              country.cities.some((c) => c.id === city.id)
                          );
                          return foundCountry ? foundCountry.name : "غير مرتبط";
                        })()}
                      </TableCell>
                      <TableCell align='center'>
                        <Tooltip title='تعديل'>
                          <IconButton
                            color='info'
                            size='small'
                            onClick={() => handleOpenEdit(city)}>
                            <EditIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='حذف'>
                          <IconButton
                            color='error'
                            size='small'
                            onClick={() => handleDeleteCity(city.id)}>
                            <DeleteIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* نافذة الإضافة */}
      <Dialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        fullWidth
        maxWidth='xs'>
        <DialogTitle>إضافة مدينة جديدة</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label='اسم المدينة'
              fullWidth
              onChange={(e) => setNewCity({ ...newCity, name: e.target.value })}
            />
            <FormControl fullWidth>
              <InputLabel>الدولة</InputLabel>
              <Select
                label='الدولة'
                value={newCity.countryId}
                onChange={(e) =>
                  setNewCity({ ...newCity, countryId: e.target.value })
                }>
                {countries.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAdd(false)}>إلغاء</Button>
          <Button
            variant='contained'
            onClick={handleAddCity}
            disabled={addLoading}>
            حفظ
          </Button>
        </DialogActions>
      </Dialog>

      {/* نافذة التعديل */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth='xs'>
        <DialogTitle>تعديل اسم المدينة</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label='اسم المدينة'
              fullWidth
              value={editCity.name}
              onChange={(e) =>
                setEditCity({ ...editCity, name: e.target.value })
              }
            />
            {/* جعل حقل الدولة للقراءة فقط أو disabled لأن السيرفر لا يدعم تعديله هنا */}
            <FormControl fullWidth disabled>
              <InputLabel>الدولة (لا يمكن تعديلها)</InputLabel>
              <Select
                label='الدولة (لا يمكن تعديلها)'
                value={editCity.countryId}>
                {countries.map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>إلغاء</Button>
          <Button
            variant='contained'
            onClick={handleUpdateCity}
            disabled={editLoading}>
            حفظ التعديل
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Cities;
