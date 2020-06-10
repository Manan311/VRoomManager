const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const carSchema = require('./carsSchema.js');

module.exports = function () {
    let car;
  
    return {
      connect: function () {
        return new Promise(function (resolve, reject) {
  
          console.log('Attempting to connect to the database...');
  
          mongoose.connect('mongodb+srv:/<Username:Password>@cluster0-v52un.mongodb.net/<Database>?retryWrites=true&w=majority', { connectTimeoutMS: 5000, useUnifiedTopology: true });
          
          var db = mongoose.connection;
            
          db.on('error', (error) => {
            console.log('Connection error:', error.message);
            reject(error);
          });
  
            db.once('open', () => {
            console.log('Connection to the database was successful');
            car = db.model("vehicles", carSchema, "vehicles")  
            resolve();
          }); 
        });
      },

      carsGetAll: function () {
        return new Promise(function (resolve, reject) {
        car.find()
        .sort({ _id: 'asc'})
          .exec((error, items) => {
              if (error) {
                return reject(error.message);
              }
              return resolve(items);
            });
        })
      },

      carGetById: function (id) {
        return new Promise(function (resolve, reject) {
            car.findById({_id: id}, (error, item) => {
            if (error) {
              return reject(error.message);
            }
            if (item) {
              return resolve(item);
            } else {
              return reject('Not found');
            }
          });
        })
      },
      
      carAdd: function (newItem) {
        return new Promise(function (resolve, reject) {
          car.create(newItem, (error, item) => {
            if (error) {
              return reject(error.message);
            }
            return resolve(item);
          });
        })
      },
  
      // car.findByIdAndUpdate({_id: newItem._id}, {purchase_date: newItem.purchase_date}, {purchasers_name: newItem.purchasers_name}, {purchasers_email: newItem.purchasers_email}, {price_paid: newItem.price_paid}, { new: true }, (error, item) => {
      carEdit: function (newItem) {
        return new Promise(function (resolve, reject) {
          car.findByIdAndUpdate(newItem._id,newItem, { new: true }, (error, item) => {
            if (error) {
              return reject(error.message);
            }
            if (item) {
              return resolve(item);
            } else {
              return reject('Not found');
            }
  
          });
        })
      },
  
      carDelete: function (id) {
        return new Promise(function (resolve, reject) {
          car.findByIdAndRemove({_id: id}, (error) => {
            if (error) {
              return reject(error.message);
            }
            return resolve();
          })
        })
      }


  } 
}