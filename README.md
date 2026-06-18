# Calo Capital

## Forms & Email Setup

The Contact and Waitlist forms submit through secure server-side handlers at `/api/contact` and `/api/waitlist`.

### Recommended provider

- **Resend** is the simplest reliable choice for this project.
- It supports straightforward REST delivery, easy verified-sender setup, and a safe `onboarding@resend.dev` fallback until the Calo domain is verified.

### Required environment variables

- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` — defaults to `Calo Capital <onboarding@resend.dev>` until the domain is verified
- `RESEND_TO_EMAILS` — defaults to `protection@calocapital.io,marc@calocapital.io`

### Deployment steps

1. Create a Resend account and generate an API key.
2. Verify the Calo domain in Resend if you want to send from a branded address.
3. Set the environment variables above in your hosting platform.
4. Deploy the app and confirm `/api/contact` and `/api/waitlist` are routed to the serverless handlers.

### Local testing

- Set `RESEND_MOCK_DELIVERY=1` in your local environment to exercise the forms without sending real email.
- Keep `RESEND_MOCK_DELIVERY` off in production.

### Contact form test

1. Open the Contact page.
2. Fill in Name, Email, Service Type, and Message.
3. Leave the honeypot field untouched.
4. Submit and confirm the success message appears.
5. Verify both `protection@calocapital.io` and `marc@calocapital.io` receive the email, or confirm mock delivery locally with `RESEND_MOCK_DELIVERY=1`.

### Waitlist form test

1. Open the Waitlist section.
2. Fill in Name, Email, Service Type, and Message.
3. Submit and confirm the success message appears.
4. Verify both inboxes receive the waitlist submission, or confirm mock delivery locally with `RESEND_MOCK_DELIVERY=1`.

### Behavior

- No API key is exposed in the browser.
- The submit buttons always reset because the UI uses `finally` blocks.
- Honeypot, validation, and basic rate limiting reduce spam.

