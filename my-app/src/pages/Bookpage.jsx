import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import books from "../data/Books";
import "../styles/App.css";

export default function Bookpage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = books.find((b) => b.id === parseInt(id));

  if (!book) return <h2>Libro no encontrado</h2>;

  const handleBack = () => {
    navigate("/catalogo");
  };

  return (
    <div className="book-detail">
      <img src={book.image} alt={book.title} className="book-image" />

      <div className="book-info">
        <h1>{book.title}</h1>
        <h3>{book.author}</h3>

        {/* SINOPSIS */}
        <p className="book-description">{book.description}</p>

        {/* VISOR PDF */}
        {book.pdf && (
          <div className="book-pdf">
            <iframe
              src={book.pdf}
              title={book.title}
              width="100%"
              height="600px"
            ></iframe>
          </div>
        )}

        <button className="back-button" onClick={handleBack}>
          Volver al catálogo
        </button>
      </div>
    </div>
  );
}
