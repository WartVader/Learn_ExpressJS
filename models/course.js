const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

class Course {
    constructor(title, price, img) {
        this.id = uuid.v4();
        this.title = title;
        this.price = price;
        this.img = img;
    }

    toJSON() {
        return {
            id: this.id,
            title: this.title,
            price: this.price,
            img: this.img,
        };
    }

    async save() {
        const courses = await Course.getAll();
        courses.push(this.toJSON());

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err){ 
                        reject(err)
                    } else {
                        resolve();
                    }
                }
            )
        })
        
        
        console.log(courses);
    }

    static getAll() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                'utf-8',
                (err, content) => {
                    if(err){ 
                        reject(err)
                    } else {
                        resolve(JSON.parse(content));
                    }
                }
            );
        })
        
    }

    static async getById(id) {
        const course = await Course.getAll();
        return course.find(c => c.id === id);
    }

    static async update(course) {
        const courses = await Course.getAll();

        const idx = courses.findIndex(c => c.id == course.id);
        courses[idx] = course;

        return new Promise((resolve, reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'courses.json'),
                JSON.stringify(courses),
                (err) => {
                    if(err){ 
                        reject(err)
                    } else {
                        resolve();
                    }
                }
            )
        })
    }
}

module.exports = Course;