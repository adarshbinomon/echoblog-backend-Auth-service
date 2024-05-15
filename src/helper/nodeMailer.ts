import nodemailer from "nodemailer";

//generate otp
const generateOtp = () => {
  return Math.floor(Math.random() * 9000 + 1000);
};

//send mail
export const sendMail = async (email: string, name?: string) => {
  try {
    const otp = generateOtp();
    console.log('otp',otp);

    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 587,
    //   secure: false,
    //   requireTLS: true,
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASSWORD,
    //   },
    // });

    // const mailOptions = {
    //   from: "adarshbinomon.3@gmail.com",
    //   to: email,
    //   subject: "OTP || Echo Blog",
    //   text: `Thank you for choosing Spark Fire. Use this otp to finish your signup: ${otp}`,
    // };

    // transporter.sendMail(mailOptions, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     console.log(`Email has been sent to ${email}`, info.response);
    //   }
    // });

    return otp;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
