// /pages/api/rentals/[userId].js

import connectDB from "@/app/lib/db";
import RentalService from "@/app/models/RentalService";

export async function GET(req, { params }) {
  await connectDB();

  const { userId } = params;

  try {
    const rentals = await RentalService.find({ user: userId });

    if (!rentals) {
      return new Response(
        JSON.stringify({ success: false, message: "No rentals found for this user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        rentals,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch rentals", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export default GET;
