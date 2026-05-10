# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Calo Capital forms

The waitlist and contact forms send inquiries to `protection@calocapital.io` through EmailJS. All form submissions are stored locally in the browser and always show a success message.

### Email delivery (optional)

To enable email notifications to `protection@calocapital.io`, configure these Vite environment variables on your hosting platform:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_CONTACT_TEMPLATE_ID` (optional, falls back to `VITE_EMAILJS_TEMPLATE_ID`)
- `VITE_EMAILJS_WAITLIST_TEMPLATE_ID` (optional, falls back to `VITE_EMAILJS_TEMPLATE_ID`)

### Form behavior

- **Deployment**: The site builds and deploys successfully regardless of EmailJS configuration.
- **Submission storage**: All form submissions are stored in browser localStorage as a backup.
- **With EmailJS configured**: Submissions are sent to `protection@calocapital.io` and stored locally.
- **Without EmailJS configured**: Submissions are stored locally; emails are not sent but no error is shown.
- **Error handling**: If EmailJS fails to send, the submission is still considered successful since the data is stored locally.

To test the live form flow, submit the waitlist or contact form with a real email address. If EmailJS is configured, verify:

1. The form shows the success banner.
2. The inbox at `protection@calocapital.io` receives the email.
3. The message includes sender name, email, phone number (if provided), request type, and message.
