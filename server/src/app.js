import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware setup
app.use(cors({
    origin: 'http://localhost:5173', // Adjust as needed for your frontend
    credentials: true, // Allow cookies to be sent
}));
app.use(express.json({ limit: '16kb' })); // Limit JSON payload size
app.use(express.urlencoded({ extended: true, limit: '16kb' })); // Limit URL-encoded payload size
app.use(express.static('public'));
app.use(cookieParser());

// test route
app.get('/', (req, res) => {
    res.send('API is working');
});

// importing routes
import { userRouter } from './routes/user.routes.js';
import { tourBookingRouter } from './routes/tourBooking.routes.js';

// using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tour-bookings', tourBookingRouter);


export { app };