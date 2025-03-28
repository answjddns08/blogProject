const express = require("express");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// CORS 설정
app.use(
  cors({
    origin: ["https://notebook.o-r.kr", "http://localhost:5173"],
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);

// JSON 파싱 미들웨어
app.use(express.json());

// 라우트 설정
app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

// 서버 시작
const PORT = process.env.PORT || 5000;
app.listen(PORT, "127.0.0.1", () => {
  console.log(`Server is running on port ${PORT}`);
});
