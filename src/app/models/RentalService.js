



// /models/RentalService.js
import mongoose from 'mongoose';

const RentalServiceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required'],
    validate: {
      validator: v => {
        // Basic Cloudinary URL validation
        return /^https?:\/\/res\.cloudinary\.com\/.+\/.+/.test(v);
      },
      message: props => `${props.value} is not a valid Cloudinary URL`
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  rating: {
    type: Number,
    required: [true, 'Rating is required'],
    min: [0, 'Rating cannot be less than 0'],
    max: [5, 'Rating cannot exceed 5']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required'],
    validate: {
      validator: v => mongoose.Types.ObjectId.isValid(v),
      message: props => `${props.value} is not a valid user ID`
    }
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

// Add text index for search functionality
RentalServiceSchema.index({
  title: 'text',
  description: 'text',
  location: 'text'
});


RentalServiceSchema.virtual('cloudinaryPublicId').get(function() {
  const urlParts = this.image.split('/');
  return urlParts.slice(urlParts.indexOf('upload') + 1).join('/');
});

const RentalService = mongoose.models.RentalService || 
  mongoose.model('RentalService', RentalServiceSchema);

export default RentalService;













// // /models/RentalService.js

// import mongoose from 'mongoose';

// const RentalServiceSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   price: {
//     type: Number,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   location: {
//     type: String,
//     required: true,
//   },
//   user: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User', 
//     required: true,
//   },
// });

// const RentalService = mongoose.models.RentalService || mongoose.model('RentalService', RentalServiceSchema);

// export default RentalService;



