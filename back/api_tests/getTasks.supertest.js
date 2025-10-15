const request = require('supertest');
const app = require('../index');

test('returns a list of users', async () => {
  const response = await request(app).get('/tasks');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([
  {
    "_id": "68075a9215e044ca59fb255c",
    "title": "Zimozi Project",
    "description": "Zimozi Description",
    "status": "In Progress",
    "dueDate": "Today",
    "assignedTo": "Me",
    "__v": 0
  }
]);
});
