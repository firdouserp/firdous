const query = require("../db/db-connection");
const { param } = require("../routes/coa.route");
const { multipleColumnSet } = require("../utils/common.utils");
class ReportsModel {
  accountbalances = async (params = {}) => {
    let sql = `select coa.* , sum(ledger.dr) debit, sum(ledger.cr) credit,abs(sum(transactions.dr)- sum(transactions.cr)) balance 
    from coa left outer  join transactions on coa.id=transactions.coa  group by transactions.coa order by coa.code;`;

    return await query(sql);
  };

  projectledger = async (params = {},projectid) => {
    let sql = `SELECT id,coa_title,coa_code,coa_obal,project_title,count(*) as vou_count, sum(dr) debit,sum(cr) credit,abs(sum(dr)- sum(cr) + coa_obal) balance FROM view_project_ledger`;
    let groupby = " group by coa ";
    let orderby = " order by coa_code";

    if (!Object.keys(params).length) {
      sql += ` WHERE project=${projectid}`+groupby + orderby;
      console.log(sql);
      return await query(sql);
    }

    const keys = Object.keys(params);
    let values = Object.values(params);
    const columnSet = keys
      .map((key) => {
        if (key == "vou_date_from") {
          return `vou_date>=?`;
        } else if (key == "vou_date_to") {
          return ` vou_date<=?`;
        } else if (key == "coa_title") {
          return ` coa_title like ? `;
        } else {
          return `${key}=?`;
        }
      })
      .join(" and ");

    values = values.map((value) => {
      let mkey = keys.find((key) => params[key] === value);
      if (mkey == "coa_title") {
        return `%${value}%`;
      } else {
        return value;
      }
    });

    sql += ` WHERE  project=${projectid} and ${columnSet}`;

    sql += groupby + orderby;
    console.log(sql);
    console.log(JSON.stringify(keys));
    console.log(JSON.stringify(values));
    return await query(sql, [...values]);
  };

  projectledgerByAccount = async (id,projectid,filter) => {
    console.log("##### filter report #### "+ JSON.stringify(filter))
    // let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${id} and vou_date>='2021-06-01' and vou_date<='2021-06-30' order by vou_date,vou_no`;
    let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${id} and project=${projectid} order by vou_date,vou_no desc`;
    console.log(sql);
    return await query(sql);
  };

  accountLedgerByPeriod = async ({ coa,vou_date_from, vou_date_to },projectid) => {
    let result = {};
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    if(!coa){
      return {};
    }
    if (!vou_date_from) {
      vou_date_from = firstDay.toISOString().split('T')[0];
    }

    if(!vou_date_to){
      vou_date_to = lastDay.toISOString().split('T')[0];
    }

     
    let sql =                                                     
    `SELECT @rn:=@rn+1 as id, bal.sum_dr,bal.sum_cr,bal.coa_obal,v.id as coa,v.vou_date,v.vou_no,v.description,v.particulars,v.dr,v.cr,v.project,v.project_title,v.coa,v.coa_code,v.coa_obal,v.coa_title, DATE_FORMAT(v.Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger v 
    left join (SELECT  id as coa, sum(IFNULL(dr,0)) as sum_dr, sum(IFNULL(cr,0)) as sum_cr ,coa_obal from view_project_ledger  where coa=${coa} and project=${projectid} and vou_date<'${vou_date_from}'  ) as bal on v.coa=bal.coa,(SELECT @rn:=0) t2
   where v.coa=${coa} and v.project=${projectid} and v.vou_date>='${vou_date_from}' and v.vou_date<='${vou_date_to}'  order by v.vou_date,v.vou_no desc`; 
    //let sql  = `SELECT  @rn:=@rn+1 as id, id as coa,vou_date,vou_no,description,particulars,dr,cr,project,project_title,coa,coa_code,coa_obal,coa_title, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger,(SELECT @rn:=0) t2 where coa=${coa} and project=${projectid} and vou_date>='${vou_date_from}' and vou_date<='${vou_date_to}' order by vou_date,vou_no desc`
    //let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${coa} and project=${projectid} and vou_date>='${vou_date_from}' and vou_date<='${vou_date_to}' order by vou_date,vou_no desc`;
    console.log(sql);
    return await query(sql);
  };
 projectLedgerDetailed = async ({ coa,vou_date_from, vou_date_to },projectid) => {
  var date = new Date(), y = date.getFullYear(), m = date.getMonth();
  var firstDay = new Date(y, m, 1);
  var lastDay = new Date(y, m + 1, 0);

  if (!vou_date_from) {
    vou_date_from = firstDay.toISOString().split('T')[0];
  }

  if(!vou_date_to){
    vou_date_to = lastDay.toISOString().split('T')[0];
  }  
  console.log("##### filter report #### "+ JSON.stringify(vou_date_from))

    // let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${id} and vou_date>='2021-06-01' and vou_date<='2021-06-30' order by vou_date,vou_no`;
    //let sql = `SELECT *, DATE_FORMAT(Vou_Date, '%d-%m-%Y') as vou_date_string from view_project_ledger where coa=${id} and project=${projectid} order by vou_date,vou_no desc`;
    let sql = `SELECT  @rn:=@rn+1 as id,coa,vou_no,vou_date,coa_title,particulars,coa_code,coa_obal,project_title,sum(cr)cr,sum(dr) dr FROM view_project_ledger,(SELECT @rn:=0) t2 WHERE  project=${projectid} and vou_date>='${vou_date_from}'  and  vou_date<='${vou_date_to}'  group by vou_no,coa  order by coa_code`
    console.log(sql);
    return await query(sql);
  };

  projectLedgerCashBank = async ({ coa,vou_date_from, vou_date_to },projectid) => {
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);
  
    if (!vou_date_from) {
      vou_date_from = firstDay.toISOString().split('T')[0];
    }
  
    if(!vou_date_to){
      vou_date_to = lastDay.toISOString().split('T')[0];
    }  
    console.log("##### filter report #### "+ JSON.stringify(vou_date_from))
  
    let sql = `SELECT  @rn:=@rn+1 as id,coa,vou_no,vou_date,coa_title,particulars,coa_code,coa_obal,project_title,sum(cr)cr,sum(dr) dr,
    (SELECT JSON_ARRAYAGG(JSON_OBJECT('coa',t.coa,'coa_title',c.title,'id',t.id,'vu_no',t.vou_no,'vu_date',DATE_FORMAT(t.vou_date, '%Y-%m-%d'),'refno',t.refno,'dr', t.dr, 'cr', t.cr,'project',t.project,'particulars',t.particulars)) from transactions t join coa c on t.coa=c.id where t.vou_no=v.vou_no and t.coa!=v.coa) as transactions, 
    (SELECT sum(dr) -sum(cr) from transactions tt where vou_date<'${vou_date_from}' and tt.coa=v.coa )openingbalance
     FROM view_project_ledger v,(SELECT @rn:=0) t2 WHERE  project=${projectid} and vou_date>='${vou_date_from}'  and  vou_date<='${vou_date_to}'   and v.coa in (select id from coa where iscashbook=1 or isbankbook =1 ) group by vou_no  order by vou_date,vou_no desc`
      
     
      console.log(sql);
      return await query(sql);
    };

