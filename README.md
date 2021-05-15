<img src="atom.png"  width="200" height="60">

## Country Comparison API

### What is this?

The Country Comparison API will use data from a 3rd party provider, [api.population.io](http://api.population.io)<sup>[1](#footnote1)</sup>, to provide comparisons on population statistics.  Your colleague Joe Coder started the implementation (in Node.js v10 using restify), and now it's your turn to bring it to the next level.  

Our current stack is primarily built in Node.js, Golang, and .NET.  Since this service is just getting off the ground, if you'd rather implement this in a different language, feel free to do so.

### Setup

1. Download the repo
2. Run `npm install` to install dependencies
3. Run `npm test` to run unit tests
4. Set your NODE_ENV to `dev`
5. Run `npm start` to start the server

### Requirements

Joe created one endpoint that retrieves a list of country names, using mock data.

1. Update the endpoint to pull country data from http://api.population.io/1.0/countries.
2. The endpoint http://api.population.io/1.0/population/:country/:date returns the total population for a given country on a given date.  Design and implement an endpoint in our API that will allow a consumer to specify an arbitrary set of countries and an optional sort order, and receive back a list of countries and their population based on the current date.  If a sort order was specified, return the list sorted on population size, according to the consumer's requested sort order.

Try to be consistent with Joe's implementation in terms of:
* unit tests
* documentation
* error handling
* response codes
* validation
* etc.

Zip your solution, upload it somewhere, and send us a link to the zipped file.

### Bonus
1. Some scenarios to consider (leave your thoughts inline in your code or edit the README):
  * How efficient is your code?  What are some ways that you could improve performance? 
    - Two Api's developed is efficient as possible. 
    - Performance can be improved by adding some sort of caching mechanism.
  
  * Suppose we expect this API to be hit 1000s of times a second.  How can we handle the load?
    - A caching mechanism needs to be implemented if we are expecting 1000s req/sec
    - The realtime info of population is not required so it can be store in a cache like redis for faster access
    - Calling 1000's 3rd party API's per second is not a valid method. Most 3rd party providers have a limit on the no of request. so its better to avoid calling external api frequently (In this particular use case)
    
  * What if the 3rd party provider is not available?  How resilient is our API?
    - If caching mechanism is implemented data can be shown from cache.
    - Otherwise appropriate error message needs to be returned
    
  * What if the requirement for the new endpoint was to also allow the consumer to compare populations for any given date.  How would you modify your implementation?
    - Population endpoint can have one more query param for date. which fetches based on the particular date

  * What if we have a database of users and we wanted to make our API smarter by defaulting comparisons to always include the population of the current user's country.  How could we accomplish this?
    - Default country of user can be encoded in a JWT token. JWT token needs to be sent with every request, So for every request the default country data is available.

  * What if we wanted to keep a tally of the most frequently requested countries and have this be available to consumers.  How could we accomplish this?
    - By Implementing a caching mechanism. The most frequently used request can be cached


2. Dockerize the API

<br>
<i><a name="footnote1"><sup>1</sup></a> Joe says that api.population.io is down, so try https://d6wn6bmjj722w.population.io/ as the host instead.<i>
