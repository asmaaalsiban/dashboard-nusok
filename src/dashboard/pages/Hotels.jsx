/** @format */

import { useState } from "react";
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
  Paper,
  Rating,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Avatar,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  LocationOn as LocationIcon,
  LocationOn,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Hotels = () => {
  const [hotels, setHotels] = useState([
    {
      id: 1,
      name: "فندق جراند",
      location: "القاهرة",
      city: "القاهرة",
      country: "مصر",
      address: "123 ميدان التحرير",
      rating: 4.5,
      price: 200,
      distanceFromHaram: 500,
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    },

    {
      id: 5,
      name: "مخيم الصحراء",
      location: "سيوة",
      city: "سيوة",
      country: "مصر",
      address: "555 طريق الواحة",
      rating: 4.6,
      price: 220,
      distanceFromHaram: 350,
      image:
        "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleOpenDialog = (item = null) => {
    setEditingItem(item);
    setImagePreview(item?.image || null);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingItem(null);
    setImagePreview(null);
  };

  const handleSave = (values, actions) => {
    if (editingItem) {
      setHotels(
        hotels.map((h) =>
          h.id === editingItem.id ? { ...h, ...values, image: imagePreview } : h
        )
      );
    } else {
      setHotels([
        ...hotels,
        { ...values, id: Date.now(), image: imagePreview },
      ]);
    }
    actions.setSubmitting(false);
    handleCloseDialog();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الفندق؟")) {
      setHotels(hotels.filter((h) => h.id !== id));
    }
  };

  const filteredHotels = hotels.filter(
    (h) => h.name.includes(searchTerm) || h.location.includes(searchTerm)
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    location: Yup.string().required("مطلوب"),
    city: Yup.string().required("مطلوب"),
    country: Yup.string().required("مطلوب"),
    address: Yup.string().required("مطلوب"),
    rating: Yup.number().min(0).max(5).required("مطلوب"),
    price: Yup.number().min(0).required("مطلوب"),
    distanceFromHaram: Yup.number().min(0).required("مطلوب"),
  });

  const initialValues = editingItem || {
    name: "",
    location: "",
    city: "",
    country: "",
    address: "",
    rating: 0,
    price: 0,
    distanceFromHaram: 0,
  };

  return (
    <Box className='hotels-container'>
      <Box className='hotels-header'>
        <Box className='hotels-title-group'>
          <Typography variant='h4' className='hotels-title'>
            إدارة الفنادق
          </Typography>
          <Typography variant='body2' className='hotels-subtitle'>
            إدارة جميع الفنادق الشريكة
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}>
          إضافة فندق جديد
        </Button>
      </Box>

      <Card className='hotels-card'>
        <CardContent>
          <TextField
            fullWidth
            placeholder='ابحث بالاسم أو الموقع...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className='hotels-search-icon' />,
            }}
            className='hotels-search'
          />
          <TableContainer className='hotels-table-container'>
            <Table className='hotels-table'>
              <TableHead>
                <TableRow>
                  <TableCell className='hotels-table-cell-header'>
                    الصورة
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    اسم الفندق
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    الموقع
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    المدينة
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    الدولة
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    التقييم
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    السعر/ليلة
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    المسافة من الحرم
                  </TableCell>
                  <TableCell className='hotels-table-cell-header'>
                    الإجراءات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id} hover>
                    <TableCell className='hotels-table-cell-image'>
                      {hotel.image ? (
                        <Box
                          className='hotels-image-box'
                          sx={{
                            width: 80,
                            height: 60,
                            borderRadius: 1,
                            overflow: "hidden",
                            boxShadow: 1,
                          }}>
                          <img
                            src={hotel.image}
                            alt={hotel.name}
                            className='hotels-table-image'
                            loading='lazy'
                          />
                        </Box>
                      ) : (
                        <Box
                          className='hotels-image-box-placeholder'
                          sx={{
                            width: 80,
                            height: 60,
                            borderRadius: 1,
                            bgcolor: "#e0e0e0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "24px",
                          }}>
                          🏨
                        </Box>
                      )}
                    </TableCell>
                    <TableCell className='hotels-table-cell-name'>
                      <Typography fontWeight={600}>{hotel.name}</Typography>
                      <Typography
                        variant='caption'
                        className='hotels-address-text'>
                        {hotel.address}
                      </Typography>
                    </TableCell>
                    <TableCell className='hotels-table-cell-location'>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationIcon
                          className='hotels-location-icon'
                          fontSize='small'
                        />
                        {hotel.location}
                      </Box>
                    </TableCell>
                    <TableCell className='hotels-table-cell-city'>
                      {hotel.city}
                    </TableCell>
                    <TableCell className='hotels-table-cell-country'>
                      {hotel.country}
                    </TableCell>
                    <TableCell className='hotels-table-cell'>
                      <Rating
                        value={hotel.rating}
                        precision={0.1}
                        readOnly
                        size='small'
                      />
                      <Typography
                        variant='caption'
                        className='hotels-rating-caption'>
                        {hotel.rating}
                      </Typography>
                    </TableCell>
                    <TableCell className='hotels-table-cell-price'>
                      ${hotel.price}
                    </TableCell>
                    <TableCell className='hotels-table-cell-distance'>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationOn
                          color='error'
                          fontSize='small'
                          sx={{ mr: 0.5 }}
                        />
                        <Typography variant='body2' fontWeight={600}>
                          {hotel.distanceFromHaram} م
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell className='hotels-table-cell-actions'>
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
        maxWidth='md'
        fullWidth
        PaperProps={{ className: "hotels-dialog-paper" }}>
        <DialogTitle className='hotels-dialog-title'>
          {editingItem ? "تعديل" : "إضافة"} فندق
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} display='flex' justifyContent='center'>
                    <Box sx={{ position: "relative" }}>
                      {imagePreview ? (
                        <Box
                          sx={{
                            width: 150,
                            height: 120,
                            borderRadius: 2,
                            overflow: "hidden",
                            boxShadow: 2,
                            mx: "auto",
                          }}>
                          <img
                            src={imagePreview}
                            alt='Hotel preview'
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: 150,
                            height: 120,
                            borderRadius: 2,
                            bgcolor: "#e0e0e0",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "48px",
                            mx: "auto",
                          }}>
                          🏨
                        </Box>
                      )}
                      <input
                        accept='image/*'
                        type='file'
                        id='image-upload'
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor='image-upload'>
                        <Button
                          variant='outlined'
                          component='span'
                          size='small'
                          sx={{ mt: 1 }}>
                          رفع صورة
                        </Button>
                      </label>
                    </Box>
                  </Grid>
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
                  <Grid item xs={12} sm={6}>
                    <Field name='location'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='الموقع/المدينة'
                          error={touched.location && Boolean(errors.location)}
                          helperText={touched.location && errors.location}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name='city'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='المدينة'
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name='country'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='الدولة'
                          error={touched.country && Boolean(errors.country)}
                          helperText={touched.country && errors.country}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name='address'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='العنوان الكامل'
                          error={touched.address && Boolean(errors.address)}
                          helperText={touched.address && errors.address}
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
                          label='السعر لليلة ($)'
                          type='number'
                          error={touched.price && Boolean(errors.price)}
                          helperText={touched.price && errors.price}
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
                          label='التقييم (0-5)'
                          type='number'
                          step='0.1'
                          inputProps={{ min: 0, max: 5 }}
                          error={touched.rating && Boolean(errors.rating)}
                          helperText={touched.rating && errors.rating}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name='distanceFromHaram'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='المسافة من الحرم (متر)'
                          type='number'
                          error={
                            touched.distanceFromHaram &&
                            Boolean(errors.distanceFromHaram)
                          }
                          helperText={
                            touched.distanceFromHaram &&
                            errors.distanceFromHaram
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className='hotels-dialog-actions'>
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

export default Hotels;
