const Campground = require("../models/campground");
const { cloudinary } = require("../cloudinary");
const fetch = require("node-fetch");
const requestOptions = {
    method: 'GET'
};

module.exports.index = async (req, res) => {
    try {
        const campgrounds = await Campground.find({});
        res.render("campgrounds/index", { campgrounds });
    } catch (err) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
};

module.exports.renderNewForm = (req, res) => {
    res.render("campgrounds/new");
};

module.exports.createCampground = async (req, res, next) => {
    const requestParams = {
        text: req.body.campground.location,
        apiKey: process.env.GEOAPIFY_KEY
    }; 
    const newcampground = new Campground(req.body.campground);
    await fetch(`https://api.geoapify.com/v1/geocode/search?text=${requestParams.text}&limit=1&apiKey=${requestParams.apiKey}`, requestOptions)
        .then(response => response.json())
        .then(result => {
            if (result && result.features && result.features.length > 0) {
                newcampground.geometry = result.features[0].geometry;
            } else {
                console.log('No features found in the result.');
            }
        })
        .catch(error => console.log('error', error));

    newcampground.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    newcampground.author = req.user._id;
    await newcampground.save();
    req.flash("success", "Successfully made a new campground!");
    res.redirect(`/campgrounds/${newcampground._id}`);
};

module.exports.showCampground = async (req, res) => {
    try {
        const { id } = req.params;
        const campgrounds = await Campground.findById(id).populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        }).populate("author");
        res.render("campgrounds/show", { campgrounds });
    }
    catch (err) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
};

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const campgrounds = await Campground.findById(id);
    res.render("campgrounds/edit", { campgrounds });
};

module.exports.updateCampground = async (req, res) => {
    try {
        const { id } = req.params;
        const campground = await Campground.findByIdAndUpdate(id, { ...req.body.campground });
        const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
        campground.images.push(...imgs);
        await campground.save();
        if (req.body.deleteImages) {
            for (let filename of req.body.deleteImages) {
                await cloudinary.uploader.destroy(filename);
            }
            await campground.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } });
        }
        req.flash("success", "Successfully updated a campground!");
        res.redirect(`/campgrounds/${campground._id}`);
    }
    catch (err) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
};

module.exports.deleteCampground = async (req, res) => {
    try {
        const { id } = req.params;
        await Campground.findByIdAndDelete(id);
        req.flash("success", "Successfully deleted a campground!")
        res.redirect("/campgrounds");
    }
    catch (err) {
        req.flash("error", "Cannot find that campground!");
        return res.redirect("/campgrounds");
    }
};