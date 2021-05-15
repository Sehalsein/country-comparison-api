'use strict';

const controller = require('./population.controller');

function routes(app, rootUrl) {
  // include api version number
  let apiVersionTwo = rootUrl + '/v2';

  /**
   * @apiVersion 1.0.0
   * @api {get} /population/:countries
   * @apiGroup population
   * @apiName Get population for list of countries
   * @apiDescription Returns an array of countries with population for current date
   *
   * @apiSampleRequest /api/v1/population/Afghanistan
   *
   * @apiSuccess {json} Array of all country with population
   * @apiSuccessExample {json} Success-Response:
   *   HTTP/1.1 200 OK
   *   [
   *     {
   *       "country": "Afghanistan"
   *       "date": "2015-12-24",
   *       "population": 0,
   *     },
   *     {
   *       "country": "AFRICA"
   *       "date": "2015-12-24",
   *       "population": 0,
   *     },
   *     ...
   *   ]
   *
   * @apiError (Error 500) InternalServerError Returned if there was a server error
   */
  app.get({ url: apiVersionTwo + '/population' }, controller.getPopulation);
}

module.exports = {
  routes: routes
};
