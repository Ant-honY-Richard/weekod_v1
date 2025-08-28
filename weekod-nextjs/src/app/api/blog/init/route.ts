import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostsCollection, getBlogCategoriesCollection, initializeBlogIndexes } from '@/lib/mongodb-blog';
import { sampleBlogPosts, sampleBlogCategories } from '@/data/blog-sample';

export async function POST(request: NextRequest) {
  try {
    // Check if this is a development environment
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { success: false, error: 'This endpoint is only available in development' },
        { status: 403 }
      );
    }

    const postsCollection = await getBlogPostsCollection();
    const categoriesCollection = await getBlogCategoriesCollection();

    // Check if data already exists
    const existingPosts = await postsCollection.countDocuments();
    const existingCategories = await categoriesCollection.countDocuments();

    if (existingPosts > 0 || existingCategories > 0) {
      return NextResponse.json({
        success: false,
        error: 'Blog data already exists. Clear the database first if you want to reinitialize.'
      });
    }

    // Initialize database indexes
    await initializeBlogIndexes();

    // Insert sample categories
    await categoriesCollection.insertMany(sampleBlogCategories);

    // Insert sample blog posts
    await postsCollection.insertMany(sampleBlogPosts);

    return NextResponse.json({
      success: true,
      message: 'Blog database initialized successfully',
      data: {
        postsInserted: sampleBlogPosts.length,
        categoriesInserted: sampleBlogCategories.length
      }
    });

  } catch (error) {
    console.error('Error initializing blog database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to initialize blog database' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Check if this is a development environment
    if (process.env.NODE_ENV !== 'development') {
      return NextResponse.json(
        { success: false, error: 'This endpoint is only available in development' },
        { status: 403 }
      );
    }

    const postsCollection = await getBlogPostsCollection();
    const categoriesCollection = await getBlogCategoriesCollection();

    // Clear all blog data
    await postsCollection.deleteMany({});
    await categoriesCollection.deleteMany({});

    return NextResponse.json({
      success: true,
      message: 'Blog database cleared successfully'
    });

  } catch (error) {
    console.error('Error clearing blog database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to clear blog database' },
      { status: 500 }
    );
  }
}