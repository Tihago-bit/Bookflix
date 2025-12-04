import { useState } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error al conectarse al servidor");
    }
  };

 return (
  <div>
    <form onSubmit={handleRegister}>
      <h2>Registro</h2>   

      <input
        type="text"
        placeholder="Nombre de usuario"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Registrarse</button>
    </form>

    <p>{message}</p>
  </div>
);
}
