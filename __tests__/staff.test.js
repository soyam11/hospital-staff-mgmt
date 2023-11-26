const request = require('supertest');
const db = require('../models');
const app = require('../app');

describe('Staff API', () => {
  beforeAll(async () => {
  });

  afterAll(async () => {
    await db.sequelize.close();
  });

  it('should create a new staff record with valid data', async () => {
    const res = await request(app)
      .post('/api/staff')
      .send({
        name: "John Doe",
        department: "Cardiology",
        jobTitle: "Doctor",
        contactInfo: "johndoe@example.com",
        username: "johndoe",
        password: "password123",
        roleName: "Doctor"
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('staff');
  });

  it('should return an error if invalid data is provided', async () => {
    const res = await request(app)
      .post('/api/staff')
      .send({
        name: "",
        department: "Cardiology"
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should return an error if the same staff record is created twice', async () => {
    const staffData = {
      name: "Jane Doe",
      department: "Neurology",
      jobTitle: "Nurse",
      contactInfo: "janedoe@example.com",
      username: "janedoe",
      password: "password123",
      roleName: "Nurse"
    };

    await request(app).post('/api/staff').send(staffData);
    const res = await request(app).post('/api/staff').send(staffData);

    expect(res.statusCode).toEqual(400);
  });
});
