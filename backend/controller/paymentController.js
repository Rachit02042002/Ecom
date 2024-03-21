const catchAsyncErrors = require("../middleware/catchAsyncErrors")

const Stripe = require("stripe")

const stripe =new Stripe("sk_test_51OwQAfSEafri8Ay4wegy4SX0KkPf2FyTVg6VPxbsdyywmJprULGuvm7rIe1RslkTg34vooC2xlDXHHYPDjMRZDWP00t2yT3QrT")

exports.processPayment = catchAsyncErrors(async (req,res,next)=>{
    const myPayment = await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"inr",
        metadata:{
            company:"Ecommerce",
        }
    })
    res.status(200).json({success:true,client_secret:myPayment.client_secret});
})

exports.sendStripekey = catchAsyncErrors(async (req,res,next) =>{
    res.status(200).json({stripeApikey:process.env.STRIPE_API_KEY})
})