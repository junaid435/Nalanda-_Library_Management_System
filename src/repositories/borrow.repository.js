import { book_model } from "../models/book.models.js";
import { borrow_model } from "../models/borrow.models.js";

const borrow_book_repo = (req) => {
  const borrow_book = new borrow_model({
    user: req.user._id,
    book: req.body.id,
  });

  return borrow_book.save();
};
const borrow_return_repo = (id) => {
  return book_model.findByIdAndUpdate({ _id: id }, { $set: { return_status: true } });
};
const borrow_history_repo=(userID)=>{
    return borrow_model.find({user:userID}).populate("user").populate('book')
}
export { borrow_book_repo, borrow_return_repo,borrow_history_repo };
