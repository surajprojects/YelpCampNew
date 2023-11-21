const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const review = require("../models/review");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp")
    .then(() => {
        console.log("DATABASE CONNECTED!!!");
    })
    .catch(err => {
        console.log("DATABASE CONNECTION ERROR!!!!");
        console.log(err);
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    await review.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // YOUR USER ID
            author: "6549ee0501dc4e51365b10cf",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim deserunt tenetur error expedita similique, dolorem, hic ipsam ad cupiditate modi nihil ducimus culpa laudantium eaque rem dolores? Quasi, sapiente quis.Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim deserunt tenetur error expedita similique, dolorem, hic ipsam ad cupiditate modi nihil ducimus culpa laudantium eaque rem dolores? Quasi, sapiente quis.",
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: "https://res.cloudinary.com/dudeitd4d/image/upload/v1700220218/YelpCamp/hgzhyhw2nanlsizd61ku.jpg",
                    filename: "YelpCamp/hgzhyhw2nanlsizd61ku"
                },
                {
                    url: "https://res.cloudinary.com/dudeitd4d/image/upload/v1700220219/YelpCamp/evdpt0rbbjrl8oaetgdq.jpg",
                    filename: "YelpCamp/evdpt0rbbjrl8oaetgdq"
                },
                {
                    url: "https://res.cloudinary.com/dudeitd4d/image/upload/v1700220220/YelpCamp/gdql39pwaq93mkibsnqe.jpg",
                    filename: "YelpCamp/gdql39pwaq93mkibsnqe"
                },
                {
                    url: "https://res.cloudinary.com/dudeitd4d/image/upload/v1700220219/YelpCamp/v5azt0jdgkujwrnskesg.jpg",
                    filename: "YelpCamp/v5azt0jdgkujwrnskesg"
                }
            ]
        });
        await camp.save();
    };
};

seedDB().then(() => {
    mongoose.connection.close();
});