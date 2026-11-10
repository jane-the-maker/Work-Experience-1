const path = require('path');
const express = require('express');
const { sendToSupport } = require('./support');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '..', 'public'), { extensions: ['html'] }));

  app.post('/contact', (req, res) => {
  const honeypot = (req.body.guest || '').trim();
  const startTime = Number(req.body.formStartTime);

  if (honeypot) {
    return res.json({ ok: true });
  }

  if (!startTime || Date.now() - startTime < 3000) {
    return res.json({ ok: true });
  }

  const name = (req.body.name || '').trim();
  const email = (req.body.email || '').trim();
  const message = (req.body.message || '').trim();

  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Please fill in your name, email and message.' });
  }

  sendToSupport({ name, email, message });
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Calico Media site running at http://localhost:${PORT}`);
})