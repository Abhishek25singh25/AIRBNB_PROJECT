const User = require("../models/User")

module.exports.renderRegister = (req, res) => {
  res.render("users/register")
}

module.exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    const user = new User({ username, email })
    const registeredUser = await User.register(user, password)

    req.login(registeredUser, () => {
      req.flash("success", "Welcome to Airbnb!")
      res.redirect("/listings")
    })

  } catch (e) {
    req.flash("error", e.message)
    res.redirect("/register")
  }
}

module.exports.renderLogin = (req, res) => {
  res.render("users/login")
}

module.exports.login = (req, res) => {
  req.flash("success", "Welcome back!")
  res.redirect("/listings")
}

module.exports.logout = (req, res) => {
  req.logout(() => {
    req.flash("success", "Logged out successfully")
    res.redirect("/listings")
  })
}