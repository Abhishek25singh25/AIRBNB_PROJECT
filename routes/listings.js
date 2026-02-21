const express = require("express")
const router = express.Router()

const listings = require("../controllers/listings")
const { isLoggedIn, isOwner } = require("../middleware")

router.route("/")
  .get(listings.index)
  .post(isLoggedIn, listings.createListing)

router.get("/new", isLoggedIn, listings.renderNewForm)

router.route("/:id")
  .get(listings.showListing)
  .put(isLoggedIn, isOwner, listings.updateListing)
  .delete(isLoggedIn, isOwner, listings.deleteListing)

router.get("/:id/edit",
  isLoggedIn,
  isOwner,
  listings.renderEditForm
)

module.exports = router