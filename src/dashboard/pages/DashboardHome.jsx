/** @format */

// /** @format */

// // /** @format */

// // import { useState } from "react";
// // import "./DashboardHome.css";
// // import {
// //   Box,
// //   Grid,
// //   Card,
// //   CardContent,
// //   Typography,
// //   Avatar,
// //   Chip,
// //   Table,
// //   TableBody,
// //   TableCell,
// //   TableContainer,
// //   TableHead,
// //   TableRow,
// //   Paper,
// //   Button,
// //   Dialog,
// //   DialogTitle,
// //   DialogContent,
// //   DialogActions,
// //   TextField,
// //   IconButton,
// // } from "@mui/material";
// // import {
// //   Event as BookingIcon,
// //   CheckCircle as ConfirmIcon,
// //   Cancel as CancelIcon,
// //   DoneAll as CompleteIcon,
// //   AttachMoney as MoneyIcon,
// //   People as UsersIcon,
// //   Hotel as HotelIcon,
// //   Inventory as PackageIcon,
// //   Edit as EditIcon,
// //   Delete as DeleteIcon,
// //   Add as AddIcon,
// // } from "@mui/icons-material";
// // import { Formik, Form, Field } from "formik";
// // import * as Yup from "yup";

// // const DashboardHome = () => {
// //   // Sample data - replace with API calls
// //   const [bookings, setBookings] = useState([
// //     { id: 1, customer: "أحمد حسن", hotel: "فندق جراند", package: "فاخرة", status: "confirmed", amount: 1500 },
// //     { id: 2, customer: "فاطمة علي", hotel: "منتجع البحر", package: "قياسية", status: "pending", amount: 800 },
// //     { id: 3, customer: "محمد عمر", hotel: "نزل الجبل", package: "ممتازة", status: "completed", amount: 2200 },
// //     { id: 4, customer: "سارة إبراهيم", hotel: "فندق جراند", package: "اقتصادية", status: "canceled", amount: 400 },
// //     { id: 5, customer: "خالد يوسف", hotel: "نزل المدينة", package: "قياسية", status: "confirmed", amount: 950 },
// //   ]);

// //   const [users] = useState([
// //     { id: 1, name: "أحمد حسن", email: "ahmed@email.com", role: "customer", joined: "2024-01-15" },
// //     { id: 2, name: "فاطمة علي", email: "fatima@email.com", role: "customer", joined: "2024-02-20" },
// //     { id: 3, name: "محمد عمر", email: "mohammed@email.com", role: "vendor", joined: "2024-01-10" },
// //     { id: 4, name: "سارة إبراهيم", email: "sarah@email.com", role: "customer", joined: "2024-03-05" },
// //     { id: 5, name: "خالد يوسف", email: "khaled@email.com"
// //       , role: "customer", joined: "2024-02-28" },
// //   ]);

// //   const [hotels] = useState([
// //     { id: 1, name: "فندق جراند", location: "القاهرة", rooms: 150, rating: 4.5 },
// //     { id: 2, name: "منتجع البحر", location: "الإسكندرية", rooms: 200, rating: 4.8 },
// //     { id: 3, name: "نزل الجبل", location: "سانت كاترين", rooms: 80, rating: 4.3 },
// //     { id: 4, name: "نزل المدينة", location: "الجيزة", rooms: 120, rating: 4.0 },
// //   ]);

// //   const [packages] = useState([
// //     { id: 1, name: "اقتصادية", duration: "3 أيام", price: 400, hotels: 5 },
// //     { id: 2, name: "قياسية", duration: "5 أيام", price: 800, hotels: 10 },
// //     { id: 3, name: "ممتازة", duration: "7 أيام", price: 1500, hotels: 15 },
// //     { id: 4, name: "فاخرة", duration: "10 أيام", price: 2500, hotels: 20 },
// //   ]);

// //   const [openDialog, setOpenDialog] = useState(false);
// //   const [editingItem, setEditingItem] = useState(null);
// //   const [dialogType, setDialogType] = useState("");

// //   // Calculate statistics
// //   const stats = {
// //     totalBookings: bookings.length,
// //     confirmedBookings: bookings.filter(b => b.status === "confirmed").length,
// //     canceledBookings: bookings.filter(b => b.status === "canceled").length,
// //     completedBookings: bookings.filter(b => b.status === "completed").length,
// //     totalRevenue: bookings.filter(b => b.status !== "canceled").reduce((sum, b) => sum + b.amount, 0),
// //     totalUsers: users.length,
// //     totalHotels: hotels.length,
// //     totalPackages: packages.length,
// //   };

// //   const handleOpenDialog = (type, item = null) => {
// //     setDialogType(type);
// //     setEditingItem(item);
// //     setOpenDialog(true);
// //   };

// //   const handleCloseDialog = () => {
// //     setOpenDialog(false);
// //     setEditingItem(null);
// //     setDialogType("");
// //   };

// //   const handleSave = (values, actions) => {
// //     // Simulate save - replace with API calls
// //     setTimeout(() => {
// //       actions.setSubmitting(false);
// //       handleCloseDialog();
// //     }, 500);
// //   };

// //   const getDialogSchema = () => {
// //     switch (dialogType) {
// //       case "booking":
// //         return Yup.object({
// //           customer: Yup.string().required("مطلوب"),
// //           hotel: Yup.string().required("مطلوب"),
// //           package: Yup.string().required("مطلوب"),
// //           status: Yup.string().required("مطلوب"),
// //           amount: Yup.number().required("مطلوب"),
// //         });
// //       case "user":
// //         return Yup.object({
// //           name: Yup.string().required("مطلوب"),
// //           email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
// //           role: Yup.string().required("مطلوب"),
// //         });
// //       case "hotel":
// //         return Yup.object({
// //           name: Yup.string().required("مطلوب"),
// //           location: Yup.string().required("مطلوب"),
// //           rooms: Yup.number().required("مطلوب"),
// //           rating: Yup.number().required("مطلوب"),
// //         });
// //       case "package":
// //         return Yup.object({
// //           name: Yup.string().required("مطلوب"),
// //           duration: Yup.string().required("مطلوب"),
// //           price: Yup.number().required("مطلوب"),
// //           hotels: Yup.number().required("مطلوب"),
// //         });
// //       default:
// //         return Yup.object();
// //     }
// //   };

