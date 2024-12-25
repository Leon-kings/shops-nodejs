import Book from "../models/book.js";

// create Order booking
export const createOrder = async (req, res) => {
  try {
    const book = await Book.findOne({ email: req.body.email });
    if (book) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "booking with this email already exists",
        });
    }
    const newBooking = await Book.create({
     productname: req.body.productname,
      email: req.body.email,
      reason: req.body.reason,
      contact: req.body.contact
   
    });
  return res
      .status(200)
      .json({
        status: "success",
        message: "Booking created successfully see you in upcomming 4 days",
        data: newBooking,
        
      });
   
      
  } catch (err) {
   return res.status(400).json({ status: "failed", message: err.message });
    
  }
};
// get all Order booking
export const getOrder = async (req, res) => {
    try {
      const {limit = 10 ,search, page } = req.params;
      const booking = await Book.find().limit(limit)
    return res
        .status(200)
        .json({
          status: "success",
          message: "Booking fetched successfully",
          data: booking,
        });
    } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
    }
  };

  // delete Order booking

export const deleteOder = async (req, res) => {
    try {
      const booking = await Book.findByIdAndDelete(req.params.id);
      if (!booking) throw Error("Booking not found");
     return res.json({ message: "Booking deleted successfully" });
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  };