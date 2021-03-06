const UnitsModel = require('../models/units.model');
const HttpException = require('../utils/HttpException.utils');
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

/******************************************************************************
 *                              Units Controller
 ******************************************************************************/
class UnitsController {
    getAllUnits = async (req, res, next) => {
       
        let unitsList;
        var range;
        var sort ;
        var filter;
      
        if(req.query && Object.keys(req.query).length){
            var range = req.query.range && JSON.parse(req.query.range);
            var sort = req.query.sort && JSON.parse(req.query.sort);
            var filter =range && req.query.filter &&  JSON.parse(req.query.filter);
            //console.log(range)
            unitsList = await UnitsModel.find(filter,range,sort);
        }else{
            unitsList = await UnitsModel.find();
        }
      
       
        let count = await UnitsModel.count(filter);
        if(range && range.length>1){
            let content_range = range[0] + '-' + range[1] + '/' + count
            console.log(content_range);
            res.set('Content-Range',content_range);
        }

        res.send(unitsList);
    };

    ListAllUnits = async (req, res, next) => {
        console.log("List All Units");
        let unitsList = await UnitsModel.list(req.projectid);
        console.log(unitsList);
        var filter={};
        let count = await UnitsModel.count(filter, req.projectid);
        let content_range = '1-' + count + '/' + count;
        console.log(content_range);
        res.set('Content-Range', content_range);
        res.send(unitsList);
    };
    getUnitsById = async (req, res, next) => {
        const units = await UnitsModel.findOne({ id: req.params.id });
        if (!units) {
            throw new HttpException(404, 'Unit not found');
        }
        res.send(units);
        
    };

    getUnitsByUnitsName = async (req, res, next) => {
        const units = await UnitsModel.findOne({ unitsname: req.params.unitsname });
        if (!units) {
            throw new HttpException(404, 'Unit not found');
        }

        };
    
        createUnits = async (req, res, next) => {
            this.checkValidation(req);
            
             const result = await UnitsModel.create(req.body,req.projectid);
    
            if (!result) {
                throw new HttpException(500, 'Something went wrong');
            }
    
            const units = await UnitsModel.findOne({ id: result });
            if (!units) {
                throw new HttpException(404, 'Units not found');
            }
    
            res.status(201).send(units);
        };
    
    updateUnit = async (req, res, next) => {
        this.checkValidation(req);

                
        // do the update query and get the result
        // it can be partial edit
        const {...restOfUpdates } = req.body;
        console.log(req.body);
        const result = await UnitsModel.update(restOfUpdates, req.params.id);

        if (!result) {
            throw new HttpException(404, 'Something went wrong');
        }

        const { affectedRows, changedRows, info } = result;

        const message = !affectedRows ? 'Unit not found' :
            affectedRows && changedRows ? 'Unit updated successfully' : 'Updated faild';

            const units = await UnitsModel.findOne({ id: req.params.id });
            if (!units) {
                throw new HttpException(404, 'Units not found');
            }
    
            res.status(201).send(units);
    };

    deleteUnits = async (req, res, next) => {
        const result = await UnitsModel.delete(req.params.id);
        if (!result) {
            throw new HttpException(404, 'Unit not found');
        }
        res.send('Unit has been deleted');
    };

    checkValidation = (req) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            throw new HttpException(400, 'Validation faild', errors);
        }
    }
}



/******************************************************************************
 *                               Export
 ******************************************************************************/
module.exports = new UnitsController;