// //   const getDialogInitialValues = () => {
// //     if (editingItem) return editingItem;
// //     switch (dialogType) {
// //       case "booking":
// //         return { customer: "", hotel: "", package: "", status: "pending", amount: 0 };
// //       case "user":
// //         return { name: "", email: "", role: "customer" };
// //       case "hotel":
// //         return { name: "", location: "", rooms: 0, rating: 0 };
// //       case "package":
// //         return { name: "", duration: "", price: 0, hotels: 0 };
// //       default:
// //         return {};
// //     }
// //   };

// //   const getStatusChip = (status) => {
// //     const config = {
// //       confirmed: { color: "#a7f3d0", text: "#0a6b62", label: "مؤكد" },
// //       canceled: { color: "#fed7e2", text: "#c4183c", label: "ملغى" },
// //       completed: { color: "#bee3f8", text: "#0088cc", label: "مكتمل" },
// //       pending: { color: "#fff3cd", text: "#856404", label: "قيد الانتظار" },
// //     };
// //     const c = config[status] || config.pending;
// //     const chipClass = `status-chip status-chip-${status}`;
// //     return <Chip label={c.label} size="small" className={chipClass} />;
// //   };

// //   return (
// //     <Box className="dashboard-container">
// //       {/* Page Header */}
// //       <Box className="page-header">
// //         <Typography variant="h4" className="page-title" gutterBottom>
// //           نظرة عامة على لوحة التحكم
// //         </Typography>
// //         <Typography variant="body2" className="page-subtitle">
// //           تابع حجوزاتك وإيراداتك ومواردك لمحة سريعة
// //         </Typography>
// //       </Box>

// //       {/* Statistics Cards */}
// //       <Grid container spacing={3} className="stats-grid">
// //         {/* Total Bookings */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-total">
// //                   <BookingIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">إجمالي الحجوزات</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.totalBookings}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Confirmed Bookings */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-confirmed">
// //                   <ConfirmIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">المؤكدة</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.confirmedBookings}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Canceled Bookings */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-canceled">
// //                   <CancelIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">الملغاة</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.canceledBookings}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Completed Bookings */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-completed">
// //                   <CompleteIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">المكتملة</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.completedBookings}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Total Revenue */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-revenue">
// //                   <MoneyIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">إجمالي الإيرادات</Typography>
// //                   <Typography variant="h5" className="stat-value">${stats.totalRevenue.toLocaleString()}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Total Users */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-users">
// //                   <UsersIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">إجمالي المستخدمين</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.totalUsers}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Total Hotels */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-hotels">
// //                   <HotelIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">إجمالي الفنادق</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.totalHotels}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>

// //         {/* Total Packages */}
// //         <Grid item xs={12} sm={6} md={3}>
// //           <Card className="stat-card">
// //             <CardContent>
// //               <Box className="stat-content">
// //                 <Avatar className="stat-avatar stat-avatar-packages">
// //                   <PackageIcon />
// //                 </Avatar>
// //                 <Box className="stat-info-box">
// //                   <Typography variant="body2" className="stat-label">إجمالي الباقات</Typography>
// //                   <Typography variant="h5" className="stat-value">{stats.totalPackages}</Typography>
// //                 </Box>
// //               </Box>
// //             </CardContent>
// //           </Card>
// //         </Grid>
// //       </Grid>

// //       {/* Recent Bookings Table */}
// //       <Card className="table-card">
// //         <CardContent>
// //           <Box className="table-header">
// //             <Typography variant="h6" className="table-title">الحجوزات الأخيرة</Typography>
// //             <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog("booking")}>
// //               إضافة حجز
// //             </Button>
// //           </Box>
// //           <TableContainer className="table-container">
// //             <Table className="table">
// //               <TableHead>
// //                 <TableRow>
// //                   <TableCell className="table-cell-header">العميل</TableCell>
// //                   <TableCell className="table-cell-header">الفندق</TableCell>
// //                   <TableCell className="table-cell-header">الباقة</TableCell>
// //                   <TableCell className="table-cell-header">المبلغ</TableCell>
// //                   <TableCell className="table-cell-header">الحالة</TableCell>
// //                   <TableCell className="table-cell-header">الإجراءات</TableCell>
// //                 </TableRow>
// //               </TableHead>
// //               <TableBody>
// //                 {bookings.map((booking) => (
// //                   <TableRow key={booking.id} hover>
// //                     <TableCell className="table-cell-body">{booking.customer}</TableCell>
// //                     <TableCell className="table-cell-body">{booking.hotel}</TableCell>
// //                     <TableCell className="table-cell-body">{booking.package}</TableCell>
// //                     <TableCell className="table-cell-amount">${booking.amount}</TableCell>
// //                     <TableCell className="table-cell-body">{getStatusChip(booking.status)}</TableCell>
// //                     <TableCell className="table-cell-body">
// //                       <IconButton size="small" onClick={() => handleOpenDialog("booking", booking)}>
// //                         <EditIcon fontSize="small" />
// //                       </IconButton>
// //                       <IconButton size="small" color="error">
// //                         <DeleteIcon fontSize="small" />
// //                       </IconButton>
// //                     </TableCell>
// //                   </TableRow>
// //                 ))}
// //               </TableBody>
// //             </Table>
// //           </TableContainer>
// //         </CardContent>
// //       </Card>

