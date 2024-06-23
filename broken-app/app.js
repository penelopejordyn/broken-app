const express = require('express');
let axios = require('axios');
var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/', async function(req, res, next) {
  try {
    let results = await Promise.all(req.body.developers.map(async d => {
      try {
        const response = await axios.get(`https://api.github.com/users/${d}`);
        return response;
      } catch (err) {
        console.error(`Error fetching ${d}:`, err.message);
        return null;
      }
    }));

    let out = results
      .filter(r => r !== null) // Filter out null responses
      .map(r => ({ name: r.data.name, bio: r.data.bio }));

    return res.status(200).json(out); // Use res.json instead of res.send(JSON.stringify(out))
  } catch (err) {
    next(err);
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
