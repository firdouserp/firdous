
const query = require('../db/db-connection');
const { multipleColumnSet,searchLikeColumnSet } = require('../utils/common.utils');
class ClientsModel {
    tableName = 'clients';
    find = async (params = {},range={},sort={}) => {
        let sql = `SELECT * FROM ${this.tableName}`;
        let limit = "";
        let orderby =" ORDER BY id ASC";
        if (range && range.length){
            limit= ` LIMIT ${range[0]}, ${range[1]-range[0]+1}`;     
        }

        if (sort && sort.length){
            
            orderby= ` ORDER BY ${sort[0]} ${sort[1]}`;     
        }
       
        if (!Object.keys(params).length) {

            sql += orderby +limit;     
            console.log(sql)
            return await query(sql);
        }

        const { columnSet, values } = searchLikeColumnSet(params)
        sql += ` WHERE ${columnSet}`;

         sql += orderby+limit;   
        console.log(sql)
        return await query(sql, [...values]);
    }
    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);
        console.log(result[0]);
        return result[0];

    }
    create = async ({name,father_name,postal_address,residential_address,phone_office,phone_residential,phone_mobile,occupation,age,nationality,reference_of,nominee_name,nominee_relation,nominee_address,email=0,coa}) => {
        const sql = `INSERT INTO ${this.tableName} 
        (name,father_name,postal_address,residential_address,phone_office,phone_residential,phone_mobile,occupation,age,nationality,reference_of,nominee_name,nominee_relation,nominee_address,email,coa) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        console.log(sql);
        const result = await query(sql, [name,father_name,postal_address,residential_address,phone_office,phone_residential,phone_mobile,occupation,age,nationality,reference_of,nominee_name,nominee_relation,nominee_address,email,coa]);
        return result.insertId;

}
update = async (params, id) => {
    const { columnSet, values } = multipleColumnSet(params)

    const sql = `UPDATE clients SET ${columnSet} WHERE id = ?`;
    console.log(sql);
    console.log(values);
    const result = await query(sql, [...values, id]);
    console.log(result);
    return result;
}

delete = async (id) => {
    const sql = `DELETE FROM ${this.tableName}
    WHERE id = ?`;
    const result = await query(sql, [id]);
    const affectedRows = result ? result.affectedRows : 0;

    return affectedRows;
}
count = async (params = {}) => {
    let sql = `select count(*) as total FROM ${this.tableName}`;
    let result = "";
    if (Object.keys(params).length) {
        const { columnSet, values } = searchLikeColumnSet(params)
        sql += ` WHERE ${columnSet}`; 
        console.log(sql)
        result = await query(sql, [...values]);
      
    }else{
        result = await query(sql);
    }
    var rows = JSON.parse(JSON.stringify(result));
    
    return rows[0].total;
}
}

module.exports = new ClientsModel;