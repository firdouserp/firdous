const express = require("express");
const router = express.Router();
const ReportsController = require("../controllers/reports.controller");
const auth = require("../middleware/auth.middleware");
const Role = require("../utils/userRoles.utils");
const awaitHandlerFactory = require("../middleware/awaitHandlerFactory.middleware");

router.get(
  "/accbal",
  auth(),
  awaitHandlerFactory(ReportsController.getAccountBalances)
); // localhost:3000/api/v1/users/whoami
router.get(
  "/projectledger",
  auth(),
  awaitHandlerFactory(ReportsController.getProjectLedger)
); // loc
router.get(
  "/trialbalance",
  auth(),
  awaitHandlerFactory(ReportsController.getTrialBalanceByPeriod)
);
router.get(
  "/trialbalanceconsolidated",
  auth(),
  awaitHandlerFactory(ReportsController.getTrialBalanceByPeriod)
);
router.get(
  "/accountledger",
  auth(),
  awaitHandlerFactory(ReportsController.getAccountLedgerByPeriod)
);
router.get(
  "/projectledger/:id",
  auth(),
  awaitHandlerFactory(ReportsController.getProjectLedgerByAccount)
);

router.get(
  "/projectledgerdetailed",
  auth(),
  awaitHandlerFactory(ReportsController.getProjectLedgetDetailed)
);

router.get(
  "/projectledgercashbank",
  auth(),
  awaitHandlerFactory(ReportsController.getProjectLedgetCashBank)
);

router.get(
  "/salessummary",
  auth(),
  awaitHandlerFactory(ReportsController.getProjectSalesSummary)
);

module.exports = router;
