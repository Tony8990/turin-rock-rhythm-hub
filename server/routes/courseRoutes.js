
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// GET /api/courses - Get all courses
router.get('/', courseController.getAllCourses);

// GET /api/courses/:id - Get course by ID
router.get('/:id', courseController.getCourseById);

// POST /api/courses - Create new course
router.post('/', courseController.createCourse);

// PUT /api/courses/:id - Update course
router.put('/:id', courseController.updateCourse);

// DELETE /api/courses/:id - Delete course
router.delete('/:id', courseController.deleteCourse);

module.exports = router;
