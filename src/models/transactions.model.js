const query = require("../db/db-connection");
const padStart = require("string.prototype.padstart");
const {
  multipleColumnSet,
  searchLikeColumnSet,
} = require("../utils/common.utils");
const { param } = require("express-validator");
class TransactionsModel {
  tableName = "transactions";
  vou_types = [
    { id: 1, code: "JV", title: "Journal Voucher", dbcode: "Journal" },
    { id: 2, code: "PV", title: "Payment Voucher", dbcode: "Payment" },
    { id: 3, code: "RV", title: "Receipt Voucher", dbcode: "Reciept" },
    { id: 4, code: "SV", title: "Sales Voucher", dbcode: "" },
    { id: 5, code: "SLRV", title: "Salary Voucher", dbcode: "" },
    { id: 6, code: "IV", title: "Inventory Voucher", dbcode: "" },
  ];
  find = async (params = {}, range = {}, sort = {},projectid) => {
    let sql =
      "SELECT t.vou_no as id,t.id as row_id,t.vou_type,t.vou_no,t.project,DATE_FORMAT(t.vou_date, '%Y-%m-%d')as vou_date,t.chq_no,DATE_FORMAT(t.chq_date, '%Y-%m-%d') as chq_date,t.description,t.remarks,t.created_by ,JSON_ARRAYAGG(JSON_OBJECT('coa',t.coa,'id',t.id,'vu_no',t.vou_no,'refno',t.refno,'dr', t.dr, 'cr', t.cr,'project',t.project,'account',coa.title,'particulars',t.particulars)) as transactions ,coa.title from transactions t left outer join coa on t.coa=coa.id";
    let limit = "";
    let orderby = " ORDER BY row_id DESC ";
    let groupby = " GROUP BY  vou_no ";

    if (range && range.length) {
      limit = ` LIMIT ${range[0]}, ${range[1] - range[0] + 1}`;
    }

    if (sort && sort.length) {
      orderby = ` ORDER BY ${sort[0]} ${sort[1]}`;
    }

    if (!Object.keys(params).length) {
      sql +=` WHERE t.project=${projectid}`+ groupby + orderby + limit;
      console.log(sql);
      return await query(sql);
    }

    const { columnSet, values } = searchLikeColumnSet(params);
    sql += ` WHERE t.project=${projectid} and ${columnSet}`;

    sql += groupby + orderby + limit;
    console.log(sql);
    return await query(sql, [...values]);
  };

  findOne = async (params,projectid) => {
    const cast_vou_type =
      "(case when `transactions`.`vou_type`='Journal' then 1 when `transactions`.`vou_type`='Payment' then 2 when `transactions`.`vou_type`='Receipt' then 3 ELSE  `transactions`.`vou_type` end) as vou_type";
    if (typeof params == "object") {
      const keys = Object.keys(params);
      const values = Object.values(params).map((v) =>
        v == "id" ? `'${v}'` : `${v}`
      );
      const columnSet = keys
        .map((key) => (key == "id" ? `${"vou_no"} = ?` : `${key} = ?`))
        .join(", ");
      let sql = `SELECT t.vou_no as id,t.id as row_id,t.vou_type,t.vou_no,t.project,DATE_FORMAT(t.vou_date, '%Y-%m-%d')as vou_date,t.chq_no,DATE_FORMAT(t.chq_date, '%Y-%m-%d') as chq_date,t.description,t.remarks,t.created_by ,JSON_ARRAYAGG(JSON_OBJECT('coa',t.coa,'id',t.id,'vu_no',t.vou_no,'refno',t.refno,'dr', t.dr, 'cr', t.cr,'project',t.project,'account',coa.title,'particulars',t.particulars)) as transactions ,coa.title from transactions t left outer join coa on t.coa=coa.id 
               WHERE t.project=${projectid} and ${columnSet} GROUP BY vou_no `;

      console.log(sql);
      console.log(values);
      const result = await query(sql, [...values]);
      return result[0];
    }
    return [];
  };

