import { NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import Booking from '@/app/models/Booking';
import mongoose from 'mongoose';


/*
To test the POST API endpoint in Postman:

1. Set the request method to POST
2. URL: http://localhost:3000/api/booking
3. Headers: 
   - Content-Type: application/json

4. Request body template (raw JSON):
{
  "name": "John Doe",
  "email": "john@example.com", 
  "phone": "+1234567890",
  "date": "2024-01-15T10:00:00Z",
  "comments": "Please handle with care",
  "product": "Gaming Console",
  "delivery": "Express",
  "address": "123 Main Street",
  "city": "New York",
  "code": "10001",
  "status": false
}

Test Cases:

1. Valid booking - Use template above
   Expected: 201 status, success true

2. Missing required field
   Remove any required field (e.g. name)
   Expected: 400 status, error message

3. Invalid email format
   "email": "invalid-email"
   Expected: 400 status, validation error

4. Invalid phone format
   "phone": "abc"
   Expected: 400 status, validation error

5. Past date
   "date": "2020-01-01T10:00:00Z"
   Expected: 400 status, validation error

6. Invalid delivery option
   "delivery": "SuperFast"
   Expected: 400 status, validation error

7. Short address
   "address": "123"
   Expected: 400 status, validation error

8. Invalid postal code
   "code": "!@#"
   Expected: 400 status, validation error

9. Comments too long
   "comments": "a".repeat(501)
   Expected: 400 status, validation error

10. Duplicate email
    Submit same email twice
    Expected: 400 status, duplicate key error
*/


export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    const booking = await Booking.create(body);
    return NextResponse.json({ success: true, data: booking }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

/*
To test the GET API endpoint, you can make HTTP GET requests with different query parameters:

1. Get all bookings (no filters):
GET /api/booking

2. Search by name (case-insensitive):
GET /api/booking?name=john

3. Search by email:
GET /api/booking?email=john@example.com

4. Search by phone:
GET /api/booking?phone=+1234567890

5. Search by date (ISO format):
GET /api/booking?date=2024-01-01

6. Search by delivery option:
GET /api/booking?delivery=Express

7. Search by status:
GET /api/booking?status=true
GET /api/booking?status=false

8. Search by city:
GET /api/booking?city=New York

9. Multiple filters combined:
GET /api/booking?name=john&city=New York&status=true

You can test these using:
1. Browser's address bar for simple GET requests
2. Postman or similar API testing tools
3. curl commands in terminal:
   curl "http://localhost:3000/api/booking?name=john&status=true"
4. JavaScript fetch:
   fetch('/api/booking?name=john&status=true')
     .then(res => res.json())
     .then(data => console.log(data))

Note: 
- String fields (name, email, city etc) use case-insensitive regex matching
- Date field needs ISO format
- Status field needs boolean true/false
- Results are sorted by createdAt in descending order (newest first)
*/


export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    
    // Build query object from search parameters
    const query = {};
    for (const [key, value] of searchParams.entries()) {
      if (key === 'date') {
        query[key] = new Date(value);
      } else if (key === 'status') {
        query[key] = value === 'true';
      } else {
        // Case-insensitive search for string fields
        query[key] = { $regex: value, $options: 'i' };
      }
    }

    const bookings = await Booking.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bookings });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}



export async function PATCH(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { success: false, message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedBooking });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request) {
  try {
    await connectDB();
    
    // Get booking ID from search params instead of path
    const { searchParams } = new URL(request.url);
    const bookingId = searchParams.get('id');

    if (!bookingId) {
      return NextResponse.json(
        { success: false, message: 'Booking ID is required' },
        { status: 400 }
      );
    }

    // Validate if bookingId is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(bookingId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid booking ID format' },
        { status: 400 }
      );
    }

    // Find and delete the booking
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);

    if (!deletedBooking) {
      return NextResponse.json(
        { success: false, message: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Booking deleted successfully',
      data: deletedBooking 
    }, { status: 200 });

  } catch (error) {
    console.error('Delete booking error:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

/*
To test the DELETE API endpoint:

curl -X DELETE "http://localhost:3001/api/booking?id=65a123b456c789d012e345f6"

Expected Response:
{
    "success": true,
    "message": "Booking deleted successfully", 
    "data": {
        "_id": "65a123b456c789d012e345f6",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "date": "2024-01-20T00:00:00.000Z",
        "product": "Rental Item",
        "delivery": "Express",
        "address": "123 Main St",
        "city": "New York",
        "code": "10001",
        "status": false,
        "createdAt": "2024-01-12T12:00:00.000Z",
        "updatedAt": "2024-01-12T12:00:00.000Z"
    }
}
*/



/*
To test the DELETE API endpoint in Postman:

1. Open Postman
2. Create a new request
3. Set the HTTP method to DELETE
4. Enter the URL: http://localhost:3001/api/booking/{bookingId}
   Replace {bookingId} with an actual booking ID from your database
   Example: http://localhost:3001/api/booking/65a123b456c789d012e345f6

5. No request body or headers are required for this endpoint

Expected Responses:

Success (200 OK):
{
    "success": true,
    "message": "Booking deleted successfully",
    "data": {
        // Deleted booking object
    }
}

Error Cases:
- Invalid/Missing ID (400):
{
    "success": false,
    "message": "Booking ID is required"
}

- Booking Not Found (404):
{
    "success": false, 
    "message": "Booking not found"
}

- Server Error (500):
{
    "success": false,
    "message": "Error message details"
}
*/





