const express = require("express")
const router = express.Router()
const {isAuthenticatedUser} = require("../middleware/auth")
const { processPayment, sendStripekey } = require("../controller/paymentController")

router.route("/payment/process").post(isAuthenticatedUser,processPayment)

router.route("/stripeapikey").get(isAuthenticatedUser,sendStripekey)

module.exports = router