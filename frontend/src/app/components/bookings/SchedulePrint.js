//import { formatCurrency, formatDate } from "./utils";
import PropTypes from 'prop-types';
import React from "react";
export function formatDate(date) {
  return date
}

export function formatCurrency(amount) {
  return Number.parseFloat(amount)
    .toFixed(2)
    .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
const styles = `
.invoice-box{
  max-width:800px;
  margin:auto;
  padding:30px;
  border:1px solid #eee;
  box-shadow:0 0 10px rgba(0, 0, 0, .15);
  font-size:12px;
  line-height:24px;
  font-family:'Helvetica Neue', 'Helvetica', Helvetica, Arial, sans-serif;
  color:#555;
}

tr.item {
  font-size: 7pt;
}
td.particulars {
  /* font-size: 8pt; */
  text-align: left !important;
}
td.vudate, td.vu_date {
  text-align: center !important;
}
.invoice-box table{
  width:100%;
  line-height:inherit;
  text-align:left;
}
.invoice-box table td{
  padding:1px;
  vertical-align:top;
}
.invoice-box table td td{
  padding:0;
}
.invoice-box .voutype{
  text-align:center;
  vertical-align:top;
  font-size:10px;
  color:#333;
}
.invoice-box .bottomline{
  margin-top:80px;
}
.invoice-box .footer {
  border-top:1px solid grey;
  text-align:center;
}

.invoice-box table tr td:nth-child(2){
  text-align:right;
}
.invoice-box table tr td.refno{
  text-align:left;
}
.invoice-box table tr.top table td{
  padding-bottom:5px;
}
.invoice-box table tr.top table td.title{
  font-size:35px;
  line-height:35px;
  color:#333;
}
.invoice-box table tr.information table td{
  padding-bottom:40px;
}
.invoice-box table tr.information table td.information-column{
  width:50%;
}
.invoice-box table table.invoice-information{
  display:inline-block;
  width:auto;
}
.invoice-box table table.invoice-information td:first-child{
  padding-right:30px;
}
.invoice-box table tr.information table td td{
  padding-bottom:0;
}
.invoice-box table tr.heading td{
  background:#eee;
  border-bottom:1px solid #ddd;
  font-weight:bold;
  font-size:9pt;
  text-align : center
}
.invoice-box table tr.details td{
  padding-bottom:5px;
}
.invoice-box table tr.item td{
  line-height:15px;
  border-bottom:1px solid #eee;
  text-align:center !important;
}
.invoice-box table tr.item td.debit{
  text-align:right;
}
.invoice-box table tr.heading td.credit{
  text-align:right;
}
.invoice-box table tr.heading td.debit{
  text-align:right;
}
.invoice-box table tr.item td.credit{
  text-align:right;
}
.invoice-box table tr.item.last td{
  border-bottom:none;
}
.invoice-box table tr.total td:nth-child(2){
  background:#eee;
  font-weight:bold;
}
.invoice-box .subheading {
  font-weight: bold;
  font-size: 12px;
  text-transform: uppercase;
}
.booking div{
  height:15px;
}
.alloteedetail, .allotmentdetail {
  height: 15px;
  font-size:8pt;
}
.item{
  font-size: 6pt !important;
  height:10px;
}
@media only screen and (max-width: 600px) {
  .invoice-box table tr.top table td{
    width:100%;
    display:block;
    text-align:center;
  }
  .invoice-box table tr.information table td{
    width:100% ;
    display:block;
    text-align:center;
  }
}
@media print {
  .invoice-box {
    box-shadow: none;
    border: 0;
  }

  
}
`

export default function Outstanding({ booking, company, notes }) {
  let { transactions,outstanding } = booking;
  // for(let i=0;i<10;i++)
  // {
  // 	transactions.push({account:'ABC',particulars:'TEST PARTICLULARS', dr:89,cr:0});
  // }
  transactions = !transactions?{}:transactions
 // outstanding= !outstanding?{}:outstanding
  const totalAmount_DR = transactions.reduce((sum, item) => sum + item.dr, 0);
  const totalAmount_CR = transactions.reduce((sum, item) => sum + item.cr, 0);
  transactions = transactions.sort(function (t1, t2) {
    return t1.dr > 0 ? -1 : 1;
  });
 // outstanding = outstanding && outstanding.filter((item) => new Date(item.dueon)<= new Date());
 console.log("booking :"+JSON.stringify(booking));
  const bookingName = booking.book_type || "Booking";

  return (
    <html lang={"en_US"}>
      <head>
        <meta charSet="utf-8" />
        <title>
          {company.name} {bookingName}
        </title>
        <style dangerouslySetInnerHTML={{ __html: styles }} />
        <meta name="robots" content="noindex, nofollow" />
      </head>
      <body>
        <div className="invoice-box">
          <table cellPadding="0" cellSpacing="0">
            <tbody>
              <tr className="top">
              <td colSpan="8" > <div className="book_type">{booking.book_type} <b>Firdous Pride</b></div></td>
              </tr>
              <tr className="top">
                <td colSpan="8" >
                  <table>
                    <tbody>
                      <tr>
                      
                          
                        <td>

                          < div className='booking'>
                    
                          <div className="subheading">Booking No # {booking.id}</div>
                            <div>Booking Date: {booking.book_date}</div>
                          <div>Project {booking.project}</div>
                           <div> Print Date : {new Date().toISOString()}</div>

                          </div>
                        </td>
                    
                        <td className="title">
                          <img
                            src={company.logoUrl}
                            style={{
                              display: "block",
                              width: "auto",
                              height: "auto",
                              maxWidth: "200px",
                              maxHeight: "70px",
                              marginLeft: "auto",
                            }}
                            alt={company.name}
                          />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className="information">
                <td colSpan="8">
                  <table>
                    <tbody>
                      <tr>
                        <td className="information-column">
                          <div className="subheading">Allottee</div>
                          <div className='alloteedetail'>Name : {(booking.name)}</div>
                                  <div className='alloteedetail'>Phone no: {(booking.phone_no)}</div>
                                  <div className='alloteedetail'>Cnic : {(booking.cnic)}</div>
                                  <div className='alloteedetail'>Residential Address : {(booking.residential_address)}</div>

                        </td>
                        
                        
                        <td className="information-column">
                        <div className="subheading">Allottment </div>
                               <div className='allotmentdetail'>Unit : {(booking.unitdetail && booking.unitdetail.unittitle)}</div>
                               <div className='allotmentdetail'>Type : {(booking.unitdetail && booking.unitdetail.unittype)}</div>
                               <div className='allotmentdetail'>Sale Price     : {(booking.sale_price && formatCurrency(booking.sale_price))}</div>
                               <div className='allotmentdetail'>Total Paid     : {formatCurrency(totalAmount_CR- totalAmount_DR)}</div>
                               <div className='allotmentdetail'>Total Remainig : {formatCurrency(booking.sale_price - totalAmount_CR- totalAmount_DR)}</div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
              <tr className="heading">
              
              <td className="subheading">Payment Schedule</td>
                <td className="subheading">	Due date</td>
                <td className="vudate" >Amount Due</td>
                <td  className="refno"> Payment received</td>
                <td className="debit">Outstanding</td>
                <td className="credit">Balance</td>
              </tr>
              {outstanding && outstanding.map((item) => (
                
                <tr className="item">
                   <td className="account">{item.paymentschedule+ ' ' + (item.frequency>0?item.number:"")}</td>
                  <td className="account">{item.dueon}</td>
                  <td className="vu_date">{formatCurrency(item.amount)}</td>
                  <td className="particulars">{item.cumulativepayment>0?formatCurrency(item.amount):((item.cumulativepayment+item.amount)>0?item.cumulativepayment+item.amount:"")}</td>

                  <td className="debit">{item.cumulativepayment>0?0:((item.cumulativepayment+item.amount)>0?item.amount-(item.cumulativepayment+item.amount):formatCurrency(item.amount))}</td>
                  <td className="credit">{formatCurrency(item.cumulativepayment)}</td>
                </tr>
              ))}
           
              
  
           {/* <tr className="totals">
                       <td  className="total"></td>
                       <td  colspan="4"className="total">Total Amount Paid : </td>
                        <td colspan="1" align='right'>{formatCurrency(totalAmount_CR- totalAmount_DR)}</td>
                      </tr>

                      <tr className="totals">
                       <td  className="total"></td>
                       <td colspan="4"className="total">Remaining Amount Due : </td>
                        <td colspan="1" align='right'>{formatCurrency(booking.sale_price - totalAmount_CR- totalAmount_DR)}</td>
                      </tr>
              */}
            
            </tbody>
          </table>
          {/* {notes && (
            <div style={{ marginTop: 30 }}>
              <div className="">Remarks: {notes}</div>

            </div>
          )} */}
          {/* <div className="bottomline">
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr className="footer">
                  <td colSpan="2" > <div className="footer">{booking.book_type} Prepared By</div></td>
                  <td colSpan="2" > <div className="footer">{booking.book_type} Checked By</div></td>
                  <td colSpan="2" > <div className="footer">{booking.book_type} Senctioned By</div></td>
                  <td colSpan="2" > <div className="footer">{booking.book_type} Signature By</div></td>
                 
                </tr>
              </tbody>
            </table>
          </div> */}
          
        </div>
      </body>
    </html >
  );
}

Outstanding.propTypes = {
  company: PropTypes.shape({
    name: PropTypes.string,
    logoUrl: PropTypes.string,
  }).isRequired,
  booking: PropTypes.shape({
    book_no: PropTypes.string,
    book_date: PropTypes.string,
    book_type: PropTypes.string,
    project: PropTypes.string,
    sale_price: PropTypes.string,
    discount: PropTypes.string,
    father_name: PropTypes.string,
    client: PropTypes.string,
    phone_no: PropTypes.string,
    occupation: PropTypes.string,
    reference_off: PropTypes.string,
    nationality: PropTypes.string,
    nominee_name: PropTypes.string,
    relation: PropTypes.string,
    residential_address: PropTypes.string,
    cnic: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.string,
    remarks: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,

  lang: PropTypes.string,
  notes: PropTypes.node,
};

Outstanding.defaultProps = {
  lang: "en_US",
  notes: null,
};
