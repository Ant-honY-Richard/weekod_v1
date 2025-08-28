import { Metadata } from 'next';
import BlogPage from '@/components/pages/BlogPage';

export const metadata: Metadata = {
  title: 'Insights & Resources | Weekod Blog',
  description: 'Stay ahead with the latest in AI-powered web development, startup growth, and digital product building.',
  keywords: 'AI web development, startup tips, app prototyping, web design trends, digital marketing',
  openGraph: {
    title: 'Insights & Resources | Weekod Blog',
    description: 'Stay ahead with the latest in AI-powered web development, startup growth, and digital product building.',
    type: 'website',
    url: '/blog',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Insights & Resources | Weekod Blog',
    description: 'Stay ahead with the latest in AI-powered web development, startup growth, and digital product building.',
  }
};

export default function Blog() {
  return <BlogPage />;
}