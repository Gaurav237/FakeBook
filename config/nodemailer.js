const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: 'gtiwary237@gmail.com',
        pass:  ''
    }
});

let renderTemplate = async function(data, relativePath) {
    try {
        const template = await ejs.renderFile(
            path.join(__dirname, '../views/mailers', relativePath),
            data
        );
        return template;
    } catch (err) {
        console.log('Error in rendering template:', err);
        throw err;
    }
};

module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}
