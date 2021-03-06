const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities')
const {places, descriptors} = require('./seedHelpers')

// import Database Connection;
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"))
db.once("open", () =>{
    console.log("Database Connected")
});

const sample = array => array[Math.floor(Math.random() * array.length)]

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i=0; i<50; i++){
        const random1000 = Math.floor(Math.random() * 1000)
        const price = Math.floor(Math.random() * 20) + 10
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'http://source.unsplash.com/collection/484351',
            description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque officia fugit, alias voluptates ipsum distinctio sint cum, qui illo fugiat dolore aperiam minus ducimus sapiente, in asperiores recusandae beatae! A.',
            price: price
        })
        await camp.save();
    }
}

// seedDB().then( () =>{
//     mongoose.connection.close();
// })