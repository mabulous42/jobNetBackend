const nodemailer = require("nodemailer")

const sendMessage = async (email) => {
    const mailTemplate = `
        <div>
            <p>Dear ${email},</p>
            <p>                 
                Welcome to JobNet! We're thrilled to have you on board. 
                Get ready to discover exciting job opportunities, 
                connect with top employers, and boost your career. 
                Start exploring now!
            </p>
            <p>Best regards,</p>
            <p>JobNet Team</p>
        </div>
    `
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL,
            pass: process.env.PASSWORD
        }
    })

    const mailOptions = {
        from: process.env.GMAIL,
        to: email,
        html: mailTemplate,
        subject: "Welcome to JobNet"
    }

    try {
        await transporter.sendMail(mailOptions)
    } catch (error) {
        console.log(error);
        throw error
    }
}

module.exports = { sendMessage }