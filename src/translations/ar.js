/** @format */

export const translations = {
  // Common
  common: {
    add: "إضافة",
    edit: "تعديل",
    delete: "حذف",
    save: "حفظ",
    cancel: "إلغاء",
    search: "بحث",
    actions: "الإجراءات",
    status: "الحالة",
    active: "نشط",
    inactive: "غير نشط",
    loading: "جاري التحميل...",
    saving: "جاري الحفظ...",
    confirm: "تأكيد",
    confirmDelete: "هل أنت متأكد من الحذف؟",
  },

  // Login
  login: {
    title: "تسجيل دخول  الادمن",
    subtitle: "سجل الدخول للوصول إلى لوحة التحكم",
    email: "البريد الإلكتروني",
    emailPlaceholder: "admin@nusok.com",
    password: "كلمة المرور",
    passwordPlaceholder: "أدخل كلمة المرور",
    signIn: "تسجيل الدخول",
    signingIn: "جاري تسجيل الدخول...",
    demoCredentials: "بيانات التجربة:",
    invalidCredentials: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
  },

  // Dashboard Layout
  layout: {
    dashboard: "لوحة التحكم",
    bookings: "الحجوزات",
    users: "المستخدمين",
    hotels: "الفنادق",
    packages: "الباقات",
    settings: "الإعدادات",
    logout: "تسجيل خروج",
    adminUser: "مستخدم الادمن",
    adminDashboard: "لوحة تحكم الادمن",
  },

  // Dashboard Home
  dashboard: {
    title: "نظرة عامة على لوحة التحكم",
    subtitle: "تابع حجوزاتك وإيراداتك ومواردك لمحة سريعة",
    totalBookings: "إجمالي الحجوزات",
    confirmedBookings: "المؤكدة",
    canceledBookings: "الملغاة",
    completedBookings: "المكتملة",
    totalRevenue: "إجمالي الإيرادات",
    totalUsers: "إجمالي المستخدمين",
    totalHotels: "إجمالي الفنادق",
    totalPackages: "إجمالي الباقات",
    recentBookings: "الحجوزات الأخيرة",
    addBooking: "إضافة حجز",
    customer: "العميل",
    hotel: "الفندق",
    package: "الباقة",
    amount: "المبلغ",
    monthlyTarget: "الهدف الشهري",
    revenueGoal: "هدف الإيرادات",
    newUsers: "مستخدمين جدد",
    ordersCompleted: "طلبات مكتملة",
    overallProgress: "التقدم العام",
    fromLastMonth: "من الشهر الماضي",
  },

  // Bookings
  bookings: {
    title: "إدارة الحجوزات",
    subtitle: "إدارة جميع حجوزات الفنادق",
    addBooking: "إضافة حجز",
    editBooking: "تعديل الحجز",
    customerName: "اسم العميل",
    email: "البريد الإلكتروني",
    checkIn: "تسجيل الوصول",
    checkOut: "تسجيل المغادرة",
    guests: "عدد الضيوف",
    nights: "ليالي",
    pricePerNight: "السعر لليلة",
    totalAmount: "المبلغ الإجمالي",
  },

  // Users
  users: {
    title: "إدارة المستخدمين",
    subtitle: "إدارة جميع مستخدمي النظام",
    addUser: "إضافة مستخدم",
    editUser: "تعديل المستخدم",
    fullName: "الاسم الكامل",
    phoneNumber: "رقم الهاتف",
    role: "الدور",
    joined: "تاريخ الانضمام",
    bookings: "الحجوزات",
    customer: "عميل",
    vendor: "مورد",
    admin: "مسؤول",
  },

  // Hotels
  hotels: {
    title: "إدارة الفنادق",
    subtitle: "إدارة جميع الفنادق الشريكة",
    addHotel: "إضافة فندق",
    editHotel: "تعديل الفندق",
    hotelName: "اسم الفندق",
    location: "الموقع",
    address: "العنوان الكامل",
    rooms: "عدد الغرف",
    rating: "التقييم",
    amenities: "المرافق",
    pricePerNight: "السعر لليلة ($)",
    amenitiesPlaceholder: "واي فاي، مسبح، صالة رياضية، سبا",
  },

  // Packages
  packages: {
    title: "إدارة الباقات",
    subtitle: "إدارة باقات وعروض السفر",
    addPackage: "إضافة باقة",
    editPackage: "تعديل الباقة",
    packageName: "اسم الباقة",
    duration: "المدة",
    durationPlaceholder: "مثال: 5 أيام / 4 ليالي",
    price: "السعر ($)",
    availableHotels: "الفنادق المتاحة",
    description: "الوصف",
    features: "المميزات",
    featuresPlaceholder: "فندق، إفطار، جولات...",
  },

  // Status
  status: {
    confirmed: "مؤكد",
    canceled: "ملغى",
    completed: "مكتمل",
    pending: "قيد الانتظار",
  },

  // Validation
  validation: {
    required: "مطلوب",
    invalidEmail: "عنوان بريد إلكتروني غير صالح",
    minCharacters: "يجب أن تكون {min} أحرف على الأقل",
    invalidValue: "قيمة غير صالحة",
  },
};

export const t = (key) => {
  const keys = key.split(".");
  let value = translations;
  for (const k of keys) {
    value = value?.[k];
  }
  return value || key;
};
