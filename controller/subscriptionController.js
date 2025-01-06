import Subscription from "../models/subscription.js";

// create Subscription booking
export const createSubscription = async (req, res) => {
    const subscrptn = await Subscription.findOne({ email: req.body.email });
    if (subscrptn) {
        return res.status(400).json({
            status: "failed",
            message: "subscription with this email already exists",
        });
    }
  try {
    const newSubscription = await Subscription.create({
      email: req.body.email,
    });
    return res.status(200).json({
      status: "success",
      message: "Subscription created successfully",
      data: newSubscription,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};
// get all Subscription booking
export const getSubscription = async (req, res) => {
  try {
    const subscrptn = await Subscription.find();
    return res.status(200).json({
      status: "success",
      message: "Subscribe fetched successfully",
      data: subscrptn,
    });
  } catch (err) {
    return res.status(400).json({ status: "failed", message: err.message });
  }
};

// delete Subscription booking

export const deleteSubscription = async (req, res) => {
  try {
    const subscrptn = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscrptn) throw Error("Subscription not found");
    return res.json({ message: "Subscription deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
