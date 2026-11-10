Honeypot codename 'guest'

# calicomedia.co marketing site

The public marketing site for **Calico**, our growth planning software for local businesses. Calico helps owners set a specific, measurable, realistic customer-growth goal, turns it into a twelve-week plan, and checks in with them every Monday. About 140 businesses use it today, mostly clinics, studios and independent shops.

This repo is just the marketing site: Home, Features, Pricing, About and Contact.

## Running it locally

You need Node 24 (there's an `.nvmrc`, so `nvm use` will pick it up). Run the below whilst in this repository.

```bash
npm install
npm start
```

The site runs at http://localhost:3000.

## How it fits together

```
public/            Static pages, CSS, JS and images (served as-is)
server/index.js    Express server: serves public/ and handles POST /contact
server/support.js  sendToSupport(): what happens to a contact form submission
data/              Local contact form submissions (git-ignored)
```

## Contact form submissions

The contact form posts to `POST /contact`. The server checks the fields and hands the submission to `sendToSupport()` in `server/support.js`.

In production `sendToSupport()` emails support@calicomedia.co. Locally it appends one JSON line per submission to `data/submissions.jsonl` and logs it to the console instead, so you can see exactly what support would receive:

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md).
