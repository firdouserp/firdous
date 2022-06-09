const ReportsModel = require("../models/reports.model");
const HttpException = require("../utils/HttpException.utils");
const dotenv = require("dotenv");
dotenv.config();

/******************************************************************************
 *                              User Controller
 ******************************************************************************/
class ReportsController {
  getAccountBalances = async (req, res, next) => {
    let accountBalanceList = await ReportsModel.accountbalances();

    let content_range =
      "1-" + accountBalanceList.length + "/" + accountBalanceList.length;

    res.set("Content-Range", content_range);

    res.send(accountBalanceList);
  };
  getProjectLedger = async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let projectledgerList = await ReportsModel.projectledger(filter,req.projectid);

    let content_range =
      "1-" + projectledgerList.length + "/" + projectledgerList.length;

    res.set("Content-Range", content_range);

    res.send(projectledgerList);
  };

  getProjectLedgerByAccount = async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let projectledgerList = await ReportsModel.projectledgerByAccount(
      req.params.id,req.projectid,filter
    );

    let content_range =
      "1-" + projectledgerList.length + "/" + projectledgerList.length;

    res.set("Content-Range", content_range);

    res.send(projectledgerList);
  };

  getTrialBalanceByPeriod = async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let TrialBalanc = await ReportsModel.trialBalanceByPeriod(filter,req.projectid);

    let content_range = "1-" + TrialBalanc.length + "/" + TrialBalanc.length;

    res.set("Content-Range", content_range);

    res.send(TrialBalanc);
  };

  getAccountLedgerByPeriod =async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    let accontLedger = await ReportsModel.accountLedgerByPeriod(filter,req.projectid);

    let content_range = "1-" + accontLedger.length + "/" + accontLedger.length;
    console.log(JSON.stringify(accontLedger));
    res.set("Content-Range", content_range);

    res.send(accontLedger);
  };

  getProjectLedgetDetailed =async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    console.log('getProjectLedgetDetailed-filter:'+JSON.stringify(filter));

    let projectLedger = await ReportsModel.projectLedgerDetailed(filter,req.projectid);

    let content_range = "1-" + projectLedger.length + "/" + projectLedger.length;
    console.log(JSON.stringify(projectLedger));
    res.set("Content-Range", content_range);

    res.send(projectLedger);
  };

  getProjectLedgetCashBank =async (req, res, next) => {
    var filter;
    if (req.query && Object.keys(req.query).length) {
      filter = req.query.filter && JSON.parse(req.query.filter);
    }

    console.log('getProjectLedgetCashBank-filter:'+JSON.stringify(filter));

    let projectLedger = await ReportsModel.projectLedgerCashBank(filter,req.projectid);

    let content_range = "1-" + projectLedger.length + "/" + projectLedger.length;
    console.log(JSON.stringify(projectLedger));
    res.set("Content-Range", content_range);

    res.send(projectLedger);
  };

  getProjectSalesSummary =async (req, res, next) => {
    var filter;
   
    let salesSummary = await ReportsModel.projectSalesSummary(req.projectid);

    let content_range = "1-" + salesSummary.length + "/" + salesSummary.length;
    console.log(JSON.stringify(salesSummary));
    res.set("Content-Range", content_range);

    res.send(salesSummary);
  };
}

/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new ReportsController();
