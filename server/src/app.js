import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// Middleware setup
app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
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
import { destinationRouter } from './routes/destination.routes.js';
import { eventRouter } from './routes/event.routes.js';
import { tourRouter } from './routes/tour.routes.js';

// using routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/tour-bookings', tourBookingRouter);
app.use('/api/v1/destinations', destinationRouter);
app.use('/api/v1/events', eventRouter);
app.use('/api/v1/tours', tourRouter);



export { app };