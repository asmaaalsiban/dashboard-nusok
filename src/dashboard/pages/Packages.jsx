/** @format */

// /** @format */

// import { useState } from "react";
// import "./Packages.css";
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
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   Today as DurationIcon,
//   Image as ImageIcon,
// } from "@mui/icons-material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import HotelsSelect from "../components/HotelsSelect";

// const Packages = () => {
//   const [packages, setPackages] = useState([
//     {
//       id: 1,
//       name: "اقتصادية",
//       duration: "3 أيام / 2 ليلة",
//       price: 400,
//       hotelId: 1,
//       description: "باقة أساسية للمسافرين بميزانية محدودة",
//       features: "فندق، إفطار، نقل المطار",
//       status: "active",
//       transportation: "حافلة مكيفة",
//       services: "إفطار يومي، نقل المطار",
//       image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
//     },
//     {
//       id: 2,
//       name: "قياسية",
//       duration: "5 أيام / 4 ليالي",
//       price: 800,
//       hotelId: 2,
//       description: "مثالية للعطلات القصيرة",
//       features: "فندق، إفطار، جولة بالمدينة، نقل المطار",
//       status: "active",
//       transportation: "حافلة فاخرة",
//       services: "إفطار، جولة بالمدينة، نقل المطار",
//       image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
//     },
//     {
//       id: 3,
//       name: "ممتازة",
//       duration: "7 أيام / 6 ليالي",
//       price: 1500,
//       hotelId: 3,
//       description: "اختبر الفخامة والراحة",
//       features: "فندق 5 نجوم، جميع الوجبات، جولات خاصة، سبا",
//       status: "active",
//       transportation: "سيارة خاصة",
//       services: "جميع الوجبات، جولات خاصة، سبا",
//       image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
//     },
//     {
//       id: 4,
//       name: "فاخرة",
//       duration: "10 أيام / 9 ليالي",
//       price: 2500,
//       hotelId: 4,
//       description: "تجربة فاخرة نهائية",
//       features: "فندق 5 نجوم+، جميع الوجبات، جولات VIP، سبا، هليكوبتر",
//       status: "active",
//       transportation: "هليكوبتر، سيارة فاخرة",
//       services: "جميع الوجبات، جولات VIP، سبا، هليكوبتر",
//       image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
//     },
//   ]);

//   const [hotels] = useState([
//     { id: 1, name: "فندق جراند", location: "القاهرة" },
//     { id: 2, name: "منتجع البحر", location: "الإسكندرية" },
//     { id: 3, name: "نزل الجبل", location: "سانت كاترين" },
//     { id: 4, name: "نزل المدينة", location: "الجيزة" },
//     { id: 5, name: "مخيم الصحراء", location: "سيوة" },
//   ]);

//   const [openDialog, setOpenDialog] = useState(false);
//   const [editingItem, setEditingItem] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [imagePreview, setImagePreview] = useState(null);

//   const handleOpenDialog = (item = null) => {
//     setEditingItem(item);
//     setImagePreview(item?.image || null);
//     setOpenDialog(true);
//   };

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//     setEditingItem(null);
//     setImagePreview(null);
//   };

//   const handleSave = (values, actions) => {
//     if (editingItem) {
//       setPackages(
//         packages.map((p) => (p.id === editingItem.id ? { ...p, ...values, image: imagePreview } : p))
//       );
//     } else {
//       setPackages([...packages, { ...values, id: Date.now(), image: imagePreview }]);
//     }
//     actions.setSubmitting(false);
//     handleCloseDialog();
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("هل أنت متأكد من حذف هذه الباقة؟")) {
//       setPackages(packages.filter((p) => p.id !== id));
//     }
//   };

//   const getStatusChip = (status) => {
//     const config = {
//       active: { color: "#a7f3d0", text: "#0a6b62", label: "نشط" },
//       inactive: { color: "#e8ebf5", text: "#718096", label: "غير نشط" },
//     };
//     const c = config[status] || config.active;
//     const chipClass = `packages-status-chip packages-status-${status}`;
//     return <Chip label={c.label} size='small' className={chipClass} />;
//   };

//   const filteredPackages = packages.filter(
//     (p) => p.name.includes(searchTerm) || p.description.includes(searchTerm)
//   );

//   const validationSchema = Yup.object({
//     name: Yup.string().required("مطلوب"),
//     duration: Yup.string().required("مطلوب"),
//     price: Yup.number().min(0).required("مطلوب"),
//     hotelId: Yup.number().required("مطلوب"),
//     description: Yup.string().required("مطلوب"),
//     features: Yup.string().required("مطلوب"),
//     status: Yup.string().required("مطلوب"),
//     transportation: Yup.string().required("مطلوب"),
//     services: Yup.string().required("مطلوب"),
//   });

//   const initialValues = editingItem || {
//     name: "",
//     duration: "",
//     price: 0,
//     hotelId: "",
//     description: "",
//     features: "",
//     status: "active",
//     transportation: "",
//     services: "",
//   };

//   return (
//     <Box className='packages-container'>
//       <Box className='packages-header'>
//         <Box className='packages-title-group'>
//           <Typography variant='h4' className='packages-title'>
//             إدارة الباقات
//           </Typography>
//           <Typography variant='body2' className='packages-subtitle'>
//             إدارة باقات وعروض السفر
//           </Typography>
//         </Box>
//         <Button
//           variant='contained'
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}>
//           إضافة باقة
//         </Button>
//       </Box>

