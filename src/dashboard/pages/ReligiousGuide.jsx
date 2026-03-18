/** @format */

import { useState } from "react";
import "./ReligiousGuide.css";
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
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Switch,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  AutoStories as GuideIcon,
  Female as FemaleIcon,
  ExpandMore as ExpandMoreIcon,
  Lightbulb as TipIcon,
  Bookmark as BookmarkIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from "@mui/icons-material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const ReligiousGuide = () => {
  const [guideItems, setGuideItems] = useState([
    {
      id: 1,
      title: "الإحرام من الميقات",
      titleEn: "Ihram from Miqat",
      category: "ihram",
      type: "instruction",
      description: "يُحرم الحاج من الميقات المحدد له حسب طريق قدومه، ويغتسل ويتطيب ويلبس ملابس الإحرام",
      isForWomen: false,
      womenNote: "",
      importance: "high",
      status: "active",
    },
    {
      id: 2,
      title: "التلبية",
      titleEn: "Talbiyah",
      category: "ihram",
      type: "dua",
      description: "يُسن للمحرم أن يكثر من التلبية بقوله: لبيك اللهم لبيك، لبيك لا شريك لك لبيك، إن الحمد والنعمة لك والملك، لا شريك لك",
      isForWomen: false,
      womenNote: "",
      importance: "high",
      status: "active",
    },
    {
      id: 3,
      title: "طواف القدوم",
      titleEn: "Tawaf al-Qudum",
      category: "tawaf",
      type: "instruction",
      description: "إذا وصل الحاج إلى مكة بدأ بالطواف سبعة أشواط حول الكعبة، يبدأ من الحجر الأسود وينتهي عنده",
      isForWomen: false,
      womenNote: "",
      importance: "high",
      status: "active",
    },
    {
      id: 4,
      title: "أحكام لباس المرأة في الإحرام",
      titleEn: "Women's Ihram Clothing Rules",
      category: "ihram",
      type: "ruling",
      description: "تحرم المرأة في ما شاءت من اللباس الساتر الذي ليس فيه تبرج أو تشبه بالرجال",
      isForWomen: true,
      womenNote: "يجوز للمرأة لبس المخيط ولا يجوز لها تغطية الوجه واليدين",
      importance: "high",
      status: "active",
    },
    {
      id: 5,
      title: "أحكام الطواف للنساء",
      titleEn: "Women's Tawaf Rules",
      category: "tawaf",
      type: "ruling",
      description: "تطوف المرأة مثل الرجل مع مراعاة عدم الزحام والاضطباع",
      isForWomen: true,
      womenNote: "لا يشرع للمرأة الرمل في الطواف ولا الاضطباع",
      importance: "medium",
      status: "active",
    },
    {
      id: 6,
      title: "السعي بين الصفا والمروة",
      titleEn: "Sa'i between Safa and Marwah",
      category: "sai",
      type: "instruction",
      description: "يسعى الحاج بين الصفا والمروة سبعة أشواط، يبدأ بالصفا وينتهي بالمروة",
      isForWomen: false,
      womenNote: "",
      importance: "high",
      status: "active",
    },
    {
      id: 7,
      title: "أحكام السعي للنساء",
      titleEn: "Women's Sa'i Rules",
      category: "sai",
      type: "ruling",
      description: "تسعى المرأة مثل الرجل مع مراعاة عدم الإسراع في المشي",
      isForWomen: true,
      womenNote: "لا يشرع للمرأة الإسراع في المشي بين العلمين الأخضرين",
      importance: "medium",
      status: "active",
    },
    {
      id: 8,
      title: "الوقوف بعرفة",
      titleEn: "Standing at Arafah",
      category: "arafah",
      type: "instruction",
      description: "يقف الحاج بعرفة من بعد صلاة الظهر حتى غروب الشمس، ويكثر من الدعاء والذكر",
      isForWomen: false,
      womenNote: "",
      importance: "high",
      status: "active",
    },
    {
      id: 9,
      title: "نصيحة: الاستغفار بعد الرمي",
      titleEn: "Tip: Istighfar after Stoning",
      category: "minas",
      type: "tip",
      description: "يُستحب للمسلم أن يكثر من الاستغفار بعد رمي الجمرات، فإنه موضع إجابة",
      isForWomen: false,
      womenNote: "",
      importance: "low",
      status: "active",
    },
    {
      id: 10,
      title: "تنبيه: طواف الوداع",
      titleEn: "Warning: Farewell Tawaf",
      category: "general",
      type: "warning",
      description: "طواف الوداع واجب على جميع الحجاج إلا الحائض والنفساء",
      isForWomen: true,
      womenNote: "الحائض والنفساء لا يطوفون طواف الوداع ويغادرون مكة",
      importance: "high",
      status: "active",
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [showWomenOnly, setShowWomenOnly] = useState(false);

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
      setGuideItems(guideItems.map(g => g.id === editingItem.id ? { ...g, ...values } : g));
    } else {
      setGuideItems([...guideItems, { ...values, id: Date.now() }]);
    }
    actions.setSubmitting(false);
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm("هل أنت متأكد من حذف هذا المحتوى؟")) {
      setGuideItems(guideItems.filter(g => g.id !== id));
    }
  };

  const getTypeChip = (type) => {
    const config = {
      instruction: { icon: <InfoIcon />, label: "تعليمات", color: "#dbeafe", text: "#1d4ed8" },
      ruling: { icon: <BookmarkIcon />, label: "حكم شرعي", color: "#fce7f3", text: "#be185d" },
      dua: { icon: <GuideIcon />, label: "دعاء", color: "#d1fae5", text: "#047857" },
      tip: { icon: <TipIcon />, label: "نصيحة", color: "#fef3c7", text: "#b45309" },
      warning: { icon: <WarningIcon />, label: "تنبيه", color: "#fee2e2", text: "#b91c1c" },
    };
    const c = config[type] || config.instruction;
    return (
      <Chip
        icon={c.icon}
        label={c.label}
        size="small"
        className={`guide-type-chip guide-type-${type}`}
        sx={{ backgroundColor: c.color, color: c.text }}
      />
    );
  };

  const getImportanceChip = (importance) => {
    const config = {
      high: { label: "مهم", color: "#fee2e2", text: "#b91c1c" },
      medium: { label: "متوسط", color: "#fef3c7", text: "#b45309" },
      low: { label: "عادي", color: "#e0e7ff", text: "#3730a3" },
    };
    const c = config[importance] || config.medium;
    return <Chip label={c.label} size="small" className="guide-importance-chip" sx={{ backgroundColor: c.color, color: c.text }} />;
  };

  const getCategoryLabel = (category) => {
    const labels = {
      ihram: "الإحرام",
      tawaf: "الطواف",
      sai: "السعي",
      arafah: "عرفة",
      muzdalifah: "مزدلفة",
      minas: "منى",
      general: "عام",
    };
    return labels[category] || category;
  };

  const filteredItems = guideItems.filter(item => {
    const matchesSearch = item.title.includes(searchTerm) ||
      item.description.includes(searchTerm);
    const matchesCategory = !categoryFilter || item.category === categoryFilter;
    const matchesType = !typeFilter || item.type === typeFilter;
    const matchesWomenFilter = !showWomenOnly || item.isForWomen;
    return matchesSearch && matchesCategory && matchesType && matchesWomenFilter;
  });

  const validationSchema = Yup.object({
    title: Yup.string().required("مطلوب"),
    titleEn: Yup.string(),
    type: Yup.string().required("مطلوب"),
    category: Yup.string().required("مطلوب"),
    description: Yup.string().required("مطلوب"),
    isForWomen: Yup.boolean(),
    womenNote: Yup.string(),
    importance: Yup.string().required("مطلوب"),
  });

  const initialValues = editingItem || {
    title: "",
    titleEn: "",
    type: "instruction",
    category: "general",
    description: "",
    isForWomen: false,
    womenNote: "",
    importance: "medium",
    status: "active",
  };

  const categories = [
    { value: "ihram", label: "الإحرام" },
    { value: "tawaf", label: "الطواف" },
    { value: "sai", label: "السعي" },
    { value: "arafah", label: "عرفة" },
    { value: "muzdalifah", label: "مزدلفة" },
    { value: "minas", label: "منى" },
    { value: "general", label: "عام" },
  ];

  const types = [
    { value: "instruction", label: "تعليمات" },
    { value: "ruling", label: "حكم شرعي" },
    { value: "dua", label: "دعاء" },
    { value: "tip", label: "نصيحة" },
    { value: "warning", label: "تنبيه" },
  ];

  return (
    <Box className="guide-container">
      <Box className="guide-header">
        <Box className="guide-title-group">
          <Typography variant="h4" className="guide-title">الدليل الشرعي</Typography>
          <Typography variant="body2" className="guide-subtitle">إدارة المحتوى الشرعي لمناسك العمرة والحج</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()} className="add-guide-btn">
          إضافة محتوى
        </Button>
      </Box>

      {/* Filters */}
      <Card className="guide-filters-card">
        <CardContent>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                placeholder="ابحث بالعنوان أو الوصف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: <SearchIcon className="guide-search-icon" /> }}
                className="guide-search"
              />
            </Grid>
            <Grid item xs={12} md={2.5}>
              <TextField
                select
                fullWidth
                label="القسم"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="guide-category-filter"
              >
                <option value="">جميع الأقسام</option>
                {categories.map(cat => (
                  <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <TextField
                select
                fullWidth
                label="النوع"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="guide-type-filter"
              >
                <option value="">جميع الأنواع</option>
                {types.map(t => (
                  <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={2.5}>
              <FormControlLabel
                control={
                  <Switch
                    checked={showWomenOnly}
                    onChange={(e) => setShowWomenOnly(e.target.checked)}
                    color="primary"
                    icon={<FemaleIcon />}
                  />
                }
                label="للنساء فقط"
                className="guide-women-switch"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card className="guide-card">
        <CardContent>
          <TableContainer className="guide-table-container">
            <Table className="guide-table">
              <TableHead>
                <TableRow>
                  <TableCell className="guide-table-cell-header">النوع</TableCell>
                  <TableCell className="guide-table-cell-header">العنوان</TableCell>
                  <TableCell className="guide-table-cell-header">القسم</TableCell>
                  <TableCell className="guide-table-cell-header">الوصف</TableCell>
                  <TableCell className="guide-table-cell-header">الأهمية</TableCell>
                  <TableCell className="guide-table-cell-header">للنساء</TableCell>
                  <TableCell className="guide-table-cell-header">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell className="guide-table-cell-type">
                      {getTypeChip(item.type)}
                    </TableCell>
                    <TableCell className="guide-table-cell-title">
                      <Box className="guide-title-box">
                        <GuideIcon className="guide-icon" fontSize="small" />
                        <Box>
                          <Typography fontWeight={600} className="guide-item-title">{item.title}</Typography>
                          {item.titleEn && (
                            <Typography variant="caption" className="guide-item-title-en">{item.titleEn}</Typography>
                          )}
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell className="guide-table-cell">
                      <Chip label={getCategoryLabel(item.category)} size="small" className="guide-category-chip" />
                    </TableCell>
                    <TableCell className="guide-table-cell-description">
                      <Typography variant="body2" className="guide-description-text">{item.description}</Typography>
                    </TableCell>
                    <TableCell className="guide-table-cell">
                      {getImportanceChip(item.importance)}
                    </TableCell>
                    <TableCell className="guide-table-cell">
                      {item.isForWomen ? (
                        <Chip
                          icon={<FemaleIcon />}
                          label="خاص بالنساء"
                          size="small"
                          className="guide-women-chip"
                        />
                      ) : (
                        <Typography variant="caption" color="text.secondary">عام</Typography>
                      )}
                    </TableCell>
                    <TableCell className="guide-table-cell-actions">
                      <IconButton size="small" color="primary" onClick={() => handleOpenDialog(item)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton size="small" color="error" onClick={() => handleDelete(item.id)}>
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
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth PaperProps={{ className: "guide-dialog-paper" }}>
        <DialogTitle className="guide-dialog-title">{editingItem ? "تعديل" : "إضافة"} محتوى شرعي</DialogTitle>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSave}>
          {({ errors, touched, isSubmitting, values, setFieldValue }) => (
            <Form>
              <DialogContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Field name="title">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="العنوان (عربي)" error={touched.title && Boolean(errors.title)} helperText={touched.title && errors.title} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Field name="titleEn">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="العنوان (إنجليزي)" error={touched.titleEn && Boolean(errors.titleEn)} helperText={touched.titleEn && errors.titleEn} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="type">
                      {({ field }) => (
                        <TextField {...field} select fullWidth label="النوع" error={touched.type && Boolean(errors.type)} helperText={touched.type && errors.type}>
                          {types.map(t => (
                            <MenuItem key={t.value} value={t.value}>{t.label}</MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="category">
                      {({ field }) => (
                        <TextField {...field} select fullWidth label="القسم" error={touched.category && Boolean(errors.category)} helperText={touched.category && errors.category}>
                          {categories.map(cat => (
                            <MenuItem key={cat.value} value={cat.value}>{cat.label}</MenuItem>
                          ))}
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Field name="importance">
                      {({ field }) => (
                        <TextField {...field} select fullWidth label="الأهمية" SelectProps={{ native: true }} error={touched.importance && Boolean(errors.importance)} helperText={touched.importance && errors.importance}>
                          <option value="high">مهم</option>
                          <option value="medium">متوسط</option>
                          <option value="low">عادي</option>
                        </TextField>
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
                    <Field name="description">
                      {({ field }) => (
                        <TextField {...field} fullWidth label="الوصف" multiline rows={3} error={touched.description && Boolean(errors.description)} helperText={touched.description && errors.description} />
                      )}
                    </Field>
                  </Grid>
                  <Grid item xs={12}>
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
                    <FormControlLabel
                      control={
                        <Switch
                          checked={values.isForWomen}
                          onChange={(e) => setFieldValue("isForWomen", e.target.checked)}
                          color="primary"
                          icon={<FemaleIcon />}
                        />
                      }
                      label="محتوى خاص بالنساء"
                      className="guide-dialog-switch"
                    />
                  </Grid>
                  {values.isForWomen && (
                    <Grid item xs={12}>
                      <Field name="womenNote">
                        {({ field }) => (
                          <TextField {...field} fullWidth label="ملاحظات خاصة بالنساء" multiline rows={2} error={touched.womenNote && Boolean(errors.womenNote)} helperText={touched.womenNote && errors.womenNote} />
                        )}
                      </Field>
                    </Grid>
                  )}
                </Grid>
              </DialogContent>
              <DialogActions className="guide-dialog-actions">
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

export default ReligiousGuide;
