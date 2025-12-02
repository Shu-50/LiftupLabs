# About Us & Contact Form Feature

## Overview
Complete About Us page with a fully functional contact form that sends emails to the admin and optionally to the user.

## Features Implemented

### Backend (LiftupLabs_Backend)

#### 1. Contact Route (`routes/contact.js`)
- ✅ `POST /api/contact` - Submit contact form
  - Validates all form fields
  - Sends email to admin/support team
  - Optionally sends copy to user
  - Professional email templates
  - Error handling and validation

#### 2. Server Configuration (`server.js`)
- ✅ Added contact route to API endpoints
- ✅ Route accessible at `/api/contact`

#### 3. Email Templates
**Admin Email:**
- Professional layout with LiftupLabs branding
- Contact details in table format
- Message content with proper formatting
- Timestamp in Indian timezone
- Reply-to set to user's email

**User Copy Email:**
- Confirmation message
- Copy of submitted message
- Support contact information
- Professional branding

### Frontend (LiftupLabs/src)

#### 1. API Service Updates (`services/api.js`)
- ✅ `submitContactForm(contactData)` - Submit contact form to backend

#### 2. Updated Components

##### ContactForm Component (`components/ContactForm.jsx`)
- ✅ Full form validation
- ✅ Loading states during submission
- ✅ Success message display
- ✅ Error message display
- ✅ Form reset after successful submission
- ✅ Auto-clear success message after 5 seconds
- ✅ Disabled submit button during loading
- ✅ Enhanced category options

**Form Fields:**
- Full Name (required)
- Email (required)
- Topic (optional)
- Category/Related To (dropdown)
- Message (required, 10-2000 characters)
- Send me a copy (checkbox)

**Categories:**
- General Inquiry
- Events & Competitions
- Notes & Resources
- Technical Support
- Partnership
- Customer Support
- Feedback

#### 3. New Pages

##### AboutUs Page (`pages/AboutUs.jsx`)
Complete about page with:
- ✅ Hero section with call-to-action buttons
- ✅ About section with mission and vision
- ✅ Mission & Vision cards
- ✅ What We Offer section (6 feature cards)
- ✅ Impact statistics section
- ✅ Contact form integration
- ✅ Contact information display
- ✅ Social media links
- ✅ Partnership opportunities
- ✅ FAQ section
- ✅ Smooth scroll navigation
- ✅ Responsive design

**Sections:**
1. Hero Banner
2. About LiftupLabs
3. Mission & Vision
4. What We Offer (6 features)
5. Impact Statistics
6. Contact Form & Information
7. FAQ

#### 4. Updated Components
- ✅ MainContent.jsx - Integrated new AboutUs page

## User Flow

### Contact Form Submission
1. User fills out contact form
2. User clicks "Submit" button
3. Form validates all fields
4. Loading state shows "Sending..."
5. Backend receives form data
6. Email sent to admin/support team
7. Optional copy sent to user
8. Success message displayed
9. Form automatically resets
10. Success message auto-clears after 5 seconds

### About Us Page Navigation
1. User clicks "About / Contact" in sidebar
2. AboutUs page loads with all sections
3. User can scroll through sections
4. User can click "Get in Touch" to scroll to contact form
5. User can click "Learn More" to scroll to mission section
6. User fills and submits contact form
7. Confirmation displayed

## API Endpoint

### POST /api/contact
```json
Request:
{
  "fullName": "John Doe",
  "email": "john@example.com",
  "topic": "Partnership Inquiry",
  "relatedTo": "Partnership",
  "message": "I would like to discuss partnership opportunities...",
  "sendCopy": true
}

Response (Success):
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon."
}

Response (Error):
{
  "success": false,
  "message": "Validation failed",
  "errors": [...]
}
```

## Validation Rules

### Backend Validation
- Full Name: 2-100 characters
- Email: Valid email format
- Topic: Optional, max 200 characters
- Related To: Must be one of predefined categories
- Message: 10-2000 characters

### Frontend Validation
- All required fields must be filled
- Email must be valid format
- Message minimum 10 characters
- Real-time error clearing on input

## Email Configuration

### Required Environment Variables
Add to `LiftupLabs_Backend/.env`:
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="LiftupLabs <noreply@liftuplabs.in>"
CONTACT_EMAIL=support@liftuplabs.in
```

### Gmail Setup
1. Enable 2-Factor Authentication
2. Generate App Password
3. Use App Password in EMAIL_PASS
4. Set EMAIL_USER to your Gmail address
5. Set CONTACT_EMAIL to where you want to receive contact form submissions

## Features

### Contact Form
- ✅ Real-time validation
- ✅ Loading states
- ✅ Success/error messages
- ✅ Auto-reset after submission
- ✅ Optional user copy
- ✅ Professional email templates
- ✅ Mobile responsive
- ✅ Accessible form controls

### About Us Page
- ✅ Hero section with CTAs
- ✅ Mission & Vision cards
- ✅ Feature showcase (6 cards)
- ✅ Impact statistics
- ✅ Contact information
- ✅ Social media links
- ✅ Partnership section
- ✅ FAQ integration
- ✅ Smooth scroll navigation
- ✅ Fully responsive design

## Testing Checklist

### Contact Form
- [ ] Submit form with all fields filled
- [ ] Submit form with only required fields
- [ ] Try to submit with empty required fields
- [ ] Test email validation
- [ ] Test message length validation (min 10 chars)
- [ ] Test "Send me a copy" checkbox
- [ ] Verify admin receives email
- [ ] Verify user receives copy (if checked)
- [ ] Test error handling
- [ ] Test success message display
- [ ] Test form reset after submission
- [ ] Test loading state during submission

### About Us Page
- [ ] Verify all sections load correctly
- [ ] Test "Get in Touch" button scroll
- [ ] Test "Learn More" button scroll
- [ ] Verify contact form works
- [ ] Test responsive design on mobile
- [ ] Verify all links work
- [ ] Check FAQ section displays
- [ ] Test social media links

## Files Modified/Created

### Backend
- ✅ `routes/contact.js` - New contact form route
- ✅ `server.js` - Added contact route
- ✅ `.env.example` - Added email configuration variables

### Frontend
- ✅ `services/api.js` - Added submitContactForm method
- ✅ `components/ContactForm.jsx` - Enhanced with full functionality
- ✅ `pages/AboutUs.jsx` - New comprehensive about page
- ✅ `components/MainContent.jsx` - Integrated AboutUs page

## UI/UX Improvements

### Contact Form
- Professional design with orange theme
- Clear visual feedback for all states
- Helpful error messages
- Success confirmation
- Loading indicators
- Disabled state during submission
- Auto-clearing success messages

### About Us Page
- Eye-catching hero section
- Clear information hierarchy
- Visual icons for features
- Statistics showcase
- Easy-to-find contact information
- Professional layout
- Consistent branding

## Security Features
- ✅ Input validation on backend
- ✅ Email sanitization
- ✅ Rate limiting (via server.js)
- ✅ CORS protection
- ✅ XSS prevention
- ✅ SQL injection prevention (using Mongoose)

## Notes
- Contact form submissions are sent via email (no database storage)
- Admin email address is configurable via CONTACT_EMAIL env variable
- User copy is optional and controlled by checkbox
- All emails use professional HTML templates
- Form automatically resets after successful submission
- Success messages auto-clear after 5 seconds
- Error messages persist until user starts typing again
