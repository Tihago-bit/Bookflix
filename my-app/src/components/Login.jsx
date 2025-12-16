import { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 1. Importante: Importar esto

export default function Login() {
  const navigate = useNavigate(); // 👈 2. Importante: Activar la navegación
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          // 👈 3. Importante: Guardarlo como "user" para que el Catálogo lo lea bien
          localStorage.setItem("user", JSON.stringify(data.user));
          
          alert(data.message);
          navigate("/catalogo"); // ¡Ahora sí funcionará!
        } else {
          alert(data.message); // Mensaje si la contraseña está mal
        }
      })
      .catch((error) => {
        console.error("Detalle del error:", error); // Esto ayuda a ver el error real en consola
        alert("❌ Error al conectar con el servidor");
      });
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <h2>Iniciar Sesión</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Ingresar</button>
    </form>
  );
}