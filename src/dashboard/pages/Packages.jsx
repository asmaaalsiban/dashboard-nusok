/** @format */

import { useState } from "react";
import "./Packages.css";
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
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Today as DurationIcon,
  Image as ImageIcon,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import HotelsSelect from "../components/HotelsSelect";

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "اقتصادية",
      duration: "3 أيام / 2 ليلة",
      price: 400,
      hotelId: 1,
      description: "باقة أساسية للمسافرين بميزانية محدودة",
      features: "فندق، إفطار، نقل المطار",
      status: "active",
      transportation: "حافلة مكيفة",
      services: "إفطار يومي، نقل المطار",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "قياسية",
      duration: "5 أيام / 4 ليالي",
      price: 800,
      hotelId: 2,
      description: "مثالية للعطلات القصيرة",
      features: "فندق، إفطار، جولة بالمدينة، نقل المطار",
      status: "active",
      transportation: "حافلة فاخرة",
      services: "إفطار، جولة بالمدينة، نقل المطار",
      image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "ممتازة",
      duration: "7 أيام / 6 ليالي",
      price: 1500,
      hotelId: 3,
      description: "اختبر الفخامة والراحة",
      features: "فندق 5 نجوم، جميع الوجبات، جولات خاصة، سبا",
      status: "active",
      transportation: "سيارة خاصة",
      services: "جميع الوجبات، جولات خاصة، سبا",
      image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "فاخرة",
      duration: "10 أيام / 9 ليالي",
      price: 2500,
      hotelId: 4,
      description: "تجربة فاخرة نهائية",
      features: "فندق 5 نجوم+، جميع الوجبات، جولات VIP، سبا، هليكوبتر",
      status: "active",
      transportation: "هليكوبتر، سيارة فاخرة",
      services: "جميع الوجبات، جولات VIP، سبا، هليكوبتر",
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    },
  ]);

  const [hotels] = useState([
    { id: 1, name: "فندق جراند", location: "القاهرة" },
    { id: 2, name: "منتجع البحر", location: "الإسكندرية" },
    { id: 3, name: "نزل الجبل", location: "سانت كاترين" },
    { id: 4, name: "نزل المدينة", location: "الجيزة" },
    { id: 5, name: "مخيم الصحراء", location: "سيوة" },
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
      setPackages(
        packages.map((p) => (p.id === editingItem.id ? { ...p, ...values, image: imagePreview } : p))
      );
    } else {
      setPackages([...packages, { ...values, id: Date.now(), image: imagePreview }]);
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
    if (window.confirm("هل أنت متأكد من حذف هذه الباقة؟")) {
      setPackages(packages.filter((p) => p.id !== id));
    }
  };

  const getStatusChip = (status) => {
    const config = {
      active: { color: "#a7f3d0", text: "#0a6b62", label: "نشط" },
      inactive: { color: "#e8ebf5", text: "#718096", label: "غير نشط" },
    };
    const c = config[status] || config.active;
    const chipClass = `packages-status-chip packages-status-${status}`;
    return <Chip label={c.label} size='small' className={chipClass} />;
  };

  const filteredPackages = packages.filter(
    (p) => p.name.includes(searchTerm) || p.description.includes(searchTerm)
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    duration: Yup.string().required("مطلوب"),
    price: Yup.number().min(0).required("مطلوب"),
    hotelId: Yup.number().required("مطلوب"),
    description: Yup.string().required("مطلوب"),
    features: Yup.string().required("مطلوب"),
    status: Yup.string().required("مطلوب"),
    transportation: Yup.string().required("مطلوب"),
    services: Yup.string().required("مطلوب"),
  });

  const initialValues = editingItem || {
    name: "",
    duration: "",
    price: 0,
    hotelId: "",
    description: "",
    features: "",
    status: "active",
    transportation: "",
    services: "",
  };

  return (
    <Box className='packages-container'>
      <Box className='packages-header'>
        <Box className='packages-title-group'>
          <Typography variant='h4' className='packages-title'>
            إدارة الباقات
          </Typography>
          <Typography variant='body2' className='packages-subtitle'>
            إدارة باقات وعروض السفر
          </Typography>
        </Box>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}>
          إضافة باقة
        </Button>
      </Box>

      <Card className='packages-card'>
        <CardContent>
          <TextField
            fullWidth
            placeholder='ابحث بالاسم أو الوصف...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: <SearchIcon className='packages-search-icon' />,
            }}
            className='packages-search'
          />
          <TableContainer className='packages-table-container'>
            <Table className='packages-table'>
              <TableHead>
                <TableRow>
                  <TableCell className='packages-table-cell-header'>
                    الصورة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    اسم الباقة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    المدة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    السعر
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الفنادق المختارة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الوصف
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    النقل
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الخدمات
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الحالة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الإجراءات
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPackages.map((pkg) => (
                  <TableRow key={pkg.id} hover>
                    <TableCell className='packages-table-cell-image'>
                      {pkg.image ? (
                        <Box
                          className="packages-image-box"
                          sx={{
                            width: 80,
                            height: 60,
                            borderRadius: 1,
                            overflow: 'hidden',
                            boxShadow: 1
                          }}
                        >
                          <img
                            src={pkg.image}
                            alt={pkg.name}
                            className="packages-table-image"
                            loading="lazy"
                          />
                        </Box>
                      ) : (
                        <Box
                          className="packages-image-box-placeholder"
                          sx={{
                            width: 80,
                            height: 60,
                            borderRadius: 1,
                            bgcolor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '24px'
                          }}
                        >
                          📦
                        </Box>
                      )}
                    </TableCell>
                    <TableCell className='packages-table-cell-name'>
                      <Typography fontWeight={700} color='primary.main'>
                        {pkg.name}
                      </Typography>
                    </TableCell>
                    <TableCell className='packages-table-cell-duration'>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <DurationIcon
                          className='packages-duration-icon'
                          fontSize='small'
                        />
                        {pkg.duration}
                      </Box>
                    </TableCell>
                    <TableCell className='packages-table-cell-price'>
                      ${pkg.price}
                    </TableCell>
                    <TableCell className='packages-table-cell-hotels'>
                      {(() => {
                        const hotel = hotels.find(h => h.id === pkg.hotelId);
                        return hotel ? (
                          <Chip label={hotel.name} size="small" variant="outlined" />
                        ) : null;
                      })()}
                    </TableCell>
                    <TableCell className='packages-table-cell-description'>
                      <Typography variant='body2'>{pkg.description}</Typography>
                      <Typography
                        variant='caption'
                        className='packages-features-text'>
                        {pkg.features}
                      </Typography>
                    </TableCell>
                    <TableCell className='packages-table-cell-transportation'>
                      <Typography variant='body2'>
                        {pkg.transportation}
                      </Typography>
                    </TableCell>
                    <TableCell className='packages-table-cell-services'>
                      <Typography variant='body2'>{pkg.services}</Typography>
                    </TableCell>
                    <TableCell className='packages-table-cell'>
                      {getStatusChip(pkg.status)}
                    </TableCell>
                    <TableCell className='packages-table-cell-actions'>
                      <IconButton
                        size='small'
                        color='primary'
                        onClick={() => handleOpenDialog(pkg)}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                      <IconButton
                        size='small'
                        color='error'
                        onClick={() => handleDelete(pkg.id)}>
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
        PaperProps={{ className: "packages-dialog-paper" }}>
        <DialogTitle className='packages-dialog-title'>
          {editingItem ? "تعديل" : "إضافة"} باقة
        </DialogTitle>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSave}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
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
                          <option value='active'>نشط</option>
                          <option value='inactive'>غير نشط</option>
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} display="flex" justifyContent="center">
                    <Box sx={{ position: "relative" }}>
                      {imagePreview ? (
                        <Box
                          sx={{
                            width: 150,
                            height: 120,
                            borderRadius: 2,
                            overflow: 'hidden',
                            boxShadow: 2,
                            mx: 'auto'
                          }}
                        >
                          <img
                            src={imagePreview}
                            alt="Package preview"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </Box>
                      ) : (
                        <Box
                          sx={{
                            width: 150,
                            height: 120,
                            borderRadius: 2,
                            bgcolor: '#e0e0e0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '48px',
                            mx: 'auto'
                          }}
                        >
                          📦
                        </Box>
                      )}
                      <input
                        accept="image/*"
                        type="file"
                        id="package-image-upload"
                        onChange={handleImageChange}
                        style={{ display: "none" }}
                      />
                      <label htmlFor="package-image-upload">
                        <Button variant="outlined" component="span" size="small" sx={{ mt: 1 }}>
                          رفع صورة
                        </Button>
                      </label>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name='duration'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='المدة'
                          placeholder='مثال: 5 أيام / 4 ليالي'
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
                          label='السعر ($)'
                          type='number'
                          error={touched.price && Boolean(errors.price)}
                          helperText={touched.price && errors.price}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name='hotelIds'>
                      {({ field, form }) => (
                        <HotelsSelect
                          field={field}
                          form={form}
                          hotels={hotels}
                          label="الفنادق"
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name='description'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='الوصف'
                          multiline
                          rows={2}
                          error={
                            touched.description && Boolean(errors.description)
                          }
                          helperText={touched.description && errors.description}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name='features'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='المميزات (مفصولة بفواصل)'
                          placeholder='فندق، إفطار، جولات...'
                          error={touched.features && Boolean(errors.features)}
                          helperText={touched.features && errors.features}
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name='transportation'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='وسائل النقل'
                          placeholder='حافلة، سيارة خاصة...'
                          error={
                            touched.transportation &&
                            Boolean(errors.transportation)
                          }
                          helperText={
                            touched.transportation && errors.transportation
                          }
                        />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name='services'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='الخدمات'
                          placeholder='إفطار، جولات، سبا...'
                          error={touched.services && Boolean(errors.services)}
                          helperText={touched.services && errors.services}
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className='packages-dialog-actions'>
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

export default Packages;
