const sgMail = require("@sendgrid/mail");
const APIKEY =
  "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";
sgMail.setApiKey(APIKEY);

const send = (bill) => {
  let msg = {
    from: "bafid40281@mnqlm.com",
    to: bill.usermail,
    subject: "ParkingLot bill",
    html: `<h1>bill<h1>`,
  };

  sgMail
    .send(msg)
    .then((res) => console.log("Email sent..."))
    .catch((error) => {
      console.log(error.message);
    });
};

module.exports = { send };
