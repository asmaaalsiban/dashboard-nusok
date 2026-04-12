/** @format */

// /** @format */

// import { useState } from "react";
// import "./Hotels.css";
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
//   Rating,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Grid,
//   Avatar,
// } from "@mui/material";
// import {
//   Add as AddIcon,
//   Edit as EditIcon,
//   Delete as DeleteIcon,
//   Search as SearchIcon,
//   LocationOn as LocationIcon,
//   LocationOn,
// } from "@mui/icons-material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";

// const Hotels = () => {
//   const [hotels, setHotels] = useState([
//     {
//       id: 1,
//       name: "فندق جراند",
//       location: "القاهرة",
//       city: "القاهرة",
//       country: "مصر",
//       address: "123 ميدان التحرير",
//       rating: 4.5,
//       price: 200,
//       distanceFromHaram: 500,
//       image:
//         "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
//     },

//     {
//       id: 5,
//       name: "مخيم الصحراء",
//       location: "سيوة",
//       city: "سيوة",
//       country: "مصر",
//       address: "555 طريق الواحة",
//       rating: 4.6,
//       price: 220,
//       distanceFromHaram: 350,
//       image:
//         "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
//     },
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
//       setHotels(
//         hotels.map((h) =>
//           h.id === editingItem.id ? { ...h, ...values, image: imagePreview } : h
//         )
//       );
//     } else {
//       setHotels([
//         ...hotels,
//         { ...values, id: Date.now(), image: imagePreview },
//       ]);
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
//     if (window.confirm("هل أنت متأكد من حذف هذا الفندق؟")) {
//       setHotels(hotels.filter((h) => h.id !== id));
//     }
//   };

//   const filteredHotels = hotels.filter(
//     (h) => h.name.includes(searchTerm) || h.location.includes(searchTerm)
//   );

//   const validationSchema = Yup.object({
//     name: Yup.string().required("مطلوب"),
//     location: Yup.string().required("مطلوب"),
//     city: Yup.string().required("مطلوب"),
//     country: Yup.string().required("مطلوب"),
//     address: Yup.string().required("مطلوب"),
//     rating: Yup.number().min(0).max(5).required("مطلوب"),
//     price: Yup.number().min(0).required("مطلوب"),
//     distanceFromHaram: Yup.number().min(0).required("مطلوب"),
//   });

//   const initialValues = editingItem || {
//     name: "",
//     location: "",
//     city: "",
//     country: "",
//     address: "",
//     rating: 0,
//     price: 0,
//     distanceFromHaram: 0,
//   };

//   return (
//     <Box className='hotels-container'>
//       <Box className='hotels-header'>
//         <Box className='hotels-title-group'>
//           <Typography variant='h4' className='hotels-title'>
//             إدارة الفنادق
//           </Typography>
//           <Typography variant='body2' className='hotels-subtitle'>
//             إدارة جميع الفنادق الشريكة
//           </Typography>
//         </Box>
//         <Button
//           variant='contained'
//           startIcon={<AddIcon />}
//           onClick={() => handleOpenDialog()}>
//           إضافة فندق جديد
//         </Button>
//       </Box>

