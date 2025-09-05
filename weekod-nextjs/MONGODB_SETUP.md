# MongoDB Integration Setup

This document explains how to set up and use the MongoDB integration for the contact form.

## Prerequisites

1. **MongoDB Server**: Make sure MongoDB is running on `mongodb://localhost:27017/`
2. **Node.js Dependencies**: The `mongodb` package has been installed

## Configuration

The MongoDB connection is configured in `.env.local`:

```env
MONGODB_URI=mongodb://localhost:27017/
MONGODB_DB=weekod
ADMIN_API_KEY=admin123
```

## Database Structure

### Collection: `contacts`

Each contact form submission creates a document with the following structure:

```json
{
  "_id": "ObjectId",
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "project": "website",
  "budget": "growth",
  "message": "I need a new website...",
  "submittedAt": "2025-01-15T10:30:00.000Z",
  "ipAddress": "192.168.1.1",
  "userAgent": "Mozilla/5.0..."
}
```

## API Endpoints

### 1. Submit Contact Form
- **URL**: `POST /api/contact`
- **Purpose**: Submit a new contact form
- **Required Fields**: `name`, `email`, `project`, `message`
- **Optional Fields**: `company`, `budget`

**Example Request:**
```javascript
fetch('/api/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: 'John Doe',
    email: 'john@example.com',
    project: 'website',
    message: 'I need a new website'
  })
})
```

### 2. Test Database Connection
- **URL**: `GET /api/test-db`
- **Purpose**: Verify MongoDB connection is working

### 3. Admin: View Contacts (Protected)
- **URL**: `GET /api/admin/contacts`
- **Purpose**: Retrieve submitted contact forms
- **Authentication**: Requires `Authorization: Bearer admin123` header
- **Query Parameters**:
  - `limit`: Number of records (default: 10, max: 100)
  - `skip`: Number of records to skip (default: 0)
  - `sortBy`: Field to sort by (default: 'submittedAt')
  - `sortOrder`: 'asc' or 'desc' (default: 'desc')

**Example Request:**
```bash
curl -H "Authorization: Bearer admin123" \
     "http://localhost:3000/api/admin/contacts?limit=5&sortOrder=desc"
```

## Testing the Integration

1. **Start MongoDB**: Ensure MongoDB is running on localhost:27017
2. **Start the Application**: `npm run dev`
3. **Test Database Connection**: Visit `http://localhost:3000/api/test-db`
4. **Submit a Test Form**: Go to the contact page and submit a form
5. **View Submissions**: Use the admin API to view submitted forms

## MongoDB Commands

### Connect to MongoDB Shell
```bash
mongosh mongodb://localhost:27017/weekod
```

### View All Contacts
```javascript
db.contacts.find().pretty()
```

### Count Total Contacts
```javascript
db.contacts.countDocuments()
```

### Find Contacts by Email
```javascript
db.contacts.find({ email: "john@example.com" })
```

### Delete All Contacts (for testing)
```javascript
db.contacts.deleteMany({})
```

## Security Considerations

1. **Change Admin API Key**: Update `ADMIN_API_KEY` in production
2. **Add Proper Authentication**: Implement proper admin authentication
3. **Rate Limiting**: Consider adding rate limiting to prevent spam
4. **Input Validation**: The API includes basic validation, but consider additional sanitization
5. **HTTPS**: Use HTTPS in production
6. **Database Security**: Secure your MongoDB instance with authentication

## Troubleshooting

### Common Issues

1. **MongoDB Connection Failed**
   - Ensure MongoDB is running: `mongod --version`
   - Check connection string in `.env.local`
   - Verify port 27017 is not blocked

2. **Form Submission Fails**
   - Check browser console for errors
   - Verify API endpoint is accessible
   - Check MongoDB logs for connection issues

3. **Admin API Returns 401**
   - Verify `Authorization` header is included
   - Check `ADMIN_API_KEY` in `.env.local`

### Debug Mode

Set `NODE_ENV=development` in `.env.local` to see detailed error messages in API responses.

## Production Deployment

1. Update MongoDB URI for production database
2. Change `ADMIN_API_KEY` to a secure random string
3. Implement proper authentication for admin endpoints
4. Add rate limiting and CORS configuration
5. Set up MongoDB indexes for better performance:

```javascript
// Create index for faster queries
db.contacts.createIndex({ "submittedAt": -1 })
db.contacts.createIndex({ "email": 1 })
```

## Contact Form Features

- ✅ Form validation (client and server-side)
- ✅ Loading states and user feedback
- ✅ Success/error messages
- ✅ Form reset after successful submission
- ✅ IP address and user agent tracking
- ✅ Timestamp recording
- ✅ Admin API for viewing submissions