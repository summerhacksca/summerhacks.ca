# Email API Documentation

This API endpoint allows you to add email addresses to your mailing list or newsletter subscription system.

## Base URL

```
/api/email
```

## Endpoints

### POST /api/email

Adds a new email address to the subscription list.

#### Request

**Method:** `POST`

**Headers:**
```
Content-Type: application/json
```

**Body:**
```json
{
  "email": "user@example.com"
}
```

#### Parameters

| Parameter | Type   | Required | Description                    |
|-----------|--------|----------|--------------------------------|
| email     | string | Yes      | Valid email address to add     |

#### Response

**Success (201 Created):**
```json
{
  "message": "Email added successfully",
  "email": "user@example.com"
}
```

**Error (400 Bad Request):**
```json
{
  "error": "Email is required and must be a string"
}
```

**Error (400 Bad Request - Invalid Format):**
```json
{
  "error": "Invalid email format"
}
```

**Error (500 Internal Server Error):**
```json
{
  "error": "Internal server error"
}
```

### GET /api/email

Health check endpoint to verify the API is working.

#### Response

**Success (200 OK):**
```json
{
  "message": "Email API endpoint is working"
}
```

## Usage Examples

### JavaScript/TypeScript

```javascript
async function subscribeEmail(email) {
  try {
    const response = await fetch('/api/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('Subscription successful:', data.message);
      return { success: true, data };
    } else {
      console.error('Subscription failed:', data.error);
      return { success: false, error: data.error };
    }
  } catch (error) {
    console.error('Network error:', error);
    return { success: false, error: 'Network error' };
  }
}

// Usage
subscribeEmail('user@example.com');
```

### cURL

```bash
curl -X POST \
  http://localhost:3000/api/email \
  -H 'Content-Type: application/json' \
  -d '{"email": "user@example.com"}'
```

## Email Validation

The API performs basic email validation:
- Checks if email is provided and is a string
- Uses regex pattern: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`

## Implementation Notes

### Current Status
- ✅ Basic email validation
- ✅ JSON request/response handling
- ✅ Error handling
- ⚠️ Email storage not implemented (logs to console)

### Next Steps

To complete the implementation, you need to add email storage logic:

1. **Database Storage**
   ```typescript
   // Example with a database
   await db.emails.create({ email, createdAt: new Date() });
   ```

2. **Email Service Integration**
   ```typescript
   // Example with Mailchimp
   await mailchimp.lists.addListMember(listId, { email_address: email });
   ```

3. **File Storage** (for simple cases)
   ```typescript
   await fs.appendFile('emails.txt', `${email}\n`);
   ```

### Security Considerations

- Consider adding rate limiting to prevent abuse
- Add CSRF protection for production use
- Implement email verification flow
- Add unsubscribe mechanism
- Consider GDPR compliance for EU users

### Environment Variables

You may need to add environment variables for email services:

```env
MAILCHIMP_API_KEY=your_api_key
MAILCHIMP_LIST_ID=your_list_id
```

## Component Integration

This API works seamlessly with the `EmailSubscription` component located at `/app/components/EmailSubscription.tsx`.

```tsx
import EmailSubscription from './components/EmailSubscription';

// Use in your page/component
<EmailSubscription
  placeholder="Enter your email"
  buttonText="Subscribe"
  className="my-custom-class"
/>
```

## Error Handling

The API returns appropriate HTTP status codes and error messages. Make sure to handle these in your client-side code for the best user experience.