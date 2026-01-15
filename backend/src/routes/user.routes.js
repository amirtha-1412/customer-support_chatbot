const express = require('express');
const { getUsers, getUser } = require('../controllers/user.controller');
const { protect, authorize } = require('../middleware/auth.middleware');

const router = express.Router();

// Apply protection to all routes in this file
router.use(protect);
// Restrict all routes to admin only
router.use(authorize('admin'));

router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;
