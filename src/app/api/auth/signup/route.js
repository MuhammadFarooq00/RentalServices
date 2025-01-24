// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         name: { label: "Name", type: "text" },
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         const { name, email, password } = credentials;
//         try {
//           await connectDB();

//           // Check if the user already exists
//           const existingUser = await User.findOne({ email });
//           if (existingUser) {
//             throw new Error("User already exists.");
//           }

//           // Create a new user
//           const newUser = new User({
//             name,
//             email,
//             password, // You should hash the password in production
//           });

//           await newUser.save();

//           return newUser;
//         } catch (error) {
//           console.error("Error during signup:", error);
//           throw new Error("Internal Server Error");
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
// });

// import bcrypt from "bcryptjs";
// import connectDB from "../../../lib/db";
// import User from "../../../models/UserModel";

// export const POST = async (req) => {
//   try {
//     await connectDB();

//     const { name, email, password } = await req.json();

//     if (!name || !email || !password) {
//       return new Response(
//         JSON.stringify({ message: "All fields are required" }),
//         { status: 400 }
//       );
//     }

//     if (password.length > 50) {
//       return new Response(
//         JSON.stringify({ message: "Password cannot exceed 50 characters" }),
//         { status: 400 }
//       );
//     }

//     const existingUser = await User.findOne({ email });

//     if (existingUser) {
//       return new Response(
//         JSON.stringify({ message: "User already exists" }),
//         { status: 400 }
//       );
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     await newUser.save();

//     return new Response(
//       JSON.stringify({ message: "Account created successfully" }),
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error during signup:", error);
//     return new Response(
//       JSON.stringify({ message: "Internal Server Error", error: error.message }),
//       { status: 500 }
//     );
//   }
// };
















// /pages/api/rentals/signup.js

import connectDB from "@/app/lib/db";
import User from "@/app/models/UserModel";
import { hashPassword } from "@/app/lib/hash";
import { generateToken } from "@/app/lib/jwt";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ error: "Name, email, and password are required." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ error: "User with this email already exists." }),
        {
          status: 409,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const hashedPassword = await hashPassword(password);
    console.log("hashedPassowrd is this : ", hashedPassword);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
    });

    await newUser.save();

    // Generate JWT token using utility
    const token = generateToken(newUser);

    return new Response(
      JSON.stringify({ message: "User created successfully.", user:{ token, newUser: { id: newUser._id, name: newUser.name, email: newUser.email } }}),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in signup route:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return new Response(
        JSON.stringify({ error: messages.join("; ") }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export default POST;
