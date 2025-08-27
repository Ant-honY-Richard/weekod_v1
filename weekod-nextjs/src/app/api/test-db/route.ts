import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    
    // Test the connection by getting database stats
    const stats = await db.stats();
    
    return NextResponse.json({
      success: true,
      message: 'MongoDB connection successful',
      database: stats.db,
      collections: stats.collections || 0,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Database connection test failed:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to connect to MongoDB',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}