const {Router} = require('express');
const Course = require('../models/course');
const router = Router();

router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
        courses: courses
    });
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const course = await Course.getById(req.params.id);
    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course: course
    });
});

router.post('/edit', async (req, res) => {
    await Course.update(req.body);
    res.redirect('/courses');
    if (!req.query.allow) {
        return res.redirect('/');
    }
    const course = await Course.getById(req.params.id);
    res.render('course-edit', {
        title: `Редактировать ${course.title}`,
        course: course
    });
});

router.get('/:id', async (req, res) => {
    const course = await Course.getById(req.params.id); // req.params.id - достать параметр id из url запроса? 
    res.render('course', {
        layout: 'empty', // использование другого основного шаблона
        title: `Курс ${course.title}`,
        course: course
    });
})

module.exports = router;