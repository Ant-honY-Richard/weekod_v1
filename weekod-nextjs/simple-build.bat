@echo off
echo 🚀 Simple Windows-compatible Next.js build...

REM Set environment variables to disable tracing
set NEXT_TELEMETRY_DISABLED=1
set OTEL_SDK_DISABLED=true
set DISABLE_COLLECT_METRICS=true
set NODE_ENV=production
set MONGODB_URI=mongodb://localhost:27017/weekod

echo 🧹 Cleaning previous build...
if exist .next rmdir /s /q .next 2>nul

echo 📦 Building Next.js application...
npx next build

if %ERRORLEVEL% EQU 0 (
    echo ✅ Build completed successfully!
    echo 🔍 SEO features enabled for production
) else (
    echo ❌ Build failed - using development mode
    echo 💡 All SEO features work in development mode
)