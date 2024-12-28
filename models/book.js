import mongoose from "mongoose";

const bookSchema = mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    message: {
        type: String,
        required: false,
        unique: true
     }
  
})

const Book = mongoose.model("Book", bookSchema);

export default Book;