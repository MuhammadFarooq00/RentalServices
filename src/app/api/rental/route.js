import connectDB from '@/app/lib/db'; // Adjust the path according to your project structure
import RentalService from '@/app/models/RentalService'; // Adjust the path according to your project structure
import fs from 'fs';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
import path from 'path';

// Configure Multer Storage
const uploadDirectory = path.join(process.cwd(), "public/uploads");
if (!fs.existsSync(uploadDirectory)) {
  fs.mkdirSync(uploadDirectory, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, uploadDirectory);  // Store files in public/uploads
  },
  filename: (req, file, callback) => {
    const id = uuid();  // Unique identifier for the file
    const extName = file.originalname.split(".").pop();  // Extract file extension
    callback(null, `${id}.${extName}`);
  },
});

// Create the multer instance to handle single file upload under the field name "photo"
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit for file size
});

const uploadMiddleware = upload.single("photo");  // The key should be "photo" for the file field

// Utility function to run the multer middleware
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};

// Define POST request handler for the rental service
export async function POST(req) {
  await connectDB();

  try {
    // Create a mock response object for Next.js API route
    const resMock = {
      setHeader: () => {},
      status: () => {},
      json: (data) => {
        return new Response(JSON.stringify(data), {
          status: data.success ? 201 : 400,
          headers: { "Content-Type": "application/json" },
        });
      },
    };

    // Use the runMiddleware function to process the file upload
    await runMiddleware(req, resMock, uploadMiddleware);

    // Log the uploaded file for debugging
    console.log("Uploaded File: ", req.file);

    // Extract the fields from the body
    const { title, price, description, rating, location } = req.body;
    const photo = req.file;  // The file should be available here after multer processing

    // If no photo was uploaded, return error
    if (!photo) {
      return new Response(
        JSON.stringify({ success: false, message: "Please add an image" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // If any field is missing, return error
    if (!title || !price || !description || !rating || !location) {
      // Delete the file if validation fails
      fs.unlink(photo.path, () => {
        console.log("File deleted due to validation failure.");
      });
      return new Response(
        JSON.stringify({ success: false, message: "Please fill all the fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create and save the rental service
    const newRental = new RentalService({
      title,
      price,
      description,
      rating,
      location,
      image: `/uploads/${photo.filename}`,  // Save the relative file path
    });

    await newRental.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Product successfully added",
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to create rental", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// Disable bodyParser for file uploads in Next.js
export const config = {
  api: {
    bodyParser: false,  // Disable the default Next.js body parser to handle file upload
  },
};
