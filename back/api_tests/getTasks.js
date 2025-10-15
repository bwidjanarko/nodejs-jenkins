const axios = require('axios');

async function getTasks() {
  const response = await axios.get('http://localhost:8099/tasks');
  return response.data;
}
