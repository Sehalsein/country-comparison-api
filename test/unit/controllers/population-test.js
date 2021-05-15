const app = require('../../../src/server.js');
const config = require('../../../src/config');
const request = require('supertest');
const sinon = require('sinon');
require('chai').should();

const countryHelper = require('../../../src/lib/country-helper');

describe('population endpoint tests', () => {
  let sandbox;
  beforeEach(function beforeEach() {
    sandbox = sinon.sandbox.create();
  });

  afterEach(function afterEach() {
    sandbox.restore();
  });

  describe('get population v2', function getCountries() {
    const endpointUrl = config.routes.controllerRootUrl + '/v2/population';

    it('should return empty array if no countries passed', function handleNoCountriesFound(done) {
      request(app)
        .get(`${endpointUrl}`)
        .set('accept', 'application/json')
        .expect(200, [])
        .end((err) => {
          if (err) {
            return done(err);
          }
          return done();
        });
    });

    it('should return a list of countries with population', function handleGettingCountries(done) {
      let queryParam = '?';

      countryHelper
        .getCountries()
        .forEach((country) => (queryParam += `countries=${country}&`));

      const populationByCountry = endpointUrl + queryParam;
      request(app)
        .get(`${populationByCountry}`)
        .set('accept', 'application/json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          res.body.should.be.an.array;
          return done();
        });
    });
  });
});
