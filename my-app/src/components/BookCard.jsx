import React from "react";
import { useNavigate } from "react-router-dom";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/book/${book.id}`);
  };

  return (
    <div className="book-card" onClick={handleClick}>
      <img src={book.image} alt={book.title} />
      <h3>{book.title}</h3>
      <p>{book.author}</p>
    </div>
  );
};

export default BookCard;
