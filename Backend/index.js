const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
require('dotenv').config();
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const path = require('path');

const app = express();
const Port = process.env.PORT || 5000;

// Middleware
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(express.json());
app.use(fileUpload()); // Add this middleware to handle file uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(Port, () => console.log(`Server running on port ${Port}`));
}).catch(err => {
    console.error('Failed to connect to MongoDB', err);
});
