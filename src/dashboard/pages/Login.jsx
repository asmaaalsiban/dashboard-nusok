/** @format */

// /** @format */

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import {
//   Box,
//   Card,
//   CardContent,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   InputAdornment,
//   IconButton,
// } from "@mui/material";
// import {
//   Visibility,
//   VisibilityOff,
//   Login as LoginIcon,
// } from "@mui/icons-material";
// import { useAuth } from "../context/useAuth";

// const LoginSchema = Yup.object().shape({
//   email: Yup.string()
//     .email("عنوان بريد إلكتروني غير صالح")
//     .required("البريد الإلكتروني مطلوب"),
//   password: Yup.string()
//     .min(6, "كلمة المرور يجب أن تكون ٦ أحرف على الأقل")
//     .required("كلمة المرور مطلوبة"),
// });

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useAuth();
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState("");

//   const handleLogin = async (values, { setSubmitting }) => {
//     setError("");
//     try {
//       await login(values.email, values.password);
//       navigate("/dashboard", { replace: true });
//     } catch (err) {
//       setError(err.message || "فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//         padding: 2,
//       }}>
//       <Card
//         sx={{
//           width: "100%",
//           maxWidth: 420,
//           borderRadius: 4,
//           boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
//         }}>
//         <CardContent sx={{ padding: 4 }}>
//           {/* Header */}
//           <Box sx={{ textAlign: "center", marginBottom: 3 }}>
//             <Box
//               sx={{
//                 width: 70,
//                 height: 70,
//                 borderRadius: 3,
//                 background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 margin: "0 auto 16px",
//                 boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//               }}>
//               <LoginIcon sx={{ fontSize: 36, color: "white" }} />
//             </Box>
//             <Typography variant='h4' fontWeight={700}>
//               تسجيل دخول المسؤول
//             </Typography>
//             <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
//               سجل الدخول للوصول إلى لوحة التحكم
//             </Typography>
//           </Box>

//           {/* Error Alert */}
//           {error && (
//             <Alert severity='error' sx={{ marginBottom: 2 }}>
//               {error}
//             </Alert>
//           )}

//           {/* Login Form */}
//           <Formik
//             initialValues={{ email: "", password: "" }}
//             validationSchema={LoginSchema}
//             onSubmit={handleLogin}>
//             {({ errors, touched, isSubmitting }) => (
//               <Form>
//                 {/* Email Field */}
//                 <Field name='email'>
//                   {({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label='البريد الإلكتروني'
//                       type='email'
//                       placeholder='admin@gmail.com'
//                       error={touched.email && Boolean(errors.email)}
//                       helperText={touched.email && errors.email}
//                       sx={{ marginBottom: 2 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position='start'>
//                             <svg
//                               width='20'
//                               height='20'
//                               viewBox='0 0 24 24'
//                               fill='none'
//                               stroke='currentColor'
//                               strokeWidth='2'>
//                               <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
//                               <polyline points='22,6 12,13 2,6' />
//                             </svg>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   )}
//                 </Field>

//                 {/* Password Field */}
//                 <Field name='password'>
//                   {({ field }) => (
//                     <TextField
//                       {...field}
//                       fullWidth
//                       label='كلمة المرور'
//                       type={showPassword ? "text" : "password"}
//                       placeholder='أدخل كلمة المرور'
//                       error={touched.password && Boolean(errors.password)}
//                       helperText={touched.password && errors.password}
//                       sx={{ marginBottom: 2 }}
//                       InputProps={{
//                         startAdornment: (
//                           <InputAdornment position='start'>
//                             <svg
//                               width='20'
//                               height='20'
//                               viewBox='0 0 24 24'
//                               fill='none'
//                               stroke='currentColor'
//                               strokeWidth='2'>
//                               <rect
//                                 x='3'
//                                 y='11'
//                                 width='18'
//                                 height='11'
//                                 rx='2'
//                                 ry='2'
//                               />
//                               <path d='M7 11V7a5 5 0 0 1 10 0v4' />
//                             </svg>
//                           </InputAdornment>
//                         ),
//                         endAdornment: (
//                           <InputAdornment position='end'>
//                             <IconButton
//                               onClick={() => setShowPassword(!showPassword)}
//                               edge='end'
//                               size='small'>
//                               {showPassword ? (
//                                 <VisibilityOff fontSize='small' />
//                               ) : (
//                                 <Visibility fontSize='small' />
//                               )}
//                             </IconButton>
//                           </InputAdornment>
//                         ),
//                       }}
//                     />
//                   )}
//                 </Field>

//                 {/* Submit Button */}
//                 <Button
//                   type='submit'
//                   variant='contained'
//                   fullWidth
//                   size='large'
//                   disabled={isSubmitting}
//                   sx={{
//                     padding: "14px",
//                     fontSize: "1rem",
//                     fontWeight: 700,
//                     background:
//                       "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
//                     boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
//                     "&:hover": {
//                       boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
//                       transform: "translateY(-2px)",
//                     },
//                     "&:disabled": {
//                       opacity: 0.7,
//                       transform: "none",
//                     },
//                   }}>
//                   {isSubmitting ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
//                 </Button>
//               </Form>
//             )}
//           </Formik>

//           {/* Demo Credentials */}
//           {/* <Box
//             sx={{
//               marginTop: 3,
//               padding: 2,
//               backgroundColor: "#f8f9fc",
//               borderRadius: 2,
//               border: "1px solid #e8ebf5",
//             }}
//           >
//             <Typography variant="caption" color="text.secondary" fontWeight={600}>
//               بيانات التجربة:
//             </Typography>
//             <Typography variant="caption" color="text.secondary" display="block">
//               البريد الإلكتروني: admin@nusok.com
//             </Typography>
//             <Typography variant="caption" color="text.secondary" display="block">
//               كلمة المرور: admin123
//             </Typography>
//           </Box> */}
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default Login;

/** @format */

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Login as LoginIcon,
} from "@mui/icons-material";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("عنوان بريد إلكتروني غير صالح")
    .required("البريد الإلكتروني مطلوب"),
  password: Yup.string()
    .min(6, "كلمة المرور يجب أن تكون ٦ أحرف على الأقل")
    .required("كلمة المرور مطلوبة"),
});

