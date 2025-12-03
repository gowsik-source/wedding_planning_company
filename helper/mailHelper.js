const nodemailer = require("nodemailer")
const mailHelper = new Object()
require('dotenv').config(); //.config() is a function provided by the dotenv package

//process. Node.js built-in object
const emailId = process.env.sender_email
const password = process.env.sender_pass

mailHelper.sendMail = async (email, subject, template) => {
    let configration = {
        service: "gmail",
        auth: {
            user: emailId,
            pass: password
        }
    }
    let transporter = nodemailer.createTransport(configration) //createTransport() is a function from Nodemailer
    let message = {
        from: emailId,
        to: `${email}`,
        subject: `${subject}`,
        html: `${template}`
        // `${}` Used for dynamic values inside a string
    }
    transporter.sendMail(message)
        .then(() => { console.log("Mail Send") })
        .catch(err => { console.log("failed", err) })
}

module.exports = mailHelper