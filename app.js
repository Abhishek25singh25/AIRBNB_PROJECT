const express = require("express")
const mongoose = require("mongoose")
const path = require("path")
const methodOverride = require("method-override")
const ejsMate = require("ejs-mate")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")
const LocalStrategy = require("passport-local")

const User = require("./models/User")

const listingRoutes = require("./routes/listings")
const reviewRoutes = require("./routes/reviews")
const userRoutes = require("./routes/users")

const app = express()

/* ================= DATABASE ================= */

mongoose.connect("mongodb://127.0.0.1:27017/airbnb")
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err))

/* ================= APP CONFIG ================= */

app.engine("ejs", ejsMate)
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))
app.use(express.static(path.join(__dirname, "public")))

/* ================= SESSION ================= */

app.use(session({
  secret: "superProductionSecretKey",
  resave: false,
  saveUninitialized: false,
  cookie: { httpOnly: true }
}))

app.use(flash())

/* ================= PASSPORT ================= */

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
  res.locals.currentUser = req.user
  res.locals.success = req.flash("success")
  res.locals.error = req.flash("error")
  next()
})

/* ================= ROUTES ================= */

app.use("/listings", listingRoutes)
app.use("/listings/:id/reviews", reviewRoutes)
app.use("/", userRoutes)

/* ================= ROOT ================= */

app.get("/", (req, res) => {
  res.redirect("/listings")
})

/* ================= SERVER ================= */

app.listen(3000, () => {
  console.log("Server Started at 3000")
})