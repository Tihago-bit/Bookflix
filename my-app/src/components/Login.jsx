import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message);

        if (data.success) {
          // Guardamos el usuario logeado en localStorage para usarlo luego
          localStorage.setItem("usuarioActivo", JSON.stringify(data.user));

          // Redirigimos al catálogo
          window.location.href = "/catalogo";
        }
      })
      .catch(() => {
        alert("❌ Error al conectar con el servidor");
      });
  };

  return (
    <form onSubmit={handleLogin}>
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
