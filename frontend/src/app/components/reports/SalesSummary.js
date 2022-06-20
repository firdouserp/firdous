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

const styles = `
  #mainTable{
    min-width:29cm;
    padding-right:20px;
  }
  #section-to-print *{
    font-size:8pt;
  }

  th {
    border-bottom: 1px solid #ccc;
}
th.header{
  padding: 9px;
  background : #ccc;
  border-right: 1px solid #000;
}
th.title {
  font-size: 15px !important;
  padding: 8px;
}

tr
{
  line-height: 25px;
  
}
.firstcol{
  border-left: 1px solid #ccc;
 
  fontWeight:bold;
}
.lastcol{
  border-right: 1px solid #ccc;
}
td{
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  padding-left: 8px;
  
}
td.title{
  border:none;
  border-bottom: 1px solid #ccc;
  font-size:15px !important;
 
  padding-right: 5px;
}
.container-main {
  padding: 25px;
}

td.grouptotal{
  font-size:12px !important;
  font-weight:bold;
  border:1px solid #ccc;
  text-align:center;
}
.text{
  text-align:right !important;
}

  @media print {
    @Page{
      margin: 0;
      padding: 0;
      border: none;
      background: none;
      orin
      size: A4;
      // margin: 0;
      // padding: 0;
      // border: none;
      // background: none;
       transform: rotate(270deg) translate(-210mm, 0);
      // transform-origin: 0 0;
    }

  body * {
    visibility: hidden;
    width:0px;
    height:0px;
    font-family:'Times New Roman',Times,serif;
    
  }
  body {
    margin: 0;
  }
  
  #section-to-print * {
    font-family: sans-serif;
    visibility: visible;
    font-size:10pt;

  }
  th.header{
    padding: 9px;
    background : #ccc;
    border-right: 1px solid #000;
  }
}
`


const CommentGrid = () => {
  const { ids, data, basePath,filterValues } = useListContext();
  let sum_salesprice=0,sum_recieved=0,sum_outstanding=0,sum_currentdue=0,sum_remaining=0;
  //console.log("data::"+JSON.stringify(data))
  const jwt = JSON.parse(localStorage.getItem("jwtToken"));
  return (
    <div>
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>Sales Summary</title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body id="section-to-print">
        <div  className="container-main">
        <table id="mainTable" cellspacing="0" width="100%">
          <thead>
              <th className="title" colSpan="8" > {jwt && jwt.project && jwt.project.title} Sales Summary upto {new Date().toISOString().split("T")[0]}</th>
              {/* <th  className="title" colspan="4">Opening Balance: {openingbalance && formatCurrency(parseFloat(openingbalance))}</th> */}
            </thead>
            </table>
          <table id="mainTable" cellspacing="0" width="100%">
          
            <thead>
            
              <th className="header" align="justify">Booking Title</th>
              <th className="header" align="justify">Unit</th>
              <th className="header" align="justify">Booking Date</th>
              <th className="header" align="justify">Sale Price</th>
              <th className="header" align="justify">Paymnet Recieved</th>
              <th className="header" align="justify">Outstanding (Today)</th>
              <th className="header" align="justify">Current Due</th>
              <th className="header" align="justify">Remaining</th>
            </thead>
            <tbody>
            
            {ids.map((id) => {
              let booking = data[id];
              sum_salesprice += booking.sale_price && parseFloat(booking.sale_price) ||0;
              sum_recieved += booking.paymentmade && parseFloat(booking.paymentmade) ||0;
              sum_outstanding+=booking.outstanding && parseFloat(booking.outstanding) || 0;
              sum_currentdue+=(booking.paymentmade &&  parseFloat(booking.paymentmade) || 0) - (booking.outstanding && parseFloat(booking.outstanding) ||0);
              sum_remaining+= (booking.paymentmade &&  parseFloat(booking.paymentmade) || 0)-(booking.sale_price &&  parseFloat(booking.sale_price) ||0) ;

              return (
             <tr>
                          <td className="subheads firstcol" align="justify" >
                            {booking.title}
                          </td>
                          <td className="subheads"  align="justify"  >
                              {booking.unittitle}
                          </td>
                          <td className="subheads" align="center"  >
                              {booking.book_date}
                          </td>
                          <td className="subheads" align="center"  >
                              {formatCurrency(booking.sale_price)}
                          </td>
                          <td className="subheads" align="center"  >
                              {formatCurrency(booking.paymentmade)}
                          </td>
                          <td className="subheads" align="center"  >
                              {formatCurrency(booking.outstanding)}
                          </td>
                          <td className="subheads " align="center"  >
                              {formatCurrency(booking.paymentmade-booking.outstanding)}
                          </td>
                          <td className="subheads lastcol" align="center"  >
                              {formatCurrency(booking.paymentmade-booking.sale_price)}
                          </td>
              </tr>
               
   
               
               
        
               )        
              })}
              <tr>

              <td className ="grouptotal text" colspan="3" align="right"> Group Total:</td>
              <td className ="grouptotal">{formatCurrency(sum_salesprice)}</td>
              <td className ="grouptotal">{formatCurrency(sum_recieved)}</td>
              <td className ="grouptotal">{formatCurrency(sum_outstanding)}</td>
              <td className ="grouptotal">{formatCurrency(sum_currentdue)}</td>
              <td className ="grouptotal">{formatCurrency(sum_remaining)}</td>

              </tr>
        
            </tbody>
             <tfoot>
                <tr>
                  <td colspan="8" className="footer">
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

export const SalesSummary = (props) => (
  <List pagination={false} {...props} /*filters={<AccountsLedgerSearchFilter />}*/ actions={<AccountLedgerListActions />}>
    {<CommentGrid />}
  </List>
);

export default SalesSummary;
