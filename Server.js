import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/userRoute.js';
import testimonyRouter from './routes/testimonyRouter.js'
import bookRouter from './routes/bookRouter.js'
import SubscriptionRouter from './routes/SubscriptionRouter.js'
import cors from "cors"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())
// Database connection
mongoose.connect(process.env.DB)
    .then(() => console.log('Database connected'))
    .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', message: "Welcome to my API" });
});

app.use('/users', userRouter);
app.use('/testimony', testimonyRouter);
app.use('/messages', bookRouter);
app.use('/subscription', SubscriptionRouter);

// Start the server
app.listen(PORT, () => console.log(`App started on port ${PORT}`));

export default app;
