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
const update_book_repo = (book_data) => {
  const { title, ISBN, publication_date, genre, total_copies, id } = book_data;
 return book_model.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        title: title,
        ISBN: ISBN,
        publication_date: publication_date,
        genre: genre,
        total_copies: total_copies,
      },
    }
  );
};
export { create_book_repo, update_book_repo };
