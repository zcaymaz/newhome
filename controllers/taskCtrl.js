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
    createTask: async (req, res) => {
        try {
            const { name, title, description, content } = req.body;

            const newTask = new Task({
                name, title, description, content
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
            return res.status(500).json({ msg: 'ksadkalsmdklasd' })
        }
    },
    updateTask: async (req, res) => {
        try {
            const { name, title, description, content } = req.body;

            await Task.findOneAndUpdate({ _id: req.params.id }, {
                name, title, description, content
            })

            res.json({ msg: "Task Güncellendi." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

module.exports = TaskCtrl