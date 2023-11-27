const express=require("express")
const { auth } = require("../middleware/auth.middleware");
const { orderModel } = require("../models/orderModel");
const { readinglistModel } = require("../models/readingList");



const readingListRoute=express.Router()


readingListRoute.post("/", auth, async (req, res) => {
    try {
      const userId = req.body.userId;
      const { bookId } = req.body;
  
      // Check if the user has bought the book (exists in order history)
      const hasBoughtBook = await hasUserBoughtBook(userId, bookId);
  


      if (!hasBoughtBook) {
        return res.status(403).json({ error: "User has not bought this book" });
      }
  
      // Create a new reading list entry
      const newReadingListEntry = new readinglistModel({
        userId,
        bookId,
      });
  
      await newReadingListEntry.save();
  
      res.status(201).json({ msg: "Book added to reading list successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });


  async function hasUserBoughtBook(userId, bookId) {
    const userOrders = await orderModel.find({ userId });
  
    for (const order of userOrders) {
      const boughtBooks = order.books.map((item) => item.bookId.toString());
  
      if (boughtBooks.includes(bookId.toString())) {
        return true;
      }
    }
  
    return false;
  }

  readingListRoute.get("/user/:userId", auth, async (req, res) => {
    try {
      const userId = req.params.userId;
  
      // Fetch the user's reading list
      const userReadingList = await readinglistModel.find({ userId });
  
      res.status(200).json(userReadingList);
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });


  readingListRoute.delete("/remove/:bookId", auth, async (req, res) => {
    try {
      const userId = req.body.userId;
      const bookId = req.params.bookId;
  
      // Check if the book is in the user's reading list
      const entryToRemove = await readinglistModel.findOneAndDelete({ userId, bookId });
  
      if (!entryToRemove) {
        return res.status(404).json({ error: "Book not found in reading list" });
      }
  
      res.status(200).json({ msg: "Book removed from reading list successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });

module.exports={
    readingListRoute
}