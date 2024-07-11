import mongoose, { Schema } from "mongoose";

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true, // cloudinaryUrl
  },
  title: {
    type: String,
    required: true,
  },
});

export const Book = mongoose.model("Book", bookSchema);
