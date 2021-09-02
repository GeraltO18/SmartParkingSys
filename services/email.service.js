const sgMail = require("@sendgrid/mail");
const APIKEY =
  "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";
sgMail.setApiKey(APIKEY);

const send = (bill) => {
  let msg = {
    to: bill.mailid,
    from: "bafid40281@mnqlm.com",
    subject: "ParkingLot bill",
    html: ``,
  };

  sgMail
    .send(msg)
    .then((res) => console.log("Email sent..."))
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = { send };