// //       {/* Add/Edit Dialog */}
// //       <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ className: "dialog-paper" }}>
// //         <DialogTitle className="dialog-title">
// //           {editingItem ? "تعديل" : "إضافة"} {dialogType === "booking" ? "حجز" : dialogType === "user" ? "مستخدم" : dialogType === "hotel" ? "فندق" : "باقة"}
// //         </DialogTitle>
// //         <Formik
// //           initialValues={getDialogInitialValues()}
// //           validationSchema={getDialogSchema()}
// //           onSubmit={handleSave}
// //         >
// //           {({ errors, touched, isSubmitting }) => (
// //             <Form>
// //               <DialogContent>
// //                 {dialogType === "booking" && (
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12}>
// //                       <Field name="customer">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="العميل" error={touched.customer && Boolean(errors.customer)} helperText={touched.customer && errors.customer} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="hotel">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="الفندق" error={touched.hotel && Boolean(errors.hotel)} helperText={touched.hotel && errors.hotel} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="package">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="الباقة" error={touched.package && Boolean(errors.package)} helperText={touched.package && errors.package} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="status">
// //                         {({ field }) => (
// //                           <TextField {...field} select fullWidth label="الحالة" SelectProps={{ native: true }} error={touched.status && Boolean(errors.status)} helperText={touched.status && errors.status}>
// //                             <option value="pending">قيد الانتظار</option>
// //                             <option value="confirmed">مؤكد</option>
// //                             <option value="canceled">ملغى</option>
// //                             <option value="completed">مكتمل</option>
// //                           </TextField>
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="amount">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="المبلغ" type="number" error={touched.amount && Boolean(errors.amount)} helperText={touched.amount && errors.amount} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                   </Grid>
// //                 )}

// //                 {dialogType === "user" && (
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12}>
// //                       <Field name="name">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="الاسم" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12}>
// //                       <Field name="email">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="البريد الإلكتروني" type="email" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12}>
// //                       <Field name="role">
// //                         {({ field }) => (
// //                           <TextField {...field} select fullWidth label="الدور" SelectProps={{ native: true }} error={touched.role && Boolean(errors.role)} helperText={touched.role && errors.role}>
// //                             <option value="customer">عميل</option>
// //                             <option value="vendor">مورد</option>
// //                             <option value="admin">مسؤول</option>
// //                           </TextField>
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                   </Grid>
// //                 )}

// //                 {dialogType === "hotel" && (
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12}>
// //                       <Field name="name">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="اسم الفندق" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12}>
// //                       <Field name="location">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="الموقع" error={touched.location && Boolean(errors.location)} helperText={touched.location && errors.location} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="rooms">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="الغرف" type="number" error={touched.rooms && Boolean(errors.rooms)} helperText={touched.rooms && errors.rooms} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="rating">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="التقييم" type="number" step="0.1" error={touched.rating && Boolean(errors.rating)} helperText={touched.rating && errors.rating} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                   </Grid>
// //                 )}

// //                 {dialogType === "package" && (
// //                   <Grid container spacing={2}>
// //                     <Grid item xs={12}>
// //                       <Field name="name">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="اسم الباقة" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12}>
// //                       <Field name="duration">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="المدة" error={touched.duration && Boolean(errors.duration)} helperText={touched.duration && errors.duration} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="price">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="السعر" type="number" error={touched.price && Boolean(errors.price)} helperText={touched.price && errors.price} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                     <Grid item xs={12} sm={6}>
// //                       <Field name="hotels">
// //                         {({ field }) => (
// //                           <TextField {...field} fullWidth label="الفنادق" type="number" error={touched.hotels && Boolean(errors.hotels)} helperText={touched.hotels && errors.hotels} />
// //                         )}
// //                       </Field>
// //                     </Grid>
// //                   </Grid>
// //                 )}
// //               </DialogContent>
// //               <DialogActions className="dialog-actions">
// //                 <Button onClick={handleCloseDialog}>إلغاء</Button>
// //                 <Button type="submit" variant="contained" disabled={isSubmitting}>
// //                   {isSubmitting ? "جاري الحفظ..." : "حفظ"}
// //                 </Button>
// //               </DialogActions>
// //             </Form>
// //           )}
// //         </Formik>
// //       </Dialog>
// //     </Box>
// //   );
// // };

// // export default DashboardHome;
// /** @format */

// import { useState } from "react";
// import "./DashboardHome.css";
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from "recharts";
// import {
//   Box,
//   Grid,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Chip,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
// } from "@mui/material";
// import {
//   Event as BookingIcon,
//   CheckCircle as ConfirmIcon,
//   Cancel as CancelIcon,
//   DoneAll as CompleteIcon,
//   AttachMoney as MoneyIcon,
//   People as UsersIcon,
//   Hotel as HotelIcon,
//   Inventory as PackageIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Add as AddIcon,
// } from "@mui/icons-material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

// const chartData = [
//   { name: "رجب", bookings: 120 },
//   { name: "شعبان", bookings: 200 },
//   { name: "رمضان", bookings: 850 },
//   { name: "شوال", bookings: 150 },
//   { name: "ذو القعدة", bookings: 300 },
//   { name: "ذو الحجة", bookings: 980 },
//   { name: "محرم", bookings: 220 },
// ];

// const AnalyticsChart = () => {
//   return (
//     <Card
//       className='table-card'
//       style={{
//         marginBottom: "24px",
//         padding: "20px",
//         backgroundColor: "#f8f9f8",
//       }}>
//       <Typography
//         variant='h6'
//         className='table-title'
//         style={{ marginBottom: "20px" }}>
//         الإحصائيات الشهرية للحجوزات
//       </Typography>
//       <div style={{ width: "100%", height: 300 }}>
//         <ResponsiveContainer>
//           <AreaChart
//             data={chartData}
//             margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
//             <defs>
//               <linearGradient id='colorBookings' x1='0' y1='0' x2='0' y2='1'>
//                 <stop offset='5%' stopColor='#2ab979' stopOpacity={0.4} />
//                 <stop offset='95%' stopColor='#84f3ab' stopOpacity={0} />
//               </linearGradient>
//             </defs>
//             <CartesianGrid
//               strokeDasharray='3 3'
//               vertical={false}
//               stroke='#ddd'
//             />
//             <XAxis
//               dataKey='name'
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
//             />
//             <YAxis
//               axisLine={false}
//               tickLine={false}
//               tick={{ fill: "#4b5563", fontSize: 12 }}
//             />
//             <Tooltip
//               contentStyle={{
//                 borderRadius: "8px",
//                 borderColor: "#e5e7eb",
//                 direction: "rtl",
//                 textAlign: "right",
//               }}
//             />
//             <Area
//               type='monotone'
//               dataKey='bookings'
//               stroke='#406647'
//               strokeWidth={3}
//               fillOpacity={1}
//               fill='url(#colorBookings)'
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>
//     </Card>
//   );
// };

