const express = require('express');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const userRoute = require('./routes/userRoute');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const app = express();

dotenv.config();
connectDB();
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoute);

app.use(notFound);
app.use(errorHandler);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`Server running on port ${port} 🔥`));
