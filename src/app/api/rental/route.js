import connectDB from '@/app/lib/db';
import RentalService from '@/app/models/RentalService';
import fs from 'fs';
import path from 'path';

import { v2 as cloudinary } from 'cloudinary';
import { v4 as uuid } from 'uuid';
// const uploadDirectory = path.join(process.cwd(), "public/uploads");

// if (!fs.existsSync(uploadDirectory)) {
//   fs.mkdirSync(uploadDirectory, { recursive: true });
// }


// export async function POST(req) {
//   await connectDB();

//   try {
//     const formData = await req.formData();
//     const photoFile = formData.get("photo");
    
//     if (!photoFile) {
//       return new Response(
//         JSON.stringify({ success: false, message: "Please add an image" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
//     const photoFilename = `${uuid()}${path.extname(photoFile.name)}`;
//     const photoPath = path.join(uploadDirectory, photoFilename);

//     fs.writeFileSync(photoPath, photoBuffer);

//     const userId = formData.get("userId"); // Get user ID from form data
//     const title = formData.get("title");
//     const price = formData.get("price");
//     const description = formData.get("description");
//     const rating = formData.get("rating");
//     const location = formData.get("location");

//     if (!userId || !title || !price || !description || !rating || !location) {
//       if (fs.existsSync(photoPath)) {
//         fs.unlinkSync(photoPath);
//       }
//       return new Response(
//         JSON.stringify({ success: false, message: "Please fill all the fields" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }

//     const newRental = new RentalService({
//       user: userId,
//       title,
//       price,
//       description,
//       rating,
//       location,
//       image: `/uploads/${photoFilename}`
//     });

//     await newRental.save();

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Product successfully added",
//       }),
//       { status: 201, headers: { "Content-Type": "application/json" } }
//     );

//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ error: "Failed to create rental", details: error.message }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// }




// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  await connectDB();

  try {
    const formData = await req.formData();
    
    // Extract all form fields first
    const photoFile = formData.get("photo");
    const userId = formData.get("userId");
    const title = formData.get("title");
    const price = formData.get("price");
    const description = formData.get("description");
    const rating = formData.get("rating");
    const location = formData.get("location");

    // Validate all fields first before any processing
    if (!photoFile || !userId || !title || !price || !description || !rating || !location) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: "Please fill all required fields including the image" 
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Convert file to buffer
    const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
    
    // Convert buffer to base64
    const base64String = photoBuffer.toString('base64');
    const dataURI = `data:${photoFile.type};base64,${base64String}`;

    // Upload to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: 'rental-services',
      public_id: `${uuid()}-${Date.now()}`,
      overwrite: true,
    });

    // Create new rental service entry
    const newRental = new RentalService({
      user: userId,
      title,
      price,
      description,
      rating,
      location,
      image: uploadResult.secure_url
    });

    await newRental.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product successfully added",
        imageUrl: uploadResult.secure_url
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error('Error creating rental:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Failed to create rental", 
        details: error.message 
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


export const config = {
  api: {
    bodyParser: false,
  },
};



export async function GET() {
  try {
    await connectDB();
    
    const rentals = await RentalService.find({}).maxTimeMS(30000);
    
    return new Response(
      JSON.stringify({
        success: true,
        data: rentals
      }),
      { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: "Failed to fetch rentals",
        details: error.message 
      }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}




// DELETE /api/rental?id=123
// Delete a specific rental by passing the rental ID as a query parameter
// Example: DELETE http://localhost:3000/api/rental?id=abc123
// export async function DELETE(request) {
//   try {
//     // Validate request method
//     if (request.method !== 'DELETE') {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Method not allowed"
//         }),
//         {
//           status: 405,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Get and validate ID parameter
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Rental ID is required"
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Validate ID format
//     if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Invalid rental ID format"
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Check if rental exists and get its data before deleting
//     const rental = await RentalService.findById(id);
//     if (!rental) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Rental not found"
//         }),
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     console.log( " rental image ", rental.image)

//     // Delete associated images from uploads folder
//     if (rental.image) {
//       const fs = require('fs').promises;
//       const path = require('path');

//       try {
//         // Extract filename from URL or path
//         const filename = rental.image;
//         const imagePath = path.join(process.cwd(), '/public', filename);
//         console.log("file path check : ", imagePath)
//         // Delete the file
//         await fs.unlink(imagePath);
//       } catch (err) {
//         console.error(`Failed to delete image file: ${err.message}`);
//           // Continue with deletion even if image removal fails
//         }
      
//     }

//     // Delete the rental from database
//     const deletedRental = await RentalService.findByIdAndDelete(id);

//     // Handle unexpected deletion failure
//     if (!deletedRental) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Failed to delete rental"
//         }),
//         {
//           status: 500,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         message: "Rental and associated images deleted successfully",
//         data: deletedRental
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//   } catch (error) {
//     console.error('Delete rental error:', error);

//     // Handle specific MongoDB errors
//     if (error.name === 'CastError') {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Invalid rental ID format",
//           details: error.message
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Handle connection errors
//     if (error.name === 'MongoNetworkError') {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Database connection error",
//           details: error.message
//         }),
//         {
//           status: 503,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Generic error handler
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: "Failed to delete rental",
//         details: error.message
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   }
// }


export async function DELETE(request) {
  await connectDB();

  try {
    // Validate request method
    if (request.method !== 'DELETE') {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Method not allowed"
        }),
        {
          status: 405,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Get and validate ID parameter
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rental ID is required"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid rental ID format"
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Find the rental first to get image information
    const rental = await RentalService.findById(id);
    if (!rental) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rental not found"
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Delete image from Cloudinary if exists
    if (rental.image) {
      try {
        // Extract public ID from Cloudinary URL
        const urlParts = rental.image.split('/');
        const publicId = urlParts
          .slice(urlParts.indexOf('upload') + 1)
          .join('/')
          .replace(/\..+$/, ''); // Remove file extension

        await cloudinary.uploader.destroy(publicId);
      } catch (error) {
        console.error('Cloudinary deletion error:', error);
        // Decide whether to continue or abort based on requirements
        // Here we'll continue with DB deletion but log the error
      }
    }

    // Delete the rental from database
    const deletedRental = await RentalService.findByIdAndDelete(id);

    if (!deletedRental) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Failed to delete rental"
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Rental and associated Cloudinary assets deleted successfully",
        data: deletedRental
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error('Delete rental error:', error);

    // Handle specific MongoDB errors
    if (error.name === 'CastError') {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid rental ID format",
          details: error.message
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle Cloudinary-specific errors
    if (error.message.includes('Cloudinary')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Image deletion failed",
          details: error.message
        }),
        {
          status: 502,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Handle connection errors
    if (error.name === 'MongoNetworkError') {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Database connection error",
          details: error.message
        }),
        {
          status: 503,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Generic error handler
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to delete rental",
        details: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

// PUT /api/rental?id=<rental_id>

// export async function PUT(request) {
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     if (!id) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Rental ID is required"
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     const data = await request.json();

//     // Remove any undefined or null values
//     Object.keys(data).forEach(key => {
//       if (data[key] === undefined || data[key] === null) {
//         delete data[key];
//       }
//     });

//     if (Object.keys(data).length === 0) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "No valid fields provided for update"
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     const updatedRental = await RentalService.findByIdAndUpdate(
//       id,
//       { $set: data },
//       { new: true, runValidators: true }
//     );

//     if (!updatedRental) {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Rental not found"
//         }),
//         {
//           status: 404,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: updatedRental
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//   } catch (error) {
//     console.error('Update rental error:', error);

//     // Handle validation errors
//     if (error.name === 'ValidationError') {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Validation error",
//           details: error.message
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Handle invalid ID format
//     if (error.name === 'CastError') {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Invalid rental ID format",
//           details: error.message
//         }),
//         {
//           status: 400,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Handle connection errors
//     if (error.name === 'MongoNetworkError') {
//       return new Response(
//         JSON.stringify({
//           success: false,
//           error: "Database connection error",
//           details: error.message
//         }),
//         {
//           status: 503,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Generic error handler
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: "Failed to update rental",
//         details: error.message
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//         }
//       );
//   }
// }



export async function PUT(request) {
  await connectDB();

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    // Validate rental ID
    if (!id || !id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response(
        JSON.stringify({ success: false, error: "Valid rental ID is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Process form data
    const formData = await request.formData();
    const updateData = {};
    let newImageInfo = null;

    // Handle image upload
    const photoFile = formData.get("photo");
    if (photoFile instanceof File && photoFile.size > 0) {
      try {
        // Validate image file
        if (!photoFile.type.startsWith('image/')) {
          return new Response(
            JSON.stringify({ success: false, error: "Only image files are allowed" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }

        // Upload to Cloudinary
        const photoBuffer = Buffer.from(await photoFile.arrayBuffer());
        const base64String = photoBuffer.toString("base64");
        const dataURI = `data:${photoFile.type};base64,${base64String}`;

        newImageInfo = await cloudinary.uploader.upload(dataURI, {
          folder: "rental-services",
          public_id: `${uuid()}-${Date.now()}`,
          resource_type: "auto",
        });

        updateData.image = newImageInfo.secure_url;
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        return new Response(
          JSON.stringify({
            success: false,
            error: "Image upload failed",
            details: error.message
          }),
          { status: 500, headers: { "Content-Type": "application/json" } }
        );
      }
    }

    // Process text fields
    const fields = ["title", "price", "description", "rating", "location"];
    fields.forEach((field) => {
      const value = formData.get(field);
      if (value !== null && value !== undefined && value !== '') {
        updateData[field] = field === 'price' || field === 'rating' 
          ? Number(value) 
          : value;
      }
    });

    // Validate update data
    if (Object.keys(updateData).length === 0) {
      return new Response(
        JSON.stringify({ success: false, error: "No valid fields provided for update" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Fetch existing rental data
    const existingRental = await RentalService.findById(id);
    if (!existingRental) {
      if (newImageInfo) await cloudinary.uploader.destroy(newImageInfo.public_id);
      return new Response(
        JSON.stringify({ success: false, error: "Rental not found" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Update database entry
    const updatedRental = await RentalService.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedRental) {
      if (newImageInfo) await cloudinary.uploader.destroy(newImageInfo.public_id);
      return new Response(
        JSON.stringify({ success: false, error: "Failed to update rental" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Delete old image after successful update
    if (newImageInfo && existingRental.image) {
      try {
        const urlParts = existingRental.image.split('/');
        const uploadIndex = urlParts.indexOf('upload');
        if (uploadIndex === -1) throw new Error('Invalid Cloudinary URL');
        
        const publicIdParts = urlParts.slice(uploadIndex + 2);
        const publicId = publicIdParts.join('/').replace(/\..+$/, '');
        
        await cloudinary.uploader.destroy(publicId, { invalidate: true });
      } catch (error) {
        console.error("Old image deletion error:", error.message);
      }
    }

    return new Response(
      JSON.stringify({ success: true, data: updatedRental }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Update error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Server error",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}


// // GET /api/rental?id=123
// // Get a specific rental by passing the rental ID as a query parameter
// // Example: GET http://localhost:3000/api/rental?id=abc123
// export async function GET(request) {
//   try {
//     await connectDB();

//     // Check if ID parameter exists
//     const { searchParams } = new URL(request.url);
//     const id = searchParams.get('id');

//     // If ID exists, return single rental, otherwise return all rentals
//     if (id) {
//       // Validate ID format
//       if (!id.match(/^[0-9a-fA-F]{24}$/)) {
//         return new Response(
//           JSON.stringify({
//             success: false,
//             error: "Invalid rental ID format"
//           }),
//           {
//             status: 400,
//             headers: { "Content-Type": "application/json" }
//           }
//         );
//       }

//       const rental = await RentalService.findById(id).lean().maxTimeMS(30000);

//       if (!rental) {
//         return new Response(
//           JSON.stringify({
//             success: false,
//             error: "Rental not found"
//           }),
//           {
//             status: 404,
//             headers: { "Content-Type": "application/json" }
//           }
//         );
//       }

//       return new Response(
//         JSON.stringify({
//           success: true,
//           data: rental
//         }),
//         {
//           status: 200,
//           headers: { "Content-Type": "application/json" }
//         }
//       );
//     }

//     // Return all rentals if no ID provided
//     const rentals = await RentalService.find({}).maxTimeMS(30000);
    
//     return new Response(
//       JSON.stringify({
//         success: true,
//         data: rentals
//       }),
//       {
//         status: 200,
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({
//         success: false,
//         error: "Failed to fetch rental(s)", 
//         details: error.message
//       }),
//       {
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   }
// }


