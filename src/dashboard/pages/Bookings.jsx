/** @format */

// /** @format */

// import { useState } from "react";
// import "./Bookings.css";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Chip,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Grid,
// } from "@mui/material";
// import { Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

// const Bookings = () => {
//   const [bookings, setBookings] = useState([
//     { id: 1, customer: "أحمد حسن", email: "ahmed@email.com", hotel: "فندق جراند", package: "فاخرة", checkIn: "2024-04-01", checkOut: "2024-04-05", guests: 2, status: "confirmed", amount: 1500 },
//     { id: 2, customer: "فاطمة علي", email: "fatima@email.com", hotel: "منتجع البحر", package: "قياسية", checkIn: "2024-04-10", checkOut: "2024-04-15", guests: 4, status: "pending", amount: 800 },
//     { id: 3, customer: "محمد عمر", email: "mohammed@email.com", hotel: "نزل الجبل", package: "ممتازة", checkIn: "2024-03-15", checkOut: "2024-03-22", guests: 3, status: "completed", amount: 2200 },
//     { id: 4, customer: "سارة إبراهيم", email: "sarah@email.com", hotel: "فندق جراند", package: "اقتصادية", checkIn: "2024-04-20", checkOut: "2024-04-22", guests: 1, status: "canceled", amount: 400 },
//     { id: 5, customer: "خالد يوسف", email: "khaled@email.com", hotel: "نزل المدينة", package: "قياسية", checkIn: "2024-04-05", checkOut: "2024-04-08", guests: 2, status: "confirmed", amount: 950 },
//   ]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleOpenDialog = (item = null) => {
//     setEditingItem(item);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingItem(null);
//   };

