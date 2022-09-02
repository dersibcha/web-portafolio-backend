const sendGridMail = require("@sendgrid/mail");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
require("dotenv").config();
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const getMessage = (email) => {
  const body = "New Contact with email " + email;
  return {
    to: email,
    from: "derfelsib@gmail.com",
    subject: "New contact",
    text: body,
    html: `<strong>${body}</strong>`,
  };
};

const sendEmail = async (req, res) => {
  const email = req.params.email;
  console.log("Sending test email");
  try {
    const sendEmailResponse = await sendGridMail.send(getMessage(email));
    console.log("Test email sent successfully");
    if (!sendEmailResponse) {
      res.status(StatusCodes.CONFLICT);
    } else {
      res.status(StatusCodes.CREATED).json({
        message: sendEmailResponse,
      });
    }
  } catch (error) {
    console.error("Error sending test email");
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error?.message || ReasonPhrases.INTERNAL_SERVER_ERROR,
      details: error?.stack || "No details were found",
    });
  }
};

module.exports = { sendEmail };
