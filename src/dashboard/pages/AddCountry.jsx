/** @format */

import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Alert,
} from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";

const AddCountry = ({ onCountryAdded }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
  });
  const handleOpen = () => {
    setOpen(true);
    setError(null);
  };
  const handleClose = () => {
    setOpen(false);
    setFormData({ name: "", code: "" });
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    // 1. تنبيه التحميل بشكل احترافي
    Swal.fire({
      title: "جاري الحفظ",
      html: "يتم الآن تسجيل البيانات في النظام...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      setError(null);
      const token = localStorage.getItem("token");
      await axios.post(
        "http://umrahbooking.runasp.net/api/Dashboard/DashbordCountries/CreateCounty",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // 2. تنبيه النجاح بتصميم عصري (Toast أو Center)
      Swal.fire({
        icon: "success",
        title: "تمت الإضافة بنجاح",
        text: `تم تسجيل ${formData.name} في قائمة الدول.`,
        confirmButtonColor: "#2e7d32", // لون MUI Success
        confirmButtonText: "حسناً",
        timer: 2500,
        showClass: {
          popup: "animate__animated animate__fadeInDown", // إضافة انيميشن لو عندك مكتبة animate.css
        },
      });

      handleClose();
      if (onCountryAdded) onCountryAdded();
    } catch (err) {
      let errorMessage = "حدث خطأ غير متوقع";

      if (err.response && err.response.data.errors) {
        const serverErrors = err.response.data.errors;
        errorMessage =
          serverErrors["Code.Length"]?.[0] || "تأكد من صحة البيانات المدخلة";
      }

      // 3. تنبيه الخطأ بتصميم واضح
      Swal.fire({
        icon: "error",
        title: "فشلت العملية",
        text: errorMessage,
        confirmButtonColor: "#d32f2f", // لون MUI Error
        confirmButtonText: "إغلاق",
        footer:
          '<span style="color: #d32f2f">يرجى التأكد من كود الدولة (3 أحرف بحد أقصى)</span>',
      });

      setError(errorMessage);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button
        variant='contained'
        color='primary'
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ borderRadius: 2, textTransform: "none", fontWeight: "bold" }}>
        إضافة دولة جديدة
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        disableEnforceFocus // أضف هذا السطر
        disableRestoreFocus
        fullWidth
        maxWidth='xs'
        PaperProps={{ sx: { borderRadius: 3 } }} // حواف ناعمة للديالوج
      >
        <DialogTitle
          sx={{ textAlign: "center", fontWeight: "bold", bgcolor: "#f5f5f5" }}>
          إضافة دولة جديدة
        </DialogTitle>

        <DialogContent sx={{ mt: 2 }}>
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2.5, mt: 1 }}>
            {/* بقاء الـ Alert الداخلي للخطأ السريع */}
            {error && (
              <Alert severity='error' variant='filled' sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              label='اسم الدولة'
              name='name'
              fullWidth
              variant='outlined'
              value={formData.name}
              onChange={handleChange}
            />

            <TextField
              label='كود الدولة (Code)'
              name='code'
              fullWidth
              value={formData.code}
              onChange={handleChange}
              inputProps={{
                maxLength: 3,
                style: { textTransform: "uppercase" },
              }}
              helperText='مثال: SA, EG, UAE'
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, justifyContent: "space-between" }}>
          <Button
            onClick={handleClose}
            color='inherit'
            variant='text'
            sx={{ fontWeight: "bold" }}>
            إلغاء
          </Button>
          <Button
            onClick={handleSubmit}
            variant='contained'
            color='success'
            disabled={!formData.name || !formData.code}
            sx={{ px: 4, borderRadius: 2, fontWeight: "bold" }}>
            حفظ البيانات
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AddCountry;
