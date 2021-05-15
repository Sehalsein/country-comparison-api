'use strict';

const co = require('co');
const errors = require('restify-errors');
const fetch = require('node-fetch');

const countryHelper = require('../../lib/country-helper');

exports.getCountries = co.wrap(function* getCountries(req, res, next) {
  try {
    const countries = countryHelper.getCountries();
    res.json(countries);
    return next();
  } catch (err) {
    return next(
      new errors.InternalServerError(err, 'Server error retrieving countries.')
    );
  }
});

// Fetching list of countries from API
exports.getCountriesFromAPI = co.wrap(async function getCountries(
  req,
  res,
  next
) {
  try {
    // Fetching country list from api.
    // https://d6wn6bmjj722w.population.io/
    const data = await fetch(
      'https://d6wn6bmjj722w.population.io/1.0/countries'
    );
    const countries = await data.json();

    // Country list to response
    res.json(countries.countries);
    return next();
  } catch (err) {
    if (err instanceof fetch.FetchError) {
      return next(
        new errors.InternalServerError('Server error retrieving countries.')
      );
    }
    return next(
      new errors.InternalServerError(err, 'Server error retrieving countries.')
    );
  }
});
