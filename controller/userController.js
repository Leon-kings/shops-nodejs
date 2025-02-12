import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
export const createUser = async (req, res) => {
  try {
    // Check if user already exists
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({
        status: "failed",
        message: "User with this email already exists",
      });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create the new user
    const newUser = await User.create({
      fullname: req.body.fullname,
      email: req.body.email,
      phone: req.body.phone,
      password: hashedPassword,
    });

    // Respond with success
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (err) {
    console.error("Error creating user:", err);
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "user fetched successfully",
      user,
    });
  } catch (error) {
    res.status(400).json({
      message: "Oops sorry , an error in fetching user ",
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params.id });
    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User not found",
      });
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json({
      message: "User updated successfully",
      updatedUser,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: "user failed to update kbc",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "success",
      users,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};


// export const authUser = async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);

//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).json({
//         status: "failed",
//         message: "User with this email does not exist",
//       });
//     }

//     console.log("Stored Hashed Password:", user.password);

//     if (await bcrypt.compare(req.body.password, user.password)) {
//       const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
//         expiresIn: "3h",
//       });

//       console.log("Generated Token:", token);

//       return res.status(200).json({
//         message: "success",
//         token,
//         user,
//       });
//     } else {
//       return res.status(400).json({
//         status: "failed",
//         message: "Invalid credentials",
//       });
//     }
//   } catch (err) {
//     console.error("Error:", err.message);
//     return res.status(500).json({ message: err.message });
//   }
// };
export const authUser = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "User with this email does not exist",
      });
    }

    console.log("Stored Hashed Password:", user.password);

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: user._id, role: user.role }, // Store role in token for future use
      process.env.JWT_SECRET,
      { expiresIn: "3h" }
    );

    console.log("Generated Token:", token);

    // Determine user role and dashboard route
    const dashboardRoute = user.role === "admin" ? "/Dashboard" : "/Udashboard";

    return res.status(200).json({
      message: "success",
      token,
      user,
      dashboard: dashboardRoute, // Send dashboard route in response
    });
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ message: err.message });
  }
};
