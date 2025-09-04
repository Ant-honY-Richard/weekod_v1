import { NextRequest, NextResponse } from 'next/server';
import { getBlogCategoriesCollection, getBlogPostsCollection } from '@/lib/mongodb-blog';

// Define the type inline to avoid import issues
interface BlogCategory {
  _id?: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  postCount?: number;
}

export async function GET(request: NextRequest) {
  try {
    const categoriesCollection = await getBlogCategoriesCollection();
    const postsCollection = await getBlogPostsCollection();

    // Get all categories
    const categories = await categoriesCollection.find({}).toArray();

    // Get post counts for each category
    const categoriesWithCounts = await Promise.all(
      categories.map(async (category) => {
        const postCount = await postsCollection.countDocuments({
          categories: category.slug,
          published: true
        });
        return {
          ...category,
          postCount
        };
      })
    );

    return NextResponse.json({
      success: true,
      data: categoriesWithCounts
    });

  } catch (error) {
    console.error('Error fetching blog categories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const collection = await getBlogCategoriesCollection();

    // Generate slug from name if not provided
    if (!body.slug) {
      body.slug = body.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const result = await collection.insertOne(body);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...body
      }
    });

  } catch (error) {
    console.error('Error creating blog category:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog category' },
      { status: 500 }
    );
  }
}