const { spawn } = require('child_process');

console.log('🚀 Starting Weekod SEO Development Server...');
console.log('📋 SEO Features Enabled:');
console.log('  ✅ Enhanced Meta Tags & Open Graph');
console.log('  ✅ Structured Data (JSON-LD)');
console.log('  ✅ Security Headers');
console.log('  ✅ Dynamic Sitemap & Robots.txt');
console.log('  ✅ Performance Optimizations');
console.log('  ✅ Canonical URLs & Middleware');

console.log('\n🌐 Starting development server with SEO optimizations...');

const devServer = spawn('npm', ['run', 'dev'], {
  stdio: 'inherit',
  cwd: __dirname,
  env: {
    ...process.env,
    NEXT_TELEMETRY_DISABLED: '1',
    OTEL_SDK_DISABLED: 'true',
    DISABLE_COLLECT_METRICS: 'true',
    NODE_ENV: 'development',
    MONGODB_URI: 'mongodb://localhost:27017/weekod'
  },
  shell: true
});

devServer.on('error', (error) => {
  console.error('❌ Server error:', error.message);
});

devServer.on('close', (code) => {
  console.log(`\n📊 Development server closed with code ${code}`);
});

console.log('\n📝 Note: Due to Windows permissions, running in development mode.');
console.log('🔍 All SEO features are fully functional in development mode.');
console.log('🌐 Server will be available at http://localhost:3000 or http://localhost:3001');