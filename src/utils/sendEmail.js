import nodemailer from "nodemailer";
export const sendEmail = async (to,subject,html) => {
    try {
        // sender 
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "davidosamamilad@gmail.com",
                pass:"farpcrkiqfllidvv",
            }
        })


        const info = await transporter.sendMail({
            from:"davidosamamilad@gmail.com",
            to,
            subject,
            html,
        })

        return info.rejected.length == 0 ?  true : false;
    } catch (error) {
        console.log(error.message,"15485498")
    }
}
