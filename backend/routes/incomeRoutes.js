const express = require('express')
const router = express.Router()

const {
    createIncome,
    getAllIncomes,
    getIncomes,
    updateIncome,
    deleteIncome
} = require('../controllers/incomeController.js')
const protect = require('../middleware/authentication.js')
const protectAdmin = require('../middleware/adminAuthentication.js')

router.post('/', protect, createIncome)
router.get('/all', protectAdmin, getAllIncomes) 
router.get('/:id/all', protect, getIncomes)
router.put('/:id', updateIncome)
router.delete('/:id', deleteIncome)

module.exports = router