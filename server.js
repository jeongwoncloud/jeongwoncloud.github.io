const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();
const PORT = 3000;

// 파일 저장 설정
const storage = multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
        cb(null, "index.html");  // 항상 같은 이름으로 저장
    }
});

const upload = multer({ storage: storage });

app.use(express.static("public"));  // 정적 파일 제공
app.use("/uploads", express.static("uploads"));  // 업로드된 파일 제공

// 파일 업로드 API
app.post("/upload", upload.single("htmlFile"), (req, res) => {
    if (req.file) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// 로컬 실행 API
app.get("/install", (req, res) => {
    res.json({ success: true, filename: "index.html" });
});

// 서버 실행
app.listen(PORT, () => {
    console.log(`서버 실행 중: http://localhost:${PORT}`);
});
