const Listing = require("./models/Listing")
const Review = require("./models/Review")

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error", "You must login first")
    return res.redirect("/login")
  }
  next()
}

module.exports.isOwner = async (req, res, next) => {
  const { id } = req.params
  const listing = await Listing.findById(id)

  if (!listing || !listing.owner.equals(req.user._id)) {
    req.flash("error", "Permission denied")
    return res.redirect(`/listings/${id}`)
  }

  next()
}

module.exports.isReviewAuthor = async (req, res, next) => {
  const { reviewId, id } = req.params
  const review = await Review.findById(reviewId)

  if (!review || !review.author.equals(req.user._id)) {
    req.flash("error", "Permission denied")
    return res.redirect(`/listings/${id}`)
  }

  next()
}