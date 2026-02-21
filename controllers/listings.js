const Listing = require("../models/Listing")

module.exports.index = async (req, res) => {
  const perPage = 9
  const page = parseInt(req.query.page) || 1
  const search = req.query.search || ""

  let query = {}

  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } }
      ]
    }
  }

  const total = await Listing.countDocuments(query)

  const listings = await Listing.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage)
    .lean()

  res.render("listings/index", {
    listings,
    currentPage: page,
    totalPages: Math.ceil(total / perPage),
    search
  })
}

module.exports.renderNewForm = (req, res) => {
  res.render("listings/new")
}

module.exports.createListing = async (req, res) => {
  const listing = new Listing(req.body)
  listing.owner = req.user._id
  await listing.save()
  req.flash("success", "Listing created successfully")
  res.redirect("/listings")
}

module.exports.showListing = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
    .populate("owner")
    .populate({
      path: "reviews",
      populate: { path: "author" }
    })

  if (!listing) {
    req.flash("error", "Listing not found")
    return res.redirect("/listings")
  }

  res.render("listings/show", { listing })
}

module.exports.renderEditForm = async (req, res) => {
  const listing = await Listing.findById(req.params.id)
  res.render("listings/edit", { listing })
}

module.exports.updateListing = async (req, res) => {
  await Listing.findByIdAndUpdate(req.params.id, req.body)
  req.flash("success", "Listing updated successfully")
  res.redirect(`/listings/${req.params.id}`)
}

module.exports.deleteListing = async (req, res) => {
  await Listing.findByIdAndDelete(req.params.id)
  req.flash("success", "Listing deleted successfully")
  res.redirect("/listings")
}