// const DashboardHome = () => {
//   // Sample data - replace with API calls
//   const [bookings] = useState([
//     {
//       id: 1,
//       customer: "أحمد حسن",
//       hotel: "فندق جراند",
//       package: "فاخرة",
//       status: "confirmed",
//       amount: 1500,
//     },
//     {
//       id: 2,
//       customer: "فاطمة علي",
//       hotel: "منتجع البحر",
//       package: "قياسية",
//       status: "pending",
//       amount: 800,
//     },
//     {
//       id: 3,
//       customer: "محمد عمر",
//       hotel: "نزل الجبل",
//       package: "ممتازة",
//       status: "completed",
//       amount: 2200,
//     },
//     {
//       id: 4,
//       customer: "سارة إبراهيم",
//       hotel: "فندق جراند",
//       package: "اقتصادية",
//       status: "canceled",
//       amount: 400,
//     },
//     {
//       id: 5,
//       customer: "خالد يوسف",
//       hotel: "نزل المدينة",
//       package: "قياسية",
//       status: "confirmed",
//       amount: 950,
//     },
//   ]);

//   const [users] = useState([
//     {
//       id: 1,
//       name: "أحمد حسن",
//       email: "ahmed@email.com",
//       role: "customer",
//       joined: "2024-01-15",
//     },
//     {
//       id: 2,
//       name: "فاطمة علي",
//       email: "fatima@email.com",
//       role: "customer",
//       joined: "2024-02-20",
//     },
//     {
//       id: 3,
//       name: "محمد عمر",
//       email: "mohammed@email.com",
//       role: "vendor",
//       joined: "2024-01-10",
//     },
//     {
//       id: 4,
//       name: "سارة إبراهيم",
//       email: "sarah@email.com",
//       role: "customer",
//       joined: "2024-03-05",
//     },
//     {
//       id: 5,
//       name: "خالد يوسف",
//       email: "khaled@email.com",
//       role: "customer",
//       joined: "2024-02-28",
//     },
//   ]);

//   const [hotels] = useState([
//     { id: 1, name: "فندق جراند", location: "القاهرة", rooms: 150, rating: 4.5 },
//     {
//       id: 2,
//       name: "منتجع البحر",
//       location: "الإسكندرية",
//       rooms: 200,
//       rating: 4.8,
//     },
//     {
//       id: 3,
//       name: "نزل الجبل",
//       location: "سانت كاترين",
//       rooms: 80,
//       rating: 4.3,
//     },
//     { id: 4, name: "نزل المدينة", location: "الجيزة", rooms: 120, rating: 4.0 },
//   ]);

//   const [packages] = useState([
//     { id: 1, name: "اقتصادية", duration: "3 أيام", price: 400, hotels: 5 },
//     { id: 2, name: "قياسية", duration: "5 أيام", price: 800, hotels: 10 },
//     { id: 3, name: "ممتازة", duration: "7 أيام", price: 1500, hotels: 15 },
//     { id: 4, name: "فاخرة", duration: "10 أيام", price: 2500, hotels: 20 },
//   ]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [dialogType, setDialogType] = useState("");

//   // Calculate statistics
//   const stats = {
//     totalBookings: bookings.length,
//     confirmedBookings: bookings.filter((b) => b.status === "confirmed").length,
//     canceledBookings: bookings.filter((b) => b.status === "canceled").length,
//     completedBookings: bookings.filter((b) => b.status === "completed").length,
//     totalRevenue: bookings
//       .filter((b) => b.status !== "canceled")
//       .reduce((sum, b) => sum + b.amount, 0),
//     totalUsers: users.length,
//     totalHotels: hotels.length,
//     totalPackages: packages.length,
//   };

//   const handleOpenDialog = (type, item = null) => {
//     setDialogType(type);
//     setEditingItem(item);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingItem(null);
//     setDialogType("");
//   };

//   const handleSave = (values, actions) => {
//     // Simulate save - replace with API calls
//     setTimeout(() => {
//       actions.setSubmitting(false);
//       handleCloseDialog();
//     }, 500);
//   };

//   const getDialogSchema = () => {
//     switch (dialogType) {
//       case "booking":
//         return Yup.object({
//           customer: Yup.string().required("مطلوب"),
//           hotel: Yup.string().required("مطلوب"),
//           package: Yup.string().required("مطلوب"),
//           status: Yup.string().required("مطلوب"),
//           amount: Yup.number().required("مطلوب"),
//         });
//       case "user":
//         return Yup.object({
//           name: Yup.string().required("مطلوب"),
//           email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
//           role: Yup.string().required("مطلوب"),
//         });
//       case "hotel":
//         return Yup.object({
//           name: Yup.string().required("مطلوب"),
//           location: Yup.string().required("مطلوب"),
//           rooms: Yup.number().required("مطلوب"),
//           rating: Yup.number().required("مطلوب"),
//         });
//       case "package":
//         return Yup.object({
//           name: Yup.string().required("مطلوب"),
//           duration: Yup.string().required("مطلوب"),
//           price: Yup.number().required("مطلوب"),
//           hotels: Yup.number().required("مطلوب"),
//         });
//       default:
//         return Yup.object();
//     }
//   };

