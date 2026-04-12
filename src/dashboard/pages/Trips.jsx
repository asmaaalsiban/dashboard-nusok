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
  LinearProgress,
  Tooltip,
  Paper,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Mosque as UmrahIcon,
  PersonAddAlt1 as PerPersonIcon,
  Groups as CapacityIcon,
  FlightTakeoff as DepartureIcon, // أيقونة الذهاب
  FlightLand as ReturnIcon, // أيقونة العودة
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";
import { format } from "date-fns";

const BASE_URL = "http://umrahbooking.runasp.net";

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/Dashboard/DashbordTrips/GetTrips`,
        { headers }
      );
      setTrips(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setTrips([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // إعداد Yup Validation
  const validationSchema = Yup.object({
    title: Yup.string().required("عنوان الرحلة مطلوب"),
    description: Yup.string()
      .min(10, "الوصف يجب أن يكون أكثر تفصيلاً")
      .required("الوصف مطلوب"),
    startDate: Yup.date().required("تاريخ البداية مطلوب"),
    endDate: Yup.date()
      .min(Yup.ref("startDate"), "تاريخ العودة يجب أن يكون بعد تاريخ الذهاب")
      .required("تاريخ النهاية مطلوب"),
    pricePerPerson: Yup.number()
      .min(1, "السعر يجب أن يكون أكبر من 0")
      .required("المبلغ مطلوب"),
    maxCapacity: Yup.number()
      .min(0, "لا يمكن أن تكون السعة أقل من 0")
      .max(15, "السعة القصوى هي 15 شخصاً فقط")
      .required("السعة مطلوبة"),
  });

  // إعداد useFormik Hook
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      pricePerPerson: 0,
      maxCapacity: 0,
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const payload = {
          title: values.title,
          description: values.description,
          startDate: new Date(values.startDate).toISOString(),
          endDate: new Date(values.endDate).toISOString(),
          pricePerPerson: Number(values.pricePerPerson),
          maxCapacity: Number(values.maxCapacity),
        };

        if (editingItem) {
          await axios.put(
            `${BASE_URL}/api/Dashboard/DashbordTrips/UpdateTrip/${editingItem.id}`,
            { ...payload, id: editingItem.id },
            { headers }
          );
          Swal.fire("تم التحديث!", "تم تعديل بيانات الرحلة بنجاح", "success");
        } else {
          await axios.post(
            `${BASE_URL}/api/Dashboard/DashbordTrips/CreateTrip`,
            payload,
            { headers }
          );
          Swal.fire("تم الإضافة!", "تم إنشاء الرحلة بنجاح", "success");
        }

        fetchData();
        handleCloseDialog();
      } catch (error) {
        Swal.fire("خطأ", "فشل في حفظ البيانات", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditingItem(item);
      formik.setValues({
        title: item.title || "",
        description: item.description || "",
        startDate: item.startDate ? item.startDate.substring(0, 16) : "",
        endDate: item.endDate ? item.endDate.substring(0, 16) : "",
        pricePerPerson: item.pricePerPerson || 0,
        maxCapacity: item.maxCapacity || 0,
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
      title: "هل تريد حذف الرحلة؟",
      text: "سيؤدي هذا لحذف كافة الباقات المرتبطة بها!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${BASE_URL}/api/Dashboard/DashbordTrips/DeleteTrip/${id}`,
          { headers }
        );
        setTrips(trips.filter((t) => t.id !== id));
        Swal.fire("حُذف!", "تم حذف الرحلة بنجاح", "success");
      } catch (error) {
        Swal.fire("خطأ", "حدث خطأ أثناء الحذف", error);
      }
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        direction: "rtl",
      }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <UmrahIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Box>
            <Typography variant='h4' fontWeight='bold'>
              جدولة الرحلات
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              إدارة مواعيد الانطلاق والعودة، السعة، والأسعار
            </Typography>
          </Box>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ borderRadius: 2, px: 3 }}>
          إضافة رحلة جديدة
        </Button>
      </Box>

      {/* Main Content Card */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder='البحث في الرحلات المجدولة...'
            sx={{ mb: 3 }}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon color='action' sx={{ ml: 1, mr: 1 }} />
              ),
            }}
          />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      عنوان الرحلة
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      وصف الرحلة
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      تاريخ الذهاب
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      تاريخ العودة
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      السعر للفرد
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      السعة القصوى
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {trips
                    .filter((t) =>
                      t.title?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((trip) => (
                      <TableRow key={trip.id} hover>
                        <TableCell>
                          <Typography fontWeight='600' color='primary'>
                            {trip.title}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography
                            variant='caption'
                            color='text.secondary'
                            noWrap
                            sx={{ maxWidth: 150, display: "block" }}>
                            {trip.description}
                          </Typography>
                        </TableCell>

                        {/* تاريخ الذهاب */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            <DepartureIcon
                              sx={{ fontSize: 18, color: "success.main" }}
                            />
                            <Typography variant='body2' fontWeight='500'>
                              {format(new Date(trip.startDate), "yyyy/MM/dd")}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* تاريخ العودة */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            <ReturnIcon
                              sx={{ fontSize: 18, color: "error.main" }}
                            />
                            <Typography variant='body2' fontWeight='500'>
                              {format(new Date(trip.endDate), "yyyy/MM/dd")}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "#2e7d32",
                            }}>
                            <PerPersonIcon sx={{ fontSize: "1.2rem" }} />
                            <Typography sx={{ fontWeight: "bold" }}>
                              {trip.pricePerPerson}$
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell sx={{ minWidth: 140 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            <CapacityIcon
                              sx={{ fontSize: 18, color: "orange" }}
                            />
                            <Typography variant='body2'>
                              {trip.maxCapacity} / 15
                            </Typography>
                          </Box>
                          <LinearProgress
                            variant='determinate'
                            value={(trip.maxCapacity / 15) * 100}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              mt: 1,
                              bgcolor: "#eee",
                            }}
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: "flex", gap: 0.5 }}>
                            <Tooltip title='تعديل'>
                              <IconButton
                                color='info'
                                size='small'
                                onClick={() => handleOpenDialog(trip)}>
                                <EditIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title='حذف'>
                              <IconButton
                                color='error'
                                size='small'
                                onClick={() => handleDelete(trip.id)}>
                                <DeleteIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='sm'
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
        disableEnforceFocus
        disableRestoreFocus>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ fontWeight: "bold", bgcolor: "#fbfbfb" }}>
            {editingItem
              ? "تعديل بيانات الرحلة"
              : "إضافة رحلة جديدة لجدول العمرة"}
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ mt: 0.5 }}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name='title'
                  label='عنوان الرحلة'
                  value={formik.values.title}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.title && Boolean(formik.errors.title)}
                  helperText={formik.touched.title && formik.errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={2}
                  name='description'
                  label='وصف الرحلة'
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.description &&
                    Boolean(formik.errors.description)
                  }
                  helperText={
                    formik.touched.description && formik.errors.description
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='datetime-local'
                  name='startDate'
                  label='تاريخ الذهاب'
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.startDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.startDate && Boolean(formik.errors.startDate)
                  }
                  helperText={
                    formik.touched.startDate && formik.errors.startDate
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='datetime-local'
                  name='endDate'
                  label='تاريخ العودة'
                  InputLabelProps={{ shrink: true }}
                  value={formik.values.endDate}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.endDate && Boolean(formik.errors.endDate)
                  }
                  helperText={formik.touched.endDate && formik.errors.endDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  name='pricePerPerson'
                  label='السعر للفرد ($)'
                  InputProps={{
                    startAdornment: (
                      <PerPersonIcon sx={{ color: "gray", ml: 1 }} />
                    ),
                  }}
                  value={formik.values.pricePerPerson}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.pricePerPerson &&
                    Boolean(formik.errors.pricePerPerson)
                  }
                  helperText={
                    formik.touched.pricePerPerson &&
                    formik.errors.pricePerPerson
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type='number'
                  name='maxCapacity'
                  label='السعة القصوى (15)'
                  value={formik.values.maxCapacity}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.maxCapacity &&
                    Boolean(formik.errors.maxCapacity)
                  }
                  helperText={
                    formik.touched.maxCapacity
                      ? formik.errors.maxCapacity
                      : "الحد الأقصى 15"
                  }
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
              {editingItem ? "تحديث الرحلة" : "اعتماد الرحلة"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

export default Trips;
