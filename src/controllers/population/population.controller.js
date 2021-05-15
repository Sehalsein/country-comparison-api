'use strict';

const co = require('co');
const errors = require('restify-errors');
const fetch = require('node-fetch');
const _ = require('lodash');

function populationResponse(country, date, population = 0) {
  return {
    country,
    date,
    population,
  };
}
exports.getPopulation = co.wrap(async function getPopulation(req, res, next) {
  try {
    let countries = req.query.countries || [];
    countries = countries.filter((country) => country);

    const sort = req.query.sort;
    let date = req.query.date;

    // If date is not provided or if its valid date will take current date
    // Format Check and date formatting can be done with library like moment
    if (!date || new Date(date) == 'Invalid Date') {
      date = new Date().toISOString().slice(0, 10);
    }

    // Fetch Population for list of countries d6wn6bmjj722w
    const responseData = await Promise.all(
      countries.map((country) =>
        fetch(
          `https://d6wn6bmjj722w.population.io/1.0/population/${country}/${date}/`
        )
      )
    ).then((resp) => Promise.all(resp.map((r) => r.text())));

    // Format fetch response
    const jsonResponse = responseData.map((population, index) => {
      try {
        const jsonPopulation = JSON.parse(population);
        return populationResponse(
          countries[index],
          date,
          _.get(jsonPopulation, 'total_population.population', 0)
        );
      } catch (error) {
        return populationResponse(countries[index], date);
      }
    });

    // Sort By Population
    if (sort) {
      jsonResponse.sort((a, b) => {
        if (sort === 'asc') {
          return a.population - b.population;
        }

        if (sort === 'desc') {
          return b.population - a.population;
        }
      });
    }

    res.json(jsonResponse);
    return next();
  } catch (err) {
    if (err instanceof fetch.FetchError) {
      return next(
        new errors.InternalServerError('Server error retrieving population.')
      );
    }
    return next(
      new errors.InternalServerError(err, 'Server error retrieving population.')
    );
  }
});
