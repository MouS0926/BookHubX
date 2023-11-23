const express=require("express");
const { cartModel } = require("../models/cartModel");
const { auth } = require("../middleware/auth.middleware");


const cartRoute=express.Router()


//  get user's cart details
cartRoute.get("/user/:userId", auth, async (req, res) => {
    try {
      const { userId } = req.params;
  
      // Find all cart items for the specified user
      const userCart = await cartModel.find({ userId });
  
      res.status(200).send(userCart);
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });
  

cartRoute.post("/add", auth, async (req, res) => {
    try {
      const { bookId, quantity, bookimage, bookprice } = req.body;
  
      
      const existingCartItem = await cartModel.findOne({ userId: req.body.userId, bookId });
  
      if (existingCartItem) {
       
        return res.status(200).send({ "msg": "Book is already in the cart", cartItem: existingCartItem });
      }
  
     
      const newCartItem = new cartModel(req.body);
  
   
      await newCartItem.save();
      res.status(201).send({ "msg": "Book added to cart successfully", cartItem: newCartItem });
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });


  cartRoute.patch("/update/:cartItemId", auth, async (req, res) => {
    try {
      const { cartItemId } = req.params;
      const { quantity } = req.body;
  
      
      const cartItem = await cartModel.findById(cartItemId);
  
      if (!cartItem) {
        return res.status(404).send({ "msg": "Cart item not found" });
      }
  
      if(cartItem.userId==req.body.userId)
      {
        cartItem.quantity = quantity;
        await cartItem.save();
  
      res.status(200).send({ "msg": "Cart item quantity updated successfully", cartItem });
      }
      else{
        res.status(400).send({ "msg": "You are not authorised" });
      }
     
     
    } catch (error) {
      res.status(500).send({ "error": error });
    }
  });



module.exports={
    cartRoute
}