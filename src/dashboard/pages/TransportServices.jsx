/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Chip,
  CircularProgress,
  Paper,
  Tooltip,
  MenuItem,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  DirectionsBus as BusIcon,
  AttachMoney as MoneyIcon,
  LocationOn as CityIcon,
  Search as SearchIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const BASE_URL = "http://umrahbooking.runasp.net";

const TransportServices = () => {
  const [services, setServices] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [servicesRes, citiesRes] = await Promise.all([
        axios.get(
          `${BASE_URL}/api/Dashboard/DashbordTransportServices/GetTransportServices`,
          { headers }
        ),
        axios.get(`${BASE_URL}/api/Dashboard/DashbordCities/GetCities`, {
          headers,
        }),
      ]);
      setServices(Array.isArray(servicesRes.data) ? servicesRes.data : []);
      setCities(Array.isArray(citiesRes.data) ? citiesRes.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      Swal.fire("خطأ", "فشل في جلب البيانات من السيرفر", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    type: Yup.string().required("نوع النقل مطلوب"),
    departureCityId: Yup.string().required("يرجى اختيار مدينة المغادرة"),
    arrivalCityId: Yup.string().required("يرجى اختيار مدينة الوصول"),
    price: Yup.number()
      .typeError("يجب أن يكون السعر رقماً")
      .min(1, "السعر يجب أن يكون أكبر من 0")
      .required("السعر مطلوب"),
  });

  const formik = useFormik({
    initialValues: {
      type: "Land",
      departureCityId: "",
      arrivalCityId: "",
      price: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        if (editingItem) {
          // Body التعديل: نستخدم transportId و title
          const updatePayload = {
            transportId: editingItem.id,
            title: values.type,
            departureCityId: values.departureCityId,
            arrivalCityId: values.arrivalCityId,
            price: Number(values.price),
          };
          await axios.put(
            `${BASE_URL}/api/Dashboard/DashbordTransportServices/UpdateTransportService/${editingItem.id}`,
            updatePayload,
            { headers }
          );
          Swal.fire("تم التحديث!", "تم تعديل الخدمة بنجاح", "success");
        } else {
          // Body الإنشاء: نستخدم type
          const createPayload = {
            type: values.type,
            departureCityId: values.departureCityId,
            arrivalCityId: values.arrivalCityId,
            price: Number(values.price),
          };
          await axios.post(
            `${BASE_URL}/api/Dashboard/DashbordTransportServices/CreateTransportService`,
            createPayload,
            { headers }
          );
          Swal.fire("تم الإضافة!", "تم إضافة خدمة النقل بنجاح", "success");
        }

        fetchData();
        handleCloseDialog();
      } catch (error) {
        Swal.fire(
          "خطأ",
          "حدث خطأ أثناء حفظ البيانات",
          error.response?.data?.message || "حدث خطأ غير متوقع",
          "error"
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      formik.setValues({
        type: item.type || item.title || "Land",
        price: item.price || 0,
        departureCityId: item.departureCityId || "",
        arrivalCityId: item.arrivalCityId || "",
      });
    } else {
      setEditingItem(null);
      formik.resetForm();
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف خدمة النقل نهائياً!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${BASE_URL}/api/Dashboard/DashbordTransportServices/DeleteTransportService/${id}`,
          { headers }
        );
        setServices(services.filter((s) => s.id !== id));
        Swal.fire("حُذف!", "تم حذف الخدمة بنجاح", "success");
      } catch (error) {
        Swal.fire(
          "خطأ",
          "لا يمكن حذف هذه الخدمة حالياً",
          error.response?.data?.message || "حدث خطأ غير متوقع",
          "error"
        );
      }
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
        direction: "rtl",
      }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <BusIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Box>
            <Typography variant='h4' fontWeight='bold'>
              إدارة خدمات النقل
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              ربط المدن وتحديد تكاليف التنقل
            </Typography>
          </Box>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2, px: 3 }}>
          إضافة خدمة جديدة
        </Button>
      </Box>

      <Card sx={{ borderRadius: 3, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder='البحث بنوع الخدمة (Land, Air...)'
            sx={{ mb: 3 }}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon color='action' sx={{ ml: 1, mr: 1 }} />
              ),
            }}
          />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f1f3f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>نوع النقل</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>السعر</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services
                    .filter((s) =>
                      (s.type || s.title)
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((service) => (
                      <TableRow key={service.id} hover>
                        <TableCell>
                          <Typography variant='subtitle1' fontWeight='600'>
                            {service.type || service.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={`${service.price}$`}
                            color='success'
                            variant='outlined'
                            sx={{ fontWeight: "bold", fontSize: "1rem" }}
                          />
                        </TableCell>
                        <TableCell>
                          <Tooltip title='تعديل'>
                            <IconButton
                              color='info'
                              onClick={() => handleOpenDialog(service)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title='حذف'>
                            <IconButton
                              color='error'
                              onClick={() => handleDelete(service.id)}>
                              <DeleteIcon />
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='sm'
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ fontWeight: "bold", bgcolor: "#fbfbfb" }}>
            {editingItem ? "تعديل الخدمة" : "إضافة خدمة نقل جديدة"}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  name='type'
                  label='نوع النقل'
                  value={formik.values.type}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.type && Boolean(formik.errors.type)}
                  helperText={formik.touched.type && formik.errors.type}>
                  <MenuItem value='Land'>بري (Land)</MenuItem>
                  <MenuItem value='Air'>جوي (Air)</MenuItem>
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name='departureCityId'
                  label='مدينة المغادرة'
                  value={formik.values.departureCityId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.departureCityId &&
                    Boolean(formik.errors.departureCityId)
                  }
                  helperText={
                    formik.touched.departureCityId &&
                    formik.errors.departureCityId
                  }
                  InputProps={{
                    startAdornment: (
                      <CityIcon sx={{ ml: 1, color: "primary.main" }} />
                    ),
                  }}>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  name='arrivalCityId'
                  label='مدينة الوصول'
                  value={formik.values.arrivalCityId}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.arrivalCityId &&
                    Boolean(formik.errors.arrivalCityId)
                  }
                  helperText={
                    formik.touched.arrivalCityId && formik.errors.arrivalCityId
                  }
                  InputProps={{
                    startAdornment: (
                      <CityIcon sx={{ ml: 1, color: "secondary.main" }} />
                    ),
                  }}>
                  {cities.map((city) => (
                    <MenuItem key={city.id} value={city.id}>
                      {city.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type='number'
                  name='price'
                  label='السعر ($)'
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
                  InputProps={{
                    startAdornment: <MoneyIcon sx={{ ml: 1, color: "gray" }} />,
                  }}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2, bgcolor: "#fbfbfb" }}>
            <Button onClick={handleCloseDialog} color='inherit'>
              إلغاء
            </Button>
            <Button
              type='submit'
              variant='contained'
              disabled={formik.isSubmitting}>
              {editingItem ? "حفظ التعديلات" : "تأكيد الإضافة"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default TransportServices;
