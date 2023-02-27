import nodemailer from 'nodemailer'
export async function sendEmail(dest, subject, message , attachments=[]) {
    
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.nodeMailerEmail, // generated ethereal user
            pass: process.env.nodeMailerPassword, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: `"Hatem" < ${process.env.nodeMailerEmail}>`, // sender address
        to: dest, // list of receivers
        subject, // Subject line
        html: message, // html body
        attachments
    });
    return info
}
 export default sendEmail