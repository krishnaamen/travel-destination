import express from "express";
import { Destination } from "./models.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// Create a new travel destination
router.post("/destinations", async (req, res) => {
  try {
    const newDestination = await Destination.create(req.body);
    res.status(201).json(newDestination);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read all travel destinations
router.get("/destinations", async (req, res) => {
  let destinations = await Destination.find({}, { image: 0 }).exec();
  destinations = destinations.map((d) => d.toObject());

  for (const destination of destinations) {
    destination.imageUrl = `/destinations/images/${destination._id}`;
  }

  res.json(destinations);
});

// Update a destination by ID (PUT)
router.put("/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      new ObjectId(req.params.id),
      req.body,
      { new: true },
    );
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete a destination by ID (DELETE)
router.delete("/destinations/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const destination = await Destination.findByIdAndDelete(id); //we need id and req from client for body)
    // we cant find anything in Database
    if (!destination) {
      res
        .status(404)
        .json({ message: `cannot find the information with ID ${id}` });
    }
    //if we found id the
    res.status(200).json(destination);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