//   const getDialogInitialValues = () => {
//     if (editingItem) return editingItem;
//     switch (dialogType) {
//       case "booking":
//         return {
//           customer: "",
//           hotel: "",
//           package: "",
//           status: "pending",
//           amount: 0,
//         };
//       case "user":
//         return { name: "", email: "", role: "customer" };
//       case "hotel":
//         return { name: "", location: "", rooms: 0, rating: 0 };
//       case "package":
//         return { name: "", duration: "", price: 0, hotels: 0 };
//       default:
//         return {};
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
//     const chipClass = `status-chip status-chip-${status}`;
//     return <Chip label={c.label} size='small' className={chipClass} />;
//   };

//   return (
//     <Box className='dashboard-container'>
//       {/* Page Header */}
//       <Box className='page-header'>
//         <Typography variant='h4' className='page-title' gutterBottom>
//           نظرة عامة على لوحة التحكم
//         </Typography>
//         <Typography variant='body2' className='page-subtitle'>
//           تابع حجوزاتك وإيراداتك ومواردك لمحة سريعة
//         </Typography>
//       </Box>

//       {/* Statistics Cards */}
//       <Grid container spacing={3} className='stats-grid'>
//         {/* Total Bookings */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-total'>
//                   <BookingIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     إجمالي الحجوزات
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.totalBookings}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Confirmed Bookings */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-confirmed'>
//                   <ConfirmIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     المؤكدة
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.confirmedBookings}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Canceled Bookings */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-canceled'>
//                   <CancelIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     الملغاة
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.canceledBookings}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Completed Bookings */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-completed'>
//                   <CompleteIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     المكتملة
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.completedBookings}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Revenue */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-revenue'>
//                   <MoneyIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     إجمالي الإيرادات
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     ${stats.totalRevenue.toLocaleString()}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Users */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-users'>
//                   <UsersIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     إجمالي المستخدمين
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.totalUsers}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Hotels */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-hotels'>
//                   <HotelIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     إجمالي الفنادق
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.totalHotels}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>

//         {/* Total Packages */}
//         <Grid item xs={12} sm={6} md={3}>
//           <Card className='stat-card'>
//             <CardContent>
//               <Box className='stat-content'>
//                 <Avatar className='stat-avatar stat-avatar-packages'>
//                   <PackageIcon />
//                 </Avatar>
//                 <Box className='stat-info-box'>
//                   <Typography variant='body2' className='stat-label'>
//                     إجمالي الباقات
//                   </Typography>
//                   <Typography variant='h5' className='stat-value'>
//                     {stats.totalPackages}
//                   </Typography>
//                 </Box>
//               </Box>
//             </CardContent>
//           </Card>
//         </Grid>
//       </Grid>

//       <AnalyticsChart />

//       {/* Recent Bookings Table */}
//       <Card className='table-card'>
//         <CardContent>
//           <Box className='table-header'>
//             <Typography variant='h6' className='table-title'>
//               الحجوزات الأخيرة
//             </Typography>
//             <Button
//               variant='contained'
//               startIcon={<AddIcon />}
//               onClick={() => handleOpenDialog("booking")}>
//               إضافة حجز
//             </Button>
//           </Box>
//           <TableContainer className='table-container'>
//             <Table className='table'>
//               <TableHead>
//                 <TableRow>
//                   <TableCell className='table-cell-header'>العميل</TableCell>
//                   <TableCell className='table-cell-header'>الفندق</TableCell>
//                   <TableCell className='table-cell-header'>الباقة</TableCell>
//                   <TableCell className='table-cell-header'>المبلغ</TableCell>
//                   <TableCell className='table-cell-header'>الحالة</TableCell>
//                   <TableCell className='table-cell-header'>الإجراءات</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {bookings.map((booking) => (
//                   <TableRow key={booking.id} hover>
//                     <TableCell className='table-cell-body'>
//                       {booking.customer}
//                     </TableCell>
//                     <TableCell className='table-cell-body'>
//                       {booking.hotel}
//                     </TableCell>
//                     <TableCell className='table-cell-body'>
//                       {booking.package}
//                     </TableCell>
//                     <TableCell className='table-cell-amount'>
//                       ${booking.amount}
//                     </TableCell>
//                     <TableCell className='table-cell-body'>
//                       {getStatusChip(booking.status)}
//                     </TableCell>
//                     <TableCell className='table-cell-body'>
//                       <IconButton
//                         size='small'
//                         onClick={() => handleOpenDialog("booking", booking)}>
//                         <EditIcon fontSize='small' />
//                       </IconButton>
//                       <IconButton size='small' color='error'>
//                         <DeleteIcon fontSize='small' />
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
//       <Dialog
//         open={openDialog}
//         onClose={handleCloseDialog}
//         maxWidth='sm'
//         fullWidth
//         PaperProps={{ className: "dialog-paper" }}>
//         <DialogTitle className='dialog-title'>
//           {editingItem ? "تعديل" : "إضافة"}{" "}
//           {dialogType === "booking"
//             ? "حجز"
//             : dialogType === "user"
//             ? "مستخدم"
//             : dialogType === "hotel"
//             ? "فندق"
//             : "باقة"}
//         </DialogTitle>
//         <Formik
//           initialValues={getDialogInitialValues()}
//           validationSchema={getDialogSchema()}
//           onSubmit={handleSave}>
//           {({ errors, touched, isSubmitting }) => (
//             <Form>
//               <DialogContent>
//                 {dialogType === "booking" && (
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <Field name='customer'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='العميل'
//                             error={touched.customer && Boolean(errors.customer)}
//                             helperText={touched.customer && errors.customer}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='hotel'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='الفندق'
//                             error={touched.hotel && Boolean(errors.hotel)}
//                             helperText={touched.hotel && errors.hotel}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='package'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='الباقة'
//                             error={touched.package && Boolean(errors.package)}
//                             helperText={touched.package && errors.package}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='status'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             select
//                             fullWidth
//                             label='الحالة'
//                             SelectProps={{ native: true }}
//                             error={touched.status && Boolean(errors.status)}
//                             helperText={touched.status && errors.status}>
//                             <option value='pending'>قيد الانتظار</option>
//                             <option value='confirmed'>مؤكد</option>
//                             <option value='canceled'>ملغى</option>
//                             <option value='completed'>مكتمل</option>
//                           </TextField>
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='amount'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='المبلغ'
//                             type='number'
//                             error={touched.amount && Boolean(errors.amount)}
//                             helperText={touched.amount && errors.amount}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                   </Grid>
//                 )}

