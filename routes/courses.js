import { DetailedCourse, Search, enrollStudent, getCourses, getSingleCourse, getStudentCourse, markCourse } from "../controllers/courses.js";

import express from "express";

//declaring the routes for different apis of the courses
const router = express.Router()

router.get('/getCourses',  getCourses)
router.get('/getSingleCourse/:id', getSingleCourse)
router.post('/enrollStudent', enrollStudent)
router.post('/yourCourses', getStudentCourse)
router.post('/markCourse',markCourse)
router.get('/detailedCourse/:studentId/:courseId', DetailedCourse)
router.post('/search', Search)

export default router;