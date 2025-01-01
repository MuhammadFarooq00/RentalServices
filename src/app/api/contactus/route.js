import { NextResponse } from 'next/server';
import ContactUs from '@/app/models/ContactUs';
import connectDB from '@/app/lib/db';

// GET all contact requests with pagination and filtering
export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const status = searchParams.get('status');
    const search = searchParams.get('search');

    const skip = (page - 1) * limit;
    
    let query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { phone: { $regex: search, $options: 'i' } }
      ];
    }

    const [contacts, total] = await Promise.all([
      ContactUs.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ContactUs.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('GET Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/*
GET API Documentation:

This API endpoint retrieves contact form submissions with pagination, filtering and search capabilities.

Base URL: /api/contactus

Query Parameters:
1. page (optional) 
   - Type: number
   - Default: 1
   - Description: Page number for pagination

2. limit (optional)
   - Type: number 
   - Default: 10
   - Description: Number of records per page

3. status (optional)
   - Type: string
   - Values: 'pending', 'resolved', 'in-progress'
   - Description: Filter contacts by status

4. search (optional)
   - Type: string
   - Description: Search contacts by name, email or phone number
   - Case insensitive search

Response Format:
{
  "success": true,
  "data": [
    {
      "_id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "1234567890",
      "message": "...", 
      "address": "...",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "pages": 10
  }
}

Testing in Postman:

1. Basic GET Request:
   GET http://localhost:3000/api/contactus
   - Returns first 10 contacts

2. With Pagination:
   GET http://localhost:3000/api/contactus?page=2&limit=5
   - Returns 5 contacts from page 2

3. Filter by Status:
   GET http://localhost:3000/api/contactus?status=pending
   - Returns only pending contacts

4. Search Contacts:
   GET http://localhost:3000/api/contactus?search=john
   - Returns contacts matching "john" in name/email/phone

5. Combined Filters:
   GET http://localhost:3000/api/contactus?status=pending&search=john&page=1&limit=5
   - Returns pending contacts matching "john", first page with 5 records

Error Responses:
- 500: Internal Server Error
  {
    "success": false,
    "message": "Internal server error"
  }
*/


// POST new contact request
export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'message', 'address'];
    const missingFields = requiredFields.filter(field => !body[field]);
    
    if (missingFields.length > 0) {
      return NextResponse.json(
        { 
          success: false, 
          message: `Missing required fields: ${missingFields.join(', ')}` 
        },
        { status: 400 }
      );
    }

    const contact = await ContactUs.create(body);
    
    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );

  } catch (error) {
    if (error.name === 'ValidationError') {
      return NextResponse.json(
        { success: false, message: error.message },
        { status: 400 }
      );
    }
    
    console.error('POST Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

/*
To test the POST API in Postman:

1. Basic Success Case:
   - Method: POST
   - URL: http://your-domain/api/contactus
   - Headers: Content-Type: application/json
   - Body (raw JSON):
   {
     "name": "John Doe",
     "email": "john@example.com",
     "phone": "1234567890",
     "message": "Test message",
     "address": "123 Test Street"
   }
   Expected Response: 
   - Status: 201
   - Body: { "success": true, "data": {...contact object} }

2. Missing Fields Case:
   - Same URL and method
   - Body (missing some required fields):
   {
     "name": "John Doe",
     "email": "john@example.com"
   }
   Expected Response:
   - Status: 400 
   - Body: { "success": false, "message": "Missing required fields: phone, message, address" }

3. Invalid Data Case:
   - Same URL and method
   - Body (with invalid email format):
   {
     "name": "John Doe",
     "email": "invalid-email",
     "phone": "1234567890",
     "message": "Test message",
     "address": "123 Test Street"
   }
   Expected Response:
   - Status: 400
   - Body: { "success": false, "message": "Validation error message" }

4. Server Error Case:
   This happens automatically if there's a database connection issue or other server-side problems
   Expected Response:
   - Status: 500
   - Body: { "success": false, "message": "Internal server error" }

Note: The API requires all fields (name, email, phone, message, address) to be present in the request body.
The response will always include a 'success' boolean and either 'data' or 'message' field.
*/


// PATCH update contact status
export async function PATCH(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    
    if (!body.status || !['pending', 'resolved', 'in-progress'].includes(body.status)) {
      return NextResponse.json(
        { success: false, message: 'Invalid status value' },
        { status: 400 }
      );
    }

    const contact = await ContactUs.findByIdAndUpdate(
      id,
      { status: body.status },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: contact });

  } catch (error) {
    console.error('PATCH Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE contact request
export async function DELETE(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Contact ID is required' },
        { status: 400 }
      );
    }

    const contact = await ContactUs.findByIdAndDelete(id);

    if (!contact) {
      return NextResponse.json(
        { success: false, message: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, message: 'Contact deleted successfully' }
    );

  } catch (error) {
    console.error('DELETE Contact Error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}


