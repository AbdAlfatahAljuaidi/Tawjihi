const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();

const app = express();

// ✅ إعداد CORS الصحيح
const allowedOrigins = [
  "https://tawjihi-3.onrender.com", // موقع الفرونت على Render
  "http://localhost:3000"           // للتجربة المحلية
];

app.use(cors({
  origin: function (origin, callback) {
    // السماح في حال لم يرسل المتصفح Origin (مثل Postman)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = "The CORS policy does not allow access from this origin.";
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

// ✅ الرد على preflight OPTIONS بشكل صحيح
app.options("*", cors({
  origin: allowedOrigins,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
}));

app.use(express.json());

// ✅ المسارات
app.use("/", require("./routes/userRoute"));

// ✅ الاتصال بقاعدة البيانات
mongoose.connect(process.env.DATABASE_URL)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("🚀 Server is ready to take off on port " + process.env.PORT);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection error:", err);
  });