const Login = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleLogin = async (values, { setSubmitting }) => {
    setError("");
    try {
      const API_URL = "http://umrahbooking.runasp.net/api/Auth/login";
      const response = await axios.post(
        API_URL,
        {
          email: values.email,
          password: values.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // تأكد من أن التوكن موجود في الرد
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        console.log("Login Successful, redirecting...");
        navigate("/dashboard", { replace: true });
      } else {
        setError("فشل تسجيل الدخول: لم يتم استلام رمز التحقق");
      }
    } catch (err) {
      console.error("Login Error:", err); // ليظهر لك الخطأ بالتفصيل في Console المتصفح
      if (err.response) {
        setError(
          err.response.data.message ||
            "البريد الإلكتروني أو كلمة المرور غير صحيحة"
        );
      } else if (err.request) {
        setError("لا يمكن الوصول للسيرفر، تأكد من اتصال الإنترنت");
      } else {
        setError("حدث خطأ غير متوقع، حاول مرة أخرى");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        padding: 2,
      }}>
      <Card
        sx={{
          width: "100%",
          maxWidth: 420,
          borderRadius: 4,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}>
        <CardContent sx={{ padding: 4 }}>
          {/* Header */}
          <Box sx={{ textAlign: "center", marginBottom: 3 }}>
            <Box
              sx={{
                width: 70,
                height: 70,
                borderRadius: 3,
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
              }}>
              <LoginIcon sx={{ fontSize: 36, color: "white" }} />
            </Box>
            <Typography variant='h4' fontWeight={700}>
              تسجيل دخول المسؤول
            </Typography>
            <Typography variant='body2' color='text.secondary' sx={{ mt: 1 }}>
              سجل الدخول للوصول إلى لوحة التحكم
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity='error' sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          {/* Login Form */}
          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={handleLogin}>
            {({ errors, touched, isSubmitting }) => (
              <Form>
                {/* Email Field */}
                <Field name='email'>
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='البريد الإلكتروني'
                      type='email'
                      placeholder='admin@nusok.com'
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      sx={{ marginBottom: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'>
                              <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
                              <polyline points='22,6 12,13 2,6' />
                            </svg>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                {/* Password Field */}
                <Field name='password'>
                  {({ field }) => (
                    <TextField
                      {...field}
                      fullWidth
                      label='كلمة المرور'
                      type={showPassword ? "text" : "password"}
                      placeholder='أدخل كلمة المرور'
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                      sx={{ marginBottom: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <svg
                              width='20'
                              height='20'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'>
                              <rect
                                x='3'
                                y='11'
                                width='18'
                                height='11'
                                rx='2'
                                ry='2'
                              />
                              <path d='M7 11V7a5 5 0 0 1 10 0v4' />
                            </svg>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position='end'>
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge='end'
                              size='small'>
                              {showPassword ? (
                                <VisibilityOff fontSize='small' />
                              ) : (
                                <Visibility fontSize='small' />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                </Field>

                {/* Submit Button */}
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  size='large'
                  disabled={isSubmitting}
                  sx={{
                    padding: "14px",
                    fontSize: "1rem",
                    fontWeight: 700,
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    boxShadow: "0 8px 20px rgba(102, 126, 234, 0.4)",
                    "&:hover": {
                      boxShadow: "0 12px 28px rgba(102, 126, 234, 0.5)",
                      transform: "translateY(-2px)",
                    },
                    "&:disabled": {
                      opacity: 0.7,
                      transform: "none",
                    },
                  }}>
                  {isSubmitting ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "تسجيل الدخول"
                  )}
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
