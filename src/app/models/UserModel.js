import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//       minLength: [2, "Name must be at least 2 characters long"],
//       maxLength: [50, "Name cannot exceed 50 characters"],
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       trim: true,
//       lowercase: true,
//       match: [
//         /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//         "Please enter a valid email",
//       ],
//     },
//     password: {
//       type: String,
//       required: [true, "Password is required"],
//       minLength: [8, "Password must be at least 8 characters long"],
//     },
//     role: {
//       type: String,
//       enum: ["user", "admin"],
//       default: "user",
//     },
//     lastLogin: {
//       type: Date,
//       default: Date.now,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//       immutable: true,
//     },
//     updatedAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: { virtuals: true },
//     toObject: { virtuals: true },
//   }
// );
// // Indexes for optimized queries
// userSchema.index({ email: 1 });
// userSchema.index({ provider: 1 });
// userSchema.index({ role: 1 });

// // Pre-save middleware to handle any necessary operations before saving
// userSchema.pre("save", function (next) {
//   // You can add custom logic here if needed
//   next();
// });

// // Instance method example
// // userSchema.methods.isAdmin = function() {
// //   return this.role === "admin";
// // };

// // Static method example
// // userSchema.statics.findByEmail = function(email) {
// //   return this.findOne({ email: email.toLowerCase() });
// // };

// const User = mongoose.models.User || mongoose.model("User", userSchema);

// export default User;


const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minLength: [2, "Name must be at least 2 characters long"],
      maxLength: [50, "Name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: function () {
        return this.provider !== "google";
      },
      minLength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    provider: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
