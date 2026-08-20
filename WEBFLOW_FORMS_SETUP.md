# Forms Setup

The contact form is a native React/HTML form, not a Webflow form. It submits directly to FormSubmit:

`https://formsubmit.co/protection@calocapital.io`

No serverless contact handler, Resend API key, or environment variables are required. FormSubmit redirects to `/contact?submitted=true` after submission.