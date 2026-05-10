# Calo Capital

## Forms & Email Setup

### Contact Form & Waitlist

The waitlist and contact forms send inquiries directly to `protection@calocapital.io` through Web3Forms (free, no backend required).

### Quick Setup

1. **Sign up for Web3Forms**: https://web3forms.com/ (free account)
2. **Create a form** in Web3Forms dashboard
3. **Copy your Access Key** from the form details
4. **Add to Webflow Cloud environment variables**:
   ```
   VITE_WEB3FORMS_ACCESS_KEY = [your access key]
   ```

### Form Fields

- Name (required)
- Email (required)
- Phone (optional)
- Request Type (required dropdown)
- Message (required)

### Behavior

- Submissions sent to `protection@calocapital.io` via Web3Forms
- Success message shown only after email service confirms
- Error messages displayed if submission fails
- No local storage fallback; email delivery is required
