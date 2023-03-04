const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors')
const fileupload = require('express-fileupload');


app.use(fileupload());
app.use(express.json());
app.use(cors());



function sendEmails(emails, subject, body, data) {

 let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'anderson.axosbank@gmail.com',
            pass: 'rmllxgwtfaatksep'
        }
    });

    emails.forEach(email => {    
    let mailOptions = {
        from: 'anderson.axosbank@gmail.com',
        to: email,
        subject: subject,
        html: body,
        attachments: data
    };


     transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            return res.send("Done");
        }
    });

    });

}

app.get("/me", (req, res) => {
    return res.send("Hi");
});


app.post("/postemails", (req, res) => {

//    console.log(req.body["emails"]);
    const data = [];

   const files = req.files;
   for (const filename in files) {
    const file = files[filename];
    data.push({ filename: file.name, content: file.data });
  }

 // console.log(data);

 //console.log(req.body["emails"].split(","));

 sendEmails(req.body["emails"].split(","), req.body["subject"], req.body["body"], data);
});


app.post("/check", (req, res) => {
    console.log(req.files);
    res.send("okay");
})





const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));