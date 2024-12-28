import Book from "../models/book.js";

// create Order booking
export const createOrder = async (req, res) => {
  try {

    const newBooking = await Book.create({
     productname: req.body.productname,
      email: req.body.email,
      message: req.body.message,
      
   
    });
  return res
      .status(200)
      .json({
        status: "success",
        message: "message created successfully see you in upcomming 4 days",
        data: newBooking,
        
      });
   
      
  } catch (err) {
   return res.status(400).json({ status: "failed", message: err.message });
    
  }
};
// get all Order booking
export const getOrder = async (req, res) => {
    try {
      
      const booking = await Book.find()
    return res
        .status(200)
        .json({
          status: "success",
          message: "Messages fetched successfully",
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
      if (!booking) throw Error("Messages not found");
     return res.json({ message: "Message deleted successfully" });
    } catch (error) {
     return res.status(500).json({ message: error.message });
    }
  };