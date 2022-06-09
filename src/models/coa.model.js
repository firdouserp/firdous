const query = require("../db/db-connection");
const {
  multipleColumnSet,
  searchLikeColumnSet,
  autoCompleteColumnSet,
} = require("../utils/common.utils");
class CoaModel {
  tableName = "coa";
  find = async (params = {}, range = {}, sort = {},projectid) => {
    // let sql = `select coa.* , sum(ledger.dr) debit, sum(ledger.cr) credit,abs(sum(ledger.dr)- sum(ledger.cr)) balance 
    //           from coa left outer  join ledger on coa.id=ledger.coa `
    let sql = `SELECT * FROM ${this.tableName}`;
    let limit = "";
    let orderby = " ORDER BY code ASC";
    let groupby = " group by coa.id"
    if (range && range.length) {
      limit = ` LIMIT ${range[0]}, ${range[1] - range[0] + 1}`;
    }

    if (sort && sort.length) {
      orderby = ` ORDER BY ${sort[0]} ${sort[1]}`;
    }

    if (!Object.keys(params).length) {
     
      sql += ` WHERE project=`+projectid;
      sql += groupby + orderby + limit;
      console.log(sql);
      return await query(sql);
    }

    const { columnSet, values } = searchLikeColumnSet(params);
    sql += ` WHERE project=${projectid} and ${columnSet}`;

    sql += groupby + orderby + limit;
    console.log(sql);
    return await query(sql, [...values]);
  };
  findOne = async (params) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

    const result = await query(sql, [...values]);

    return result[0];
  };

  create = async ({
    code,
    scode,
    title,
    iscashbook,
    isbankbook,
    notes,
    obal,
    active = 0,
  },projectid) => {
    const sql = `INSERT INTO ${this.tableName} 
        (code,scode,title,iscashbook,isbankbook,notes,obal,active,project) VALUES (?,?,?,?,?,?,?,?,?)`;
    console.log(sql);
    const result = await query(sql, [
      code,
      scode,
      title,
      iscashbook,
      isbankbook,
      notes,
      obal,
      active,
      projectid
    ]);
    return result.insertId;
  };
  update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params);

    const sql = `UPDATE coa SET ${columnSet} WHERE id = ?`;

    const result = await query(sql, [...values, id]);

    return result;
  };

  delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
  };
  count = async (params = {},projectid) => {
    let sql = `select count(*) as total FROM ${this.tableName}`;
    let result = "";
    if (Object.keys(params).length) {
      const { columnSet, values } = searchLikeColumnSet(params);
      sql += ` WHERE project=${projectid} and ${columnSet}`;
      console.log(sql);
      result = await query(sql, [...values]);
    } else {
      sql += ` WHERE project=${projectid} `;
      result = await query(sql);
    }
    var rows = JSON.parse(JSON.stringify(result));

    return rows[0].total;
  };

  autocomplete = async (params = {}, sort = {},projectid) => {
    let sql = `SELECT id,scode,code,title FROM ${this.tableName}`;
    let orderby = " ORDER BY title ASC";

    if (sort && sort.length) {
      orderby = ` ORDER BY ${sort[0]} ${sort[1]}`;
    }

    if (!Object.keys(params).length) {
      sql += ` WHERE project=${projectid} ` +orderby;
      console.log(sql);
      return await query(sql);
    }

    if (typeof params !== "object") {
      throw new Error("Invalid input");
    }

    const searchterm = "%" + Object.values(params) + "%";
    console.log("search term:" + searchterm);
    sql += ` WHERE project=${projectid} and  scode like '${searchterm}' or code like '${searchterm}' or title like '${searchterm}'`;

    sql += orderby;
    console.log(sql);
    return await query(sql);
  };
}

module.exports = new CoaModel();
