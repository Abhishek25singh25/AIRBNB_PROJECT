const mongoose = require("mongoose")
const Listing = require("./models/Listing")
const User = require("./models/User")

mongoose.set("strictQuery", false)

mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
  .then(() => console.log("Mongo Connected"))

const sampleListings = [
  {
    title: "Cozy Beachfront Cottage",
    description: "Wake up to ocean waves and enjoy stunning sunset views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b" },
    price: 1800,
    location: "Malibu",
    country: "USA"
  },
  {
    title: "Modern Loft in NYC",
    description: "Stay in the heart of Manhattan with skyline views.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470" },
    price: 2200,
    location: "New York",
    country: "USA"
  },
  {
    title: "Mountain Cabin Retreat",
    description: "Peaceful wooden cabin surrounded by nature.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1571896349842-33c89424de2d" },
    price: 1400,
    location: "Aspen",
    country: "USA"
  },
  {
    title: "Luxury Villa in Bali",
    description: "Private infinity pool and tropical garden.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1566073771259-6a8506099945" },
    price: 3200,
    location: "Bali",
    country: "Indonesia"
  },
  {
    title: "Parisian Studio Apartment",
    description: "Romantic stay near Eiffel Tower.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4" },
    price: 2100,
    location: "Paris",
    country: "France"
  },
  {
    title: "Desert Luxury Stay",
    description: "Experience modern luxury in Dubai desert.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1518684079-3c830dcef090" },
    price: 4500,
    location: "Dubai",
    country: "UAE"
  },
  {
    title: "Lake Tahoe Cabin",
    description: "Serene lake views with private dock.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b" },
    price: 1600,
    location: "Lake Tahoe",
    country: "USA"
  },
  {
    title: "Tokyo City Apartment",
    description: "Modern apartment in Shibuya district.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1480796927426-f609979314bd" },
    price: 2300,
    location: "Tokyo",
    country: "Japan"
  },
  {
    title: "Greek Island Villa",
    description: "White and blue seaside dream home.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f" },
    price: 3500,
    location: "Mykonos",
    country: "Greece"
  },
  {
    title: "Swiss Alps Chalet",
    description: "Ski-in ski-out wooden chalet.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb" },
    price: 4000,
    location: "Verbier",
    country: "Switzerland"
  },
  {
    title: "Miami Beach Condo",
    description: "Oceanfront condo with balcony view.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1533619239233-6280475a633a" },
    price: 1900,
    location: "Miami",
    country: "USA"
  },
  {
    title: "Scottish Castle Stay",
    description: "Live like royalty in historic castle.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1585543805890-6051f7829f98" },
    price: 5000,
    location: "Scottish Highlands",
    country: "UK"
  },
  {
    title: "Maldives Overwater Villa",
    description: "Crystal clear water and sunset decks.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1439066615861-d1af74d74000" },
    price: 6000,
    location: "Maldives",
    country: "Maldives"
  },
  {
    title: "Costa Rica Treehouse",
    description: "Eco-friendly jungle treehouse.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1488462237308-ecaa28b729d7" },
    price: 1200,
    location: "Costa Rica",
    country: "Costa Rica"
  },
  {
    title: "Rome Historic Apartment",
    description: "Stay near the Colosseum.",
    image: { filename: "listingimage", url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee" },
    price: 2100,
    location: "Rome",
    country: "Italy"
  }
]

const seedDB = async () => {
  await Listing.deleteMany({})
  const user = await User.findOne({})
  for (let listing of sampleListings) {
    listing.owner = user._id
    await Listing.create(listing)
  }
  console.log("35 Realistic Listings Seeded")
  mongoose.connection.close()
}

seedDB()