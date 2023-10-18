/**
 * Node Script: To get a cities population by state + city while also letting you set a cities population..
 * ------------------------------------------------------------------------------
 *
 * - Application runs on port 5555
 * - init() function parses csv file and converts to arr.
 *     It is called once application is initalised. Can we invoked as per the functionality
 * - check_combination() used to check if the requested city and state exist in csv
 * - Updated data is stored in array. Which can later be written in a file or database.
 */

const express = require("express");
const app = express();
const port = 5555;
const csv = require("csv-parser");
const fs = require("fs");

const filepath = "city_populations.csv";

let rowsArr = [];
let cityArr = [];
let updatedArr = [];

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

function init() {
  fs.createReadStream(filepath)
    .on("error", () => {
      // handle error
    })
    .pipe(csv())
    .on("data", (row) => {
      rowsArr.push(row);
    })
    .on("end", () => {
      cityArr = rowsArr;
    });
}

function check_combination(state, city) {
  const city_arr_disp = cityArr.filter((row) => {
    return (
      row.city.toUpperCase() === city.toUpperCase() &&
      row.state.toUpperCase() === state.toUpperCase()
    );
  });
  return city_arr_disp;
}

app.get("/api/population/state/:state/city/:city", (req, res) => {
  try {
    var state_param = req.params.state;
    var city_param = req.params.city;

    const combination_exist = check_combination(state_param, city_param);

    if (combination_exist.length == 0)
      res.status(400).json({ error: "Combination not found" });
    else
      res.status(200).json({ population: combination_exist[0]["population"] });
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

app.put("/api/population/state/:state/city/:city", (req, res) => {
  const city = req.params.city;
  const state = req.params.state;
  const population = req.body.population;

  try {
    const combination_exist = check_combination(state, city);

    if (combination_exist.length == 0) {
      let new_mapping_array = {
        city: city,
        state: state,
        population: population,
      };

      cityArr.push(new_mapping_array); // New record added in cityArr

      res.status(201).json({ message: "Data added " });
    } else {
      cityArr.filter((row) => {
        if (
          row.city.toUpperCase() === city.toUpperCase() &&
          row.state.toUpperCase() === state.toUpperCase()
        ) {
          row["population"] = population.toString();
          updatedArr = cityArr; // Records with updated population stored in updatedArr
        }
      });

      res.status(200).json({ message: "Data updated" });
    }
  } catch (err) {
    res.status(400).json({ error: err });
  }
});

init();
