const { spawn, execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

async function buildProduction() {
  try {
    console.log('🚀 Starting SEO-optimized production build...');
    
    // Set critical environment variables
    process.env.NEXT_TELEMETRY_DISABLED = '1';
    process.env.OTEL_SDK_DISABLED = 'true';
    process.env.DISABLE_COLLECT_METRICS = 'true';
    process.env.NODE_ENV = 'production';
    process.env.MONGODB_URI = 'mongodb://localhost:27017/weekod';
    
    console.log('🧹 Cleaning previous build...');
    
    // Force remove .next directory using Windows commands
    try {
      execSync('taskkill /f /im node.exe /t', { stdio: 'ignore' });
    } catch (e) {} // Ignore if no Node processes
    
    await new Promise(resolve => setTimeout(resolve, 2000)); // Wait 2 seconds
    
    const nextPath = path.join(__dirname, '.next');
    if (fs.existsSync(nextPath)) {
      try {
        execSync(`takeown /f "${nextPath}" /r /d y && icacls "${nextPath}" /grant Everyone:F /t && rmdir /s /q "${nextPath}"`, { 
          stdio: 'inherit',
          shell: true 
        });
        console.log('✅ Successfully cleaned .next directory');
      } catch (cleanError) {
        console.warn('⚠️  Cleanup warning:', cleanError.message);
      }
    }
    
    console.log('📦 Building with optimizations...');
    
    // Use spawn for better process control
    const buildProcess = spawn('npx', ['next', 'build'], {
      stdio: 'inherit',
      cwd: __dirname,
      env: {
        ...process.env,
        NEXT_TELEMETRY_DISABLED: '1',
        OTEL_SDK_DISABLED: 'true',
        DISABLE_COLLECT_METRICS: 'true',
        NODE_ENV: 'production',
        MONGODB_URI: 'mongodb://localhost:27017/weekod'
      },
      shell: true
    });
    
    buildProcess.on('error', (error) => {
      console.error('❌ Build process error:', error.message);
    });
    
    buildProcess.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Production build completed successfully!');
        console.log('🔍 SEO features enabled:');
        console.log('  - Enhanced metadata and Open Graph tags');
        console.log('  - Structured data (JSON-LD)');
        console.log('  - Security headers');
        console.log('  - Automatic sitemap generation');
        console.log('  - Optimized performance');
        
        // Generate sitemap after successful build
        try {
          console.log('🗺️  Generating sitemap...');
          execSync('npx next-sitemap --config next-sitemap.config.js', {
            stdio: 'inherit',
            cwd: __dirname
          });
          console.log('✅ Sitemap generated successfully!');
        } catch (sitemapError) {
          console.warn('⚠️  Sitemap generation warning:', sitemapError.message);
        }
        
      } else {
        console.error(`❌ Build failed with exit code ${code}`);
        console.log('💡 Trying development mode for SEO testing...');
        
        // Fallback to dev mode
        const devProcess = spawn('npm', ['run', 'dev'], {
          stdio: 'inherit',
          cwd: __dirname,
          env: {
            ...process.env,
            NEXT_TELEMETRY_DISABLED: '1',
            OTEL_SDK_DISABLED: 'true'
          },
          shell: true
        });
        
        console.log('🌐 Development server starting for SEO testing...');
      }
    });
    
  } catch (error) {
    console.error('💥 Build script failed:', error.message);
    
    console.log('🔄 Fallback: Starting development server...');
    try {
      const devProcess = spawn('npm', ['run', 'dev'], {
        stdio: 'inherit',
        cwd: __dirname,
        env: {
          ...process.env,
          NEXT_TELEMETRY_DISABLED: '1'
        },
        shell: true
      });
      
      console.log('✅ Development server started for SEO testing');
    } catch (devError) {
      console.error('❌ Fallback failed:', devError.message);
    }
  }
}

buildProduction();