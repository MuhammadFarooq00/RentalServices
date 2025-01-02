import connectDB from '@/app/lib/db';
import RentalService from '@/app/models/RentalService';

export async function GET(request) {
  console.log('\x1b[35m%s\x1b[0m', "GET request received for URL:", request.url);
  try {
    await connectDB();

    // Extract ID from the URL path
    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];
    
    console.log("Extracted ID:", id); // Debug log

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

    // Validate ID format - must be 24 character hex string
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid rental ID format - must be a 24 character hexadecimal string",
          providedId: id
        }),
        {
          status: 400, // Changed from 404 to 400 for invalid format
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Find rental by ID with timeout and lean() for better performance
    const rental = await RentalService.findById(id).lean().maxTimeMS(30000);
    
    console.log("Found rental:", rental); // Debug log

    if (!rental) {
      console.log("No rental found for ID:", id); // Debug log
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rental not found",
          requestedId: id // Include requested ID in response for debugging
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: rental
      }),
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );

  } catch (error) {
    console.error("Error fetching rental:", error);
    console.error("Stack trace:", error.stack); // Add stack trace for debugging
    
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

    // Handle timeout errors
    if (error.name === 'MongooseError' && error.message.includes('timeout')) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Request timeout",
          details: "Database operation took too long"
        }),
        {
          status: 504,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch rental",
        details: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}