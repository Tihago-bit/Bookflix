import { Link } from "react-router-dom";
import Login from "../components/Login";
import "../styles/App.css";

export default function Loginpages() {
  return (
    <div>
      <Login />
      {/* Navegación correcta sin recargar la página */}
      <p style={{ marginTop: "10px" }}>
        ¿No tenés cuenta?{" "}
        <Link to="/register" style={{ color: "#d9534f", cursor: "pointer", fontSize: "17px" }}>
          Registrate
        </Link>
      </p>
    </div>
  );
}



