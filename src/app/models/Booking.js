import mongoose from 'mongoose';
import validator from 'validator';

const BookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email address']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^\+?[\d\s-]+$/.test(v);
      },
      message: 'Please provide a valid phone number'
    }
  },
  date: {
    type: Date,
    required: [true, 'Booking date is required'],
    validate: {
      validator: function(v) {
        return v >= new Date();
      },
      message: 'Booking date cannot be in the past'
    }
  },
  comments: {
    type: String,
    trim: true,
    maxlength: [500, 'Comments cannot exceed 500 characters']
  },
  
  product: {
    type: String,
    required: [true, 'Product is required'],
    trim: true
  },
  delivery: {
    type: String,
    required: [true, 'Delivery option is required'],
    enum: {
      values: ['Standard', 'Express', 'Premium'],
      message: '{VALUE} is not a valid delivery option'
    }
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    minlength: [5, 'Address must be at least 5 characters long']
  },
  city: {
    type: String,
    required: [true, 'City is required'],
    trim: true
  },
  status: {
    type: Boolean,
    default: false
  },
  code: {
    type: String,
    required: [true, 'Postal/ZIP code is required'],
    trim: true,
    validate: {
      validator: function(v) {
        return /^[A-Z0-9]{3,10}$/i.test(v);
      },
      message: 'Please provide a valid postal/ZIP code'
    }
  }
}, {
  timestamps: true
});


BookingSchema.index({ email: 1 });
BookingSchema.index({ date: 1 });

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;








/*
Indexes in MongoDB are special data structures that store a small portion of the collection's
data in an easy-to-traverse form. They improve the speed of search operations significantly.

Example without index:
- If you search for bookings by email "john@example.com"
- MongoDB has to scan EVERY document in the collection (called a collection scan)
- With 1 million bookings, it needs to check all 1 million documents
- This is very slow and resource intensive

Example with index on email field:
- MongoDB creates an ordered list of all emails with pointers to their documents
- When searching for "john@example.com", it can quickly find it in this ordered list
- Then directly jump to the right document(s)
- Much faster, like using an index in a book vs reading every page

The number 1 indicates ascending order index
You can also use -1 for descending order

Common use cases:
1. Fields used in WHERE clauses (finding specific bookings)
2. Fields used in sorting operations
3. Fields used in joining collections

That's why we index email and date - they're frequently used in searches:
- Finding bookings for a specific customer (email)
- Finding bookings on a particular date
*/