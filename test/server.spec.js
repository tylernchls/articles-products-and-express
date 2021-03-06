const request = require('supertest');
const chai = require('chai');
const app = require('../server');
const expect = chai.expect;
const should = chai.should;

describe('POST /products', () => {

  it('should redirect user back to /products if successful', (done) => {
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

  it('should redirect user to /products/new if no data sent', (done) => {
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

  it('should have data with typeOf string', (done) => {
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

describe('PUT/products/:id', () => {

  it('should redirect user to /products/:id if successful', (done) => {
    let client = request(app);
    client
      .post('/products')
      .type('form')
      .send({
        name: 'bag',
        price: '10',
        inventory: '20'
      })
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products');
      });

    client
      .put('/products/1')
      .type('form')
      .send({
        id: 1,
        name: 'test',
        price: '100',
        inventory: '20'
      })
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products/1');

        client
        .get('/products/1')
        .end((err, res) => {
          if(err) {
            throw new Error(err);
          }
        });

        expect(res.statusCode).to.equal(302);
        done();
      })

    client
      .delete('/products/1')
      .type('form')
      .send({
        id: 1
      })
      .end((err, res) => {
        if(err) {
          throw new Error(err);
        }
        expect(res.header.location).to.equal('/products');

      });

  });

});








