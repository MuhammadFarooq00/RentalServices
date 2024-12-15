// /lib/db.js
import { config } from "dotenv";
config({
    path: "./.env"
})

import mongoose from "mongoose";


const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect('mongodb://localhost:27017/rental-services');
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error: ', error);
    process.exit(1);
  }
};

export default connectDB;





// export const GET = async (request) => {
//   await connectDB();
  
//   try {
//     const rentals = await RentalService.find();
//     return new Response(JSON.stringify(rentals), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch rentals' }), { status: 500 });
//   }
// };


// // export async function POST(req) {
// //   await connectDB();

// //   try {
// //     // Handle Multer File Upload
// //     const reqProxy = { ...req, body: {}, file: null };
// //     await runMiddleware(reqProxy, {}, uploadMiddleware);

// //     const { title, price, description, rating, location } = reqProxy.body;
// //     const photo = reqProxy.file;

// //     if (!photo) {
// //       return new Response(
// //         JSON.stringify({ success: false, message: "Please add an image" }),
// //         { status: 400, headers: { "Content-Type": "application/json" } }
// //       );
// //     }

// //     if (!title || !price || !description || !rating || !location) {
// //       fs.unlink(photo.path, () => {
// //         console.log("File deleted due to validation failure.");
// //       });
// //       return new Response(
// //         JSON.stringify({ success: false, message: "Please fill all the fields" }),
// //         { status: 400, headers: { "Content-Type": "application/json" } }
// //       );
// //     }

// //     // Create and Save Rental
// //     const newRental = new RentalService({
// //       title,
// //       price,
// //       description,
// //       rating,
// //       location,
// //       image: `/uploads/${photo.filename}`,
// //     });

// //     await newRental.save();

// //     return new Response(
// //       JSON.stringify({
// //         success: true,
// //         message: "Product successfully added",
// //       }),
// //       { status: 201, headers: { "Content-Type": "application/json" } }
// //     );
// //   } catch (error) {
// //     console.error(error);
// //     return new Response(
// //       JSON.stringify({ error: "Failed to create rental", details: error.message }),
// //       { status: 500, headers: { "Content-Type": "application/json" } }
// //     );
// //   }
// // }

// //   export const config = {
// //     api: {
// //       bodyParser: false, 
// //     },
// //   };

// export const PUT = async (request) => {
//   await connectDB();
  
//   try {
//     const imagePath = await handleFileUpload(request);
    
//     const { id, title, price, description, rating, location } = await request.json();
    
//     if (!id || !title || !price || !description || !rating || !location) {
//       return new Response(JSON.stringify({ error: 'All fields are required' }), { status: 400 });
//     }

//     const updatedRental = await RentalService.findByIdAndUpdate(id, {
//       title,
//       price,
//       image: imagePath, // Update the image path
//       description,
//       rating,
//       location,
//     }, { new: true });

//     if (!updatedRental) {
//       return new Response(JSON.stringify({ error: 'Rental not found' }), { status: 404 });
//     }
    
//     return new Response(JSON.stringify(updatedRental), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to update rental' }), { status: 500 });
//   }
// };

// export const DELETE = async (request) => {
//   await connectDB();
  
//   const { id } = await request.json();
  
//   if (!id) {
//     return new Response(JSON.stringify({ error: 'ID is required' }), { status: 400 });
//   }
  
//   try {
//     const deletedRental = await RentalService.findByIdAndDelete(id);
    
//     if (!deletedRental) {
//       return new Response(JSON.stringify({ error: 'Rental not found' }), { status: 404 });
//     }
    
//     return new Response(JSON.stringify({ message: 'Rental deleted' }), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to delete rental' }), { status: 500 });
//   }
// };

// export const GET_BY_ID = async (request, { params }) => {
//   await connectDB();
  
//   const { id } = params;
  
//   try {
//     const rental = await RentalService.findById(id);
    
//     if (!rental) {
//       return new Response(JSON.stringify({ error: 'Rental not found' }), { status: 404 });
//     }
    
//     return new Response(JSON.stringify(rental), { status: 200 });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: 'Failed to fetch rental' }), { status: 500 });
//   }
// };
