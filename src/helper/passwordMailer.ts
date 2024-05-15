import nodemailer from "nodemailer";

export const sendPasswordMail = async (email: string, name: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: "adarshbinomon.3@gmail.com",
      to: email,
      subject: "OTP || Echo Blog 🔥",
      text: `Thank you for choosing Echoblog. Since you logged in using google we have made your email as a backup password you can change it in the profile settings`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email has been sent to ${email}`, info.response);
      }
    });

  } catch (error) {
    console.log(error);
    throw error;
  }
};
