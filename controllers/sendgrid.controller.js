const sendGridMail = require("@sendgrid/mail");
const { StatusCodes, ReasonPhrases } = require("http-status-codes");
require("dotenv").config();
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);

const getMessage = (email, subject, message) => {
  const body = "New Contact with email " + email + " <br> message: " + message;
  return {
    to: "derfelsib@gmail.com",
    from: "derfelsib@gmail.com",
    subject: subject,
    text: body,
    html: `<strong>${body}</strong>`,
  };
};

const sendEmail = async (req, res) => {
  const email = req.body?.email;
  const subject = req.body?.subject;
  const message = req.body?.message;
  //res.json({ requestBody: req.body });
  try {
    if (email && email != "") {
      const sendEmailResponse = await sendGridMail.send(
        getMessage(email, subject, message)
      );
      console.log("Test email sent successfully");
      if (!sendEmailResponse) {
        res.status(StatusCodes.CONFLICT);
      } else {
        res.status(StatusCodes.CREATED).json({
          message: sendEmailResponse,
        });
      }
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        error: "invalid email",
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
