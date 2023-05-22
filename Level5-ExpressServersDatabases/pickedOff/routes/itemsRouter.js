const express = require("express");
const itemsRouter = express.Router();
const { v4: uuidv4 } = require("uuid");

// Fake Things Data
const items = [
  {
    name: "banana",
    type: "food",
    price: 200,
    _id: uuidv4(),
  },
  {
    name: "pants",
    type: "clothing",
    price: 2500,
    _id: uuidv4(),
  },
  {
    name: "basket ball",
    type: "toy",
    price: 1000,
    _id: uuidv4(),
  },
  {
    name: "rockem sockem robots",
    type: "toy",
    price: 1500,
    _id: uuidv4(),
  },
  {
    name: "shirt",
    type: "clothing",
    price: 800,
    _id: uuidv4(),
  },
  {
    name: "soup",
    type: "food",
    price: 300,
    _id: uuidv4(),
  },
  {
    name: "flour",
    type: "food",
    price: 100,
    _id: uuidv4(),
  },
];

// **create routes that listens for get request
// Get all
itemsRouter.get("/", (req, res, next) => {
  console.log("GET REQUEST RECIEVED");
  res.send(items); // uses response object to use .send method and send back response to client
});

// Get One
itemsRouter.get("/:itemsId", (req, res) => {
  const itemsId = req.params.itemsId;
  const foundItems = items.find((items) => items._id === itemsId);
  res.send(foundItems);
});

// Get by type or genre or item
itemsRouter.get("/search/type", (req, res) => {
  const type = req.query.type;
  const filteredItems = items.filter((items) => items.type === type);
  res.send(filteredItems);
});

// Post One
itemsRouter.post("/", (req, res) => {
  const newItem = req.body;
  newItem._id = uuidv4();
  items.push(newItem);
  res.send(`Successfully added ${newItem.title} to the database`);
});

// Delete One
itemsRouter.delete("/:itemsId", (req, res) => {
  const itemsId = req.params.itemsId;
  const itemsIndex = items.findIndex((items) => items._id === itemsId);
  items.splice(itemsIndex, 1);
  res.send("Successfully deleted item");
});

// Update One
itemsRouter.put("/:itemsId", (req, res) => {
  const itemsId = req.params.itemsId;
  const updatedObject = req.body;
  const itemsIndex = items.findIndex((items) => items._id === itemsId);
  const updatedItems = Object.assign(items[itemsIndex], updatedObject);
  res.send(updatedItems);
});

module.exports = itemsRouter;
