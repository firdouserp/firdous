const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require("dotenv");
const cors = require("cors");
const HttpException = require("./utils/HttpException.utils");
const errorMiddleware = require("./middleware/error.middleware");
const userRouter = require("./routes/user.route");
const supplierRouter = require("./routes/supplier.route");
const projectsRouter = require("./routes/projects.route");
const unitsRouter = require("./routes/units.route");
const stockRouter = require("./routes/stock.route");
const coaRouter = require("./routes/coa.route");
const coa_typeRouter = require("./routes/coa_type.route");
const ledgerRouter = require("./routes/ledger.route");
const notesRouter = require("./routes/notes.route");
const vouchersRouter = require("./routes/vouchers.route");
const bookingRouter = require("./routes/booking.route");
const employeesRouter = require("./routes/employees.route");
const scheduleRouter = require("./routes/schedule.route");
const purchase_orderRouter = require("./routes/purchase_order.route");
const fpropRouter = require("./routes/fprop.route");
const grnRouter = require("./routes/grn.route");
const settingRouter = require("./routes/setting.route");
const reportsRouter = require("./routes/reports.route");
const transactionsRouter = require("./routes/transactions.route");
const clientsRouter = require("./routes/clients.route");
// Init express
const app = express();
// Configure the bodyParser middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// Init environment
dotenv.config();
// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());
app.use((req, res, next) => {
  console.log(`Request_Endpoint: ${req.method} ${req.url}`);
  next();
});
console.log("working in" + process.env.NODE_ENV);


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept,authorization"
  );
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Expose-Headers",
    "X-Total-Count, Content-Range,content-length"
  );
  //   res.header('Content-Range','bytes : 0-9/*');
  next();
});

app.set("etag", false);
const port = Number(process.env.PORT || 3331);

app.use(`/api/v1/users`, userRouter);
app.use(`/api/v1/suppliers`, supplierRouter);
app.use(`/api/v1/projects`, projectsRouter);
app.use(`/api/v1/units`, unitsRouter);
app.use(`/api/v1/stock`, stockRouter);
app.use(`/api/v1/coa`, coaRouter);
app.use(`/api/v1/coa_type`, coa_typeRouter);
app.use(`/api/v1/ledger`, ledgerRouter);
app.use(`/api/v1/notes`, notesRouter);
app.use(`/api/v1/noteslist`, notesRouter);
app.use(`/api/v1/vouchers`, vouchersRouter);
app.use(`/api/v1/vouchers/voudetail`, vouchersRouter);
app.use(`/api/v1/booking`, bookingRouter);
app.use(`/api/v1/employees`, employeesRouter);
app.use(`/api/v1/schedule`, scheduleRouter);
app.use(`/api/v1/purchaseorder`, purchase_orderRouter);
app.use(`/api/v1/fprop`, fpropRouter);
app.use(`/api/v1/grn`, grnRouter);
app.use(`/api/v1/setting`, settingRouter);
app.use(`/api/v1/reports`, reportsRouter);
app.use(`/api/v1/transactions`, transactionsRouter);
app.use(`/api/v1/clients`, clientsRouter);

app.use(express.static(path.join(__dirname, "..", "react")));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "react", "index.html"));
});

// app.get('*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'react', 'index.html'));
// });
// const prod = (process.env.NODE_ENV && process.env.NODE_ENV.trim() === 'production');
// if (prod || process.env.NODE_ENV === 'staging') {

//   app.use(`/api/v1/clients`, clientsRouter);

//   app.get('*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'react', 'index.html'));
//   });
// };
// 404 error
app.all("*", (req, res, next) => {
  const err = new HttpException(404, "Endpoint Not Found");
  next(err);
});

// Error middleware
app.use(errorMiddleware);

// starting the server
app.listen(port, () => console.log(`???? Server running on port ${port}!`));

module.exports = app;
