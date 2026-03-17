/** @format */

import { useState } from "react";
import "./Bookings.css";
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
  Paper,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Bookings = () => {
  const [bookings, setBookings] = useState([
    { id: 1, customer: "أحمد حسن", email: "ahmed@email.com", hotel: "فندق جراند", package: "فاخرة", checkIn: "2024-04-01", checkOut: "2024-04-05", guests: 2, status: "confirmed", amount: 1500 },
    { id: 2, customer: "فاطمة علي", email: "fatima@email.com", hotel: "منتجع البحر", package: "قياسية", checkIn: "2024-04-10", checkOut: "2024-04-15", guests: 4, status: "pending", amount: 800 },
    { id: 3, customer: "محمد عمر", email: "mohammed@email.com", hotel: "نزل الجبل", package: "ممتازة", checkIn: "2024-03-15", checkOut: "2024-03-22", guests: 3, status: "completed", amount: 2200 },
    { id: 4, customer: "سارة إبراهيم", email: "sarah@email.com", hotel: "فندق جراند", package: "اقتصادية", checkIn: "2024-04-20", checkOut: "2024-04-22", guests: 1, status: "canceled", amount: 400 },
    { id: 5, customer: "خالد يوسف", email: "khaled@email.com", hotel: "نزل المدينة", package: "قياسية", checkIn: "2024-04-05", checkOut: "2024-04-08", guests: 2, status: "confirmed", amount: 950 },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSave = (values, actions) => {
    if (editingItem) {
      setBookings(bookings.map(b => b.id === editingItem.id ? { ...b, ...values } : b));
    } else {
      setBookings([...bookings, { ...values, id: Date.now() }]);
    }
    actions.setSubmitting(false);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الحجز؟")) {
      setBookings(bookings.filter(b => b.id !== id));
    }
  };

  const getStatusChip = (status) => {
    const config = {
      confirmed: { color: "#a7f3d0", text: "#0a6b62", label: "مؤكد" },
      canceled: { color: "#fed7e2", text: "#c4183c", label: "ملغى" },
      completed: { color: "#bee3f8", text: "#0088cc", label: "مكتمل" },
      pending: { color: "#fff3cd", text: "#856404", label: "قيد الانتظار" },
    };
    const c = config[status] || config.pending;
    const chipClass = `bookings-status-chip bookings-status-${status}`;
    return <Chip label={c.label} size="small" className={chipClass} />;
  };

  const filteredBookings = bookings.filter(b =>
    b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const validationSchema = Yup.object({
    customer: Yup.string().required("مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
    hotel: Yup.string().required("مطلوب"),
    package: Yup.string().required("مطلوب"),
    checkIn: Yup.date().required("مطلوب"),
    checkOut: Yup.date().min(Yup.ref("checkIn"), "تسجيل المغادرة يجب أن يكون بعد تسجيل الوصول").required("مطلوب"),
    guests: Yup.number().min(1).required("مطلوب"),
    status: Yup.string().required("مطلوب"),
    amount: Yup.number().required("مطلوب"),
  });

  const initialValues = editingItem || {
    customer: "",
    email: "",
    hotel: "",
    package: "",
    checkIn: "",
    checkOut: "",
    guests: 1,
    status: "pending",
    amount: 0,
  };

  return (
    <Box className="bookings-container">
      <Box className="bookings-header">
        <Box className="bookings-title-group">
          <Typography variant="h4" className="bookings-title">إدارة الحجوزات</Typography>
          <Typography variant="body2" className="bookings-subtitle">إدارة جميع حجوزات الفنادق</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          إضافة حجز
        </Button>
      </Box>

      <Card className="bookings-card">
        <CardContent>
          <TextField
            fullWidth
            placeholder="ابحث بالعميل أو الفندق أو البريد الإلكتروني..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon className="bookings-search-icon" /> }}
            className="bookings-search"
          />
          <TableContainer className="bookings-table-container">
            <Table className="bookings-table">
              <TableHead>
                <TableRow>
                  <TableCell className="bookings-table-cell-header">العميل</TableCell>
                  <TableCell className="bookings-table-cell-header">الفندق</TableCell>
                  <TableCell className="bookings-table-cell-header">الباقة</TableCell>
                  <TableCell className="bookings-table-cell-header">تسجيل الوصول</TableCell>
                  <TableCell className="bookings-table-cell-header">تسجيل المغادرة</TableCell>
                  <TableCell className="bookings-table-cell-header">الضيوف</TableCell>
                  <TableCell className="bookings-table-cell-header">المبلغ</TableCell>
                  <TableCell className="bookings-table-cell-header">الحالة</TableCell>
                  <TableCell className="bookings-table-cell-header">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell className="bookings-table-cell-customer">
                      <Typography className="bookings-customer-name" fontWeight={600}>{booking.customer}</Typography>
                      <Typography variant="caption" className="bookings-customer-email">{booking.email}</Typography>
                    </TableCell>
                    <TableCell className="bookings-table-cell">{booking.hotel}</TableCell>
                    <TableCell className="bookings-table-cell">{booking.package}</TableCell>
                    <TableCell className="bookings-table-cell">{booking.checkIn}</TableCell>
                    <TableCell className="bookings-table-cell">{booking.checkOut}</TableCell>
                    <TableCell className="bookings-table-cell">{booking.guests}</TableCell>
                    <TableCell className="bookings-table-cell-amount">${booking.amount}</TableCell>
                    <TableCell className="bookings-table-cell">{getStatusChip(booking.status)}</TableCell>
                    <TableCell className="bookings-table-cell-actions">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(booking)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(booking.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ className: "bookings-dialog-paper" }}>
        <DialogTitle className="bookings-dialog-title">{editingItem ? "تعديل" : "إضافة"} حجز</DialogTitle>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field name="customer">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="اسم العميل" error={touched.customer && Boolean(errors.customer)} helperText={touched.customer && errors.customer} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="email">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="البريد الإلكتروني" type="email" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="hotel">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="الفندق" error={touched.hotel && Boolean(errors.hotel)} helperText={touched.hotel && errors.hotel} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="package">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="الباقة" error={touched.package && Boolean(errors.package)} helperText={touched.package && errors.package} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="checkIn">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="تاريخ الوصول" type="date" InputLabelProps={{ shrink: true }} error={touched.checkIn && Boolean(errors.checkIn)} helperText={touched.checkIn && errors.checkIn} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="checkOut">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="تاريخ المغادرة" type="date" InputLabelProps={{ shrink: true }} error={touched.checkOut && Boolean(errors.checkOut)} helperText={touched.checkOut && errors.checkOut} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="guests">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="عدد الضيوف" type="number" error={touched.guests && Boolean(errors.guests)} helperText={touched.guests && errors.guests} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="amount">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="المبلغ ($)" type="number" error={touched.amount && Boolean(errors.amount)} helperText={touched.amount && errors.amount} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="status">
                      {({ field }) => (
                        <TextField {...field} select fullWidth label="الحالة" SelectProps={{ native: true }} error={touched.status && Boolean(errors.status)} helperText={touched.status && errors.status}>
                          <option value="pending">قيد الانتظار</option>
                          <option value="confirmed">مؤكد</option>
                          <option value="canceled">ملغى</option>
                          <option value="completed">مكتمل</option>
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className="bookings-dialog-actions">
                <Button onClick={handleCloseDialog}>إلغاء</Button>
                <Button type="submit" variant="contained" disabled={isSubmitting}>
                  {isSubmitting ? "جاري الحفظ..." : "حفظ"}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default Bookings;
