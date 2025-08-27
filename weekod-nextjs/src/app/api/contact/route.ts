import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';

export interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  project: string;
  budget?: string;
  message: string;
  submittedAt: Date;
  ipAddress?: string;
  userAgent?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { name, email, project, message } = body;
    
    if (!name || !email || !project || !message) {
      return NextResponse.json(
        { error: 'Missing required fields: name, email, project, and message are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    const { db } = await connectToDatabase();
    
    // Prepare the document to insert
    const contactData: ContactFormData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      company: body.company?.trim() || '',
      project: project.trim(),
      budget: body.budget?.trim() || '',
      message: message.trim(),
      submittedAt: new Date(),
      ipAddress: request.ip || request.headers.get('x-forwarded-for') || 'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown'
    };

    // Insert the contact form data into MongoDB
    const result = await db.collection('contacts').insertOne(contactData);
    
    if (result.acknowledged) {
      console.log('Contact form submitted:', {
        id: result.insertedId,
        name: contactData.name,
        email: contactData.email,
        project: contactData.project
      });

      return NextResponse.json(
        { 
          success: true, 
          message: 'Contact form submitted successfully',
          id: result.insertedId
        },
        { status: 201 }
      );
    } else {
      throw new Error('Failed to insert contact data');
    }

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return NextResponse.json(
      { 
        error: 'Internal server error. Please try again later.',
        details: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { message: 'Contact API endpoint is working. Use POST to submit contact forms.' },
    { status: 200 }
  );
}