import nodemailer from "nodemailer";
export async function sendEmail(userEmail){
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,  // your admin email (sender)
                pass: process.env.EMAIL_PASS,  // Google app password
            },
        });
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: userEmail, // 👈 send to the user
            subject: "Welcome to My App 🎉",
            html: `
            <h2>Hello!</h2>
            <p>Thanks for signing up. We're glad to have you.</p>
            <p>If this wasn't you, ignore this email.</p>
            <br>
            <p>Best regards,</p>
            <strong>My App Team</strong>
            `,
        };
        
        await transporter.sendMail(mailOptions);
        

    } catch (error) {
        console.log(error);
    }
} 