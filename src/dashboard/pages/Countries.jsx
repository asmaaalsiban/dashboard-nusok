/** @format */

import { useState, useEffect } from "react";
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
  Tooltip,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import {
  Public as CountryIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationCity as CityIcon,
} from "@mui/icons-material";
import AddCountry from "./AddCountry";
import Swal from "sweetalert2";

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  // حالات خاصة بالتعديل
  const [openEdit, setOpenEdit] = useState(false);
  const [currentCountry, setCurrentCountry] = useState({
    id: "",
    name: "",
    code: "",
  });
  const [editLoading, setEditLoading] = useState(false);
  const fetchCountries = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://umrahbooking.runasp.net/api/Dashboard/DashbordCountries/GetCountries",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCountries(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("خطأ في جلب الدول:", error);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCountries();
  }, []);

  // فتح نافذة التعديل وتعبئة البيانات

  const handleOpenEdit = (country) => {
    setCurrentCountry({
      id: country.id,
      name: country.name,
      code: country.code,
    });
    setOpenEdit(true);
  };

  // تنفيذ عملية التحديث

  const handleUpdate = async () => {
    try {
      setEditLoading(true);
      const token = localStorage.getItem("token");
      // الـ Body المطلوب حسب وصفك
      const updateData = {
        countryId: currentCountry.id,
        name: currentCountry.name,
        code: currentCountry.code,
      };
      await axios.put(
        `http://umrahbooking.runasp.net/api/Dashboard/DashbordCountries/UpdateCounty/${currentCountry.id}`,
        updateData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      Swal.fire({
        icon: "success",
        title: "تم التحديث",
        text: "تم تعديل بيانات الدولة بنجاح",
        timer: 1500,
        showConfirmButton: false,
      });
      setOpenEdit(false);
      fetchCountries(); // تحديث القائمة
    } catch (error) {
      Swal.fire("خطأ", "فشل في تحديث البيانات", error);
    } finally {
      setEditLoading(false);
    }
  };
  const handleDelete = async (id) => {
    Swal.fire({
      title: "هل أنت متأكد؟",
      text: "لن تتمكن من التراجع عن هذا الإجراء!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "نعم، احذفها!",
      cancelButtonText: "إلغاء",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = localStorage.getItem("token");
          await axios.delete(
            `http://umrahbooking.runasp.net/api/Dashboard/DashbordCountries/DeleteCounty/${id}`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // تنبيه النجاح
          Swal.fire({
            title: "تم الحذف!",
            text: "تم حذف الدولة بنجاح.",
            icon: "success",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchCountries();
        } catch (error) {
          // تنبيه الخطأ
          Swal.fire({
            title: "خطأ!",
            text: "لا يمكن حذف هذه الدولة لارتباطها ببيانات أخرى.",
            icon: error,
          });
        }
      }
    });
  };
  return (
    <Box sx={{ p: 3 }}>
      {/* الرأس */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <CountryIcon color='primary' sx={{ fontSize: 35 }} />
          <Box>
            <Typography variant='h4' fontWeight='bold'>
              إدارة الدول
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              تحكم في قائمة الدول والمدن التابعة لها
            </Typography>
          </Box>
        </Box>
        <AddCountry onCountryAdded={fetchCountries} />
      </Box>
      {/* الجدول */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
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
                    <TableCell sx={{ fontWeight: 700 }}>اسم الدولة</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>الكود التابع</TableCell>
                    <TableCell sx={{ fontWeight: 700 }}>عدد المدن</TableCell>
                    <TableCell align='center' sx={{ fontWeight: 700 }}>
                      الإجراءات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {countries.map((country, index) => (
                    <TableRow key={country.id} hover>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{country.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={country.code}
                          size='small'
                          variant='outlined'
                          color='primary'
                        />
                      </TableCell>
                      <TableCell>{country.cities?.length || 0} مدن</TableCell>
                      <TableCell align='center'>
                        <Tooltip title='تعديل'>
                          <IconButton
                            color='info'
                            size='small'
                            onClick={() => handleOpenEdit(country)}>
                            <EditIcon fontSize='small' />
                          </IconButton>
                        </Tooltip>
                        <IconButton
                          color='error'
                          size='small'
                          onClick={() => handleDelete(country.id)}>
                          <DeleteIcon fontSize='small' />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>
      {/* --- نافذة التعديل (Edit Dialog) --- */}
      <Dialog
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        fullWidth
        maxWidth='xs'
        disableEnforceFocus
        disableRestoreFocus>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          تعديل بيانات الدولة
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label='اسم الدولة'
              fullWidth
              value={currentCountry.name}
              onChange={(e) =>
                setCurrentCountry({ ...currentCountry, name: e.target.value })
              }
            />
            <TextField
              label='كود الدولة'
              fullWidth
              value={currentCountry.code}
              onChange={(e) =>
                setCurrentCountry({ ...currentCountry, code: e.target.value })
              }
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenEdit(false)} color='inherit'>
            إلغاء
          </Button>
          <Button
            onClick={handleUpdate}
            variant='contained'
            disabled={editLoading}>
            {editLoading ? <CircularProgress size={24} /> : "حفظ التعديلات"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
export default Countries;
