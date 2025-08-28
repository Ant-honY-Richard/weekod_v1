import { NextRequest, NextResponse } from 'next/server';
import { getBlogPostsCollection } from '@/lib/mongodb-blog';
import { BlogPost, BlogSearchFilters, BlogPagination } from '@/types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const query = searchParams.get('query') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const author = searchParams.get('author') || '';
    const featured = searchParams.get('featured') === 'true';

    const collection = await getBlogPostsCollection();

    // Build MongoDB query
    const mongoQuery: any = {
      published: true
    };

    // Text search
    if (query) {
      mongoQuery.$text = { $search: query };
    }

    // Category filter
    if (categories.length > 0) {
      mongoQuery.categories = { $in: categories };
    }

    // Tags filter
    if (tags.length > 0) {
      mongoQuery.tags = { $in: tags };
    }

    // Author filter
    if (author) {
      mongoQuery['author.name'] = { $regex: author, $options: 'i' };
    }

    // Featured filter
    if (featured) {
      mongoQuery.featured = true;
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get total count
    const total = await collection.countDocuments(mongoQuery);
    const totalPages = Math.ceil(total / limit);

    // Get posts with pagination
    const posts = await collection
      .find(mongoQuery)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    // Build pagination info
    const pagination: BlogPagination = {
      page,
      limit,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1
    };

    return NextResponse.json({
      success: true,
      data: {
        posts,
        pagination
      }
    });

  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const collection = await getBlogPostsCollection();

    // Generate slug from title if not provided
    if (!body.slug) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    // Calculate read time (rough estimate: 200 words per minute)
    const wordCount = body.content.split(/\s+/).length;
    body.readTime = Math.ceil(wordCount / 200);

    // Set timestamps
    body.publishedAt = new Date();
    body.updatedAt = new Date();

    // Insert the blog post
    const result = await collection.insertOne(body);

    return NextResponse.json({
      success: true,
      data: {
        _id: result.insertedId,
        ...body
      }
    });

  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}