//       <Card className='hotels-card'>
//         <CardContent>
//           <TextField
//             fullWidth
//             placeholder='ابحث بالاسم أو الموقع...'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             InputProps={{
//               startAdornment: <SearchIcon className='hotels-search-icon' />,
//             }}
//             className='hotels-search'
//           />
//           <TableContainer className='hotels-table-container'>
//             <Table className='hotels-table'>
//               <TableHead>
//                 <TableRow>
//                   <TableCell className='hotels-table-cell-header'>
//                     الصورة
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     اسم الفندق
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     الموقع
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     المدينة
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     الدولة
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     التقييم
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     السعر/ليلة
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     المسافة من الحرم
//                   </TableCell>
//                   <TableCell className='hotels-table-cell-header'>
//                     الإجراءات
//                   </TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {filteredHotels.map((hotel) => (
//                   <TableRow key={hotel.id} hover>
//                     <TableCell className='hotels-table-cell-image'>
//                       {hotel.image ? (
//                         <Box
//                           className='hotels-image-box'
//                           sx={{
//                             width: 80,
//                             height: 60,
//                             borderRadius: 1,
//                             overflow: "hidden",
//                             boxShadow: 1,
//                           }}>
//                           <img
//                             src={hotel.image}
//                             alt={hotel.name}
//                             className='hotels-table-image'
//                             loading='lazy'
//                           />
//                         </Box>
//                       ) : (
//                         <Box
//                           className='hotels-image-box-placeholder'
//                           sx={{
//                             width: 80,
//                             height: 60,
//                             borderRadius: 1,
//                             bgcolor: "#e0e0e0",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: "24px",
//                           }}>
//                           🏨
//                         </Box>
//                       )}
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-name'>
//                       <Typography fontWeight={600}>{hotel.name}</Typography>
//                       <Typography
//                         variant='caption'
//                         className='hotels-address-text'>
//                         {hotel.address}
//                       </Typography>
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-location'>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <LocationIcon
//                           className='hotels-location-icon'
//                           fontSize='small'
//                         />
//                         {hotel.location}
//                       </Box>
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-city'>
//                       {hotel.city}
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-country'>
//                       {hotel.country}
//                     </TableCell>
//                     <TableCell className='hotels-table-cell'>
//                       <Rating
//                         value={hotel.rating}
//                         precision={0.1}
//                         readOnly
//                         size='small'
//                       />
//                       <Typography
//                         variant='caption'
//                         className='hotels-rating-caption'>
//                         {hotel.rating}
//                       </Typography>
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-price'>
//                       ${hotel.price}
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-distance'>
//                       <Box sx={{ display: "flex", alignItems: "center" }}>
//                         <LocationOn
//                           color='error'
//                           fontSize='small'
//                           sx={{ mr: 0.5 }}
//                         />
//                         <Typography variant='body2' fontWeight={600}>
//                           {hotel.distanceFromHaram} م
//                         </Typography>
//                       </Box>
//                     </TableCell>
//                     <TableCell className='hotels-table-cell-actions'>
//                       <IconButton
//                         size='small'
//                         color='primary'
//                         onClick={() => handleOpenDialog(hotel)}>
//                         <EditIcon fontSize='small' />
//                       </IconButton>
//                       <IconButton
//                         size='small'
//                         color='error'
//                         onClick={() => handleDelete(hotel.id)}>
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
//         PaperProps={{ className: "hotels-dialog-paper" }}>
//         <DialogTitle className='hotels-dialog-title'>
//           {editingItem ? "تعديل" : "إضافة"} فندق
//         </DialogTitle>
//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSave}>
//           {({ errors, touched, isSubmitting }) => (
//             <Form>
//               <DialogContent>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} display='flex' justifyContent='center'>
//                     <Box sx={{ position: "relative" }}>
//                       {imagePreview ? (
//                         <Box
//                           sx={{
//                             width: 150,
//                             height: 120,
//                             borderRadius: 2,
//                             overflow: "hidden",
//                             boxShadow: 2,
//                             mx: "auto",
//                           }}>
//                           <img
//                             src={imagePreview}
//                             alt='Hotel preview'
//                             style={{
//                               width: "100%",
//                               height: "100%",
//                               objectFit: "cover",
//                             }}
//                           />
//                         </Box>
//                       ) : (
//                         <Box
//                           sx={{
//                             width: 150,
//                             height: 120,
//                             borderRadius: 2,
//                             bgcolor: "#e0e0e0",
//                             display: "flex",
//                             alignItems: "center",
//                             justifyContent: "center",
//                             fontSize: "48px",
//                             mx: "auto",
//                           }}>
//                           🏨
//                         </Box>
//                       )}
//                       <input
//                         accept='image/*'
//                         type='file'
//                         id='image-upload'
//                         onChange={handleImageChange}
//                         style={{ display: "none" }}
//                       />
//                       <label htmlFor='image-upload'>
//                         <Button
//                           variant='outlined'
//                           component='span'
//                           size='small'
//                           sx={{ mt: 1 }}>
//                           رفع صورة
//                         </Button>
//                       </label>
//                     </Box>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name='name'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='اسم الفندق'
//                           error={touched.name && Boolean(errors.name)}
//                           helperText={touched.name && errors.name}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='location'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='الموقع/المدينة'
//                           error={touched.location && Boolean(errors.location)}
//                           helperText={touched.location && errors.location}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='city'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='المدينة'
//                           error={touched.city && Boolean(errors.city)}
//                           helperText={touched.city && errors.city}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='country'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='الدولة'
//                           error={touched.country && Boolean(errors.country)}
//                           helperText={touched.country && errors.country}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12}>
//                     <Field name='address'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='العنوان الكامل'
//                           error={touched.address && Boolean(errors.address)}
//                           helperText={touched.address && errors.address}
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
//                           label='السعر لليلة ($)'
//                           type='number'
//                           error={touched.price && Boolean(errors.price)}
//                           helperText={touched.price && errors.price}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='rating'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='التقييم (0-5)'
//                           type='number'
//                           step='0.1'
//                           inputProps={{ min: 0, max: 5 }}
//                           error={touched.rating && Boolean(errors.rating)}
//                           helperText={touched.rating && errors.rating}
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Field name='distanceFromHaram'>
//                       {({ field }) => (
//                         <TextField
//                           {...field}
//                           fullWidth
//                           label='المسافة من الحرم (متر)'
//                           type='number'
//                           error={
//                             touched.distanceFromHaram &&
//                             Boolean(errors.distanceFromHaram)
//                           }
//                           helperText={
//                             touched.distanceFromHaram &&
//                             errors.distanceFromHaram
//                           }
//                         />
//                       )}
//                     </Field>
//                   </Grid>
//                 </Grid>
//               </DialogContent>
//               <DialogActions className='hotels-dialog-actions'>
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

