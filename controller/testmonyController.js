import Testimony from "../models/testmony.js";

export const createTestimony = async (req, res) => {
  try {
    const testimony = await Testimony.findOne({ email: req.body.email });
    if (testimony) {
      return res
        .status(400)
        .json({
          status: "failed",
          message: "testimony with this email already exists",
        });
    }
    const newTestimony = await Testimony.create({
     name: req.body.name,
      email: req.body.email,
      testimony: req.body.testimony,
   
    });
  return res
      .status(200)
      .json({
        status: "success",
        message: "testimony created successfully",
        data: newTestimony,
        
      });
       
  } catch (err) {
   return res.status(400).json({ status: "failed", message: err.message });
    
  }
};
export const getTestimony = async (req, res) => {
    try {
      const {limit = 10 ,search, page } = req.params;
      const testimony = await Testimony.find().limit(limit)
    return res
        .status(200)
        .json({
          status: "success",
          message: "Testimony fetched successfully",
          data: testimony,
        });
    } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
    }
  };