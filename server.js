const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("welcome home!");
});

app.post("/email", async (req, res) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 587,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });
  const mailOptions = {
    from: process.env.SMTP_EMAIL,
    to: req.body.email,
    subject: " Wintana Apartments Booking Confirmation",
    text: `<p style="font-family: Arial, sans-serif; font-size: 16px; color:blue; line-height: 1.5;">
    Thank you for booking with Wintana Apartments! Your message has been successfully received by our dedicated manager. We appreciate your interest in our apartment services and will get back to you shortly with further details and confirmation. Feel free to explore our website for more information about our accommodations.
</p>

<p style="font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.5;">
    If you have any immediate questions or concerns, you can also reach out to us directly. We look forward to assisting you and making your stay with Wintana Apartments a pleasant and memorable experience!
</p>
`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent: " + info.response);
    res.json({ status: "success" });
  } catch (error) {
    console.log("Error sending mail: " + error);
    res.json({ status: "error" });
  }
});

app.listen(5000, () => {
  console.log("server is running on port 5000");
});
