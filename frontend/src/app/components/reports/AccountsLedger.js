import * as React from "react";
import { cloneElement } from "react";
import { Button, DateInput, ExportButton, Filter, List, TopToolbar, useListContext } from "react-admin";
import FirdousSelect from "../accounts/FirdousSelect";

export function formatCurrency(amount) {
  return !amount
    ? "0.00"
    : Number.parseFloat(amount)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const AccountsLedgerSearchFilter = (props) => (
  <Filter {...props}>
    {/* <SearchInput
      variant="standard"
      placeholder="Account"
      source="coa_title"
      alwaysOn
    /> */}

    { <FirdousSelect
      variant="standard"
      label="Account"
      source="coa"
      optionText="title"
      list="coa"
      sort="title"
      alwaysOn
    /> }
    {/*     <ReferenceArrayInput reference="coa" source="coa" alwaysOn>
        <SelectArrayInput optionText="title">
          <ChipField source="coa" optionText="title" />
        </SelectArrayInput>
      </ReferenceArrayInput> */}

    <DateInput
      variant="standard"
      label="Period from"
      source="vou_date_from"
      resettable
      alwaysOn
    />
    <DateInput
      variant="standard"
      label="Period To"
      source="vou_date_to"
      resettable
      alwaysOn
    />
  </Filter>
);

const styles = `

h1{
  font-size:14pt !important;
}
.container-main{
  font-family: Helvetica, Sans-Serif;
  //font-size:10pt;
  //margin:0.5em;
}
.types{

  border-bottom:1px solid #ccc;
  padding: 1em;
}
.headtitle{
  font-weight:bold;
  width: 250px;
  
  padding-left:2em;
  padding-top:1em;
  border-bottom:0px solid #ccc;
  
}
.ct-title{
  font-size:14pt !important;
}
.grand {
  border-right: 1px solid #a55252 !important;
  background: rgb(0 0 0 / 14%);
  padding-right:5px;
}




.vou_date{
  min-width:100px;
  border-bottom: 1px solid #ddd;
  border-left: 1px solid #ddd;
  text-align:center;
}
.vou_no{
  min-width:120px;
  border-bottom: 1px solid #ddd;
  padding-left: 10px;
  border-left: 1px solid #ddd;
}
.vou_no a{
  text-decoration: none;
}
.debit, .credit, .balance{
  border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    
}

.balance{
  border-right: 1px solid #ddd;
}
.debit, .credit, .balance{
    width: 150px;
    padding: 10px;
    text-align:right;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
}
.description{
  border-bottom: 1px solid #ddd;
  min-width:400px;
  border-left: 1px solid #ddd;
  text-align:left;
  padding:5px;
  font-size:80%;
}
.topheads{
  
}
.MuiToolbar-root{
  
}
.account{
  
}
thead td,.totals{
  font-weight:bold;
  text-align: left;
  background-color: #1976d24a;
 // color: white;
  padding: 10px;
  border: 1px solid #ddd;
  
}
.totals{

text-align:right;
}
.account_r{
  width: 100px;
  text-align:right;
}
.account_l{
  width: 100px;
  text-align:left;
}
.accounttitle{
  
  text-align:left;
}
.accountcode{
  
}
.twocolumn{
  width:200px;
}
th.account, th.accountcode,th.accounttitle,th.twocolumn,th.accountdebit,th.accountcredit,th.accountbalance, th.account {
  border-bottom: 1px solid #ccc;
  font-size: 9pt;
  background: #e0e0e3;
  height: 25px;
  text-transform: uppercase;
  padding-left: 2px;
  border: 1px solid #00000014;
  border-right: none;
}

.grouptotal{
  font-size:10pt;
  font-weight:bold;
  --border-bottom:1px solid #ccc;
  padding-top : 1em;
  text-align:right;
}
.periodlist td{
  border-left:1px solid #ccc;
  border-bottom:1px solid #ccc;
}
.t-center{
  text-align:center;
}
.width100{
  width:100px;
}
.title{
  background:#00000024;
  font-size: 10pt;
  padding: 10px;
  color: #000;
  page-break-before: always;
}
#section-to-print *{
  font-size:8pt;
}


@media print {
  @Page{
    margin: 0;
    padding: 0;
    border: none;
    background: none;
    size: A4;
    // margin: 0;
    // padding: 0;
    // border: none;
    // background: none;
    // transform: rotate(270deg) translate(-210mm, 0);
    // transform-origin: 0 0;
  }
  body * {
    visibility: hidden;
    width:0px;
    height:0px;
  }
  body {
    margin: 0;
}
@page :first {
  margin-top: 0; // top margin for first page of paper
}
  #section-to-print, #section-to-print * {
    font-family: sans-serif;
    visibility: visible;
    font-size:6pt;

  }
  .title{
    margin-top:15pt;
    page-break-before: always;
  }
  #section-to-print {

    margin: 2.5cm 0;
    //border 2px solid grey;
    //position: absolute;
    //width: 210mm;
    //height: 297mm;
      margin:10px !important;
    //left: 0;
    //top:0;
    //top: 10px;
    //padding:5px;
    //padding-top:10px;
    //margin-top:10px;
    //margin-right:10px;
   
  }

  th.account, th.accountcode,th.accounttitle,th.twocolumn,td {
        border-right: 1px solid #00000014;
  }
  .subheads{
    font-size:8pt !important;
  }
h1{
  font-size:8pt !important;
}
}
`;

const CommentGrid = () => {
  const { ids, data, basePath,filterValues } = useListContext();
  let sum_obal,sum_dr,sum_cr;
  const accounts = {};
  console.log("data::"+JSON.stringify(data))
  let accounttitle;
  let openingbalance;
  ids.map((id) => {
    var record = data[id];
    accounttitle = record.coa_title;
    openingbalance =parseFloat(record.coa_obal) + parseFloat(record.sum_dr) - parseFloat(record.sum_cr);
    // groupTypes[record.coa] = { name: record.coa_title };
    accounts[record.coa] = {
      accounttitle: record.coa_title,
      id: record.coa,
      obal: record.coa_obal,
    };
  });

  ids.map((id) => {
    var record = data[id];
    console.log("record::"+JSON.stringify(record))
    const account = accounts[record.coa];
    account.children = [...(account.children || []), record];
  });

  for (var index in accounts) {
    const account = accounts[index];
    let { children } = account;
    account.total_dr = children.reduce(
      (sum, item) => sum + ((item.dr && parseFloat(item.dr)) || 0),
      0
    );
    sum_dr = account.total_dr;
    account.total_cr = children.reduce(
      (sum, item) => sum + ((item.cr && parseFloat(item.cr)) || 0),
      0
    );
    sum_cr = account.total_cr;
    
  }
  const jwt = JSON.parse(localStorage.getItem("jwtToken"));
  return (
    <div>
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>Accounts Ledger</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body id="section-to-print">
        <div  className="container-main">
         
          <table id="mainTable" cellspacing="0" width="100%">
          <thead>
              <th className="title" colspan="3"> {jwt && jwt.project && jwt.project.title} <br/> {accounttitle} from {filterValues && filterValues.vou_date_from +" to "+filterValues.vou_date_to}</th>
              <th  className="title" colspan="3">Opening Balance: {openingbalance && formatCurrency(parseFloat(openingbalance))}</th>
            </thead>
            <thead>
              <th className="account">Voucher #</th>
              <th className="accountcode">Voucher Date.</th>
              <th className="accounttitle">Description</th>
              <th className="accountdebit">Debit</th>
              <th className="accountcredit">Credit</th>
              <th className="accountbalance">Balance</th>
            </thead>
            <tbody>
            
            {Object.keys(accounts).map((key, index) => {
              const coa = accounts[key];
              sum_obal = parseFloat(openingbalance);
              return coa.children.map((voucher) => {
                
                  sum_obal = sum_obal +
                  parseFloat(voucher.dr || 0) -
                  parseFloat(voucher.cr || 0)
                return (

                  <tr>
                  
                  <td className="vou_no">
                    <a href={"/#/transactions/" + voucher.vou_no}>
                      {voucher.vou_no}
                    </a>
                  </td>
                  <td className="vou_date">{voucher.vou_date_string}</td>
                  <td className="description">{voucher.particulars}</td>
                  <td className="debit">{formatCurrency(voucher.dr)}</td>
                  <td className="credit">{formatCurrency(voucher.cr)}</td>
                  <td className="balance">{formatCurrency(sum_obal)}</td>
                </tr>
                
                );
              });
            })}
             <tr class="totals">
                  <td className="totals" />
                  <td className="totals" />
                  <td className="totals">Totals</td>
                  <td className="totals">{formatCurrency(sum_dr)}</td>
                  <td className="totals">{formatCurrency(sum_cr)}</td>
                  <td className="totals">{formatCurrency(sum_obal)}</td>
                </tr>
            </tbody>
             <tfoot>
                <tr>
                  <td colspan="6" className="footer">
                    Printed By {jwt && jwt.username} on{" "}
                    {new Date().toISOString()}
                  </td>
                </tr>
              </tfoot>
          </table>
        </div>
      </body>
    </html>
    </div>
  );
};

const AccountLedgerListActions = (props) => (
  <TopToolbar>
    {cloneElement(props.filters, { context: "button" })}
    <ExportButton />
    {/* Add your custom actions */}
    <Button
      onClick={() => {
        window.print();
      }}
      label="Print"
    ></Button>
  </TopToolbar>
);

export const AccountsLedgerList = (props) => (
  <List pagination={false} {...props} filters={<AccountsLedgerSearchFilter />} actions={<AccountLedgerListActions />}>
    {<CommentGrid />}
  </List>
);

export default AccountsLedgerList;
