require("dotenv").config();
const mongoose = require("mongoose");
const userModel = require("./models/user-model");
const db = require("./config/mongoose-connection");

async function makeAdmin(email) {
    try {
        let user = await userModel.findOne({ email: email });
        if (!user) {
            console.log("❌ User not found with email:", email);
            process.exit(1);
        }
        
        user.isAdmin = true;
        await user.save();
        
        console.log(`✅ Successfully made ${email} an admin!`);
        console.log(`You can now log in with ${email} and see the Admin Panel button.`);
        process.exit(0);
    } catch (err) {
        console.error("Error updating user:", err);
        process.exit(1);
    }
}

const email = process.argv[2];
if (!email) {
    console.log("⚠️ Please provide an email address.");
    console.log("Usage: node make-admin.js <user-email>");
    process.exit(1);
}

makeAdmin(email);
