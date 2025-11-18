const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service:'Gmail',
        auth:{
            user:'anjalirajak205@gmail.com',
            pass:'oicu gifa dldd ducx'
        },
    });
    const mailOptions = {
        from:'anjalirajak205@gmail.com',
        to,
        subject,
        text
    };
    await transporter.sendMail(mailOptions);
}

module.exports = {sendEmail};