const express = require('express');
const dummyjson = require('dummy-json');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());

// Generate dummy JSON data template
const template = `
{
  "users": [
    {{#repeat 1000}}
    {
      "id": {{add @index 1}},
      "name": "{{firstName}} {{lastName}}",
      "location": "{{city}}",
      "age": "{{int 18 65}}",
      "math_score": "{{int 15 100}}",
      "english_score": "{{int 15 100}}",
      "physics_score": "{{int 15 100}}"
    }
    {{/repeat}}
  ]
}
`;

// Parse the template to generate data
const data = dummyjson.parse(template);

// Endpoint for paginated data
app.get('/api/users', (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const pageSize = parseInt(req.query.rowsPerPage) || 5;
  const startIndex = page * pageSize;
  const endIndex = startIndex + pageSize;

  let newData = JSON.parse(data).users;

  const { keyword } = req.query;
  const lowerCaseFilter = keyword ? keyword.toLowerCase() : '';
  newData = newData.filter(
    (user) =>
      user.name.toLowerCase().includes(lowerCaseFilter) ||
      user.location.toLowerCase().includes(lowerCaseFilter)
  );

  const paginatedData = newData.slice(startIndex, endIndex);

  res.json({
    page: page,
    pageSize: pageSize,
    totalUsers: JSON.parse(data).users.length,
    users: paginatedData,
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
