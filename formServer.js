const express = require("express");
const cors = require('cors');
require('dotenv').config();
const sendMail = require('@sendgrid/mail');

sendMail.setApiKey(process.env.SENDGRID_API_KEY);

// create a new express application
const app = express();
app.use(cors());
app.use(express.json());

// Route to test if the server is successfully deployed
app.get("/", (req, res) => {
    res.send("Hello, World");
});

// Route to send emails
app.post('/contact',(req,res)=>{
    const { firstName, lastName, email, phone, message } = req.body;
    const mail = {
        to: process.env.EMAIL_USER,
        from: process.env.EMAIL_USER,
        subject: `Contact Message from ${firstName} ${lastName} - Birdwood Reserve Environmental Project`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        html: `<p>Name: ${firstName} ${lastName}</p>
               <p>Email: ${email}</p>
               <p>Phone: ${phone}</p>
               <p>Message: ${message}</p>`,
    };

    sendMail.send(mail)
    .then(() => {
        res.status(200).json({status: 'Message Sent'});
    })
    .catch((error) => {
        console.error(error); 
        res.status(500).json({status:'ERROR'});
    })
})

// Route to send emails
app.post('/donateform',(req,res)=>{
    const { name, address, postcode, email, donatedAmount, donatedDate, pledgedAmount, pledgedDate } = req.body;
    const mail = {
        to: process.env.EMAIL_USER,
        from: process.env.EMAIL_USER,
        subject: `Donation Form from ${name} - Birdwood Reserve Environmental Project`,
        text: `Name: ${name}\nAddress: ${address}\nPostcode: ${postcode}\nEmail: ${email}\nDonatedAmount: ${donatedAmount}\nDonatedDate: ${donatedDate}\nPledgedAmount: ${pledgedAmount}\nPledgedDate: ${pledgedDate}`,
        html: `<p>Name: ${name}</p>
               <p>Address: ${address}</p> 
               <p>Postcode: ${postcode}</p> 
               <p>Email: ${email}</p> 
               <p>DonatedAmount: ${donatedAmount}</p> 
               <p>DonatedDate: ${donatedDate}</p>
               <p>PledgedAmount: ${pledgedAmount}</p>
               <p>PledgedDate: ${pledgedDate}</p>`,
    };

    sendMail.send(mail)
    .then(() => {
        res.status(200).json({status: 'Message Sent'});
    })
    .catch((error) => {
        console.error(error); 
        res.status(500).json({status:'ERROR'});
    })
})

// Start server
app.listen(process.env.PORT ||5010, () => {
    console.log("Server is running on port " + (process.env.PORT ||5010));
});