#!/usr/bin/env node

/**
 * Image Optimization Script
 * Finds all <img> tags and suggests Next.js <Image> replacements
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src');

// Files that need image optimization based on Lighthouse report
const filesToOptimize = [
  'src/components/Footer.tsx',
  'src/components/Navigation.tsx', 
  'src/components/NavigationRouter.tsx',
  'src/components/pages/AboutPage.tsx',
  'src/components/pages/BlogPostPage.tsx',
  'src/components/pages/PortfolioPage.tsx',
  'src/components/pages/ProcessPage.tsx',
  'src/components/pages/ServicesPage.tsx',
  'src/components/ui/BlogAuthorBio.tsx',
  'src/components/ui/BlogCard.tsx',
  'src/components/ui/OptimizedImage.tsx'
];

function findImgTags(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const imgRegex = /<img\s+[^>]*>/g;
    const matches = content.match(imgRegex);
    
    if (matches) {
      console.log(`\n📁 ${filePath}`);
      console.log(`Found ${matches.length} <img> tag(s):`);
      
      matches.forEach((match, index) => {
        const lines = content.substring(0, content.indexOf(match)).split('\n');
        const lineNumber = lines.length;
        
        console.log(`  Line ${lineNumber}: ${match}`);
        
        // Suggest Next.js Image replacement
        const srcMatch = match.match(/src=["']([^"']+)["']/);
        const altMatch = match.match(/alt=["']([^"']+)["']/);
        const classMatch = match.match(/className=["']([^"']+)["']/);
        
        if (srcMatch) {
          console.log(`  ✅ Suggested replacement:`);
          console.log(`    <Image`);
          console.log(`      src="${srcMatch[1]}"`);
          console.log(`      alt="${altMatch ? altMatch[1] : 'Description needed'}"`);
          console.log(`      width={800} // Add appropriate width`);
          console.log(`      height={600} // Add appropriate height`);
          if (classMatch) {
            console.log(`      className="${classMatch[1]}"`);
          }
          console.log(`      quality={80}`);
          console.log(`      priority={false} // Set to true for above-the-fold images`);
          console.log(`    />`);
        }
      });
    }
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
  }
}

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      scanDirectory(filePath);
    } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
      const relativePath = path.relative(path.join(__dirname, '..'), filePath);
      if (filesToOptimize.some(f => relativePath.includes(f.replace('src/', '')))) {
        findImgTags(filePath);
      }
    }
  });
}

console.log('🔍 Scanning for <img> tags that need optimization...\n');
console.log('Based on Lighthouse performance audit findings:\n');

scanDirectory(srcDir);

console.log('\n📋 Summary:');
console.log('1. Replace all <img> tags with Next.js <Image> component');
console.log('2. Add appropriate width and height attributes');
console.log('3. Set priority={true} for above-the-fold images');
console.log('4. Use quality={80} for optimal file size vs quality');
console.log('5. Add proper alt text for accessibility');

console.log('\n🚀 Expected Performance Improvements:');
console.log('- Automatic WebP/AVIF conversion');
console.log('- Lazy loading by default');
console.log('- Responsive image sizing');
console.log('- Reduced Largest Contentful Paint (LCP)');
console.log('- Better Core Web Vitals scores');

console.log('\n💡 Don\'t forget to:');
console.log('- Import Image from "next/image" at the top of each file');
console.log('- Test images on different screen sizes');
console.log('- Verify images load correctly after changes');