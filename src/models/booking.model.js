const query = require('../db/db-connection');
const { multipleColumnSet,searchLikeColumnSet } = require('../utils/common.utils');
class BookingModel {
    tableName = 'booking';
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
       
        console.log("booking params"+JSON.stringify(params));
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
        let { columnSet, values } = multipleColumnSet(params)
        const keys = Object.keys(params);

        columnSet = keys
        .map((key) => (key == "id" ? `${"b.id"} = ?` : `${key} = ?`))
        .join(", ");

        const sql = `SELECT  b.id, b.scode,
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
        b.father_name,
        b.residential_address,
        b.phone_no,
        b.occupation,
        b.nationality,
        b.cnic,
        b.reference_off,
        b.nominee_name,
        b.relation,
        b.email,
        (JSON_OBJECT('unitid',u.id,'unitcode',u.code,'unittitle',u.title,'unittype',u.utype,'unitsize', u.usize, 'unitcoa', u.coa)) as unitdetail,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',ps.id,'type',ps.type,'duedate',DATE_FORMAT(ps.duedate, '%Y-%m-%d'),'amount',ps.amount,'occurence',occurence,'frequency',frequency)) as pschedules   FROM paymentschedule ps  where booking = b.id) as pschedules,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('coa',t.coa,'id',t.id,'vu_no',t.vou_no,'vu_date',DATE_FORMAT(t.vou_date, '%Y-%m-%d'),'refno',t.refno,'dr', t.dr, 'cr', t.cr,'project',t.project,'particulars',t.particulars)) from transactions t where t.coa=u.coa) as transactions ,
        (SELECT JSON_ARRAYAGG(JSON_OBJECT('id',@rownum:=@rownum+1,'number',number,'frequency',oid,'booking',booking,'total_cost',total_cost,'paymentschedule', ptype ,'amount', amount,'dueon',dueon, 'cumulativepayment', @running_total:=@running_total - amount))
             from ( SELECT  *,@rownum:=0 as id,@running_total:=(select sum(cr) - sum(dr)  from transactions tr where tr.coa=u.coa) paymentmade FROM view_schedule v  order by dueon)  as t where t.booking =b.id ORDER BY dueon) as outstanding
         FROM booking b  left outer join units u on b.unit=u.id 
        WHERE ${columnSet} `;
        console.log(sql);
        const result = await query(sql, [...values]);

        return result[0];

    }
    
  
    
    create = async ({code,scode,title,unit,client,project,book_date,sale_price,discount,remarks,name,father_name,residential_address,phone_no,occupation,nationality,cnic,reference_off,nominee_name,relation,email,active=0,pschedules}) => {
        const sql = `INSERT INTO ${this.tableName} 
        (code,scode,title,unit,client,project,book_date,sale_price,discount,remarks,name,father_name,residential_address,phone_no,occupation,nationality,cnic,reference_off,nominee_name,relation,email,active) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;
        console.log(sql);
        console.log(code,scode,title,unit,client,project,book_date,sale_price,discount,remarks,name,father_name,residential_address,phone_no,occupation,nationality,cnic,reference_off,nominee_name,relation,email,active);
        const result = await query(sql, [code,scode,title,unit,client,project,book_date,sale_price,discount,remarks,name,father_name,residential_address,phone_no,occupation,nationality,cnic,reference_off,nominee_name,relation,email,active]);
       
        const bookig_id = result.insertId;
        for (let pschedule of pschedules) {
          const sql = `INSERT INTO paymentschedule 
                        (booking,unit,total_cost,type,duedate,amount,occurence,frequency)
                         VALUES (?,?,?,?,?,?,?,?)`;
          console.log(sql);
          const result = await query(sql, [
            bookig_id,
            unit,
            sale_price,
            pschedule.type,
            pschedule.duedate,
            pschedule.amount,
            pschedule.occurence,
            pschedule.frequency,
          ]);
        }
       
        return result.insertId;

}
// update = async (params, id) => {
//     const { columnSet, values } = multipleColumnSet(params)

//     const sql = `UPDATE booking SET ${columnSet} WHERE id = ?`;
//     console.log(sql);
//     console.log(values);
//     const result = await query(sql, [...values, id]);
    
//     return result;
// }

update = async ({
    id,
    scode,
    code,
    project_id,
    title,
    unit,
    client,
    project,
    book_date,
    sale_price,
    discount,
    active,
    remarks,
    name,
    father_name,
    residential_address,
    phone_no,
    occupation,
    nationality,
    cnic,
    reference_off,
    nominee_name,
    relation,
    email,pschedules }) => {

    let sql = `UPDATE booking SET 
    scode = ?, code = ?, project = ?, title = ?,unit=?, client=?,book_date=?, sale_price=?,
    discount=?, active=? ,remarks=? ,name=? ,father_name=? ,residential_address=? ,
    phone_no=? ,occupation=? ,nationality=? ,cnic=? ,reference_off=? ,nominee_name=? ,
    relation=?,email=?    WHERE id = ${id}`;
    console.log(sql);

    let result = await query(sql, [
        scode,
        code,
        project,
        title,
        unit,
        client,
        book_date,
        sale_price,
        discount,
        active,
        remarks,
        name,
        father_name,
        residential_address,
        phone_no,
        occupation,
        nationality,
        cnic,
        reference_off,
        nominee_name,
        relation,
        email
    ]);

    sql = `DELETE FROM  paymentschedule where booking = ${id}`;
    result = await query(sql, [id]);

    //=========================================
    //Payment Schedule for Booking 
    //=========================================
    for (let pschedule of pschedules) {
        const sql = `INSERT INTO paymentschedule 
                    (booking,unit,total_cost,type,duedate,amount,occurence,frequency)
                    VALUES (?,?,?,?,?,?,?,?)`;
        console.log(sql);
        const result = await query(sql, [
          id,
          unit,
          sale_price,
          pschedule.type,
          pschedule.duedate,
          pschedule.amount,
          pschedule.occurence,
          pschedule.frequency
        ]);
      }
    return id;
  };

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

module.exports = new BookingModel;