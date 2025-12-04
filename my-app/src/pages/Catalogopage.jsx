import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import books from "../data/Books";
import BookCard from "../components/BookCard";
import "../styles/App.css";

export default function Catalogopage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", ...new Set(books.map((b) => b.category))];

  const handleLogout = () => {
    navigate("/");
  };

  // Filtramos según búsqueda y categoría
  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "Todos" || book.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="catalog-container">
      <div className="catalog-header">
        <h1>Catálogo de Libros</h1>
        <button className="logout-button" onClick={handleLogout}>
          Salir
        </button>
      </div>

      <div className="filter-bar">
        <input
          type="text"
          placeholder="Buscar libro o autor..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat, i) => (
            <option key={i} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="book-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
}
