const express = require('express');
const router = express.Router();
const mailSender = require('../utils/mailSender');
// const bookingEmail = require('../mail/bookingEmail')
const Booking = require('../models/bookingModel');
const Car = require('../models/carModel');
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')(
  'sk_test_51IYnC0SIR2AbPxU0EiMx1fTwzbZXLbkaOcbc2cXx49528d9TGkQVjUINJfUDAnQMVaBFfBDP5xtcHCkZG1n1V3E800U7qXFmGf'
);

// const logo = '../client/src/images/Logo-1.jpeg'

bookingEmail = (carName, name,image) => {
  return `<!DOCTYPE html>
  <html>
  
  <head>
      <meta charset="UTF-8">
      <title>Booking Confirmation</title>
      <style> 
          body {
              background-color: #ffffff;
              font-family: Arial, sans-serif;
              font-size: 16px;
              line-height: 1.4;
              color: #333333;
              margin: 0;
              padding: 0;
          }
  
  
          .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              text-align: center;
          }
  
          .logo {
              max-width: 200px;
              margin-bottom: 20px;
          }
  
          .message {
              font-size: 18px;
              font-weight: bold;
              margin-bottom: 20px;
          }
  
          .body {
              font-size: 16px;
              margin-bottom: 20px;
          }
  
          .cta {
              display: inline-block;
              padding: 10px 20px;
              background-color: #FFD60A;
              color: #000000;
              text-decoration: none;
              border-radius: 5px;
              font-size: 16px;
              font-weight: bold;
              margin-top: 20px;
          }
  
          .support {
              font-size: 14px;
              color: #999999;
              margin-top: 20px;
          }
  
          .highlight {
              font-weight: bold;
          }
      </style>
  
  </head>
  
  <body>
      <div class="container">
          <a href="http://localhost:5002/"><img class="logo" src="https://res.cloudinary.com/dzyvjmnbu/image/upload/v1713371148/xkm5pnhgnmv04jvp4xwo.jpg"
                  alt="RoadConnect Logo"></a>
          <div class="message">Booking  Confirmation</div>
          <div class="body">
              <p>Dear ${name},</p>
              <p>Welcome aboard to Hayabusa, our premier car rental service! Your registration is now complete, marking the beginning of your journey with us. We're delighted to have you as part of our community and look forward to providing you with exceptional service and unforgettable experiences behind the wheel of our vehicles. Let's hit the road together</p>
              <p>Please log in to your account to access the details and start your journey.
              </p>
              <a class="cta" href="http://localhost:5002/userbookings">Go to My Bookings</a>
          </div> 
          <div class="support">If you have any questions or need assistance, please feel free to reach out to us at <a
                  href="mailto:info@roadconnect.com">info@roadconnect.com</a>. We are here to help!</div>
      </div>
  </body>
  
  </html>`;
};

router.post('/bookcar', async (req, res) => {
  const { token } = req.body;
  console.log(token);
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const payment = await stripe.charges.create(
      {
        amount: req.body.totalAmount * 100,
        currency: 'inr',
        customer: customer.id,
        receipt_email: token.email,
      },
      {
        idempotencyKey: uuidv4(),
      }
    );

    if (payment) {
      req.body.transactionId = payment.source.id;
      const newbooking = new Booking(req.body);
      await newbooking.save();
      const car = await Car.findOne({ _id: req.body.car });
      console.log(req.body.car);
      car.bookedTimeSlots.push(req.body.bookedTimeSlots);

      await car.save();
      res.send('Your booking is successfull');
      try {
        const emailResponse = await mailSender(
          token.email,
          `Successfully booked ${token.card.name}`,
          bookingEmail(req.body.name, `${token.card.name}`,req.body.image)
        );
        // console.log('Email Sent Successfully....', emailResponse);
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.status(400).json(error);
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

router.get('/getallbookings', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('car');
    res.send(bookings);
  } catch (error) {
    return res.status(400).json(error);
  }
});

module.exports = router;