  trialBalanceByPeriod = async ({ vou_date_from, vou_date_to },projectid) => {
  
    let result = {};
    var date = new Date(), y = date.getFullYear(), m = date.getMonth();
    var firstDay = new Date(y, m, 1);
    var lastDay = new Date(y, m + 1, 0);

    if (!vou_date_from) {
      vou_date_from = firstDay.toISOString().split('T')[0];
    }

    if(!vou_date_to){
      vou_date_to = lastDay.toISOString().split('T')[0];
    }
    console.log("vou_date_from:" + vou_date_from);
    console.log("vou_date_to:" + vou_date_to);
    if (vou_date_from && vou_date_to) {
      let sql = `select tbd.coa_id as id,ct_code,n_code,coa_code,ct_id,ct_title,n_id,n_title,tbd.coa_id,coa_code,coa_title,IFNULL(coa_obal, 0) as coa_obal,
                (IFNULL(coa_obal, 0)+ IFNULL(pl_dr,0)  - IFNULL(pl_cr,0)) open_balance, (IFNULL(coa_obal,0) + IFNULL(pl_dr,0) - IFNULL(pl_cr,0) + IFNULL(period.p_dr,0) - IFNULL(period.p_cr,0) ) as close_balance, IFNULL(pl_dr,0) as period_less_dr,IFNULL(pl_cr,0) as period_less_cr,IFNULL(period.p_dr,0) as p_dr,IFNULL(period.p_cr,0) as p_cr from trial_balance_detail tbd
                 left join 
                (select coa_id as coaid,sum(IFNULL(dr,0)) p_dr,sum(IFNULL(cr,0)) p_cr from trial_balance_detail  where vou_date>='${vou_date_from}' and vou_date<='${vou_date_to}'  and  project=${projectid} group by coa_id ) as period on tbd.coa_id=period.coaid
               left  join
                (select coa_id as pl_coaid,sum(IFNULL(dr,0)) pl_dr,sum(IFNULL(cr,0)) pl_cr from trial_balance_detail  where vou_date<'${vou_date_from}' and project=${projectid} group by coa_id) as periodl on tbd.coa_id=periodl.pl_coaid
             where tbd.project=${projectid} group by tbd.coa_id order by ct_code,n_code,coa_code;`;

      console.log(sql);
      result = await query(sql);
    }
    return result;
  };

  projectSalesSummary = async (projectid) => {
    
    let sql = `SELECT  b.id, b.scode,
    b.code,
    b.title,
    b.unit,
    b.client,
    b.project,
    DATE_FORMAT(book_date, '%Y-%m-%d') as  book_date,
    b.sale_price,
    b.discount,
    b.active,
    b.remarks,
    b.name,
    u.title as unittitle,
    (sum(t.cr) -
    sum(t.dr))
    paymentmade,
    (SELECT duetoday.outstanding from (SELECT vs.unit, sum(vs.amount) outstanding from view_schedule vs where DATE(dueon) < now() group by vs.unit) duetoday where duetoday.unit=b.unit ) outstanding
    FROM booking b  left outer join units u on b.unit=u.id  left outer join transactions t on t.coa=u.coa group by b.id `
      
     
      console.log(sql);
      return await query(sql);
    };
  
}

module.exports = new ReportsModel();
