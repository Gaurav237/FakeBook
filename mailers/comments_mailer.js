const nodemailer = require('../config/nodemailer');

// another way of exporting method
exports.newComment = async function(comment) {
    try{
        // html template path added
        let htmlString = nodemailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

        const info = await nodemailer.transporter.sendMail({
            from: 'Gaurav',
            to: comment.user.email,
            subject: 'New Comment Published',
            html: htmlString 
        });

        console.log('Message sent : ', info);
    }catch(err){
        console.log('err in sending mail : ', err);
    }
}