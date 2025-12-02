# Contact Form Testing Guide

## Issue Fixed
✅ **Fixed:** `nodemailer.createTransporter is not a function` error
- **Solution:** Updated contact route to use the existing `createTransporter` function from `emailService` utility instead of importing nodemailer directly

## Prerequisites

### 1. Backend Configuration
Ensure your `LiftupLabs_Backend/.env` file has these variables:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM="LiftupLabs <noreply@liftuplabs.in>"
CONTACT_EMAIL=support@liftuplabs.in
```

### 2. Gmail Setup (if using Gmail)
1. Enable 2-Factor Authentication on your Gmail account
2. Go to: Google Account > Security > App passwords
3. Generate a new App Password
4. Use the 16-character password in `EMAIL_PASS`
5. Set `EMAIL_USER` to your Gmail address
6. Set `CONTACT_EMAIL` to where you want to receive contact form submissions

### 3. Start Backend Server
```bash
cd LiftupLabs_Backend
npm start
```

Server should start on `http://localhost:5000`

### 4. Start Frontend
```bash
cd LiftupLabs
npm run dev
```

Frontend should start on `http://localhost:5173`

## Testing Steps

### Test 1: Basic Form Submission
1. Navigate to the About section in the app
2. Scroll down to the contact form
3. Fill in all required fields:
   - Full Name: "Test User"
   - Email: "test@example.com"
   - Topic: "Test Inquiry"
   - Related To: Select "General Inquiry"
   - Message: "This is a test message to verify the contact form is working properly."
4. Click "Submit"
5. **Expected Result:**
   - Button shows "Sending..." with loading spinner
   - After 1-2 seconds, green success message appears
   - Form fields are cleared
   - Success message auto-disappears after 5 seconds
   - Admin receives email at CONTACT_EMAIL address

### Test 2: Form Validation
1. Try to submit empty form
2. **Expected Result:** Browser validation prevents submission
3. Fill only name and email, leave message empty
4. **Expected Result:** Browser validation requires message
5. Enter invalid email format
6. **Expected Result:** Browser validation shows error

### Test 3: Send Copy to User
1. Fill in all required fields
2. Use your real email address
3. Check "Send me a copy" checkbox
4. Click "Submit"
5. **Expected Result:**
   - Success message appears
   - Admin receives email
   - User receives copy at their email address

### Test 4: Different Categories
Test each category option:
- General Inquiry
- Events & Competitions
- Notes & Resources
- Technical Support
- Partnership
- Customer Support
- Feedback

**Expected Result:** Each submission should work and email should show the selected category

### Test 5: Error Handling
1. Stop the backend server
2. Try to submit the form
3. **Expected Result:**
   - Red error message appears
   - Message says "Failed to send message. Please try again."
   - Form data is preserved (not cleared)

### Test 6: Long Message
1. Enter a very long message (500+ characters)
2. Submit the form
3. **Expected Result:**
   - Form submits successfully
   - Email contains full message with proper formatting

## Verification Checklist

### Frontend
- [ ] Form displays correctly
- [ ] All fields are present and functional
- [ ] Dropdown shows all categories
- [ ] Checkbox works
- [ ] Submit button is clickable
- [ ] Loading state shows during submission
- [ ] Success message displays after submission
- [ ] Error message displays on failure
- [ ] Form resets after successful submission
- [ ] Success message auto-clears after 5 seconds

### Backend
- [ ] Server starts without errors
- [ ] `/api/contact` endpoint is accessible
- [ ] Form validation works
- [ ] Email is sent to admin
- [ ] User copy is sent (when checked)
- [ ] Proper error handling
- [ ] Console logs show email sent successfully

### Email
- [ ] Admin receives email
- [ ] Email has proper formatting
- [ ] Email shows all form data
- [ ] Reply-to is set to user's email
- [ ] User copy has correct content (if checked)
- [ ] Emails have LiftupLabs branding

## Common Issues & Solutions

### Issue 1: "Failed to send message"
**Possible Causes:**
- Backend server not running
- Email credentials incorrect
- Network issues

**Solutions:**
1. Check backend server is running
2. Verify EMAIL_USER and EMAIL_PASS in .env
3. Check console for detailed error messages
4. Verify Gmail App Password is correct

### Issue 2: Email not received
**Possible Causes:**
- Email in spam folder
- Wrong CONTACT_EMAIL address
- Email service blocked

**Solutions:**
1. Check spam/junk folder
2. Verify CONTACT_EMAIL in .env
3. Check backend console for "Email sent successfully" message
4. Try different email provider

### Issue 3: "nodemailer.createTransporter is not a function"
**Solution:**
✅ This has been fixed! The contact route now uses the `createTransporter` function from `emailService` utility.

### Issue 4: Form doesn't reset after submission
**Solution:**
- This is handled automatically in the code
- If it doesn't work, check browser console for errors

## API Testing (Optional)

You can also test the API directly using curl or Postman:

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "topic": "Test",
    "relatedTo": "General",
    "message": "This is a test message",
    "sendCopy": false
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you soon."
}
```

## Success Indicators

✅ **Contact form is working if:**
1. Form submits without errors
2. Success message appears
3. Form resets automatically
4. Admin receives email
5. User receives copy (if checked)
6. No errors in browser console
7. No errors in backend console

## Support

If you encounter any issues:
1. Check backend console for error messages
2. Check browser console for frontend errors
3. Verify all environment variables are set
4. Ensure nodemailer is installed: `npm list nodemailer`
5. Test email credentials with a simple script
6. Check firewall/antivirus settings

## Files Modified

### Backend
- `routes/contact.js` - Fixed to use createTransporter from emailService
- `utils/emailService.js` - Exported createTransporter function
- `.env` - Added CONTACT_EMAIL variable

### Frontend
- No changes needed - already working correctly

## Next Steps

After successful testing:
1. Update CONTACT_EMAIL to your actual support email
2. Customize email templates if needed
3. Add rate limiting for production (already in place)
4. Monitor email delivery rates
5. Set up email delivery notifications
