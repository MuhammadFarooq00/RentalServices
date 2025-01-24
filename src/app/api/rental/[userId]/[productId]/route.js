// /pages/api/rentals/[userId]/[productId].js

import connectDB from "@/app/lib/db";
import RentalService from "@/app/models/RentalService";



export async function GET(req, { params }) {
  await connectDB();

  const { userId, productId } = params;

  try {
    const rental = await RentalService.findOne({ _id: productId, user: userId });

    if (!rental) {
      return new Response(
        JSON.stringify({ success: false, message: "Rental not found for this user" }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        rental,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch rental", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

// export default GET;
