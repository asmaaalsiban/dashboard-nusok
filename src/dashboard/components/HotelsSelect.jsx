/** @format */

import { TextField, MenuItem } from "@mui/material";

const HotelsSelect = ({ field, form, hotels = [], label = "اختر الفندق" }) => {
  return (
    <TextField
      {...field}
      select
      fullWidth
      label={label}
      placeholder="اختر فندقاً..."
      error={form.touched[field.name] && Boolean(form.errors[field.name])}
      helperText={form.touched[field.name] && form.errors[field.name]}
    >
      {hotels.map((hotel) => (
        <MenuItem key={hotel.id} value={hotel.id}>
          {hotel.name} - {hotel.location}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default HotelsSelect;