//   const handleSave = (values, actions) => {
//     if (editingItem) {
//       setBookings(bookings.map(b => b.id === editingItem.id ? { ...b, ...values } : b));
//     } else {
//       setBookings([...bookings, { ...values, id: Date.now() }]);
//     }
//     actions.setSubmitting(false);
//     handleCloseDialog();
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("هل أنت متأكد من حذف هذا الحجز؟")) {
//       setBookings(bookings.filter(b => b.id !== id));
//     }
//   };

//   const getStatusChip = (status) => {
//     const config = {
//       confirmed: { color: "#a7f3d0", text: "#0a6b62", label: "مؤكد" },
//       canceled: { color: "#fed7e2", text: "#c4183c", label: "ملغى" },
//       completed: { color: "#bee3f8", text: "#0088cc", label: "مكتمل" },
//       pending: { color: "#fff3cd", text: "#856404", label: "قيد الانتظار" },
//     };
//     const c = config[status] || config.pending;
//     const chipClass = `bookings-status-chip bookings-status-${status}`;
//     return <Chip label={c.label} size="small" className={chipClass} />;
//   };

//   const filteredBookings = bookings.filter(b =>
//     b.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     b.hotel.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     b.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const validationSchema = Yup.object({
//     customer: Yup.string().required("مطلوب"),
//     email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
//     hotel: Yup.string().required("مطلوب"),
//     package: Yup.string().required("مطلوب"),
//     checkIn: Yup.date().required("مطلوب"),
//     checkOut: Yup.date().min(Yup.ref("checkIn"), "تسجيل المغادرة يجب أن يكون بعد تسجيل الوصول").required("مطلوب"),
//     guests: Yup.number().min(1).required("مطلوب"),
//     status: Yup.string().required("مطلوب"),
//     amount: Yup.number().required("مطلوب"),
//   });

//   const initialValues = editingItem || {
//     customer: "",
//     email: "",
//     hotel: "",
//     package: "",
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//     status: "pending",
//     amount: 0,
//   };

//   return (
//     <Box className="bookings-container">
//       <Box className="bookings-header">
//         <Box className="bookings-title-group">
//           <Typography variant="h4" className="bookings-title">إدارة الحجوزات</Typography>
//           <Typography variant="body2" className="bookings-subtitle">إدارة جميع حجوزات الفنادق</Typography>
//         </Box>
//       </Box>

//       <Card className="bookings-card">
//         <CardContent>
//           <TextField
//             fullWidth
//             placeholder="ابحث بالعميل أو الفندق أو البريد الإلكتروني..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{ startAdornment: <SearchIcon className="bookings-search-icon" /> }}
//             className="bookings-search"
//           />
//           <TableContainer className="bookings-table-container">
//             <Table className="bookings-table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell className="bookings-table-cell-header">العميل</TableCell>
//                   <TableCell className="bookings-table-cell-header">الفندق</TableCell>
//                   <TableCell className="bookings-table-cell-header">الباقة</TableCell>
//                   <TableCell className="bookings-table-cell-header">تسجيل الوصول</TableCell>
//                   <TableCell className="bookings-table-cell-header">تسجيل المغادرة</TableCell>
//                   <TableCell className="bookings-table-cell-header">أفراد العائلة</TableCell>
//                   <TableCell className="bookings-table-cell-header">المبلغ</TableCell>
//                   <TableCell className="bookings-table-cell-header">الحالة</TableCell>
//                   <TableCell className="bookings-table-cell-header">الإجراءات</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredBookings.map((booking) => (
//                   <TableRow key={booking.id} hover>
//                     <TableCell className="bookings-table-cell-customer">
//                       <Typography className="bookings-customer-name" fontWeight={600}>{booking.customer}</Typography>
//                       <Typography variant="caption" className="bookings-customer-email">{booking.email}</Typography>
//                     </TableCell>
//                     <TableCell className="bookings-table-cell">{booking.hotel}</TableCell>
//                     <TableCell className="bookings-table-cell">{booking.package}</TableCell>
//                     <TableCell className="bookings-table-cell">{booking.checkIn}</TableCell>
//                     <TableCell className="bookings-table-cell">{booking.checkOut}</TableCell>
//                     <TableCell className="bookings-table-cell">{booking.guests}</TableCell>
//                     <TableCell className="bookings-table-cell-amount">${booking.amount}</TableCell>
//                     <TableCell className="bookings-table-cell">{getStatusChip(booking.status)}</TableCell>
//                     <TableCell className="bookings-table-cell-actions">
//                       <IconButton size="small" color="primary" onClick={() => handleOpenDialog(booking)}>
//                         <EditIcon fontSize="small" />
//                       </IconButton>
//                       <IconButton size="small" color="error" onClick={() => handleDelete(booking.id)}>
//                         <DeleteIcon fontSize="small" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </CardContent>
//       </Card>

//       {/* Add/Edit Dialog */}
//       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ className: "bookings-dialog-paper" }}>
//         <DialogTitle className="bookings-dialog-title">{editingItem ? "تعديل" : "إضافة"} حجز</DialogTitle>
//         <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
//           {({ errors, touched, isSubmitting }) => (
//             <Form>
//               <DialogContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="customer">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="اسم العميل" error={touched.customer && Boolean(errors.customer)} helperText={touched.customer && errors.customer} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="email">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="البريد الإلكتروني" type="email" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="hotel">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="الفندق" error={touched.hotel && Boolean(errors.hotel)} helperText={touched.hotel && errors.hotel} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="package">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="الباقة" error={touched.package && Boolean(errors.package)} helperText={touched.package && errors.package} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="checkIn">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="تاريخ الوصول" type="date" InputLabelProps={{ shrink: true }} error={touched.checkIn && Boolean(errors.checkIn)} helperText={touched.checkIn && errors.checkIn} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="checkOut">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="تاريخ المغادرة" type="date" InputLabelProps={{ shrink: true }} error={touched.checkOut && Boolean(errors.checkOut)} helperText={touched.checkOut && errors.checkOut} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="guests">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="عدد أفراد العائلة" type="number" error={touched.guests && Boolean(errors.guests)} helperText={touched.guests && errors.guests} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name="amount">
//                       {({ field }) => (
//                         <TextField {...field} fullWidth label="المبلغ ($)" type="number" error={touched.amount && Boolean(errors.amount)} helperText={touched.amount && errors.amount} />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name="status">
//                       {({ field }) => (
//                         <TextField {...field} select fullWidth label="الحالة" SelectProps={{ native: true }} error={touched.status && Boolean(errors.status)} helperText={touched.status && errors.status}>
//                           <option value="pending">قيد الانتظار</option>
//                           <option value="confirmed">مؤكد</option>
//                           <option value="canceled">ملغى</option>
//                           <option value="completed">مكتمل</option>
//                         </TextField>
//                       )}
//                     </Field>
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions className="bookings-dialog-actions">
//                 <Button onClick={handleCloseDialog}>إلغاء</Button>
//                 <Button type="submit" variant="contained" disabled={isSubmitting}>
//                   {isSubmitting ? "جاري الحفظ..." : "حفظ"}
//                 </Button>
//               </DialogActions>
//             </Form>
//           )}
//         </Formik>
//       </Dialog>
//     </Box>
//   );
// };

// export default Bookings;

import { useState, useEffect } from "react";
import axios from "axios";
import "./Bookings.css";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  TextField,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Edit as EditIcon,
  Search as SearchIcon,
  CheckCircle as ConfirmIcon,
  Cancel as CancelIcon,
  DoneAll as CompleteIcon,
  Payments as PaidIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://umrahbooking.runasp.net/api/Dashboard/DashbordBookings/GetBookings",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBookings(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("خطأ أثناء الجلب:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleAction = async (id, actionType) => {
    const token = localStorage.getItem("token");
    const booking = bookings.find((b) => b.id === id);

    // --- تحقق إضافي لمنع الدفع للحجز الملغى مع رسالة توضيحية ---
    if (actionType === "markPaid" && booking?.status === "Cancelled") {
      return Swal.fire({
        title: "إجراء غير ممكن",
        text: "لا يمكن تحويل حالة الدفع لـ 'مدفوع' لأن هذا الحجز ملغى حالياً.",
        icon: "info",
        confirmButtonText: "مفهوم",
        confirmButtonColor: "#3085d6",
      });
    }

    const endpoints = {
      confirm: `http://umrahbooking.runasp.net/api/Dashboard/DashbordBookings/ConfirmBooking/${id}/confirm`,
      cancel: `http://umrahbooking.runasp.net/api/Dashboard/DashbordBookings/CancelBooking/${id}/Cancel`,
      markPaid: `http://umrahbooking.runasp.net/api/Dashboard/DashbordBookings/PaidBookings/${id}/MarkAsPaid`,
      complete: `http://umrahbooking.runasp.net/api/Dashboard/DashbordBookings/CompleteBooking/${id}/complete`,
    };

    const labels = {
      confirm: "تأكيد الحجز",
      cancel: "إلغاء الحجز",
      markPaid: "تحويل حالة الدفع لمدفوع",
      complete: "إكمال الحجز",
    };

    const result = await Swal.fire({
      title: `هل أنت متأكد؟`,
      text: `سيتم ${labels[actionType]} الآن.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، استمر",
      cancelButtonText: "تراجع",
      confirmButtonColor: actionType === "cancel" ? "#d33" : "#3085d6",
    });

    if (result.isConfirmed) {
      try {
        await axios.put(
          endpoints[actionType],
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire(
          "تم بنجاح",
          `تمت عملية ${labels[actionType]} بنجاح`,
          "success"
        );
        fetchBookings();
      } catch (error) {
        console.error("API Error:", error);
        // عرض رسالة الخطأ القادمة من السيرفر بشكل واضح
        const errorDetail =
          error.response?.data?.message ||
          "فشلت العملية، تأكد من الصلاحيات أو أن حالة الحجز تسمح بهذا الإجراء.";
        Swal.fire("فشل الإجراء", errorDetail, "error");
      }
    }
  };

  const getStatusChip = (status) => {
    const config = {
      Pending: { color: "#fff3cd", text: "#856404", label: "قيد الانتظار" },
      Confirmed: { color: "#d1e7dd", text: "#0f5132", label: "مؤكد" },
      Cancelled: { color: "#f8d7da", text: "#842029", label: "ملغى" },
      Completed: { color: "#cfe2ff", text: "#084298", label: "مكتمل" },
    };
    const c = config[status] || config.Pending;
    return (
      <Chip
        label={c.label}
        size='small'
        sx={{ backgroundColor: c.color, color: c.text }}
      />
    );
  };

  const filteredBookings = bookings.filter((b) => {
    const fullName = `${b.user?.firstName || ""} ${
      b.user?.lastName || ""
    }`.toLowerCase();
    const type = (b.bookingType || "").toLowerCase();
    const search = searchTerm.toLowerCase();
    return fullName.includes(search) || type.includes(search);
  });

  return (
    <Box className='bookings-container'>
      <Box className='bookings-header' sx={{ mb: 3 }}>
        <Box className='bookings-title-group'>
          <Typography variant='h4' className='bookings-title'>
            إدارة الحجوزات
          </Typography>
          <Typography variant='body2' className='bookings-subtitle'>
            عرض الحجوزات المباشرة من النظام
          </Typography>
        </Box>
      </Box>

      <Card className='bookings-card'>
        <CardContent>
          <TextField
            fullWidth
            placeholder='ابحث باسم العميل أو نوع الحجز...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className='bookings-search-icon' />,
            }}
            sx={{ mb: 3 }}
          />

          {loading ? (
            <Box display='flex' justifyContent='center' p={5}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table className='bookings-table'>
                <TableHead>
                  <TableRow>
                    <TableCell>العميل</TableCell>
                    <TableCell>المدينة</TableCell>
                    <TableCell>رقم الهاتف</TableCell>
                    <TableCell>نوع الحجز</TableCell>
                    <TableCell>تاريخ الحجز</TableCell>
                    <TableCell>أفراد العائلة</TableCell>
                    <TableCell>المبلغ الإجمالي</TableCell>
                    <TableCell>حالة الدفع</TableCell>
                    <TableCell>الحالة</TableCell>
                    <TableCell>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id} hover>
                      <TableCell>
                        <Typography fontWeight={600}>
                          {booking.user?.firstName} {booking.user?.lastName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {booking.user?.city?.name || "غير محدد"}
                      </TableCell>
                      <TableCell>{booking.user?.phone}</TableCell>
                      <TableCell>
                        <Chip
                          label={booking.bookingType}
                          variant='outlined'
                          size='small'
                          color={
                            booking.bookingType === "Package"
                              ? "primary"
                              : "secondary"
                          }
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(booking.bookingDate).toLocaleDateString(
                          "ar-EG"
                        )}
                      </TableCell>
                      <TableCell>{booking.familyMembers}</TableCell>
                      <TableCell>
                        {booking.totalAmount.toLocaleString()} دولار
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant='body2'
                          sx={{
                            color:
                              booking.paymentStatus === "Paid"
                                ? "#2e7d32"
                                : "#d32f2f",
                            fontWeight: "bold",
                          }}>
                          {booking.paymentStatus === "Paid"
                            ? "مدفوع"
                            : "غير مدفوع"}
                        </Typography>
                      </TableCell>
                      <TableCell>{getStatusChip(booking.status)}</TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          {/* تأكيد الحجز */}
                          {booking.status === "Pending" && (
                            <Tooltip title='تأكيد الحجز'>
                              <IconButton
                                size='small'
                                sx={{ color: "#2e7d32" }}
                                onClick={() =>
                                  handleAction(booking.id, "confirm")
                                }>
                                <ConfirmIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          )}

                          {/* إكمال الحجز */}
                          {booking.status === "Confirmed" && (
                            <Tooltip title='إكمال الحجز'>
                              <IconButton
                                size='small'
                                color='primary'
                                onClick={() =>
                                  handleAction(booking.id, "complete")
                                }>
                                <CompleteIcon fontSize='small' />
                              </IconButton>
                            </Tooltip>
                          )}

                          {/* زر الدفع - أضفت شرط إضافي هنا للاختفاء التلقائي عند الإلغاء */}
                          {booking.paymentStatus === "Unpaid" &&
                            booking.status !== "Cancelled" && (
                              <Tooltip title='تحويل لمدفوع'>
                                <IconButton
                                  size='small'
                                  sx={{ color: "#ff9800" }}
                                  onClick={() =>
                                    handleAction(booking.id, "markPaid")
                                  }>
                                  <PaidIcon fontSize='small' />
                                </IconButton>
                              </Tooltip>
                            )}

                          {/* إلغاء الحجز */}
                          {booking.status !== "Cancelled" &&
                            booking.status !== "Completed" && (
                              <Tooltip title='إلغاء الحجز'>
                                <IconButton
                                  size='small'
                                  color='error'
                                  onClick={() =>
                                    handleAction(booking.id, "cancel")
                                  }>
                                  <CancelIcon fontSize='small' />
                                </IconButton>
                              </Tooltip>
                            )}
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
    </Box>
  );
};

export default Bookings;
