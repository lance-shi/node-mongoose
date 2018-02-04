const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const Dishes = require('./models/dishes');

const url = 'mongodb://localhost:27017/conFusion';
const connect = mongoose.connect(url);

connect.then((db) => {
    console.log('Connected correctly to server');

    Dishes.create({
        name: 'Uthappizza123',
        description: 'test'
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.findByIdAndUpdate(dish._id, {
            $set: {description: "Updated test"},
        }, {
            new: true
        }).exec();
    })
    .catch((err) => {
        console.log('err' + err);
    })
    .then((dish) => {
        console.log(dish);

        dish.comments.push({
            rating: 5,
            comment: "I am getting drunk",
            author: "Leonardo"
        });

        return dish.save();
    })
    .then((dish) => {
        console.log(dish);

        return Dishes.collection.drop();
        
    })
    .then(() => {
        db.disconnect();
    })
    .catch((err) => {
        console.log(err);
    })
});