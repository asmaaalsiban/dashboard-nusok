/** @format */

import { useState, useEffect } from "react";
import axios from "axios";
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  CircularProgress,
  Tooltip,
  Paper,
  Rating,
} from "@mui/material";
import {
  Search as SearchIcon,
  RateReview as ReviewIcon,
  Delete as DeleteIcon,
  Star as StarIcon,
} from "@mui/icons-material";
import Swal from "sweetalert2";
import { format } from "date-fns";

const BASE_URL = "http://umrahbooking.runasp.net";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${token}` };

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${BASE_URL}/api/Dashboard/DashbordReviews/GetReviews`,
        { headers }
      );
      setReviews(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Fetch Error:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        backgroundColor: "#f0f2f5",
        minHeight: "100vh",
        direction: "rtl",
      }}>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <ReviewIcon sx={{ fontSize: 40, color: "primary.main" }} />
          <Box>
            <Typography variant='h4' fontWeight='bold'>
              تقييمات العملاء
            </Typography>
            <Typography variant='body2' color='text.secondary'>
              إدارة ومراجعة آراء المعتمرين حول الخدمات
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Main Content Card */}
      <Card sx={{ borderRadius: 3, boxShadow: "0 8px 24px rgba(0,0,0,0.05)" }}>
        <CardContent>
          <TextField
            fullWidth
            placeholder='البحث في التعليقات...'
            sx={{ mb: 3 }}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <SearchIcon color='action' sx={{ ml: 1, mr: 1 }} />
              ),
            }}
          />

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", p: 10 }}>
              <CircularProgress />
            </Box>
          ) : (
            <TableContainer component={Paper} elevation={0}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f8f9fa" }}>
                  <TableRow>
                    <TableCell align='right' sx={{ fontWeight: "bold" }}>
                      التقييم
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: "bold" }}>
                      التعليق
                    </TableCell>
                    <TableCell align='right' sx={{ fontWeight: "bold" }}>
                      تاريخ النشر
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reviews
                    .filter((r) =>
                      r.comment
                        ?.toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((review) => (
                      <TableRow key={review.id} hover>
                        <TableCell align='right'>
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Rating
                              value={review.rating}
                              readOnly
                              precision={0.5}
                              size='small'
                              emptyIcon={
                                <StarIcon
                                  style={{ opacity: 0.55 }}
                                  fontSize='inherit'
                                />
                              }
                            />
                            <Typography
                              variant='body2'
                              sx={{
                                mr: 1,
                                fontWeight: "bold",
                                color: "#f57c00",
                              }}>
                              ({review.rating})
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell align='right' sx={{ maxWidth: 300 }}>
                          <Typography variant='body2' fontWeight='500'>
                            {review.comment}
                          </Typography>
                        </TableCell>

                        <TableCell align='right'>
                          <Typography variant='body2' color='text.secondary'>
                            {format(
                              new Date(review.createdAt),
                              "yyyy/MM/dd - hh:mm a"
                            )}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
              {reviews.length === 0 && !loading && (
                <Box sx={{ textAlign: "center", p: 5 }}>
                  <Typography color='text.secondary'>
                    لا توجد مراجعات متاحة حالياً
                  </Typography>
                </Box>
              )}
            </TableContainer>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Reviews;
