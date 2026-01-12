const express = require('express');
const pool = require('./db'); // ⭐ เพิ่ม
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/login', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="th">
    <head>
        <meta charset="UTF-8">
        <title>Teacher Login</title>
        <link rel="stylesheet" href="/login.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </head>
    <body>

    <div class="login-container">
        <h2>เข้าใช้ระบบตารางสอน</h2>

        <form id="loginForm">
            <label>ชื่อผู้ใช้</label>
            <input type="text" id="username" required>

            <label>รหัสผ่าน</label>
            <input type="password" id="password" required>

            <button type="submit">ตรวจสอบ</button>
        </form>
    </div>

    <script>
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const res = await fetch('/check', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const result = await res.json();

            if (result.success) {
                Swal.fire('สำเร็จ', 'ยืนยันตัวตนอาจารย์เรียบร้อย', 'success');
            } else {
                Swal.fire('ผิดพลาด', 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
            }
        });
    </script>

    </body>
    </html>
    `);
});

// ⭐ เช็คจาก DATABASE
app.post('/check', async (req, res) => {
    const { username, password } = req.body;
    let conn;

    try {
        conn = await pool.getConnection();

        const rows = await conn.query(
            'SELECT * FROM teacher WHERE username = ? AND password = ?',
            [username, password]
        );

        if (rows.length > 0) {
            res.json({ success: true });
        } else {
            res.json({ success: false });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    } finally {
        if (conn) conn.release();
    }
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
