const axios = require('axios');
const getTasks = require('./getTasks');

jest.mock('axios');
test('Get Tasks from API', async () => {
  const data = {
    "_id": "68075a9215e044ca59fb255c",
    "title": "Zimozi Project",
    "description": "Zimozi Description",
    "status": "In Progress",
    "dueDate": "Today",
    "assignedTo": "Me",
    "__v": 0
  }; 
  axios.get.mockResolvedValue({ data });
  const result = await getTasks();
  expect(result).toEqual(data);
});
