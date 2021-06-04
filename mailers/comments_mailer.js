const nodeMailer = require('../config/nodemailer');
console.log("run  hona  chaiye  na bhai")

// Another Way of exporting method {witout using module.export}
// this is another way of exporting a method
exports.newComment = (comment) => {


    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comment.ejs')
    //console.log('inside newComment mailer', comment);
    console.log(comment);
    nodeMailer.transporter.sendMail({
       from: 'ggaappuu1234@gmail.com',
       to: comment.user.email,
       subject: "New Comment Published!",
       html: htmlString
    }, (err, info) => {
        if (err){
            console.log('Error in sending mail', err);
            return;
        }

        console.log('Message sent', info);
        return;
    });
}