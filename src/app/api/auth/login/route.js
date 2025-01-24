import connectDB from "@/app/lib/db";
import User from "@/app/models/UserModel";
import { verifyPassword } from "@/app/lib/hash";
import { generateToken } from "@/app/lib/jwt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Validate email and password input
    if (!email || !password) {
      return new Response(
        JSON.stringify({ error: "Email and password are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Connect to the database
    await connectDB();

    // Find user by email
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }


    // Verify the password
    const isPasswordValid = await verifyPassword(password, existingUser.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ error: "Invalid credentials." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    
    const token = generateToken(existingUser);

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Login successful!",
        user: { token, user: { id: existingUser._id, name: existingUser.name, email: existingUser.email } },
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in login route:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
