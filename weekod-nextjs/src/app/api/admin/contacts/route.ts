import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET(request: NextRequest) {
  try {
    // Simple authentication check (you should implement proper auth in production)
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY || 'admin123'; // Change this in production!
    
    if (!authHeader || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Get query parameters
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = parseInt(searchParams.get('skip') || '0');
    const sortBy = searchParams.get('sortBy') || 'submittedAt';
    const sortOrder = searchParams.get('sortOrder') === 'asc' ? 1 : -1;

    // Fetch contacts from MongoDB
    const contacts = await db.collection('contacts')
      .find({})
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Math.min(limit, 100)) // Max 100 records per request
      .toArray();

    // Get total count
    const totalCount = await db.collection('contacts').countDocuments();

    return NextResponse.json({
      success: true,
      data: contacts,
      pagination: {
        total: totalCount,
        limit,
        skip,
        hasMore: skip + limit < totalCount
      }
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

// Get a specific contact by ID
export async function POST(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    if (!id) {
      return NextResponse.json(
        { error: 'Contact ID is required' },
        { status: 400 }
      );
    }

    // Simple authentication check
    const authHeader = request.headers.get('authorization');
    const adminKey = process.env.ADMIN_API_KEY || 'admin123';
    
    if (!authHeader || authHeader !== `Bearer ${adminKey}`) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { db } = await connectToDatabase();
    const { ObjectId } = require('mongodb');
    
    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });
    
    if (!contact) {
      return NextResponse.json(
        { error: 'Contact not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Error fetching contact:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}