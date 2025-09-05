'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { portfolio } from '@/data';

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');

const highlightsByIndustry: Record<string, string[]> = {
  Gym: [
    'Member onboarding and profiles',
    'Class schedules and bookings',
    'AI workout recommendations',
    'Progress tracking dashboards',
  ],
  Boutique: [
    'Curated catalog and lookbooks',
    'AI-powered styling suggestions',
    'Wishlist and personalized offers',
    'Seamless checkout experience',
  ],
  Ecommerce: [
    'Scalable product catalog',
    'AI product recommendations',
    'Cart and secure checkout',
    'Order tracking and notifications',
  ],
  Karate: [
    'Class management and grading',
    'Student progress tracking',
    'Event registrations',
    'Photo and video galleries',
  ],
  Consultancy: [
    'Service pages and case studies',
    'Lead capture funnels',
    'Analytics and insights dashboard',
    'CRM integrations',
  ],
  Restaurant: [
    'Dynamic menu with specials',
    'Online orders and table booking',
    'Loyalty and promotions',
    'Delivery integrations',
  ],
  Education: [
    'Courses and curriculum',
    'Adaptive learning paths',
    'Assignments and grading',
    'Student/parent dashboards',
  ],
  Healthcare: [
    'Appointment scheduling',
    'Doctor profiles and services',
    'AI symptom checker',
    'HIPAA-aware form handling',
  ],
  Finance: [
    'Budgeting and expense tracking',
    'Goal-based planning',
    'Investment analytics',
    'Bank-level security',
  ],
  'Real Estate': [
    'Listings with rich media',
    'AI property matching',
    'Lead capture and tours',
    'Saved searches and alerts',
  ],
  Technology: [
    'Product showcases',
    'Interactive demos',
    'Docs and knowledge base',
    'Support portal',
  ],
  'Non-Profit': [
    'Donations and fundraising',
    'Impact tracker',
    'Volunteer signups',
    'Event management',
  ],
};

export default function PortfolioDetailClientPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();

  const item = Array.isArray(portfolio)
    ? portfolio.find((p) => slugify(p.title) === params?.slug)
    : undefined;

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0A0A12] text-white flex items-center justify-center px-4">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold mb-2">Project not found</h1>
          <p className="text-gray-400 mb-4">The project you are looking for does not exist.</p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-4 py-2 rounded-full bg-[#00F3FF] text-[#0A0A12] text-sm font-semibold hover:bg-[#00D1E0] transition"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  const highlights = highlightsByIndustry[item.industry] || [
    'Responsive, mobile-first UI',
    'High performance and SEO-ready',
    'Clean, scalable codebase',
    'Analytics and monitoring',
  ];

  const gallery = [
    `${item.image}`,
    `https://placehold.co/800x500?text=${encodeURIComponent(item.title + ' – Screen 2')}`,
    `https://placehold.co/800x500?text=${encodeURIComponent(item.title + ' – Screen 3')}`,
  ];

  return (
    <div className="min-h-screen bg-[#0A0A12] text-white relative">
      {/* Coming Soon Overlay */}
      <div className="fixed inset-0 bg-[#0A0A12]/90 backdrop-blur-md z-50 flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#00F3FF]/30 bg-[#00F3FF]/10 mb-6">
            <span className="w-3 h-3 rounded-full bg-[#00F3FF] animate-pulse" />
            <span className="text-lg font-semibold tracking-wider text-[#00F3FF]">Coming Soon</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-white">
            Project Details Coming Soon
          </h1>
          <p className="text-gray-400 mb-6 leading-relaxed">
            We&apos;re currently preparing detailed case studies and project showcases. 
            Check back soon to see the full details of our work.
          </p>
          <button
            onClick={() => router.back()}
            className="inline-flex items-center px-6 py-3 rounded-full bg-[#00F3FF] text-[#0A0A12] font-semibold hover:bg-[#00D1E0] transition"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#0F0F1A] to-transparent">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">{item.title}</h1>
            <button
              onClick={() => router.back()}
              className="text-sm text-[#00F3FF] hover:underline"
            >
              ← Back to Portfolio
            </button>
          </div>
          <p className="text-gray-300 max-w-3xl">{item.description}</p>
          <p className="text-sm text-gray-400 mt-3">Industry: {item.industry}</p>
          <div className="mt-8 rounded-2xl overflow-hidden border border-[#00F3FF]/20">
            <Image src={item.image} alt={item.title} width={800} height={420} className="w-full h-[320px] md:h-[420px] object-cover" />
          </div>
          <div className="mt-6 flex gap-3">
            <a
              href={item.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 rounded-full bg-[#00F3FF] text-[#0A0A12] text-sm font-semibold hover:bg-[#00D1E0] transition"
            >
              View Demo
            </a>
            <button
              onClick={() => router.back()}
              className="inline-flex items-center px-4 py-2 rounded-full border border-[#00F3FF] text-[#00F3FF] text-sm font-semibold hover:bg-[#00F3FF]/10 transition"
            >
              Back to Portfolio
            </button>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-4">Project Highlights</h2>
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {highlights.map((h) => (
              <li key={h} className="px-4 py-3 rounded-xl bg-[#0F0F1A] border border-[#00F3FF]/20 text-gray-200">
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-4">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-4">Gallery</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {gallery.map((src, idx) => (
              <div key={idx} className="rounded-xl overflow-hidden border border-[#00F3FF]/15">
                <Image src={src} alt={`${item.title} preview ${idx + 1}`} width={400} height={224} className="w-full h-56 object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-2xl font-bold mb-3">Overview</h2>
          <div className="bg-[#0F0F1A] rounded-2xl border border-[#00F3FF]/15 p-5 text-gray-300">
            <p className="mb-3">
              This project showcases a modern, high-performance implementation tailored for the {item.industry.toLowerCase()} sector.
              It focuses on delivering exceptional user experience, robust functionality, and measurable business outcomes.
            </p>
            <p>
              The solution leverages proven best practices in accessibility, SEO, and performance. It is built with a scalable architecture
              to support future enhancements and integrations as your needs evolve.
            </p>
          </div>
        </div>
      </section>

      <footer className="py-10">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-gray-400">
            Want something similar? <Link href="/#contact" className="text-[#00F3FF] hover:underline">Get in touch</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
