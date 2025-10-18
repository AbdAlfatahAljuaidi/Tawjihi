const { createTransport } = require("nodemailer");
const path = require("path");
const hbs = require("nodemailer-express-handlebars");
require("dotenv").config();
module.exports = async (to, password, name, subject, template) => {
  try {
    console.log(process.env.HOST);
    console.log(process.env.USER);
    console.log(process.env.PASS);
    const transporter = createTransport({
      host: process.env.HOST,

      port: 587,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });
console.log("after set data");

    // using custom email template with nodemailer express handler
    const handlebarsOptions = {
      viewEngine: {
        extname: ".handlebars",
        partialsDir: path.resolve("./views"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./views"),
      extName: ".handlebars",
    };

    transporter.use("compile", hbs(handlebarsOptions));
console.log("handlebarsOptions");

    const mailOptions = {
      from: {
        name: "السفر الى ايطاليا",
        address: process.env.EMAIL,
      },
      to: to,
      subject: subject,
      template: template,
      context: {
        name,
        password,
      },
    };
    transporter.verify((error, success) => {
      if (error) console.error("SMTP verify failed:", error);
      else console.log("SMTP server is ready:", success);
    });
    
    const checkSendEmail = await transporter.sendMail(mailOptions);
    console.log("checkSendEmail",checkSendEmail);
    
    return checkSendEmail ;
  } catch (error) {
    console.log(error);
  }
};