//                 {dialogType === "user" && (
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <Field name='name'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='الاسم'
//                             error={touched.name && Boolean(errors.name)}
//                             helperText={touched.name && errors.name}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Field name='email'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='البريد الإلكتروني'
//                             type='email'
//                             error={touched.email && Boolean(errors.email)}
//                             helperText={touched.email && errors.email}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Field name='role'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             select
//                             fullWidth
//                             label='الدور'
//                             SelectProps={{ native: true }}
//                             error={touched.role && Boolean(errors.role)}
//                             helperText={touched.role && errors.role}>
//                             <option value='customer'>عميل</option>
//                             <option value='vendor'>مورد</option>
//                             <option value='admin'>مسؤول</option>
//                           </TextField>
//                         )}
//                       </Field>
//                     </Grid>
//                   </Grid>
//                 )}

//                 {dialogType === "hotel" && (
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <Field name='name'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='اسم الفندق'
//                             error={touched.name && Boolean(errors.name)}
//                             helperText={touched.name && errors.name}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Field name='location'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='الموقع'
//                             error={touched.location && Boolean(errors.location)}
//                             helperText={touched.location && errors.location}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='rooms'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='الغرف'
//                             type='number'
//                             error={touched.rooms && Boolean(errors.rooms)}
//                             helperText={touched.rooms && errors.rooms}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='rating'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='التقييم'
//                             type='number'
//                             step='0.1'
//                             error={touched.rating && Boolean(errors.rating)}
//                             helperText={touched.rating && errors.rating}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                   </Grid>
//                 )}

//                 {dialogType === "package" && (
//                   <Grid container spacing={2}>
//                     <Grid item xs={12}>
//                       <Field name='name'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='اسم الباقة'
//                             error={touched.name && Boolean(errors.name)}
//                             helperText={touched.name && errors.name}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12}>
//                       <Field name='duration'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='المدة'
//                             error={touched.duration && Boolean(errors.duration)}
//                             helperText={touched.duration && errors.duration}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='price'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='السعر'
//                             type='number'
//                             error={touched.price && Boolean(errors.price)}
//                             helperText={touched.price && errors.price}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                     <Grid item xs={12} sm={6}>
//                       <Field name='hotels'>
//                         {({ field }) => (
//                           <TextField
//                             {...field}
//                             fullWidth
//                             label='الفنادق'
//                             type='number'
//                             error={touched.hotels && Boolean(errors.hotels)}
//                             helperText={touched.hotels && errors.hotels}
//                           />
//                         )}
//                       </Field>
//                     </Grid>
//                   </Grid>
//                 )}
//               </DialogContent>
//               <DialogActions className='dialog-actions'>
//                 <Button onClick={handleCloseDialog}>إلغاء</Button>
//                 <Button
//                   type='submit'
//                   variant='contained'
//                   disabled={isSubmitting}>
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

// export default DashboardHome;

/** @format */

import { useState, useEffect } from "react";
import "./DashboardHome.css";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
} from "@mui/material";
import {
  Event as BookingIcon,
  CheckCircle as ConfirmIcon,
  Cancel as CancelIcon,
  DoneAll as CompleteIcon,
  AttachMoney as MoneyIcon,
  People as UsersIcon,
  Hotel as HotelIcon,
  Inventory as PackageIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// ✅ الصحيح هو وجود حرف s
import { FlightTakeoff as TripIcon } from "@mui/icons-material";

const chartData = [
  { name: "رجب", bookings: 120 },
  { name: "شعبان", bookings: 200 },
  { name: "رمضان", bookings: 850 },
  { name: "شوال", bookings: 150 },
  { name: "ذو القعدة", bookings: 300 },
  { name: "ذو الحجة", bookings: 980 },
  { name: "محرم", bookings: 220 },
];

const AnalyticsChart = () => {
  return (
    <Card
      className='table-card'
      style={{
        marginBottom: "24px",
        padding: "20px",
        backgroundColor: "#f8f9f8",
      }}>
      <Typography
        variant='h6'
        className='table-title'
        style={{ marginBottom: "20px" }}>
        الإحصائيات الشهرية للحجوزات
      </Typography>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <AreaChart
            data={chartData}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id='colorBookings' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor='#2ab979' stopOpacity={0.4} />
                <stop offset='95%' stopColor='#84f3ab' stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray='3 3'
              vertical={false}
              stroke='#ddd'
            />
            <XAxis
              dataKey='name'
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4b5563", fontSize: 12, fontWeight: 500 }}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#4b5563", fontSize: 12 }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                borderColor: "#e5e7eb",
                direction: "rtl",
                textAlign: "right",
              }}
            />
            <Area
              type='monotone'
              dataKey='bookings'
              stroke='#406647'
              strokeWidth={3}
              fillOpacity={1}
              fill='url(#colorBookings)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