  create = async (
    {
      vou_date,
      vou_no,
      vou_type,
      project,
      chq_no,
      chq_date,
      description,
      remarks,
      created_by,
      transactions,
      total_debit,
      total_credit,
    },
    projectid,old_vou_id
  ) => {

    // console.log("vou id"+ id)
     if (!old_vou_id) {
      vou_no = await this.newVoucherNumber(vou_type, vou_date,projectid);
     }

    //=========================================
    //LEDGER ENTRY OF VOUCHER
    //=========================================
    let srno = 0;
    for (let transaction of transactions) {
      const sql = `INSERT INTO transactions 
                    (vou_no,vou_date,vou_type,srno,coa,project,refno,chq_no,chq_date,dr,cr,description,remarks,created_by,particulars) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
      console.log(sql);
      const result = await query(sql, [
        vou_no,
        vou_date,
        vou_type,
        ++srno,
        transaction.coa,
        projectid,
        transaction.refno,
        chq_no,
        chq_date,
        transaction.dr + 0,
        transaction.cr + 0,
        description,
        remarks,
        created_by,
        transaction.particulars,
      ]);
    }

    return vou_no;
  };

  update = async ({
    id,
    vou_date,
    vou_no,
    vou_type,
    project,
    supplier,
    employee,
    stock,
    unit,
    chq_no,
    chq_date,
    refno,
    description,
    remarks,
    created_by,
    transactions,
    total_debit,
    total_credit,
  }) => {
    console.log(
      id,
      vou_date,
      vou_no,
      vou_type,
      project,
      supplier,
      employee,
      stock,
      unit,
      chq_no,
      chq_date,
      refno,
      description,
      remarks,
      created_by,
      transactions,
      total_debit,
      total_credit
    );
    const sql = `DELETE FROM  transactions where vou_no = '${vou_no}' and project=${project}`;
   console.log(sql);
    const result = await query(sql, [id]);
   
    return this.create(
      {
        vou_date,
        vou_no,
        vou_type,
        project,
        chq_no,
        chq_date,
        description,
        remarks,
        created_by,
        transactions,
        total_debit,
        total_credit,
      },
      project,
      id
    );

  };

  delete = async (id,projectid) => {
    let sql = `DELETE FROM  transactions where vou_no = '${id}' and project=${projectid}`;
    let result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;
    return affectedRows;
  };

  count = async (params = {},projectid) => {
    let sql = `select  count(distinct(vou_no)) as total FROM  transactions `;
    let result = "";

    if (Object.keys(params).length) {
      const { columnSet, values } = searchLikeColumnSet(params);
      sql += ` WHERE project=${projectid} and ${columnSet} `;
      console.log(sql);
      result = await query(sql, [...values]);
    } else {
      sql+=` WHERE project=${projectid}`;
      result = await query(sql);
    }
    var rows = JSON.parse(JSON.stringify(result));

    return rows[0].total;
  };

  voucherThisMonth = async (projectid) => {
    let sql = `SELECT id,vou_type,  DATE_FORMAT(vou_date,'%d/%m') as vou_date, count(*) as count FROM transactions  WHERE  project=${projectid} and vou_date BETWEEN NOW() - INTERVAL 30 DAY AND NOW() group by vou_date order by vou_date desc `;
    console.log(sql);
    const result = await query(sql);
    console.log(result);
    return result;
  };
  voucherDetail = async (params = {},projectid) => {
    let sql = `SELECT * FROM view_vou_detail`;
    let limit = "";
    let orderby = " ORDER BY srno ASC";
    const { columnSet, values } = multipleColumnSet(params);
    sql += ` WHERE project=${projectid} and ${columnSet}`;
    console.log(sql);
    return await query(sql, [...values]);
  };

  newVoucherNumber = async (vou_type, vou_date,projectid) => {
    console.log("getting new voucher no for date " + vou_date);
    const todaysDate = new Date(vou_date);
    let year = todaysDate.getFullYear();
    year = year.toString().substr(-2);
    const month = todaysDate.getMonth() + 1;
    const day = todaysDate.getDay();
    let voutype = this.vou_types.find((v) => v.id == vou_type);
    console.log(voutype);
    let vou_no = voutype.code + year + padStart(month, 2, 0);

    const sql =
    `SELECT maxno  FROM view_trans_vouno where project=${projectid} and voucher="${vou_no}"`;
    console.log(sql);
    const result = await query(sql);
   
    console.log(result);
    let current_no = 1;
    if (result.length > 0) {
      current_no = result[0].maxno + 1;
    }

    vou_no = vou_no + "-" + padStart(current_no, 4, 0);
    console.log(vou_no);
    return vou_no;
  };

  invalidVoucher = async (projectid) => {
    let sql = `select  vou_no as id, id as row_id,vou_date, vou_no,sum(dr) as debit,sum(cr) as credit from transactions where project=${projectid}  group by vou_no HAVING  debit!=credit`;
    return await query(sql);
  };
}

module.exports = new TransactionsModel();
