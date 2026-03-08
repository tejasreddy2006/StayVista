const Review = require('../models/review');
const Listing = require('../models/listing');

module.exports.createReview = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const review = new Review(req.body.review);
    review.user = req.user._id;
    review.listing = id;
    await review.save();
    
    // Add review to listing's reviews array
    listing.reviews.push(review._id);
    await listing.save();
    
    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${id}`);
};

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    
    // Remove review from listing's reviews array
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    
    // Delete the review
    await Review.findByIdAndDelete(reviewId);
    
    req.flash('success', 'Review deleted successfully!');
    res.redirect(`/listings/${id}`);
};
