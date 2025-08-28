import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPostPage from '@/components/pages/BlogPostPage';
import { BlogPost } from '@/types';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/blog/posts/${slug}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data.success ? data.data : null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Weekod Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  const title = post.seo?.metaTitle || `${post.title} | Weekod Blog`;
  const description = post.seo?.metaDescription || post.excerpt;
  const keywords = post.seo?.keywords?.join(', ') || post.tags.join(', ');

  return {
    title,
    description,
    keywords,
    authors: [{ name: post.author.name }],
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/blog/${post.slug}`,
      publishedTime: post.publishedAt.toString(),
      modifiedTime: post.updatedAt?.toString(),
      authors: [post.author.name],
      tags: post.tags,
      images: post.featuredImage ? [
        {
          url: post.featuredImage.url,
          alt: post.featuredImage.alt,
        }
      ] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: post.featuredImage ? [post.featuredImage.url] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPageRoute({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  // Generate structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.featuredImage?.url,
    author: {
      '@type': 'Person',
      name: post.author.name,
      image: post.author.image,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Weekod',
      logo: {
        '@type': 'ImageObject',
        url: '/favicon.svg',
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `/blog/${post.slug}`,
    },
    keywords: post.tags.join(', '),
    articleSection: post.categories.join(', '),
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BlogPostPage post={post} />
    </>
  );
}