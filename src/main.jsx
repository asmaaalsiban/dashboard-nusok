/** @format */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import App from "./App.jsx";

const theme = createTheme({
  direction: "rtl",
  typography: {
    fontFamily: '"Tajawal", "Cairo", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      letterSpacing: 0,
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 800,
      letterSpacing: 0,
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 700,
      letterSpacing: 0,
      fontSize: "1.75rem",
    },
    h4: {
      fontWeight: 700,
      letterSpacing: 0,
      fontSize: "1.5rem",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: 0,
      fontSize: "1.25rem",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: 0,
      fontSize: "1.1rem",
    },
    subtitle1: {
      fontWeight: 600,
      fontSize: "1rem",
    },
    subtitle2: {
      fontWeight: 500,
      fontSize: "0.875rem",
    },
    body1: {
      fontWeight: 400,
      fontSize: "1rem",
      lineHeight: 1.6,
    },
    body2: {
      fontWeight: 400,
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 700,
      textTransform: "none",
      letterSpacing: 0,
      fontSize: "0.9rem",
    },
    caption: {
      fontWeight: 400,
      fontSize: "0.75rem",
    },
  },
  palette: {
    primary: {
      main: "#667eea",
      light: "#8b9ff7",
      lighter: "#a3b3f9",
      dark: "#4f5fcf",
      darker: "#3a47a8",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#764ba2",
      light: "#9b6bc9",
      dark: "#5a3a7d",
      contrastText: "#ffffff",
    },
    success: {
      main: "#11998e",
      light: "#38ef7d",
      lighter: "#a7f3d0",
      dark: "#0a6b62",
      contrastText: "#ffffff",
    },
    warning: {
      main: "#f5576c",
      light: "#f093fb",
      lighter: "#fed7e2",
      dark: "#c4183c",
      contrastText: "#ffffff",
    },
    error: {
      main: "#f5576c",
      light: "#ff7b8a",
      lighter: "#fed7e2",
      dark: "#d41f3a",
      contrastText: "#ffffff",
    },
    info: {
      main: "#4facfe",
      light: "#00f2fe",
      lighter: "#bee3f8",
      dark: "#0088cc",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8f9fc",
      paper: "#ffffff",
      dark: "#e8ebf5",
    },
    text: {
      primary: "#1a202c",
      secondary: "#718096",
      disabled: "#a0aec0",
    },
    divider: "rgba(0, 0, 0, 0.08)",
  },
  shape: {
    borderRadius: 14,
  },
  shadows: [
    "none",
    "0 2px 4px rgba(0,0,0,0.04)",
    "0 4px 8px rgba(0,0,0,0.06)",
    "0 6px 12px rgba(0,0,0,0.08)",
    "0 8px 16px rgba(0,0,0,0.1)",
    "0 10px 20px rgba(0,0,0,0.11)",
    "0 12px 24px rgba(0,0,0,0.12)",
    "0 14px 28px rgba(0,0,0,0.13)",
    "0 16px 32px rgba(0,0,0,0.14)",
    "0 18px 36px rgba(0,0,0,0.15)",
    "0 20px 40px rgba(0,0,0,0.16)",
    "0 22px 44px rgba(0,0,0,0.17)",
    "0 24px 48px rgba(0,0,0,0.18)",
    "0 26px 52px rgba(0,0,0,0.19)",
    "0 28px 56px rgba(0,0,0,0.2)",
    "0 30px 60px rgba(0,0,0,0.21)",
    "0 32px 64px rgba(0,0,0,0.22)",
    "0 34px 68px rgba(0,0,0,0.23)",
    "0 36px 72px rgba(0,0,0,0.24)",
    "0 38px 76px rgba(0,0,0,0.25)",
    "0 40px 80px rgba(0,0,0,0.26)",
    "0 42px 84px rgba(0,0,0,0.27)",
    "0 44px 88px rgba(0,0,0,0.28)",
    "0 46px 92px rgba(0,0,0,0.29)",
    "0 48px 96px rgba(0,0,0,0.3)",
  ],
  spacing: 8,
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "11px 26px",
          fontSize: "0.925rem",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          letterSpacing: 0.3,
        },
        contained: {
          boxShadow: "0 4px 14px rgba(102, 126, 234, 0.32)",
          "&:hover": {
            boxShadow: "0 6px 22px rgba(102, 126, 234, 0.42)",
            transform: "translateY(-2px)",
          },
        },
        outlined: {
          borderWidth: "1.5px",
          "&:hover": {
            borderWidth: "1.5px",
          },
        },
        sizeSmall: {
          padding: "7px 16px",
          fontSize: "0.8rem",
        },
        sizeLarge: {
          padding: "13px 30px",
          fontSize: "1rem",
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 18,
          overflow: "hidden",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 22,
          "&:last-child": {
            paddingBottom: 22,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          fontWeight: 700,
          fontSize: "0.75rem",
          letterSpacing: 0.3,
        },
        sizeSmall: {
          height: 26,
          fontSize: "0.7rem",
        },
        sizeMedium: {
          height: 32,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          padding: "16px 22px",
          borderBottom: "1px solid rgba(0,0,0,0.05)",
        },
        head: {
          fontWeight: 700,
          fontSize: "0.8rem",
          backgroundColor: "rgba(0,0,0,0.02)",
        },
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          fontWeight: 700,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontWeight: 700,
          fontSize: "0.65rem",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundImage: "none",
        },
        elevation1: {
          boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          margin: "2px 0",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 42,
          color: "inherit",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          margin: 0,
        },
        primary: {
          margin: 0,
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          fontSize: "0.8rem",
          fontWeight: 600,
          borderRadius: 8,
          padding: "8px 14px",
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 4,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        size: "medium",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: "0.95rem",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontSize: "0.9rem",
          fontWeight: 600,
        },
      },
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>
);
