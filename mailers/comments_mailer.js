const nodemailer = require('../config/nodemailer');

// another way of exporting method
exports.newComment = async function(comment) {
    try{
        const info = await nodemailer.transporter.sendMail({
            from: 'Gaurav',
            to: comment.user.email,
            subject: 'New Comment Published',
            html: '<h1>hey, your comment is sent</h1>' 
        });

        console.log('Message sent : ', info);
    }catch(err){
        console.log('err in sending mail : ', err);
    }
}