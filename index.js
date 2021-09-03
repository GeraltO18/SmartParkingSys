const express = require("express");
const mongoose = require("mongoose");
const serialPort = require("serialport");
const logController = require("./controller/log.controller");
const JSON = require("JSON");
const router = require("./routes/log.route");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(router);

(async () => {
  mongoose.connect(
    "mongodb+srv://summa:ToabToK6UIgWeRST@parkinglot.ciawi.mongodb.net/parkingdb?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
})();

const server = app.listen(4000);

const io = require("socket.io")(server);

const Readline = serialPort.parsers.Readline;
const port = new serialPort("COM3");
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));
parser.on("data", async (temp) => {
  const { method, data } = JSON.parse(temp);
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
