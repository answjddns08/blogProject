import express, { json } from "express";
import cors from "cors";
import postRouter from "./router/postRoute.js";

const app = express();

// CORS 설정
app.use(
	cors({
		origin: ["https://notebook.o-r.kr", "http://localhost:5173"],
		methods: ["GET", "POST", "DELETE", "PUT"],
	})
);

// JSON 파싱 미들웨어
app.use(json());

/*
  JSON 파싱 미들웨어:
  json 형식의 요청을 받아 그걸 javascript 객체로 변환해줌
*/

app.use("/api/posts", postRouter);

app.listen(5000, "127.0.0.1", () => {
	console.log(`Server is running on port 5000`);
});
