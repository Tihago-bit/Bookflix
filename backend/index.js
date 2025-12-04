console.log("Intentando iniciar servidor...");
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",//cambiar si es necesario (dependiendo de la configuración de tu MySQL)
  password: "Root", // cambiar si es necesario (dependiendo de la configuración de tu MySQL)
  database: "biblioteca"
});

db.connect((err) => {
  if (err) {
    console.log("❌ Error al conectar a MySQL:", err.message);
  } else {
    console.log("✅ Conectado a MySQL");
  }
});

// Registro
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.json({ success: false, message: "Completa todos los campos" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  db.query(
    "INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)",
    [username, email, hashedPassword],
    (err) => {
      if (err) return res.json({ success: false, message: "Error al registrar usuario" });

      return res.json({ success: true, message: "Usuario registrado con éxito" });
    }
  );
});

// Login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM usuarios WHERE email = ?", [email], async (err, result) => {
    if (err) return res.json({ success: false, message: "Error en la base de datos" });
    if (result.length === 0) return res.json({ success: false, message: "Usuario no encontrado" });

    const user = result[0];
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ success: false, message: "Contraseña incorrecta" });
    }

    res.json({
      success: true,
      message: `Bienvenido ${user.username}!`,
      user: { id: user.id, username: user.username, email: user.email }
    });
  });
});

// Encender servidor
app.listen(3001, () => {
  console.log("🚀 Servidor backend corriendo en http://localhost:3001");
});
