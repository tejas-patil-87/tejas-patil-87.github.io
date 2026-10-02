# Tejas Vilas Patil — QA & Test Automation

A responsive, static portfolio showcasing QA experience, test automation projects, skills, credentials, and contact information.

## Preview locally

The site uses plain HTML, CSS, and JavaScript modules. No build step or package installation is required. Serve the project root with any static web server, then open its local URL.

For example, with Python installed:

```sh
python -m http.server 8000
```

Open <http://localhost:8000>.

## Deploy

This project can be hosted with GitHub Pages:

1. Push the project to the `tejas-patil-87.github.io` repository.
2. In GitHub, open **Settings → Pages**.
3. Select the branch and root (`/`) as the publishing source.
4. Save and wait for GitHub Pages to publish the site.

## Updating portfolio details

- Update the page content and contact details in `index.html`.
- Update the LinkedIn profile URL in `config.js`.
- Update colors, layout, and responsive styles in `styles/styles.css`.
- Update interactive behavior in `app.js`.
- Replace the favicon at `img/favicon.svg` when changing the logo.

### Resume download

The hero's **Download resume** button links to a Google Drive file. To replace the resume without changing the website link, upload a new version of the same Drive file using **Manage versions**. Keep its sharing set to **Anyone with the link — Viewer** if public downloads are intended.

### Contact form

The contact form submits to FormSubmit and emails submissions to the configured recipient. The form must be activated through the verification email from FormSubmit before submissions can be delivered. Its endpoint and recipient are set in the `action` attribute of the form in `index.html`.

The form includes a honeypot field, browser-side required-field validation, and input length limits. These are basic spam-reduction measures, not a replacement for server-side abuse protection. Contact messages are processed by FormSubmit; do not submit passwords, account numbers, or other sensitive information.

## Privacy

Review the public contact details, resume contents, and Drive sharing settings before publishing. Keep account credentials, API keys, and other secrets out of this static site.
