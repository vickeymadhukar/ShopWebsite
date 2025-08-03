const express = require('express');
const router = express.Router(); // ✅ Ye line add karni thi

const upload = require('../config/multer-config');
const productModel = require("../models/product-model");

router.post('/create', upload.single("image"), async (req, res) => {
    try {
        let {
            name,
            price,
            discount,
            color,
            description,
            originalPrice,
            category // Agar category add karni ho to
        } = req.body;

        let product = await productModel.create({
            image: req.file.buffer,
            name,
            price,
            discount,
            color,
            description,
            originalPrice,
            category // Agar category add karni ho to
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");

    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

module.exports = router; // ✅ Router export karna na bhoolo