const DashboardHome = () => {
  // Sample data - replace with API calls

  const [bookings] = useState([
    {
      id: 1,
      customer: "أحمد حسن",
      hotel: "فندق جراند",
      package: "فاخرة",
      status: "confirmed",
      amount: 1500,
    },
    {
      id: 2,
      customer: "فاطمة علي",
      hotel: "منتجع البحر",
      package: "قياسية",
      status: "pending",
      amount: 800,
    },
    {
      id: 3,
      customer: "محمد عمر",
      hotel: "نزل الجبل",
      package: "ممتازة",
      status: "completed",
      amount: 2200,
    },
    {
      id: 4,
      customer: "سارة إبراهيم",
      hotel: "فندق جراند",
      package: "اقتصادية",
      status: "canceled",
      amount: 400,
    },
    {
      id: 5,
      customer: "خالد يوسف",
      hotel: "نزل المدينة",
      package: "قياسية",
      status: "confirmed",
      amount: 950,
    },
  ]);

  // const [users] = useState([
  //   { id: 1, name: "أحمد حسن", email: "ahmed@email.com", role: "customer", joined: "2024-01-15" },
  //   { id: 2, name: "فاطمة علي", email: "fatima@email.com", role: "customer", joined: "2024-02-20" },
  //   { id: 3, name: "محمد عمر", email: "mohammed@email.com", role: "vendor", joined: "2024-01-10" },
  //   { id: 4, name: "سارة إبراهيم", email: "sarah@email.com", role: "customer", joined: "2024-03-05" },
  //   { id: 5, name: "خالد يوسف", email: "khaled@email.com"
  //     , role: "customer", joined: "2024-02-28" },
  // ]);

  // const [hotels] = useState([
  //   { id: 1, name: "فندق جراند", location: "القاهرة", rooms: 150, rating: 4.5 },
  //   { id: 2, name: "منتجع البحر", location: "الإسكندرية", rooms: 200, rating: 4.8 },
  //   { id: 3, name: "نزل الجبل", location: "سانت كاترين", rooms: 80, rating: 4.3 },
  //   { id: 4, name: "نزل المدينة", location: "الجيزة", rooms: 120, rating: 4.0 },
  // ]);

  // const [packages] = useState([
  //   { id: 1, name: "اقتصادية", duration: "3 أيام", price: 400, hotels: 5 },
  //   { id: 2, name: "قياسية", duration: "5 أيام", price: 800, hotels: 10 },
  //   { id: 3, name: "ممتازة", duration: "7 أيام", price: 1500, hotels: 15 },
  //   { id: 4, name: "فاخرة", duration: "10 أيام", price: 2500, hotels: 20 },
  // ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [dialogType, setDialogType] = useState("");

  // Calculate statistics
  const [apiStats, setApiStats] = useState({
    confirmBooking: 0,
    canclledBooking: 0,
    completedBooking: 0,
    pendingdBooking: 0,
    totalBooking: 0,
    totalAmounts: 0,
    totalUser: 0,
    totalHotel: 0,
    totalPackage: 0,
    totalTrip: 0,
  });

  // دالة جلب البيانات
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://umrahbooking.runasp.net/api/Dashboard/DashboardStatistics/GetStatistics",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApiStats(response.data);
      } catch (error) {
        console.error("خطأ في جلب الإحصائيات:", error);
      }
    };

    fetchStats();
  }, []);

  const handleOpenDialog = (type, item = null) => {
    setDialogType(type);
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setDialogType("");
  };

  const handleSave = (values, actions) => {
    // Simulate save - replace with API calls
    setTimeout(() => {
      actions.setSubmitting(false);
      handleCloseDialog();
    }, 500);
  };

  const getDialogSchema = () => {
    switch (dialogType) {
      case "booking":
        return Yup.object({
          customer: Yup.string().required("مطلوب"),
          hotel: Yup.string().required("مطلوب"),
          package: Yup.string().required("مطلوب"),
          status: Yup.string().required("مطلوب"),
          amount: Yup.number().required("مطلوب"),
        });
      case "user":
        return Yup.object({
          name: Yup.string().required("مطلوب"),
          email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
          role: Yup.string().required("مطلوب"),
        });
      case "hotel":
        return Yup.object({
          name: Yup.string().required("مطلوب"),
          location: Yup.string().required("مطلوب"),
          rooms: Yup.number().required("مطلوب"),
          rating: Yup.number().required("مطلوب"),
        });
      case "package":
        return Yup.object({
          name: Yup.string().required("مطلوب"),
          duration: Yup.string().required("مطلوب"),
          price: Yup.number().required("مطلوب"),
          hotels: Yup.number().required("مطلوب"),
        });
      default:
        return Yup.object();
    }
  };

  const getDialogInitialValues = () => {
    if (editingItem) return editingItem;
    switch (dialogType) {
      case "booking":
        return {
          customer: "",
          hotel: "",
          package: "",
          status: "pending",
          amount: 0,
        };
      case "user":
        return { name: "", email: "", role: "customer" };
      case "hotel":
        return { name: "", location: "", rooms: 0, rating: 0 };
      case "package":
        return { name: "", duration: "", price: 0, hotels: 0 };
      default:
        return {};
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
    const chipClass = `status-chip status-chip-${status}`;
    return <Chip label={c.label} size='small' className={chipClass} />;
  };

  return (
    <Box className='dashboard-container'>
      {/* Page Header */}
      <Box className='page-header'>
        <Typography variant='h4' className='page-title' gutterBottom>
          نظرة عامة على لوحة التحكم
        </Typography>
        <Typography variant='body2' className='page-subtitle'>
          تابع حجوزاتك وإيراداتك ومواردك لمحة سريعة
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} className='stats-grid'>
        {/* إجمالي الحجوزات */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-total'>
                  <BookingIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    إجمالي الحجوزات
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.totalBooking}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* قيد الانتظار - الجديد */}
        <Grid item xs={12} sm={6} md={2.4}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar
                  className='stat-avatar'
                  style={{ backgroundColor: "#fff3cd", color: "#856404" }}>
                  <BookingIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    حجوزات معلقة
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.pendingdBooking}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* المؤكدة */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-confirmed'>
                  <ConfirmIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    المؤكدة
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.confirmBooking}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* الملغاة */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-canceled'>
                  <CancelIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    الملغاة
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.canclledBooking}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar
                  className='stat-avatar'
                  style={{ backgroundColor: "#e0e7ff", color: "#4338ca" }}>
                  <TripIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    إجمالي الرحلات
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.totalTrip}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* المكتملة */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-completed'>
                  <CompleteIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    المكتملة
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.completedBooking}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* الإيرادات */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-revenue'>
                  <MoneyIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    إجمالي الإيرادات
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    ${apiStats.totalAmounts.toLocaleString()}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* المستخدمين */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-users'>
                  <UsersIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    إجمالي المستخدمين
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.totalUser}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* الفنادق */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-hotels'>
                  <HotelIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    إجمالي الفنادق
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.totalHotel}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* الباقات */}
        <Grid item xs={12} sm={6} md={3}>
          <Card className='stat-card'>
            <CardContent>
              <Box className='stat-content'>
                <Avatar className='stat-avatar stat-avatar-packages'>
                  <PackageIcon />
                </Avatar>
                <Box className='stat-info-box'>
                  <Typography variant='body2' className='stat-label'>
                    إجمالي الباقات
                  </Typography>
                  <Typography variant='h5' className='stat-value'>
                    {apiStats.totalPackage}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <AnalyticsChart />

      {/* Recent Bookings Table */}
      <Card className='table-card'>
        <CardContent>
          <Box className='table-header'>
            <Typography variant='h6' className='table-title'>
              الحجوزات الأخيرة
            </Typography>
          </Box>
          <TableContainer className='table-container'>
            <Table className='table'>
              <TableHead>
                <TableRow>
                  <TableCell className='table-cell-header'>العميل</TableCell>
                  <TableCell className='table-cell-header'>الفندق</TableCell>
                  <TableCell className='table-cell-header'>الباقة</TableCell>
                  <TableCell className='table-cell-header'>المبلغ</TableCell>
                  <TableCell className='table-cell-header'>الحالة</TableCell>
                  <TableCell className='table-cell-header'>الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} hover>
                    <TableCell className='table-cell-body'>
                      {booking.customer}
                    </TableCell>
                    <TableCell className='table-cell-body'>
                      {booking.hotel}
                    </TableCell>
                    <TableCell className='table-cell-body'>
                      {booking.package}
                    </TableCell>
                    <TableCell className='table-cell-amount'>
                      ${booking.amount}
                    </TableCell>
                    <TableCell className='table-cell-body'>
                      {getStatusChip(booking.status)}
                    </TableCell>
                    <TableCell className='table-cell-body'>
                      <IconButton
                        size='small'
                        onClick={() => handleOpenDialog("booking", booking)}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                      <IconButton size='small' color='error'>
                        <DeleteIcon fontSize='small' />
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
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='sm'
        fullWidth
        PaperProps={{ className: "dialog-paper" }}>
        <DialogTitle className='dialog-title'>
          {editingItem ? "تعديل" : "إضافة"}{" "}
          {dialogType === "booking"
            ? "حجز"
            : dialogType === "user"
            ? "مستخدم"
            : dialogType === "hotel"
            ? "فندق"
            : "باقة"}
        </DialogTitle>
        <Formik
          initialValues={getDialogInitialValues()}
          validationSchema={getDialogSchema()}
          onSubmit={handleSave}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                {dialogType === "booking" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name='customer'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='العميل'
                            error={touched.customer && Boolean(errors.customer)}
                            helperText={touched.customer && errors.customer}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='hotel'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='الفندق'
                            error={touched.hotel && Boolean(errors.hotel)}
                            helperText={touched.hotel && errors.hotel}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='package'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='الباقة'
                            error={touched.package && Boolean(errors.package)}
                            helperText={touched.package && errors.package}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='status'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label='الحالة'
                            SelectProps={{ native: true }}
                            error={touched.status && Boolean(errors.status)}
                            helperText={touched.status && errors.status}>
                            <option value='pending'>قيد الانتظار</option>
                            <option value='confirmed'>مؤكد</option>
                            <option value='canceled'>ملغى</option>
                            <option value='completed'>مكتمل</option>
                          </TextField>
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='amount'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='المبلغ'
                            type='number'
                            error={touched.amount && Boolean(errors.amount)}
                            helperText={touched.amount && errors.amount}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                )}

                {dialogType === "user" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name='name'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='الاسم'
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name='email'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='البريد الإلكتروني'
                            type='email'
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name='role'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            select
                            fullWidth
                            label='الدور'
                            SelectProps={{ native: true }}
                            error={touched.role && Boolean(errors.role)}
                            helperText={touched.role && errors.role}>
                            <option value='customer'>عميل</option>
                            <option value='vendor'>مورد</option>
                            <option value='admin'>مسؤول</option>
                          </TextField>
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                )}

                {dialogType === "hotel" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name='name'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='اسم الفندق'
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name='location'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='الموقع'
                            error={touched.location && Boolean(errors.location)}
                            helperText={touched.location && errors.location}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='rooms'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='الغرف'
                            type='number'
                            error={touched.rooms && Boolean(errors.rooms)}
                            helperText={touched.rooms && errors.rooms}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='rating'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='التقييم'
                            type='number'
                            step='0.1'
                            error={touched.rating && Boolean(errors.rating)}
                            helperText={touched.rating && errors.rating}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                )}

                {dialogType === "package" && (
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Field name='name'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='اسم الباقة'
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12}>
                      <Field name='duration'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='المدة'
                            error={touched.duration && Boolean(errors.duration)}
                            helperText={touched.duration && errors.duration}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='price'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='السعر'
                            type='number'
                            error={touched.price && Boolean(errors.price)}
                            helperText={touched.price && errors.price}
                          />
                        )}
                      </Field>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Field name='hotels'>
                        {({ field }) => (
                          <TextField
                            {...field}
                            fullWidth
                            label='الفنادق'
                            type='number'
                            error={touched.hotels && Boolean(errors.hotels)}
                            helperText={touched.hotels && errors.hotels}
                          />
                        )}
                      </Field>
                    </Grid>
                  </Grid>
                )}
              </DialogContent>
              <DialogActions className='dialog-actions'>
                <Button onClick={handleCloseDialog}>إلغاء</Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isSubmitting}>
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

export default DashboardHome;
