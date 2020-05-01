const express = require('express');

const app = express();
const router = express.Router();

app.use(express.static('dist'));

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

module.exports = router;