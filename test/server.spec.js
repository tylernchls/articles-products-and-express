const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
// chai.should();

describe('POST /products', function() {
  it('should create a new product', function(done) {
    request(app)
      .post('/products')
      .expect(200, done);
  });
});