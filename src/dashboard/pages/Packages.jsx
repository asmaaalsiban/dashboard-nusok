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
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const Packages = () => {
  const [packages, setPackages] = useState([
    {
      id: 1,
      name: "اقتصادية",
      duration: "3 أيام / 2 ليلة",
      price: 400,
      hotels: 5,
      description: "باقة أساسية للمسافرين بميزانية محدودة",
      features: "فندق، إفطار، نقل المطار",
      status: "active",
    },
    {
      id: 2,
      name: "قياسية",
      duration: "5 أيام / 4 ليالي",
      price: 800,
      hotels: 10,
      description: "مثالية للعطلات القصيرة",
      features: "فندق، إفطار، جولة بالمدينة، نقل المطار",
      status: "active",
    },
    {
      id: 3,
      name: "ممتازة",
      duration: "7 أيام / 6 ليالي",
      price: 1500,
      hotels: 15,
      description: "اختبر الفخامة والراحة",
      features: "فندق 5 نجوم، جميع الوجبات، جولات خاصة، سبا",
      status: "active",
    },
    {
      id: 4,
      name: "فاخرة",
      duration: "10 أيام / 9 ليالي",
      price: 2500,
      hotels: 20,
      description: "تجربة فاخرة نهائية",
      features: "فندق 5 نجوم+، جميع الوجبات، جولات VIP، سبا، هليكوبتر",
      status: "active",
    },
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
      setPackages(
        packages.map((p) => (p.id === editingItem.id ? { ...p, ...values } : p))
      );
    } else {
      setPackages([...packages, { ...values, id: Date.now() }]);
    }
    actions.setSubmitting(false);
    handleCloseDialog();
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
    hotels: Yup.number().min(1).required("مطلوب"),
    description: Yup.string().required("مطلوب"),
    features: Yup.string().required("مطلوب"),
    status: Yup.string().required("مطلوب"),
  });

  const initialValues = editingItem || {
    name: "",
    duration: "",
    price: 0,
    hotels: 0,
    description: "",
    features: "",
    status: "active",
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
                    اسم الباقة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    المدة
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    السعر
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الفنادق
                  </TableCell>
                  <TableCell className='packages-table-cell-header'>
                    الوصف
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
                    <TableCell className='packages-table-cell'>
                      {pkg.hotels}
                    </TableCell>
                    <TableCell className='packages-table-cell-description'>
                      <Typography variant='body2'>{pkg.description}</Typography>
                      <Typography
                        variant='caption'
                        className='packages-features-text'>
                        {pkg.features}
                      </Typography>
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
                    <Field name='hotels'>
                      {({ field }) => (
                        <TextField
                          {...field}
                          fullWidth
                          label='الفنادق المتاحة'
                          type='number'
                          error={touched.hotels && Boolean(errors.hotels)}
                          helperText={touched.hotels && errors.hotels}
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
