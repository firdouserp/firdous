const { body, check } = require('express-validator');
const Role = require('../../utils/userRoles.utils');


exports.createScheduleSchema = [
   
    check('unit')
        .exists()
        .withMessage('unit type must be required')
        .isLength({ min: 1 })
        .withMessage('Must be at least 1 chars long'),
   check('total_cost')
        .exists()
        .withMessage('total cost is required'),
    check('on_booking')
        .exists()
        .withMessage('employee required'),
    check('on_allocation')
        .exists()
        .optional({nullable:true}),
        
    check('on_confirmation')
        .exists()
        .isLength({min: 1})
        .withMessage('on_confirmation  is required'),
    check('on_start')
        .exists()
        .withMessage('on start is required'),
    check('monthly_installment')
        .exists()
        .isLength({min: 1})
        .withMessage('Monthly Installment should be valid'),
    check('quaterly_payment')
        .exists()
        .isLength({min: 1})
        .withMessage('Quaterly payment should be valid'),
    check('on_excavation')
        .exists()
        .isLength({min: 1})
        .withMessage('On Excavation should be valid'),
    check('on_foundation')
        .exists()
        .isLength({min: 1})
        .optional({})
        .withMessage('remarks required'),
        check('on_slab')
        .exists()
        .isLength({min: 1})
        .withMessage('On Slab should be valid'),
        check('on_block')
        .exists()
        .isLength({min: 1})
        .withMessage('On Block should be valid'),
        check('on_plaster')
        .exists()
        .isLength({min: 1})
        .withMessage('On Plaster should be valid'),
        check('on_plumbing')
        .exists()
        .isLength({min: 1})
        .withMessage('On plumbing should be valid'),
        check('on_electric')
        .exists()
        .isLength({min: 1})
        .withMessage('On Plubming should be valid'),
        check('on_electric')
        .exists()
        .isLength({min: 1})
        .withMessage('On Electric should be valid'),
        check('on_coloring')
        .exists()
        .isLength({min: 1})
        .withMessage('On Coloring should be valid'),
        check('on_finishing')
        .exists()
        .isLength({min: 1})
        .withMessage('On Finishing should be valid'),
        check('on_possesion')
        .exists()
        .isLength({min: 1})
        .withMessage('On Posession should be valid'),
    
    
    
    

        
];

exports.updateScheduleSchema = [
   
check('unit')
    .exists()
    .withMessage('unit type must be required')
    .isLength({ min: 1 })
    .withMessage('Must be at least 1 chars long')
    .optional({nullable:true}),
check('total_cost')
    .exists()
    .withMessage('total cost is required')
    .optional({nullable:true}),
check('on_booking')
    .exists()
    .withMessage('employee required')
    .optional({nullable:true}),
check('on_allocation')
    .exists()
    .optional({nullable:true})
    .optional({nullable:true}),
    
check('on_confirmation')
    .exists()
    .isLength({min: 1})
    .withMessage('cheque should be valid')
    .optional({nullable:true}),
check('on_start')
    .exists()
    .withMessage('on start is required')
    .optional({nullable:true}),
check('monthly_installment')
    .exists()
    .isLength({min: 1})
    .withMessage('Monthly Installment should be valid')
    .optional({nullable:true}),
check('quaterly_payment')
    .exists()
    .isLength({min: 1})
    .withMessage('Quaterly payment should be valid')
    .optional({nullable:true}),
check('on_excavation')
    .exists()
    .isLength({min: 1})
    .withMessage('On Excavation should be valid')
    .optional({nullable:true}),
check('on_foundation')
    .exists()
    .isLength({min: 1})
    .optional({})
    .withMessage('remarks required')
    .optional({nullable:true}),
    check('on_slab')
    .exists()
    .isLength({min: 1})
    .withMessage('On Slab should be valid')
    .optional({nullable:true}),
check('on_block')
    .exists()
    .isLength({min: 1})
    .withMessage('On Block should be valid')
    .optional({nullable:true}),
check('on_plaster')
    .exists()
    .isLength({min: 1})
    .withMessage('On Plaster should be valid')
    .optional({nullable:true}),
    check('on_plumbing')
    .exists()
    .isLength({min: 1})
    .withMessage('On plumbing should be valid')
    .optional({nullable:true}),
    check('on_electric')
    .exists()
    .isLength({min: 1})
    .withMessage('On Plubming should be valid')
    .optional({nullable:true}),
    check('on_electric')
    .exists()
    .isLength({min: 1})
    .withMessage('On Electric should be valid')
    .optional({nullable:true}),
    check('on_coloring')
    .exists()
    .isLength({min: 1})
    .withMessage('On Coloring should be valid')
    .optional({nullable:true}),
    check('on_finishing')
    .exists()
    .isLength({min: 1})
    .withMessage('On Finishing should be valid')
    .optional({nullable:true}),
    check('on_possesion')
    .exists()
    .isLength({min: 1})
    .withMessage('On Posession should be valid')
    .optional({nullable:true}),

    body()
        .custom(value => {
            return !!Object.keys(value).length;
        })
        .withMessage('Please provide required field to update')
        .custom(value => {
            const updates = Object.keys(value);
            const allowUpdates = ['id','unit','booking','total_cost','on_booking','on_allocation','on_confirmation','on_start','monthly_installment','quaterly_payment','on_excavation','on_foundation','on_slab','on_block','on_plaster','on_plumbing','on_electric','on_coloring','on_finishing','on_possesion','remark'];
            return updates.every(update => allowUpdates.includes(update));
        })
        .withMessage('Invalid updates!')
];
