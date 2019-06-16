const express = require('express');
const app = express();


app.get('/', (req, res) => {
  res.json({ message: 'Wellcome' });
});

app.listen(3000, () => {
  console.log(`Server running`);
});