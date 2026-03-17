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
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Rating,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon, LocationOn as LocationIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Hotels = () => {
  const [hotels, setHotels] = useState([
    { id: 1, name: "فندق جراند", location: "القاهرة", address: "123 ميدان التحرير", rooms: 150, rating: 4.5, price: 200, amenities: "واي فاي، مسبح، صالة رياضية، سبا", status: "active" },
    { id: 2, name: "منتجع البحر", location: "الإسكندرية", address: "456 طريق الكورنيش", rooms: 200, rating: 4.8, price: 350, amenities: "واي فاي، مسبح، شاطئ، مطعم", status: "active" },
    { id: 3, name: "نزل الجبل", location: "سانت كاترين", address: "789 طريق الجبل", rooms: 80, rating: 4.3, price: 180, amenities: "واي فاي، مطعم، رحلات", status: "active" },
    { id: 4, name: "نزل المدينة", location: "الجيزة", address: "321 شارع الأهرام", rooms: 120, rating: 4.0, price: 150, amenities: "واي فاي، موقف سيارات، مطعم", status: "active" },
    { id: 5, name: "مخيم الصحراء", location: "سيوة", address: "555 طريق الواحة", rooms: 50, rating: 4.6, price: 220, amenities: "واي فاي، مسبح، رحلات، سبا", status: "inactive" },
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
      setHotels(hotels.map(h => h.id === editingItem.id ? { ...h, ...values } : h));
    } else {
      setHotels([...hotels, { ...values, id: Date.now() }]);
    }
    actions.setSubmitting(false);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا الفندق؟")) {
      setHotels(hotels.filter(h => h.id !== id));
    }
  };

  const getStatusChip = (status) => {
    const config = {
      active: { color: "#a7f3d0", text: "#0a6b62", label: "نشط" },
      inactive: { color: "#e8ebf5", text: "#718096", label: "غير نشط" },
    };
    const c = config[status] || config.active;
    const chipClass = `hotels-status-chip hotels-status-${status}`;
    return <Chip label={c.label} size="small" className={chipClass} />;
  };

  const filteredHotels = hotels.filter(h =>
    h.name.includes(searchTerm) ||
    h.location.includes(searchTerm)
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    location: Yup.string().required("مطلوب"),
    address: Yup.string().required("مطلوب"),
    rooms: Yup.number().min(1).required("مطلوب"),
    rating: Yup.number().min(0).max(5).required("مطلوب"),
    price: Yup.number().min(0).required("مطلوب"),
    amenities: Yup.string().required("مطلوب"),
    status: Yup.string().required("مطلوب"),
  });

  const initialValues = editingItem || {
    name: "",
    location: "",
    address: "",
    rooms: 0,
    rating: 0,
    price: 0,
    amenities: "",
    status: "active",
  };

  return (
    <Box className="hotels-container">
      <Box className="hotels-header">
        <Box className="hotels-title-group">
          <Typography variant="h4" className="hotels-title">إدارة الفنادق</Typography>
          <Typography variant="body2" className="hotels-subtitle">إدارة جميع الفنادق الشريكة</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          إضافة فندق
        </Button>
      </Box>

      <Card className="hotels-card">
        <CardContent>
          <TextField
            fullWidth
            placeholder="ابحث بالاسم أو الموقع..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon className="hotels-search-icon" /> }}
            className="hotels-search"
          />
          <TableContainer className="hotels-table-container">
            <Table className="hotels-table">
              <TableHead>
                <TableRow>
                  <TableCell className="hotels-table-cell-header">اسم الفندق</TableCell>
                  <TableCell className="hotels-table-cell-header">الموقع</TableCell>
                  <TableCell className="hotels-table-cell-header">الغرف</TableCell>
                  <TableCell className="hotels-table-cell-header">التقييم</TableCell>
                  <TableCell className="hotels-table-cell-header">السعر/ليلة</TableCell>
                  <TableCell className="hotels-table-cell-header">المرافق</TableCell>
                  <TableCell className="hotels-table-cell-header">الحالة</TableCell>
                  <TableCell className="hotels-table-cell-header">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredHotels.map((hotel) => (
                  <TableRow key={hotel.id} hover>
                    <TableCell className="hotels-table-cell-name">
                      <Typography fontWeight={600}>{hotel.name}</Typography>
                      <Typography variant="caption" className="hotels-address-text">{hotel.address}</Typography>
                    </TableCell>
                    <TableCell className="hotels-table-cell-location">
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <LocationIcon className="hotels-location-icon" fontSize="small" />
                        {hotel.location}
                      </Box>
                    </TableCell>
                    <TableCell className="hotels-table-cell">{hotel.rooms}</TableCell>
                    <TableCell className="hotels-table-cell">
                      <Rating value={hotel.rating} precision={0.1} readOnly size="small" />
                      <Typography variant="caption" className="hotels-rating-caption">{hotel.rating}</Typography>
                    </TableCell>
                    <TableCell className="hotels-table-cell-price">${hotel.price}</TableCell>
                    <TableCell className="hotels-table-cell-amenities">
                      <Typography variant="caption" className="hotels-amenities-text">{hotel.amenities}</Typography>
                    </TableCell>
                    <TableCell className="hotels-table-cell">{getStatusChip(hotel.status)}</TableCell>
                    <TableCell className="hotels-table-cell-actions">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(hotel)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(hotel.id)}>
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ className: "hotels-dialog-paper" }}>
        <DialogTitle className="hotels-dialog-title">{editingItem ? "تعديل" : "إضافة"} فندق</DialogTitle>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
          {({ errors, touched, isSubmitting, setFieldValue, values }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="name">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="اسم الفندق" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="location">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="الموقع/المدينة" error={touched.location && Boolean(errors.location)} helperText={touched.location && errors.location} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="status">
                      {({ field }) => (
                        <TextField {...field} select fullWidth label="الحالة" SelectProps={{ native: true }} error={touched.status && Boolean(errors.status)} helperText={touched.status && errors.status}>
                          <option value="active">نشط</option>
                          <option value="inactive">غير نشط</option>
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="address">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="العنوان الكامل" error={touched.address && Boolean(errors.address)} helperText={touched.address && errors.address} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="rooms">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="عدد الغرف" type="number" error={touched.rooms && Boolean(errors.rooms)} helperText={touched.rooms && errors.rooms} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="price">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="السعر لليلة ($)" type="number" error={touched.price && Boolean(errors.price)} helperText={touched.price && errors.price} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="rating">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="التقييم (0-5)" type="number" step="0.1" inputProps={{ min: 0, max: 5 }} error={touched.rating && Boolean(errors.rating)} helperText={touched.rating && errors.rating} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="amenities">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="المرافق (مفصولة بفواصل)" placeholder="واي فاي، مسبح، صالة رياضية، سبا" error={touched.amenities && Boolean(errors.amenities)} helperText={touched.amenities && errors.amenities} />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className="hotels-dialog-actions">
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

export default Hotels;
