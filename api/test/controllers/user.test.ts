import request from 'supertest'

import app from '../../src/app'
import connect, { MongodHelper } from '../db-helper'

const createNewUser = async () => {
  const newUser = {
    firstName: 'abc',
    lastName: 'cdfg',
    dob: '2022-01-03',
    email: 'example@gmail.com',
  }

  const response = await request(app).post('/api/v1/users').send(newUser)
  return response
}

describe('user controller', () => {
  let mongodHelper: MongodHelper

  beforeAll(async () => {
    mongodHelper = await connect()
  })

  afterEach(async () => {
    await mongodHelper.clearDatabase()
  })

  afterAll(async () => {
    await mongodHelper.closeDatabase()
  })

  it('should create a new user', async () => {
    const response = await createNewUser()
    expect(response.statusCode).toBe(200)
    expect(response.body).toHaveProperty('_id')
    expect(response.body.email).toEqual('example@gmail.com')
  })

  it('should get all users', async () => {
    await createNewUser()
    const response = await request(app).get('/api/v1/users')

    expect(response.statusCode).toBe(200)
    expect(response.body.length).toEqual(1)
  })
})
