A node.js service that allows you to get a cities population by state + city while also letting you set a cities population.

Requirements:
● Use Node.js v18
● Written in plain javascript (no typescript)
● Running the command `npm install` will install anything necessary to run the service
● Running the command `npm start` will start your service and all required things for your
service running.
● Your service will run on port `5555`
● The data must persist
● Must have the route `GET http://127.0.0.1:5555/api/population/state/:state/city/:city`
○ This allows a `:state` and a `:city` to be passed in. For example (http://127.0.0.1:5555/api/population/state/Florida/city/Orlando)
○ State and city should not be case sensitive
○ Should return back with a 400 if the state / city combo cant be found with a
proper error message
○ Should return back with a 200 status and json response if found. For example
{“population”: 32423}
● Must have the route `PUT http://127.0.0.1:5555/api/population/state/:state/city/:city`
○ This allows a `:state` and a `:city` to be passed in. For example (http://127.0.0.1:5555/api/population/state/Florida/city/Orlando)
○ State and city should not be case sensitive
○ Body should be plain text that contains just the number to be set as the
population
○ Should return back with a 400 if data could not be added and proper error
message
○ Should return back a 200 status if the data has updated a state / city that already
existed and should return back a 201 if the data was created instead of updated.