//       <Card className='packages-card'>
//         <CardContent>
//           <TextField
//             fullWidth
//             placeholder='ابحث بالاسم أو الوصف...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: <SearchIcon className='packages-search-icon' />,
//             }}
//             className='packages-search'
//           />
//           <TableContainer className='packages-table-container'>
//             <Table className='packages-table'>
//               <TableHead>
//                 <TableRow>
//                   <TableCell className='packages-table-cell-header'>
//                     الصورة
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     اسم الباقة
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     المدة
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     السعر
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     الفنادق المختارة
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     الوصف
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     النقل
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     الخدمات
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     الحالة
//                   </TableCell>
//                   <TableCell className='packages-table-cell-header'>
//                     الإجراءات
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredPackages.map((pkg) => (
//                   <TableRow key={pkg.id} hover>
//                     <TableCell className='packages-table-cell-image'>
//                       {pkg.image ? (
//                         <Box
//                           className="packages-image-box"
//                           sx={{
//                             width: 80,
//                             height: 60,
//                             borderRadius: 1,
//                             overflow: 'hidden',
//                             boxShadow: 1
//                           }}
//                         >
//                           <img
//                             src={pkg.image}
//                             alt={pkg.name}
//                             className="packages-table-image"
//                             loading="lazy"
//                           />
//                         </Box>
//                       ) : (
//                         <Box
//                           className="packages-image-box-placeholder"
//                           sx={{
//                             width: 80,
//                             height: 60,
//                             borderRadius: 1,
//                             bgcolor: '#e0e0e0',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '24px'
//                           }}
//                         >
//                           📦
//                         </Box>
//                       )}
//                     </TableCell>
//                     <TableCell className='packages-table-cell-name'>
//                       <Typography fontWeight={700} color='primary.main'>
//                         {pkg.name}
//                       </Typography>
//                     </TableCell>
//                     <TableCell className='packages-table-cell-duration'>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <DurationIcon
//                           className='packages-duration-icon'
//                           fontSize='small'
//                         />
//                         {pkg.duration}
//                       </Box>
//                     </TableCell>
//                     <TableCell className='packages-table-cell-price'>
//                       ${pkg.price}
//                     </TableCell>
//                     <TableCell className='packages-table-cell-hotels'>
//                       {(() => {
//                         const hotel = hotels.find(h => h.id === pkg.hotelId);
//                         return hotel ? (
//                           <Chip label={hotel.name} size="small" variant="outlined" />
//                         ) : null;
//                       })()}
//                     </TableCell>
//                     <TableCell className='packages-table-cell-description'>
//                       <Typography variant='body2'>{pkg.description}</Typography>
//                       <Typography
//                         variant='caption'
//                         className='packages-features-text'>
//                         {pkg.features}
//                       </Typography>
//                     </TableCell>
//                     <TableCell className='packages-table-cell-transportation'>
//                       <Typography variant='body2'>
//                         {pkg.transportation}
//                       </Typography>
//                     </TableCell>
//                     <TableCell className='packages-table-cell-services'>
//                       <Typography variant='body2'>{pkg.services}</Typography>
//                     </TableCell>
//                     <TableCell className='packages-table-cell'>
//                       {getStatusChip(pkg.status)}
//                     </TableCell>
//                     <TableCell className='packages-table-cell-actions'>
//                       <IconButton
//                         size='small'
//                         color='primary'
//                         onClick={() => handleOpenDialog(pkg)}>
//                         <EditIcon fontSize='small' />
//                       </IconButton>
//                       <IconButton
//                         size='small'
//                         color='error'
//                         onClick={() => handleDelete(pkg.id)}>
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
//         maxWidth='md'
//         fullWidth
//         PaperProps={{ className: "packages-dialog-paper" }}>
//         <DialogTitle className='packages-dialog-title'>
//           {editingItem ? "تعديل" : "إضافة"} باقة
//         </DialogTitle>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSave}>
//           {({ errors, touched, isSubmitting }) => (
//             <Form>
//               <DialogContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='name'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='اسم الباقة'
//                           error={touched.name && Boolean(errors.name)}
//                           helperText={touched.name && errors.name}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='status'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           select
//                           fullWidth
//                           label='الحالة'
//                           SelectProps={{ native: true }}
//                           error={touched.status && Boolean(errors.status)}
//                           helperText={touched.status && errors.status}>
//                           <option value='active'>نشط</option>
//                           <option value='inactive'>غير نشط</option>
//                         </TextField>
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} display="flex" justifyContent="center">
//                     <Box sx={{ position: "relative" }}>
//                       {imagePreview ? (
//                         <Box
//                           sx={{
//                             width: 150,
//                             height: 120,
//                             borderRadius: 2,
//                             overflow: 'hidden',
//                             boxShadow: 2,
//                             mx: 'auto'
//                           }}
//                         >
//                           <img
//                             src={imagePreview}
//                             alt="Package preview"
//                             style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                           />
//                         </Box>
//                       ) : (
//                         <Box
//                           sx={{
//                             width: 150,
//                             height: 120,
//                             borderRadius: 2,
//                             bgcolor: '#e0e0e0',
//                             display: 'flex',
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             fontSize: '48px',
//                             mx: 'auto'
//                           }}
//                         >
//                           📦
//                         </Box>
//                       )}
//                       <input
//                         accept="image/*"
//                         type="file"
//                         id="package-image-upload"
//                         onChange={handleImageChange}
//                         style={{ display: "none" }}
//                       />
//                       <label htmlFor="package-image-upload">
//                         <Button variant="outlined" component="span" size="small" sx={{ mt: 1 }}>
//                           رفع صورة
//                         </Button>
//                       </label>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name='duration'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='المدة'
//                           placeholder='مثال: 5 أيام / 4 ليالي'
//                           error={touched.duration && Boolean(errors.duration)}
//                           helperText={touched.duration && errors.duration}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='price'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='السعر ($)'
//                           type='number'
//                           error={touched.price && Boolean(errors.price)}
//                           helperText={touched.price && errors.price}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='hotelIds'>
//                       {({ field, form }) => (
//                         <HotelsSelect
//                           field={field}
//                           form={form}
//                           hotels={hotels}
//                           label="الفنادق"
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name='description'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='الوصف'
//                           multiline
//                           rows={2}
//                           error={
//                             touched.description && Boolean(errors.description)
//                           }
//                           helperText={touched.description && errors.description}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name='features'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='المميزات (مفصولة بفواصل)'
//                           placeholder='فندق، إفطار، جولات...'
//                           error={touched.features && Boolean(errors.features)}
//                           helperText={touched.features && errors.features}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='transportation'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='وسائل النقل'
//                           placeholder='حافلة، سيارة خاصة...'
//                           error={
//                             touched.transportation &&
//                             Boolean(errors.transportation)
//                           }
//                           helperText={
//                             touched.transportation && errors.transportation
//                           }
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='services'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='الخدمات'
//                           placeholder='إفطار، جولات، سبا...'
//                           error={touched.services && Boolean(errors.services)}
//                           helperText={touched.services && errors.services}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions className='packages-dialog-actions'>
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

// export default Packages;

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
  Avatar,
  InputAdornment,
} from "@mui/material";
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Inventory as PackageIcon,
  AttachMoney as MoneyIcon,
  Image as ImageIcon,
  Hotel as HotelIcon,
  DirectionsBus as TransportIcon,
  FlightTakeoff as TripIcon,
  NightShelter as NightIcon,
  ArtTrack as ServiceIcon,
} from "@mui/icons-material";
import { useFormik } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const BASE_URL = "http://umrahbooking.runasp.net";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [trips, setTrips] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [transports, setTransports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [pkgRes, tripRes, hotelRes, transRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/Dashboard/DashbordPackages/GetPackages`, {
          headers,
        }),
        axios.get(`${BASE_URL}/api/Dashboard/DashbordTrips/GetTrips`, {
          headers,
        }),
        axios.get(`${BASE_URL}/api/Dashboard/DashbordHotels/GetHotels`, {
          headers,
        }),
        axios.get(
          `${BASE_URL}/api/Dashboard/DashbordTransportServices/GetTransportServices`,
          { headers }
        ),
      ]);

      setPackages(Array.isArray(pkgRes.data) ? pkgRes.data : []);
      setTrips(Array.isArray(tripRes.data) ? tripRes.data : []);
      setHotels(Array.isArray(hotelRes.data) ? hotelRes.data : []);
      setTransports(Array.isArray(transRes.data) ? transRes.data : []);
    } catch (error) {
      Swal.fire("خطأ", "فشل في مزامنة البيانات مع السيرفر", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("اسم الباقة مطلوب"),
    extraServices: Yup.string().required("يرجى وصف الخدمات الإضافية"),
    extraServicesPrice: Yup.number()
      .min(0, "السعر لا يمكن أن يكون سالباً")
      .required("سعر الخدمات مطلوب"),
    imageUrl: Yup.string()
      .url("رابط الصورة غير صحيح")
      .required("الصورة مطلوبة"),
    tripId: Yup.string().required("يجب اختيار رحلة"),
    hotelId: Yup.string().required("يجب اختيار فندق"),
    transportId: Yup.string().required("يجب اختيار خدمة نقل"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      extraServices: "",
      extraServicesPrice: 0,
      imageUrl: "",
      tripId: "",
      hotelId: "",
      transportId: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post(
          `${BASE_URL}/api/Dashboard/DashbordPackages/CreatePackage`,
          values,
          { headers }
        );
        Swal.fire({
          icon: "success",
          title: "تمت الإضافة",
          text: "تم إنشاء الباقة بنجاح",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchData();
        handleCloseDialog();
      } catch (error) {
        Swal.fire("خطأ", "فشل في الإضافة، تحقق من البيانات", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleCloseDialog = () => {
    setOpenDialog(false);
    formik.resetForm();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      text: "سيتم حذف الباقة نهائياً!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
      confirmButtonColor: "#d33",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${BASE_URL}/api/Dashboard/DashbordPackages/DeletePackage/${id}`,
          { headers }
        );
        setPackages(packages.filter((p) => p.id !== id));
        Swal.fire("حُذف!", "تم حذف الباقة بنجاح", "success");
      } catch (error) {
        Swal.fire("خطأ", "تعذر حذف الباقة حالياً", error);
      }
    }
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f4f7fe",
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
          <PackageIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Box>
            <Typography variant='h4' fontWeight='bold'>
              إدارة الباقات
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              عرض وتصميم عروض العمرة بالتفصيل
            </Typography>
          </Box>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 2, px: 3, py: 1.2, fontWeight: "bold" }}>
          إضافة باقة جديدة
        </Button>
      </Box>

      {/* Table Card */}
      <Card
        sx={{
          borderRadius: 4,
          boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
          border: "none",
        }}>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ p: 3 }}>
            <TextField
              fullWidth
              placeholder='البحث باسم الباقة...'
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <SearchIcon color='action' sx={{ ml: 1, mr: 1 }} />
                ),
                sx: { borderRadius: 3, backgroundColor: "#f8f9fa" },
              }}
            />
          </Box>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 8 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table>
                <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>الصورة</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      اسم الباقة
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      الخدمات الإضافية
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>الفندق</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>نوع النقل</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      السعر الكلي
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      عدد الليالي
                    </TableCell>
                    <TableCell align='center' sx={{ fontWeight: "bold" }}>
                      الإجراءات
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {packages
                    .filter((p) =>
                      p.name?.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((pkg) => (
                      <TableRow key={pkg.id} hover>
                        {/* 1. عامود imageUrl */}
                        <TableCell>
                          <Avatar
                            src={pkg.imageUrl}
                            variant='rounded'
                            sx={{
                              width: 60,
                              height: 60,
                              borderRadius: 2,
                              border: "1px solid #eee",
                            }}>
                            <ImageIcon />
                          </Avatar>
                        </TableCell>

                        {/* 2. عامود اسم الباقة */}
                        <TableCell
                          sx={{ fontWeight: "bold", color: "#2c3e50" }}>
                          {pkg.name}
                        </TableCell>

                        {/* 3. عامود extraServices */}
                        <TableCell sx={{ maxWidth: 200 }}>
                          <Typography
                            variant='body2'
                            sx={{ color: "#607d8b", fontStyle: "italic" }}>
                            {pkg.extraServices || "لا يوجد خدمات"}
                          </Typography>
                        </TableCell>

                        {/* 4. عامود hotelName */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            <HotelIcon fontSize='small' color='primary' />
                            <Typography variant='body2'>
                              {pkg.hotelName || "غير محدد"}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* 5. عامود transportType */}
                        <TableCell>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}>
                            <TransportIcon
                              fontSize='small'
                              sx={{ color: "#ffa726" }}
                            />
                            <Typography variant='body2'>
                              {pkg.transportType || "غير محدد"}
                            </Typography>
                          </Box>
                        </TableCell>

                        {/* 6. عامود totalprice */}
                        <TableCell>
                          <Typography
                            sx={{ color: "#2e7d32", fontWeight: "bold" }}>
                            ${pkg.totalPrice}
                          </Typography>
                        </TableCell>

                        {/* 7. عامود numberofNights */}
                        <TableCell>
                          <Chip
                            icon={
                              <NightIcon sx={{ fontSize: "14px !important" }} />
                            }
                            label={`${pkg.numberOfNights} ليالي`}
                            size='small'
                            sx={{
                              fontWeight: "bold",
                              bgcolor: "#e8f5e9",
                              color: "#2e7d32",
                            }}
                          />
                        </TableCell>

                        <TableCell align='center'>
                          <IconButton
                            color='error'
                            onClick={() => handleDelete(pkg.id)}
                            sx={{ backgroundColor: "#fff5f5" }}>
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

      {/* Dialog Form */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='md'
        fullWidth
        PaperProps={{ sx: { borderRadius: 4 } }}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle sx={{ fontWeight: "bold", px: 4, pt: 3 }}>
            إضافة باقة جديدة
          </DialogTitle>
          <DialogContent dividers sx={{ px: 4, py: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name='name'
                  label='اسم الباقة'
                  {...formik.getFieldProps("name")}
                  error={formik.touched.name && !!formik.errors.name}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  name='imageUrl'
                  label='رابط الصورة'
                  {...formik.getFieldProps("imageUrl")}
                  error={formik.touched.imageUrl && !!formik.errors.imageUrl}
                  helperText={formik.touched.imageUrl && formik.errors.imageUrl}
                />
              </Grid>
              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  name='extraServices'
                  label='الخدمات الإضافية'
                  {...formik.getFieldProps("extraServices")}
                  error={
                    formik.touched.extraServices &&
                    !!formik.errors.extraServices
                  }
                  helperText={
                    formik.touched.extraServices && formik.errors.extraServices
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  type='number'
                  name='extraServicesPrice'
                  label='سعر الخدمات الإضافية ($)'
                  {...formik.getFieldProps("extraServicesPrice")}
                  error={
                    formik.touched.extraServicesPrice &&
                    !!formik.errors.extraServicesPrice
                  }
                  helperText={
                    formik.touched.extraServicesPrice &&
                    formik.errors.extraServicesPrice
                  }
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  name='tripId'
                  label='الرحلة'
                  {...formik.getFieldProps("tripId")}
                  error={formik.touched.tripId && !!formik.errors.tripId}>
                  {trips.map((t) => (
                    <MenuItem key={t.id} value={t.id}>
                      {t.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  name='hotelId'
                  label='الفندق'
                  {...formik.getFieldProps("hotelId")}
                  error={formik.touched.hotelId && !!formik.errors.hotelId}>
                  {hotels.map((h) => (
                    <MenuItem key={h.id} value={h.id}>
                      {h.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  select
                  fullWidth
                  name='transportId'
                  label='النقل'
                  {...formik.getFieldProps("transportId")}
                  error={
                    formik.touched.transportId && !!formik.errors.transportId
                  }>
                  {transports.map((tr) => (
                    <MenuItem key={tr.id} value={tr.id}>
                      {tr.type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 4 }}>
            <Button onClick={handleCloseDialog} color='inherit'>
              إلغاء
            </Button>
            <Button
              type='submit'
              variant='contained'
              disabled={formik.isSubmitting}>
              {formik.isSubmitting ? (
                <CircularProgress size={24} />
              ) : (
                "تأكيد الإضافة"
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  );
};

const Divider = ({ children, sx }) => (
  <Box
    sx={{ display: "flex", alignItems: "center", textAlign: "center", ...sx }}>
    <Box sx={{ flex: 1, height: "1px", bgcolor: "#e0e0e0" }} />
    <Box sx={{ px: 2 }}>{children}</Box>
    <Box sx={{ flex: 1, height: "1px", bgcolor: "#e0e0e0" }} />
  </Box>
);

export default Packages;
