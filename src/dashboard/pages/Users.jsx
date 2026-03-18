/** @format */

import { useState } from "react";
import "./Users.css";
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
  Avatar,
  MenuItem,
} from "@mui/material";
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon, Search as SearchIcon } from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Reference data for countries
const COUNTRIES = [
  { id: 1, name: "المملكة العربية السعودية", nameEn: "Saudi Arabia", code: "SA", flag: "🇸🇦" },
  { id: 2, name: "مصر", nameEn: "Egypt", code: "EG", flag: "🇪🇬" },
  { id: 3, name: "الإمارات", nameEn: "UAE", code: "AE", flag: "🇦🇪" },
  { id: 4, name: "الكويت", nameEn: "Kuwait", code: "KW", flag: "🇰🇼" },
  { id: 5, name: "قطر", nameEn: "Qatar", code: "QA", flag: "🇶🇦" },
  { id: 6, name: "البحرين", nameEn: "Bahrain", code: "BH", flag: "🇧🇭" },
  { id: 7, name: "عمان", nameEn: "Oman", code: "OM", flag: "🇴🇲" },
  { id: 8, name: "الأردن", nameEn: "Jordan", code: "JO", flag: "🇯🇴" },
  { id: 9, name: "فلسطين", nameEn: "Palestine", code: "PS", flag: "🇵🇸" },
  { id: 10, name: "العراق", nameEn: "Iraq", code: "IQ", flag: "🇮🇶" },
  { id: 11, name: "اليمن", nameEn: "Yemen", code: "YE", flag: "🇾🇪" },
  { id: 12, name: "تركيا", nameEn: "Turkey", code: "TR", flag: "🇹🇷" },
  { id: 13, name: "إندونيسيا", nameEn: "Indonesia", code: "ID", flag: "🇮🇩" },
  { id: 14, name: "ماليزيا", nameEn: "Malaysia", code: "MY", flag: "🇲🇾" },
  { id: 15, name: "باكستان", nameEn: "Pakistan", code: "PK", flag: "🇵🇰" },
  { id: 16, name: "الهند", nameEn: "India", code: "IN", flag: "🇮🇳" },
  { id: 17, name: "بنغلاديش", nameEn: "Bangladesh", code: "BD", flag: "🇧🇩" },
  { id: 18, name: "نيجيريا", nameEn: "Nigeria", code: "NG", flag: "🇳🇬" },
  { id: 19, name: "المغرب", nameEn: "Morocco", code: "MA", flag: "🇲🇦" },
  { id: 20, name: "دول أخرى", nameEn: "Other", code: "OT", flag: "🌍" },
];

