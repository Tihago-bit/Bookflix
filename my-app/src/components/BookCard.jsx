import React from "react";
import { useNavigate } from "react-router-dom";

// 1. Recibimos las nuevas propiedades: isAdmin y onDelete
const BookCard = ({ book, isAdmin, onDelete }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  // Función especial para el botón de eliminar
  const handleDeleteClick = (e) => {
    e.stopPropagation(); // 🛑 ¡Magia! Esto evita que se abra la página del libro al hacer clic en borrar
    onDelete(book.id);
  };

  return (
    <div className="book-card" onClick={handleClick} style={{ position: 'relative', cursor: 'pointer' }}>
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>

      {/* 2. Renderizado Condicional: Solo mostramos esto si es Admin */}
      {isAdmin && (
        <button
          onClick={handleDeleteClick}
          style={{
            marginTop: "10px",
            backgroundColor: "#dc3545", // Color rojo standard
            color: "white",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "14px",
            width: "100%" // Opcional: para que ocupe el ancho y sea fácil de clickear
          }}
        >
          🗑️ Eliminar
        </button>
      )}
    </div>
  );
};

export default BookCard;