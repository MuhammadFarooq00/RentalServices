import connectDB from '@/app/lib/db';  // Adjust with your path
import RentalService from '@/app/models/RentalService';  // Adjust with your path
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
    callback(null, uploadDirectory);
  },
  filename: (req, file, callback) => {
    const id = uuid();
    const extName = file.originalname.split(".").pop();
    callback(null, `${id}.${extName}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

const uploadMiddleware = upload.single("photo");  // Ensure 'photo' is the form-data key name

// Utility function to run the middleware
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

export async function POST(req) {
  await connectDB();

  try {
    // Create a mock res object for Next.js API routes
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

    // Check if the file is uploaded
    console.log("Uploaded File: ", req.file);  // Log the uploaded file for debugging

    const { title, price, description, rating, location } = req.body;
    const photo = req.file;

    // Check if the image was uploaded
    if (!photo) {
      return new Response(
        JSON.stringify({ success: false, message: "Please add an image" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Check if all fields are filled
    if (!title || !price || !description || !rating || !location) {
      // Delete the uploaded file if validation fails
      fs.unlink(photo.path, () => {
        console.log("File deleted due to validation failure.");
      });

      return new Response(
        JSON.stringify({ success: false, message: "Please fill all the fields" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Create and save rental service
    const newRental = new RentalService({
      title,
      price,
      description,
      rating,
      location,
      image: `/uploads/${photo.filename}`,  // Save the relative image path
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

// Disable body parser for Next.js API route (required for file uploads)
export const config = {
  api: {
    bodyParser: false,  // Disable Next.js default body parser
  },
};
