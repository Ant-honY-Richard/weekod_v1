import { MongoClient, Db, Collection } from 'mongodb';
import { BlogPost, BlogCategory, BlogTag } from '@/types';

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const client = await clientPromise;
  return client.db('weekod');
}

export async function getBlogPostsCollection(): Promise<Collection<BlogPost>> {
  const db = await getDatabase();
  return db.collection<BlogPost>('blog_posts');
}

export async function getBlogCategoriesCollection(): Promise<Collection<BlogCategory>> {
  const db = await getDatabase();
  return db.collection<BlogCategory>('blog_categories');
}

export async function getBlogTagsCollection(): Promise<Collection<BlogTag>> {
  const db = await getDatabase();
  return db.collection<BlogTag>('blog_tags');
}

// Initialize indexes for better performance
export async function initializeBlogIndexes() {
  try {
    const postsCollection = await getBlogPostsCollection();
    const categoriesCollection = await getBlogCategoriesCollection();
    const tagsCollection = await getBlogTagsCollection();

    // Blog posts indexes
    await postsCollection.createIndex({ slug: 1 }, { unique: true });
    await postsCollection.createIndex({ published: 1, publishedAt: -1 });
    await postsCollection.createIndex({ featured: 1, publishedAt: -1 });
    await postsCollection.createIndex({ categories: 1 });
    await postsCollection.createIndex({ tags: 1 });
    await postsCollection.createIndex({ 'author.name': 1 });
    
    // Text search index for title, excerpt, and content
    await postsCollection.createIndex({
      title: 'text',
      excerpt: 'text',
      content: 'text',
      'seo.keywords': 'text'
    });

    // Categories indexes
    await categoriesCollection.createIndex({ slug: 1 }, { unique: true });
    await categoriesCollection.createIndex({ name: 1 });

    // Tags indexes
    await tagsCollection.createIndex({ slug: 1 }, { unique: true });
    await tagsCollection.createIndex({ name: 1 });

    console.log('Blog database indexes initialized successfully');
  } catch (error) {
    console.error('Error initializing blog indexes:', error);
  }
}

export default clientPromise;