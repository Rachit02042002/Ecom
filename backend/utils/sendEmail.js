// const nodemailer = require("nodemailer")

// const sendEmail = async (options)=>{

//     const transporter = nodemailer.createTransport({
//         service:process.env.SMPT_SERVICE,
//         auth:{
//             user:process.env.SMPT_MAIL,
//             pass:process.env.SMPT_PASSWORD
//         }
//     })
//     const mailOptions = {
//         from:process.env.SMPT_MAIL,
//         to:options.email,
//         subject:options.subject,
//         text:options.message
//     }
//     await transporter.sendMail(mailOptions)
// }


// module.exports = sendEmail


const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    try {
       
        const transporter = nodeMailer.createTransport({
            host: process.env.SMPT_HOST,
            port: process.env.SMPT_PORT,
            service: "gmail",
            
            auth: {
                user: process.env.SMPT_MAIL,
                pass: process.env.SMPT_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: options.email,
            subject: options.subject,
            text: options.message
        };

        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
    }
};

module.exports = sendEmail;
