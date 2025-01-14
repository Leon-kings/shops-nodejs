import Book from "../models/book.js";

// create Order booking
export const createOrder = async (req, res) => {
  try {
    const newBooking = await Book.create({
      email: req.body.email,
      message: req.body.message,
    });
    return res.status(200).json({
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
    const booking = await Book.find();
    return res.status(200).json({
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

//
export const getOderById = async (req, res) => {
  try {
    const message = await Book.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "message fetched successfully",
      message,
    });
  } catch (error) {
    res.status(400).json({
      message: "Oops sorry , an error in fetching Messages ",
    });
  }
};

export const updateOder = async (req, res) => {
  try {
    const message = await Book.findById({ _id: req.params.id });
    if (!message) {
      return res.status(404).json({
        status: "failed",
        message: "message not found",
      });
    }
    const updatedOder = await Book.findByIdAndUpdate(req.params.id, {
      email: req.body.email,
      message: req.body.message
    });
    res.status(200).json({
      message: "message updated successfully",
      updatedOder,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};
