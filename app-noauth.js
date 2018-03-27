const express = require('express');
const exphbs = require('express-handlebars');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
   res.render('index.hbs')
});

app.post('/send', (req, res) => {
    const output = `
        <h3>Contact Details</h3>
        <ul>
            <li>Name: ${req.body.name}</li>
            <li>Contact No: ${req.body.contactNo}</li>
            <li>Email: ${req.body.email}</li>
        </ul>

        <h3>Message</h3>
        <p>${req.body.message}</p>
    `;


    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'your_etheral_account',
            pass: 'your_etheral_pass'
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'Suyash <suyashpurwar4035@gmail.com>',
        to: 'purwarsuyash06@gmail.com',
        subject: 'Nodemailer test',
        text: 'Hello World!!',
        html: output
    };

    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log('Error');
            console.log(err);
        } else {
            console.log('Email sent');
            console.log(res);
            res.render('index.hbs', {
                msg: 'Email Sent'
            });
        }
    });
});


app.listen(5000, () => {
   console.log('Server is started up on port 5000');
});

