
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");
require("dotenv").config();

module.exports = async (to, password, name, subject, template) => {
  try {
    // 1️⃣ Locate and compile the Handlebars template
    const templatePath = path.resolve("./views", `${template}.handlebars`);
    const source = fs.readFileSync(templatePath, "utf8");
    const compiledTemplate = handlebars.compile(source);

    // 2️⃣ Render the HTML content
    const htmlContent = compiledTemplate({ name, password });

    // 3️⃣ Send the email via Brevo API
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "السفر الى ايطاليا",
          email: process.env.EMAIL,
        },
        to: [{ email: to, name }],
        subject,
        htmlContent,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Email sent successfully via Brevo API");
    console.log("Response:", response.data);

    return response.data;
  } catch (error) {
    console.error("❌ Error sending email via Brevo:", error.response?.data || error.message);
    throw error;
  }
};