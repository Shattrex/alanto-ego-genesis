const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = 3001;
const MAKE_WEBHOOK_URL = 'https://hook.eu2.make.com/sbx2urs1jx2tbnwc3uan1ox2o8qnfchg';

app.use(cors({ origin: /http:\/\/localhost:\d+/ }));
app.use(express.json());

app.post('/api/submit-form', async (req, res) => {
  try {
    const data = req.body;
    try {
      const makeRes = await fetch(MAKE_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (!makeRes.ok) {
        const text = await makeRes.text();
        console.error('Failed to forward to Make.com:', text);
        // Still return success to frontend
        return res.status(200).json({ success: true, warning: 'Failed to forward to Make.com', details: text });
      }
    } catch (err) {
      console.error('Error forwarding to Make.com:', err.message);
      // Still return success to frontend
      return res.status(200).json({ success: true, warning: 'Error forwarding to Make.com', details: err.message });
    }
    res.status(200).json({ success: true });
  } catch (err) {
    // Only fail if something is wrong with our own server
    res.status(200).json({ success: true, warning: 'Internal server error', details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
}); 