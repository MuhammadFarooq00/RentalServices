// /models/RentalService.js

import mongoose from 'mongoose';

const RentalServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
});

const RentalService = mongoose.models.RentalService || mongoose.model('RentalService', RentalServiceSchema);

export default RentalService;
