import { book_model } from "../models/book.models.js";

const create_book_repo = (book_data) => {
  const { title, ISBN, publication_date, genre, total_copies } = book_data;
  const book = new book_model({
    title: title,
    ISBN: ISBN,
    publication_date: publication_date,
    genre: genre,
    total_copies: total_copies,
  });
  return book.save();
};

export { create_book_repo };
