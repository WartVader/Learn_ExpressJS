const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const app = express();

// Routes
const homeRoute = require('./routes/home');
const coursesRoute = require('./routes/courses');
const addRoute = require('./routes/add');
const cardRoute = require('./routes/card');

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine); // идет указание на движок
app.set('view engine', 'hbs'); // использование движка
app.set('views', 'views');

app.use(express.static('public')); // добавляем папку public в статическую папку (чтобы были обращения сразу в папку publics)
app.use(express.urlencoded({extended: true})); 
app.use('/', homeRoute); // Либо можно заместно 1го параметра ничего не кидать, но если в роутере в router.get в первом параметре будет нужный роут
app.use('/courses', coursesRoute);
app.use('/add', addRoute);
app.use('/card', cardRoute);
/*
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Главная страницы',
        isHome: true,
    });
    // res.sendFile(path.join(__dirname, 'views', 'index.html')); // вывод страницы index.html
});

app.get('/courses', (req, res) => {
    res.render('courses', {
        title: 'Курсы',
        isCourses: true,
    });
    //res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

app.get('/add', (req, res) => {
    res.render('add', {
        title: 'Добавить курс',
        isAdd: true,
    });
    //res.sendFile(path.join(__dirname, 'views', 'about.html'));
});
*/
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});