const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;

describe('POST /products', function() {
  // it('should create a new product', function(done) {
  //   request(app)
  //     .post('/products')
  //     .expect(200, done);
  // });

  it('should redirect user back to /products if successful', function(done) {
    request(app)
      .post('/products')
      .type('form')
      .send({
        name: 'bag',
        price: '30',
        inventory: '10'
      })
      .end(function(err, res) {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products');
        done();
      });
  });

  it('should redirect user to /products/new if no data sent', function(done) {
    request(app)
    .post('/products')
    .type('form')
    .send({})
    .end(function(err, res) {
      if(err) {
        throw new Error(err);
      }
        expect(res.header.location).to.equal('products/new');
        done();
    });
  });

  it('should have data with typeOf string', function(done) {
    request(app)
    .post('/products')
    .type('form')
    .send({
        name: 'poop',
        price: 'ten',
        inventory: 'twenty'
      })
    .end(function(err, res) {
      if(err) {
        throw new Error(err);
      }
        expect(res.header.location).to.equal('products/new');
        done();
    });
  });


});






