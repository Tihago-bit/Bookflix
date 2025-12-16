import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import initialBooks from "../data/Books";
import "../styles/App.css";

export default function AdminPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  
  // Estado para el nuevo libro
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    category: "",
    description: "",
    image: ""
  });

  // 1. Cargar libros y verificar seguridad
  useEffect(() => {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    if (!user || user.rol !== 'admin') {
      alert("Acceso denegado. Solo administradores.");
      navigate("/catalogo");
      return;
    }

    const storedBooks = localStorage.getItem("books");
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    } else {
      setBooks(initialBooks);
    }
  }, [navigate]);

  // 2. Calcular categorías únicas dinámicamente
  // Creamos un Set para eliminar duplicados y lo convertimos a Array para mapearlo
  const categories = ["Todos", ...new Set(books.map((b) => b.category))].filter(c => c !== "Todos").sort();

  // 3. Guardar en LocalStorage
  const saveToLocalStorage = (updatedBooks) => {
    setBooks(updatedBooks);
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  // 4. Manejar cambios en Inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  // 5. Agregar Libro
  const handleAddBook = (e) => {
    e.preventDefault();
    if (!newBook.title || !newBook.author || !newBook.category) {
      return alert("Por favor completa Título, Autor y Categoría");
    }

    const newId = books.length > 0 ? Math.max(...books.map(b => b.id)) + 1 : 1;
    const bookToAdd = {
      id: newId,
      ...newBook,
      image: newBook.image || "/public/img/default.jpg" 
    };

    const updatedBooks = [...books, bookToAdd];
    saveToLocalStorage(updatedBooks);
    
    alert("¡Libro creado con éxito!");
    setNewBook({ title: "", author: "", category: "", description: "", image: "" });
  };

  // 6. Eliminar Libro
  const handleDeleteBook = (id) => {
    if (window.confirm("¿Seguro que quieres eliminar este libro?")) {
      const updatedBooks = books.filter((book) => book.id !== id);
      saveToLocalStorage(updatedBooks);
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>Panel de Administración 🛠️</h1>
        <button className="back-button" onClick={() => navigate("/catalogo")}>
          ⬅ Volver al Catálogo
        </button>
      </div>

      <div className="admin-form-wrapper">
        <h2>➕ Agregar Nuevo Libro</h2>
        <form className="admin-form" onSubmit={handleAddBook}>
          <input 
            type="text" 
            name="title" 
            placeholder="Título del libro" 
            value={newBook.title} 
            onChange={handleInputChange} 
            required 
          />
          <input 
            type="text" 
            name="author" 
            placeholder="Autor" 
            value={newBook.author} 
            onChange={handleInputChange} 
            required 
          />
          
          {/* 🔽 AQUÍ ESTÁ EL CAMBIO: SELECT en lugar de INPUT */}
          <select 
            name="category" 
            value={newBook.category} 
            onChange={handleInputChange}
            required
          >
            <option value="">-- Selecciona una Categoría --</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>

          <input 
            type="text" 
            name="image" 
            placeholder="URL de Imagen (opcional)" 
            value={newBook.image} 
            onChange={handleInputChange} 
          />
          <textarea 
            name="description" 
            placeholder="Descripción o sinopsis del libro..." 
            value={newBook.description} 
            onChange={handleInputChange} 
          />
          
          <button type="submit" className="save-btn">
            Guardar Libro
          </button>
        </form>
      </div>

      <div className="admin-list-wrapper">
        <h2>📚 Libros Actuales ({books.length})</h2>
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Categoría</th> {/* Agregué columna Categoría para verla mejor */}
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td data-label="ID">{book.id}</td>
                <td data-label="Título"><strong>{book.title}</strong></td>
                <td data-label="Autor">{book.author}</td>
                <td data-label="Categoría">{book.category}</td>
                <td data-label="Acción">
                  <button 
                    className="delete-btn-small"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Eliminar 🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}