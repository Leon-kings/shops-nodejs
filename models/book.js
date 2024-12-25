import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
   productname: {
        type: String,
        required: false,
        unique: true
    },
    reason: {
        type: String,
        required: false,
        unique: true
    },
    contact: {
        type: String,
        required: false,
        unique: true
    },
  
})

const Book = mongoose.model("Book", bookSchema);

export default Book;