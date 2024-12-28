import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/userRoute.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

// Database connection
// mongoose.connect(process.env.DB)
//     .then(() => console.log('Database connected'))
//     .catch(err => console.log(err));
// Mongoose Connection
mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    connectTimeoutMS: 30000,
    socketTimeoutMS: 45000,
    bufferCommands: false,
  })
    .then(() => console.log('Database connected'))
    .catch((err) => {
      console.error('Database connection error:', err);
      process.exit(1); // Exit the process on connection failure
    });

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: "Welcome to my API" });
});

app.use('/users', userRouter);


// Start the server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));

export default app;
