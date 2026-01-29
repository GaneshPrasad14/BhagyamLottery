const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../config/db');
const User = require('../models/User');

dotenv.config();

connectDB();

const seedAdmin = async () => {
    try {
        await User.deleteMany();

        const adminUser = new User({
            email: 'admin@bhagyamlotteryagency.com',
            password: 'bhagyam@lottery',
            isAdmin: true,
        });

        await adminUser.save();

        console.log('Admin user seeded successfully');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
