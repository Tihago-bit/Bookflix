import React, { useState, useEffect, useCallback } from "react"; 
import { useNavigate } from "react-router-dom";
import initialBooks from "../data/Books"; 
import BookCard from "../components/BookCard";
import "../styles/App.css";

// Función para leer los libros (Mantenemos esta lógica para ver los cambios del Admin)
const useBookManagement = () => {
    const [books, setBooks] = useState([]);
    
    const loadBooks = useCallback(() => {
        const localBooks = localStorage.getItem("books");
        if (localBooks) {
            setBooks(JSON.parse(localBooks));
        } else {
            setBooks(initialBooks);
            localStorage.setItem("books", JSON.stringify(initialBooks));
        }
    }, []);

    useEffect(() => {
        loadBooks();
    }, [loadBooks]);
    
    return books; // Ya no necesitamos la función de guardar aquí
};

export default function Catalogopage() {
  const navigate = useNavigate();
  
  // 1. Cargamos los libros (incluyendo los nuevos creados en Admin)
  const currentBooks = useBookManagement();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [userRole, setUserRole] = useState("user"); 
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  // 2. Generamos categorías dinámicamente
  const categories = ["Todos", ...new Set(currentBooks.map((b) => b.category))]; 

  // 3. Verificar Rol al iniciar
  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
        try {
            const user = JSON.parse(userString);
            setUserRole(user.rol || "user");
        } catch (e) {
            console.error("Error al leer usuario:", e);
        }
    } else {
        navigate("/");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  // 4. Filtrado de libros
  const filteredBooks = currentBooks.filter((book) => { 
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
        
        {/* 🔑 BOTÓN NUEVO: Lleva al Panel de Admin */}
        {userRole === 'admin' && (
             <button 
                className="admin-button" 
                onClick={() => navigate("/admin")} 
                style={{
                    marginRight: '10px', 
                    backgroundColor: '#007bff', // Azul profesional
                    color: 'white', 
                    border: 'none', 
                    padding: '10px 15px', 
                    borderRadius: '4px', 
                    cursor: 'pointer',
                    fontWeight: 'bold'
                }}
            >
                ⚙️ Panel de Administrador
            </button>
        )}
        
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
          filteredBooks.map((book) => (
            <BookCard 
                key={book.id} 
                book={book} 
                // Ya no pasamos isAdmin ni onDelete porque eso se hace en /admin
            />
          ))
        ) : (
          <p>No se encontraron libros.</p>
        )}
      </div>
    </div>
  );
}