// Saudi Arabian cities for Umrah
const SAUDI_CITIES = [
  { id: 1, name: "مكة المكرمة", nameEn: "Makkah" },
  { id: 2, name: "المدينة المنورة", nameEn: "Madinah" },
  { id: 3, name: "جدة", nameEn: "Jeddah" },
  { id: 4, name: "الرياض", nameEn: "Riyadh" },
  { id: 5, name: "الدمام", nameEn: "Dammam" },
  { id: 6, name: "الطائف", nameEn: "Taif" },
  { id: 7, name: "ينبع", nameEn: "Yanbu" },
  { id: 8, name: "الخبر", nameEn: "Khobar" },
  { id: 9, name: "تبوك", nameEn: "Tabuk" },
  { id: 10, name: "أبها", nameEn: "Abha" },
];

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "أحمد حسن", email: "ahmed@email.com", phone: "+20 123 456 7890", role: "customer", tripRating: 4.5, joined: "2024-01-15", bookings: 5, countryId: 2, countryName: "مصر", cityId: 1, cityName: "مكة المكرمة" },
    { id: 2, name: "فاطمة علي", email: "fatima@email.com", phone: "+20 111 222 3333", role: "customer", tripRating: 5.0, joined: "2024-02-20", bookings: 3, countryId: 2, countryName: "مصر", cityId: 2, cityName: "المدينة المنورة" },
    { id: 3, name: "محمد عمر", email: "mohammed@email.com", phone: "+20 100 999 8888", role: "vendor", tripRating: 0, joined: "2024-01-10", bookings: 0, countryId: 1, countryName: "المملكة العربية السعودية", cityId: 3, cityName: "جدة" },
    { id: 4, name: "سارة إبراهيم", email: "sarah@email.com", phone: "+20 150 777 6666", role: "customer", tripRating: 3.5, joined: "2024-03-05", bookings: 2, countryId: 4, countryName: "الكويت", cityId: 1, cityName: "مكة المكرمة" },
    { id: 5, name: "خالد يوسف", email: "khaled@email.com", phone: "+20 120 555 4444", role: "customer", tripRating: 4.0, joined: "2024-02-28", bookings: 4, countryId: 5, countryName: "قطر", cityId: 2, cityName: "المدينة المنورة" },
    { id: 6, name: "نور خليل", email: "nour@email.com", phone: "+20 180 333 2222", role: "admin", tripRating: 0, joined: "2024-01-01", bookings: 0, countryId: 1, countryName: "المملكة العربية السعودية", cityId: 4, cityName: "الرياض" },
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
      setUsers(users.map(u => u.id === editingItem.id ? { ...u, ...values } : u));
    } else {
      setUsers([...users, { ...values, id: Date.now(), joined: new Date().toISOString().split("T")[0], bookings: 0 }]);
    }
    actions.setSubmitting(false);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المستخدم؟")) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  const getRoleChip = (role) => {
    const config = {
      admin: { color: "#667eea", text: "#ffffff", label: "مسؤول" },
      vendor: { color: "#f093fb", text: "#ffffff", label: "مورد" },
      customer: { color: "#4facfe", text: "#ffffff", label: "عميل" },
    };
    const c = config[role] || config.customer;
    const chipClass = `users-role-chip users-role-${role}`;
    return <Chip label={c.label} size="small" className={chipClass} />;
  };

  const getStatusChip = (rating) => {
    if (rating === 0) {
      return <Chip label="—" size="small" className="users-rating-chip users-rating-none" />;
    }
    const color = rating >= 4.5 ? "#a7f3d0" : rating >= 3.5 ? "#fef3c7" : "#fed7d7";
    const textColor = rating >= 4.5 ? "#0a6b62" : rating >= 3.5 ? "#975a16" : "#c53030";
    return (
      <Chip 
        label={`${rating.toFixed(1)} ⭐`} 
        size="small" 
        className="users-rating-chip"
        style={{ backgroundColor: color, color: textColor }}
      />
    );
  };

  const filteredUsers = users.filter(u =>
    u.name.includes(searchTerm) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.phone.includes(searchTerm)
  );

  const validationSchema = Yup.object({
    name: Yup.string().required("مطلوب"),
    email: Yup.string().email("بريد إلكتروني غير صالح").required("مطلوب"),
    phone: Yup.string().required("مطلوب"),
    role: Yup.string().required("مطلوب"),
    tripRating: Yup.number().min(0).max(5).required("مطلوب"),
    countryId: Yup.number().required("مطلوب"),
    cityId: Yup.number().required("مطلوب"),
  });

  const initialValues = editingItem || {
    name: "",
    email: "",
    phone: "",
    role: "customer",
    tripRating: 0,
    countryId: "",
    cityId: "",
  };

  return (
    <Box className="users-container">
      <Box className="users-header">
        <Box className="users-title-group">
          <Typography variant="h4" className="users-title">إدارة المستخدمين</Typography>
          <Typography variant="body2" className="users-subtitle">إدارة جميع مستخدمي النظام</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>
          إضافة مستخدم
        </Button>
      </Box>

      <Card className="users-card">
        <CardContent>
          <TextField
            fullWidth
            placeholder="ابحث بالاسم أو البريد الإلكتروني أو الهاتف..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{ startAdornment: <SearchIcon className="users-search-icon" /> }}
            className="users-search"
          />
          <TableContainer className="users-table-container">
            <Table className="users-table">
              <TableHead>
                <TableRow>
                  <TableCell className="users-table-cell-header">المستخدم</TableCell>
                  <TableCell className="users-table-cell-header">معلومات الاتصال</TableCell>
                  <TableCell className="users-table-cell-header">الدولة</TableCell>
                  <TableCell className="users-table-cell-header">المدينة</TableCell>
                  <TableCell className="users-table-cell-header">الدور</TableCell>
                  <TableCell className="users-table-cell-header">تقييم الرحلات</TableCell>
                  <TableCell className="users-table-cell-header">تاريخ الانضمام</TableCell>
                  <TableCell className="users-table-cell-header">الحجوزات</TableCell>
                  <TableCell className="users-table-cell-header">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} hover>
                    <TableCell className="users-table-cell-name">
                      <Box className="users-name-box">
                        <Avatar className="users-avatar">
                          {user.name.charAt(0)}
                        </Avatar>
                        <Typography fontWeight={600}>{user.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell className="users-table-cell-contact">
                      <Typography variant="body2">{user.email}</Typography>
                      <Typography variant="caption" className="users-contact-text">{user.phone}</Typography>
                    </TableCell>
                    <TableCell className="users-table-cell-country">
                      {user.countryId && COUNTRIES.find(c => c.id === user.countryId) && (
                        <Box className="users-country-box">
                          <Typography className="users-country-flag">
                            {COUNTRIES.find(c => c.id === user.countryId)?.flag}
                          </Typography>
                          <Typography fontWeight={600}>{user.countryName}</Typography>
                        </Box>
                      )}
                    </TableCell>
                    <TableCell className="users-table-cell-city">{user.cityName || "-"}</TableCell>
                    <TableCell className="users-table-cell-role">{getRoleChip(user.role)}</TableCell>
                    <TableCell className="users-table-cell-status">{getStatusChip(user.tripRating)}</TableCell>
                    <TableCell className="users-table-cell">{user.joined}</TableCell>
                    <TableCell className="users-table-cell-bookings">{user.bookings}</TableCell>
                    <TableCell className="users-table-cell-actions">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(user)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(user.id)}>
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth PaperProps={{ className: "users-dialog-paper" }}>
        <DialogTitle className="users-dialog-title">{editingItem ? "تعديل" : "إضافة"} مستخدم</DialogTitle>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
          {({ errors, touched, isSubmitting }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Field name="name">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="الاسم الكامل" error={touched.name && Boolean(errors.name)} helperText={touched.name && errors.name} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="email">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="البريد الإلكتروني" type="email" error={touched.email && Boolean(errors.email)} helperText={touched.email && errors.email} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="phone">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="رقم الهاتف" error={touched.phone && Boolean(errors.phone)} helperText={touched.phone && errors.phone} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="countryId">
                      {({ field }) => (
                        <TextField 
                          {...field} 
                          select 
                          fullWidth 
                          label="دولة الإقامة" 
                          error={touched.countryId && Boolean(errors.countryId)} 
                          helperText={touched.countryId && errors.countryId}
                        >
                          {COUNTRIES.map(country => (
                            <MenuItem key={country.id} value={country.id}>
                              {country.flag} {country.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="cityId">
                      {({ field }) => (
                        <TextField 
                          {...field} 
                          select 
                          fullWidth 
                          label="المدينة في السعودية" 
                          error={touched.cityId && Boolean(errors.cityId)} 
                          helperText={touched.cityId && errors.cityId}
                        >
                          {SAUDI_CITIES.map(city => (
                            <MenuItem key={city.id} value={city.id}>{city.name}</MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="role">
                      {({ field }) => (
                        <TextField {...field} select fullWidth label="الدور" SelectProps={{ native: true }} error={touched.role && Boolean(errors.role)} helperText={touched.role && errors.role}>
                          <option value="customer">عميل</option>
                          <option value="vendor">مورد</option>
                          <option value="admin">مسؤول</option>
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="tripRating">
                      {({ field }) => (
                        <TextField 
                          {...field} 
                          fullWidth 
                          label="تقييم الرحلات" 
                          type="number" 
                          InputProps={{ inputProps: { min: 0, max: 5, step: 0.1 } }}
                          error={touched.tripRating && Boolean(errors.tripRating)} 
                          helperText={touched.tripRating && errors.tripRating} 
                        />
                      )}
                    </Field>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions className="users-dialog-actions">
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

export default Users;
