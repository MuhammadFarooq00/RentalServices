import mongoose from 'mongoose';

const contactUsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxLength: [50, 'Name cannot exceed 50 characters']
  },
  email: {
    type: String, 
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxLength: [500, 'Message cannot exceed 500 characters']
  },
  address: {
    type: String,
    required: [true, 'Address is required'],
    trim: true,
    maxLength: [200, 'Address cannot exceed 200 characters']
  },
  status: {
    type: String,
    enum: ['pending', 'resolved', 'in-progress'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for better query performance
contactUsSchema.index({ email: 1, phone: 1 });

// Pre-save middleware to update timestamps
contactUsSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Virtual for formatted date
contactUsSchema.virtual('formattedCreatedAt').get(function() {
  return this.createdAt.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
});

const ContactUs = mongoose.models.ContactUs || mongoose.model('ContactUs', contactUsSchema);

export default ContactUs;

/*
Let's break down the ContactUs model and explain each concept:

1. Schema Structure:
- The schema defines the structure for contact form submissions
- Each field has specific validation rules and data types
- Key fields include:
  * name, email, phone: Basic contact information
  * message: The inquiry content
  * address: Location information
  * status: Tracks progress of inquiry
  * timestamps: Automatic created/updated dates

2. Field Validations:
- required: [true, 'Message'] - Makes fields mandatory with custom error messages
- trim: true - Removes whitespace automatically
- maxLength - Prevents overly long submissions
- enum for status - Restricts to valid status values
- Custom regex for phone/email validation

3. Performance Optimizations:
- Index on email and phone:
  * Improves query performance for lookups
  * Compound index supports queries on either/both fields
  * Useful for preventing duplicates

4. Middleware:
- Pre-save hook updates timestamps automatically
- Ensures data consistency
- Reduces manual maintenance

5. Virtuals:
- formattedCreatedAt provides formatted dates
- Non-persisted computed fields
- Useful for display formatting

6. Best Practices:
- Timestamps option for automatic tracking
- toJSON/toObject for proper serialization
- Clear validation messages
- Proper type definitions
- Indexed fields for scalability

7. Why This Approach:
- Maintainable: Clear structure and validation
- Performant: Proper indexing
- Scalable: Follows MongoDB best practices
- Flexible: Status tracking and timestamps
- User-friendly: Formatted dates and error messages

The model balances data integrity, performance and usability while following MongoDB schema best practices.
*/