// export default Hotels;
/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
import "./Hotels.css";
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
  Rating,
  Avatar,
  Chip,
  MenuItem,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Link as LinkIcon,
  Hotel as HotelIcon,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Swal from "sweetalert2";

const BASE_URL = "http://umrahbooking.runasp.net";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
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
      const [hotelsRes, citiesRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/Dashboard/DashbordHotels/GetHotels`, {
          headers,
        }),
        axios.get(`${BASE_URL}/api/Dashboard/DashbordCities/GetCities`, {
          headers,
        }),
      ]);
      setHotels(Array.isArray(hotelsRes.data) ? hotelsRes.data : []);
      setCities(Array.isArray(citiesRes.data) ? citiesRes.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Yup Validation Schema ---
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("اسم الفندق مطلوب"),
    // المدينة مطلوبة فقط إذا لم نكن في وضع التعديل
    cityId: Yup.string().when([], {
      is: () => !editingItem,
      then: () => Yup.string().required("يجب اختيار المدينة"),
      otherwise: () => Yup.string().notRequired(),
    }),
    address: Yup.string().required("الموقع مطلوب"),
    distanceToHaram: Yup.number()
      .typeError("يجب أن يكون رقماً")
      .min(0, "لا يمكن أن يكون البعد سالباً")
      .required("البعد عن الحرم مطلوب"),
    rating: Yup.number()
      .min(0, "الحد الأدنى 0")
      .max(5, "الحد الأقصى 5")
      .required("التقييم مطلوب"),
    price: Yup.number()
      .min(0, "السعر يجب أن يكون موجباً")
      .required("السعر مطلوب"),
    image: Yup.string()
      .url("يجب إدخال رابط URL صحيح")
      .required("رابط الصورة مطلوب"),
    description: Yup.string().nullable(),
  });

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
  };

  const handleSave = async (values, actions) => {
    try {
      if (editingItem) {
        const updatePayload = {
          hotelId: editingItem.id,
          name: values.name,
          description: values.description || "لا يوجد وصف",
          location: values.address,
          imageUrl: values.image,
          distanceFromHaram: Number(values.distanceToHaram),
          starsRating: Number(values.rating),
          pricePerNight: Number(values.price),
        };
        await axios.put(
          `${BASE_URL}/api/Dashboard/DashbordHotels/UpdateHotel/${editingItem.id}`,
          updatePayload,
          { headers }
        );
        Swal.fire("تم!", "تم تحديث بيانات الفندق بنجاح", "success");
      } else {
        const createPayload = {
          name: values.name,
          description: values.description || "لا يوجد وصف",
          location: values.address,
          image: values.image,
          cityId: values.cityId,
          distanceFromHaram: Number(values.distanceToHaram),
          starsRating: Number(values.rating),
          pricePerNight: Number(values.price),
        };
        await axios.post(
          `${BASE_URL}/api/Dashboard/DashbordHotels/CreateHotel`,
          createPayload,
          { headers }
        );
        Swal.fire("تم!", "تم إضافة الفندق بنجاح", "success");
      }

      fetchData();
      handleCloseDialog();
    } catch (error) {
      Swal.fire(
        "خطأ",
        "فشل في حفظ البيانات، تأكد من صحة المدخلات",
        error.response?.data?.message || "حدث خطأ غير متوقع"
      );
    } finally {
      actions.setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "هل أنت متأكد؟",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم، احذف",
      cancelButtonText: "إلغاء",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `${BASE_URL}/api/Dashboard/DashbordHotels/DeleteHotel/${id}`,
          { headers }
        );
        setHotels(hotels.filter((h) => h.id !== id));
        Swal.fire("حُذف!", "تم حذف الفندق بنجاح", "success");
      } catch (error) {
        Swal.fire(
          "خطأ",
          "فشل عملية الحذف",
          error.response?.data?.message || "حدث خطأ غير متوقع"
        );
      }
    }
  };

  const filteredHotels = hotels.filter(
    (h) =>
      h.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      h.id?.toString().includes(searchTerm)
  );

  const initialValues = {
    name: editingItem?.name || "",
    cityId: editingItem?.cityId || "",
    address: editingItem?.location || "",
    distanceToHaram: editingItem?.distanceFromHaram || 0,
    rating: editingItem?.starsRating || 0,
    price: editingItem?.pricePerNight || 0,
    image: editingItem?.imageUrl || editingItem?.image || "",
    description: editingItem?.description || "",
  };

  return (
    <Box className='hotels-container' sx={{ p: 3 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <HotelIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Box>
            <Typography variant='h4' sx={{ fontWeight: "bold" }}>
              إدارة الفنادق
            </Typography>
            <Typography variant='body2' color='textSecondary'>
              عرض وإدارة تفاصيل الفنادق كاملة
            </Typography>
          </Box>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ px: 4 }}>
          إضافة فندق جديد
        </Button>
      </Box>

      <Card>
        <CardContent>
          <TextField
            fullWidth
            placeholder='ابحث بالاسم، المدينة، أو معرف الفندق (ID)...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon sx={{ color: "gray", mr: 1 }} />,
            }}
            sx={{ mb: 3 }}
          />
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer>
              <Table className='hotels-table' size='small'>
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>الصورة</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      اسم الفندق
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>الوصف</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>
                      الدولة / المدينة
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>الموقع</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>البعد (م)</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>التقييم</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>السعر</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>الإجراءات</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredHotels.map((hotel) => (
                    <TableRow key={hotel.id} hover>
                      <TableCell>
                        <Avatar
                          src={hotel.imageUrl || hotel.image}
                          variant='rounded'
                          sx={{
                            width: 50,
                            height: 50,
                            border: "1px solid #ddd",
                          }}>
                          {!(hotel.imageUrl || hotel.image) && <LocationIcon />}
                        </Avatar>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600} variant='body2'>
                          {hotel.name}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Tooltip title={hotel.description}>
                          <Typography
                            variant='caption'
                            color='textSecondary'
                            sx={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                              overflow: "hidden",
                              maxWidth: 150,
                            }}>
                            {hotel.description}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell>
                        <Typography variant='body2'>
                          {hotel.countryName}
                        </Typography>
                        <Typography variant='caption' color='primary'>
                          {hotel.cityName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}>
                          <LocationIcon sx={{ fontSize: 14, color: "gray" }} />
                          <Typography variant='caption'>
                            {hotel.location}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={`${hotel.distanceFromHaram}`}
                          size='small'
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell>
                        <Rating
                          value={hotel.starsRating || 0}
                          readOnly
                          size='small'
                          precision={0.5}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography
                          fontWeight='bold'
                          color='success.main'
                          variant='body2'>
                          ${hotel.pricePerNight}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex", gap: 0.5 }}>
                          <IconButton
                            size='small'
                            color='primary'
                            onClick={() => handleOpenDialog(hotel)}>
                            <EditIcon fontSize='small' />
                          </IconButton>
                          <IconButton
                            size='small'
                            color='error'
                            onClick={() => handleDelete(hotel.id)}>
                            <DeleteIcon fontSize='small' />
                          </IconButton>
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

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth='md'
        fullWidth>
        <DialogTitle sx={{ fontWeight: "bold" }}>
          {editingItem ? "تعديل بيانات الفندق" : "إضافة فندق جديد"}
        </DialogTitle>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}
          enableReinitialize>
          {({ errors, touched, isSubmitting, values }) => (
            <Form>
              <DialogContent dividers>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field
                      name='image'
                      as={TextField}
                      fullWidth
                      label='رابط الصورة'
                      size='small'
                      error={touched.image && Boolean(errors.image)}
                      helperText={touched.image && errors.image}
                      InputProps={{
                        startAdornment: (
                          <LinkIcon sx={{ color: "gray", mr: 1 }} />
                        ),
                      }}
                    />
                    {values.image && (
                      <Box
                        mt={1}
                        sx={{ display: "flex", justifyContent: "center" }}>
                        <img
                          src={values.image}
                          alt='Preview'
                          style={{
                            width: "120px",
                            height: "70px",
                            borderRadius: "4px",
                            objectFit: "cover",
                            border: "1px solid #ddd",
                          }}
                        />
                      </Box>
                    )}
                  </Grid>

                  <Grid item xs={12} sm={editingItem ? 12 : 6}>
                    <Field
                      name='name'
                      as={TextField}
                      fullWidth
                      label='الاسم'
                      size='small'
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>

                  {!editingItem && (
                    <Grid item xs={12} sm={6}>
                      <Field
                        name='cityId'
                        as={TextField}
                        select
                        fullWidth
                        label='المدينة'
                        size='small'
                        error={touched.cityId && Boolean(errors.cityId)}
                        helperText={touched.cityId && errors.cityId}>
                        {cities.map((city) => (
                          <MenuItem key={city.id} value={city.id}>
                            {city.name}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>
                  )}

                  <Grid item xs={12} sm={6}>
                    <Field
                      name='address'
                      as={TextField}
                      fullWidth
                      label='الموقع'
                      size='small'
                      error={touched.address && Boolean(errors.address)}
                      helperText={touched.address && errors.address}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <Field
                      name='distanceToHaram'
                      as={TextField}
                      fullWidth
                      label='البعد عن الحرم'
                      type='number'
                      size='small'
                      error={
                        touched.distanceToHaram &&
                        Boolean(errors.distanceToHaram)
                      }
                      helperText={
                        touched.distanceToHaram && errors.distanceToHaram
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      name='price'
                      as={TextField}
                      fullWidth
                      label='السعر/ليلة'
                      type='number'
                      size='small'
                      error={touched.price && Boolean(errors.price)}
                      helperText={touched.price && errors.price}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      name='rating'
                      as={TextField}
                      fullWidth
                      label='النجوم (0-5)'
                      type='number'
                      size='small'
                      error={touched.rating && Boolean(errors.rating)}
                      helperText={touched.rating && errors.rating}
                    />
                  </Grid>

                  <Grid item xs={12} sm={4}>
                    <Field
                      name='description'
                      as={TextField}
                      fullWidth
                      label='الوصف'
                      size='small'
                      multiline
                      rows={1}
                    />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 2 }}>
                <Button onClick={handleCloseDialog} color='inherit'>
                  إلغاء
                </Button>
                <Button
                  type='submit'
                  variant='contained'
                  disabled={isSubmitting}>
                  {isSubmitting ? (
                    <CircularProgress size={24} color='inherit' />
                  ) : (
                    "حفظ البيانات"
                  )}
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
    </Box>
  );
};

export default Hotels;
