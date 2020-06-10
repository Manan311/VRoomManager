var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Entity schema

var carsSchema = new Schema({
  car_make: String,
  car_model: String,
  car_year: Number,
  vin_: String,
  msrp_: Number,
  photo_: String,
  color_: String,
  convertable_: Boolean,
  purchase_date: String,
  purchasers_name: String,
  purchasers_email: String,
  price_paid: Number
});

// Make schema available to the application
module.exports = carsSchema;