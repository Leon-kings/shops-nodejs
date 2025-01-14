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
      const testimony = await Testimony.find()
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
export const getTestimonyById = async (req, res) => {
  try{
      const testimony = await Testimony.findById(req.params.id);
      res.status(200).json({
          status:'success',
          message:'fetched successfully',
          testimony
      })
  } catch(error){
      res.status(400).json({
          message: error.message
      })
  }
}

export const updateTestimony = async (req, res) => {
  try{
      const testimony = await Testimony.findById({ _id: req.params.id})
      if(!testimony){
          res.status(404).json({
              status: 'failed',
              message: 'testimony not found'
          });
      }
      const newTestimony = await Testimony.findByIdAndUpdate( req.params.id, {
        name: req.body.name,
        email: req.body.email,
        testimony: req.body.testimony
      });
      res.status(200).json({
          message:'testimony updated successfully',
          testimony
      })
  } catch(err){
      res.status(400).json({
          status: 'failed',
          message: err.message
      })
  }
}

export const deleteTestimony = async (req, res) => {
  try{
      const testimony = await Testimony.findByIdAndDelete(req.params.id);
      res.status(200).json({
          status:'success',
          message: 'testimony deleted successfully'
      })
  } catch(err){
      res.status(400).json({
          status: 'failed',
          message: err.message
      })
  }
}