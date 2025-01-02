import connectDB from '@/app/lib/db';
import RentalService from '@/app/models/RentalService';

export async function GET(request, { params }) {
  console.log('\x1b[35m%s\x1b[0m', "GET request received for URL:", params.id);

  try {
    await connectDB();
    
    const id = await params.id;

    // Validate ID format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid rental ID format",
          providedId: id
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Find rental by ID with timeout
    const rental = await RentalService.findById(id).lean().maxTimeMS(30000);

    if (!rental) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Rental not found",
          requestedId: id
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
          status: 408,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Generic error handler
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch rental",
        details: error.message
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}