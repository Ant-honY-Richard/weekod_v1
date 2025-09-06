const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function cleanBuildFolders() {
  try {
    const nextPath = path.join(__dirname, '.next');
    if (fs.existsSync(nextPath)) {
      console.log('Cleaning .next directory...');
      fs.rmSync(nextPath, { recursive: true, force: true });
    }
    console.log('Clean completed');
  } catch (error) {
    console.warn('Clean warning:', error.message);
  }
}

async function buildProject() {
  try {
    await cleanBuildFolders();
    
    console.log('Starting Next.js build...');
    execSync('npx next build', {
      stdio: 'inherit',
      cwd: __dirname,
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_TELEMETRY_DISABLED: '1'
      }
    });
    
    console.log('Build completed successfully!');
    
    // Generate sitemap after build
    console.log('Generating sitemap...');
    execSync('npx next-sitemap', {
      stdio: 'inherit',
      cwd: __dirname
    });
    
    console.log('SEO files generated successfully!');
    
  } catch (error) {
    console.error('Build failed:', error.message);
    process.exit(1);
  }
}

buildProject();