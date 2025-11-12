const twilio = require('twilio');
const accountSID = 'ACcf641e3b968f3f523f020138c4ce54db';
const authToken = '1baf7a2c9a634d845dc060a4e1b26739';
const client = new twilio(accountSID, authToken);

const sendOtp = (phoneNumber, otp) => {
    return client.messages.create({
        body: `Your OTP is ${otp}`,
        from: '+15134297875',
        to: phoneNumber
    });
};

module.exports = sendOtp;