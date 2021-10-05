const express = require("express");
const mongoose = require("mongoose");
const serialPort = require("serialport");
const logController = require("./controller/log.controller");
const JSON = require("JSON");
const path = require("path");
const router = require("./routes/log.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use(express.static("public"));

(async () => {
  mongoose.connect(
    "mongodb+srv://summa:ToabToK6UIgWeRST@parkinglot.ciawi.mongodb.net/parkingdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("connected to DB!");
    }
  );
})();

const server = app.listen(5500);

const io = require("socket.io")(server);

io.on("connect", () => {
  console.log("client1 connected!!");
});

const port = new serialPort(
  "COM10",
  { baudRate: 9600, parser: serialport.parsers.readline("\n"), parity: "none" },
  (e) => {
    console.log(e);
  }
);

port.on("open", async (temp) => {
  console.log(temp);
  const { method, data } = JSON.parse(temp);
  console.log(method, data);
  if (method == "checkin") {
    let { userid, vehicle } = data;
    let user = await userController.getUser(userid);
    io.sockets.emit("display", { user, vehicle });
  } else if (method == "checkout") {
    let { slotid, checkoutTime } = data;
    let bill = logController.checkoutAndBill(slotid, checkoutTime);
    emailService.send(bill);
  }
});

/*
⠀⠀⠀⠀⠀⠩⡄⠀⠀⠀⠀⢰⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⡄⢀⣀⡀⢸⣇⣴⣾⣷⣆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣶⣦⣄⢻⣿⠿⢍⡼⣿⣿⠛⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⠿⢿⣿⡿⣿⣧⡌⣱⠟⠛⠶⣿⣿⡇⢀⣠⣴⠞⠓⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⣿⣿⡴⠋⠀⠀⠈⢿⣼⡿⠀⡔⡉⠐⠍⢷⡏⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣠⣄⣀⣿⣿⠁⠀⠀⢀⠀⠀⠀⠀⠀⡇⢴⠀⠈⠀⣷⣶⣖⡠⠶⠶⠆⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣀⣾⣿⣿⣟⣛⣃⡀⡰⠋⠈⠀⠁⠀⠀⠀⠈⠚⡀⠊⠀⠇⢸⠉⢝⠐⢆⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⣾⣿⣿⣿⣿⣿⣧⡀⠀⠀⠀⡄⣠⣤⣴⣶⣶⠊⠁⢀⡾⠁⠸⡇⠠⡤⠂⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⠟⠛⠈⠳⣄⣀⠀⠀⠙⠿⣿⣿⣟⡠⠔⠋⠀⢀⡼⠀⣸⠁⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠸⣿⡿⠿⡄⠀⠀⠀⢀⣩⠞⠓⠒⠒⠒⠚⠉⠑⠂⠤⠒⠋⢀⡴⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⢦⡀⠙⢄⠀⣴⠏⠀⢰⣾⠂⠀⠀⠀⠀⢹⠛⠰⠶⠚⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠷⣤⣉⡻⢦⣀⠈⠻⢤⡀⠀⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠛⢻⣁⡀⣤⠟⣀⣀⣤⡘⢦⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠩⡏⢠⡃⠀⠁⠀⢱⠀⢽⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣤⣤⣴⠇⠘⡇⠀⠀⡴⠞⠀⠊⣸⣿⣛⣢⣶⣄⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠠⢤⠤⣤⣾⣿⣻⣿⣿⣿⣧⣴⣷⣦⣤⣿⣶⣶⣶⣿⣿⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠈⠉⠉⠀⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀

█░█░█ █▀█ █ ▀█▀ ▀█▀ █▀▀ █▄░█   █▄▄ █▄█   █▀▄▀█ █▀▀ █▀█ █░█░█ ▀█▀ █░█
▀▄▀▄▀ █▀▄ █ ░█░ ░█░ ██▄ █░▀█   █▄█ ░█░   █░▀░█ ██▄ █▄█ ▀▄▀▄▀ ░█░ █▀█
 */
