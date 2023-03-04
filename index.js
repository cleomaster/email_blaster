const express = require('express');
const app = express();
const nodemailer = require('nodemailer');


app.use(express.json());


app.get("/me", (req, res) => {

    return res.send("Hi");
});


app.post("/postemail", (req, res) => {




    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anderson.axosbank@gmail.com',
            pass: 'rmllxgwtfaatksep'
        }
    });

    let mailOptions1 = {
        from: 'anderson.axosbank@gmail.com',
        to: 'tonikr1011@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email sent using nodemailer.'
    };


    let mailOptions2 = {
        from: 'anderson.axosbank@gmail.com',
        to: 'cleo.master0000@gmail.com',
        subject: 'Test Email',
        text: 'This is a test email sent using nodemailer.'
    };


    transporter.sendMail(mailOptions1, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return res.send("Done");
        }
    });


    transporter.sendMail(mailOptions2, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return res.send("Done");
        }
    });



    


});





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));