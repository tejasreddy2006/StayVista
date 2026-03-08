const Listing = require('../models/listing');
const Review = require('../models/review');

module.exports.index = async (req, res) => {
    const listings = await Listing.find({}).populate('owner');
    res.render('listings/index', { listings });
};

module.exports.renderNewForm = (req, res) => {
    res.render('listings/new');
};

module.exports.createListing = async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash('success', 'Successfully made a new listing!');
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.showListing = async (req, res) => {
    const listing = await Listing.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'user'
        }
    }).populate('owner');
    if (!listing) {
        req.flash('error', 'Cannot find that listing!');
        return res.redirect('/listings');
    }
    res.render('listings/show', { listing });
};

module.exports.renderEditForm = async (req, res) => {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
        req.flash('error', 'Cannot find that listing!');
        return res.redirect('/listings');
    }
    res.render('listings/edit', { listing });
};

module.exports.updateListing = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash('success', 'Successfully updated listing!');
    res.redirect(`/listings/${listing._id}`);
};

module.exports.deleteListing = async (req, res) => {
    const { id } = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted listing!');
    res.redirect('/listings');
};
