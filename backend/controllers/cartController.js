const userModel = require('../models/userModel')

// Add items to cart
const addToCart = async (req, res) => {
    try {
        console.log("User ID from middleware:", req.body.userId); // Debug: Check if user ID is correctly passed
        const userData = await userModel.findOne({ _id: req.body.userId });
        if (!userData) {
            console.error(`User data not found for ID: ${req.body.userId}`);
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const cartData = userData.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }

        await userModel.findByIdAndUpdate(req.body.userId, { cartData });
        res.status(200).json({ success: true, message: "Item added to cart" });
    } catch (error) {
        console.error(`Error in addToCart: ${error.message}`);
        res.status(500).json({ success: false, message: "We encountered an error" });
    }
};

// remove items from cart
const removeFromCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData;

        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success:true, mssg:"Item removed from cart"})
    } catch (error) {
        console.log(error);
        res.json({success:false, mssg:"Failed to remove Item from cart"})
    }
}

// get cart items
const getCart = async(req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId)
        let cartData = await userData.cartData
        res.json({success:true, cartData})
    } catch (error) {
        console.log(error);
        res.json({success:false, mssg:"Failed to provide Cart data"})
    }
}

module.exports  = {
    removeFromCart,
    getCart,
    addToCart
}