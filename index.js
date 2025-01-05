const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
const app = express();


let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shahnawazhusain556@gmail.com', 
        pass: 'jjjw gsrz gflp bxrk'   
    }
});


async function mailSender(mailOptions){
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log('Error sending email: ', error);
        }
        console.log('Email sent successfully: ' + info.response);
    });
}


app.use('/public', express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded());

app.get("/" , (req , res , next)=>{
    res.sendFile(path.join(__dirname, 'views' , 'index.html'));
});

app.get('/paymentgateway' , (req , res , next)=>{
    res.sendFile(path.join(__dirname, 'views' , 'payment.html'));
});


app.post('/submit' , (req , res , next)=>{
    const data = req.body;
    const usermail = data.email;
    let mailOptionsUser = {
        from: '"Shahnawaz" <shahnawazhusain556@gmail.com>',
        to: usermail, 
        subject: 'Followup for mentorship',                       
        text: 'Thankyou for trusting us for mentorship, our team will reach you soon.. For any query feel free to contact at : husainshahnawaz15@gmail.com',      
    }
    let mailOptionsHost = {
        from: '"Shahnawaz" <shahnawazhusain556@gmail.com>',
        to: 'husainshahnawaz15@gmail.com', 
        subject: 'New Mentorship Alert',                       
        text: `A new Mentorship is buyed ,
        Name = ${data.name},
        service = ${data.Service},
        UPI REF ID = ${data.upirefno},
        Usermail = ${data.email}
        `,      
    }
    mailSender(mailOptionsUser);
    mailSender(mailOptionsHost);
    res.sendFile(path.join(__dirname, 'views' , 'finalpage.html'));
});
const port = 3000;
app.listen(port , ()=>{
    console.log(`Running on http://localhost:${port}`);
});