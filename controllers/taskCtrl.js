const Task = require('../models/taskModel')

const TaskCtrl = {
    getTasks: async (req, res) => {
        try {
            const tasks = await Task.find()
            res.json(tasks)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getTasksUser: async (req, res) => {
        try {
            const tasks = await Task.find({ useremail: req.body.useremail })
            res.json(tasks)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getTaskById: async (req, res) => {
        try {
            const taskId = req.params.id; // URL'den kartın MongoDB ID'sini alın

            const task = await Task.findById(taskId); // MongoDB'den kart verilerini alın

            if (!task) {
                // Eğer kart yoksa hata döndürün
                return res.status(404).json({ msg: "Kart bulunamadı" });
            }

            res.json(task); // Kart verilerini JSON formatında sunun
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createTask: async (req, res) => {
        try {
            const { name, useremail, title, location, price, description, type, images, roomnumber, saletype, features, squaremeters } = req.body;

            const newTask = new Task({
                name, useremail, title, location, price, description, type, images, roomnumber, saletype, features, squaremeters
            })

            await newTask.save()
            res.json({ msg: "Yeni Task Oluşturuldu." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteTask: async (req, res) => {
        try {
            await Task.findByIdAndDelete(req.params.id)
            res.json({ msg: "Task Silindi." })
        } catch (err) {
            return res.status(500).json({ msg: 'Silinemedi.' })
        }
    },
    updateTask: async (req, res) => {
        try {
            const { name, useremail, title, location, price, description, type, images, roomnumber, saletype, features, squaremeters } = req.body;

            await Task.findOneAndUpdate({ _id: req.params.id }, {
                name, useremail, title, location, price, description, type, images, roomnumber, saletype, features, squaremeters
            })

            res.json({ msg: "Task Güncellendi." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = TaskCtrl