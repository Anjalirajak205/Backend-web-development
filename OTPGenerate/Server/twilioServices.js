const twilio = require('twilio');
const accountSID = 'ACcf641e3b968f3f523f020138c4ce54db';
const authToken = '93f82694d67c4cb6d70c8ce7778c5318';
const client = new twilio(accountSID, authToken);

const sendOtp = (phoneNumber, otp) => {
    return client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+15134297875',
        to: phoneNumber
    });
};

module.exports = sendOtp;