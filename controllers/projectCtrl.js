const Project = require('../models/projectModel')

const ProjectCtrl = {
    getProjects: async (req, res) => {
        try {
            const projects = await Project.find()
            res.json(projects)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    getProjectsUser: async (req, res) => {
        try {
            const projects = await Project.find({ useremail: req.body.useremail })
            res.json(projects)
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getProjectById: async (req, res) => {
        try {
            const projectId = req.params.id; // URL'den kartın MongoDB ID'sini alın

            const project = await Project.findById(projectId); // MongoDB'den kart verilerini alın

            if (!project) {
                // Eğer kart yoksa hata döndürün
                return res.status(404).json({ msg: "Proje bulunamadı" });
            }

            res.json(project); // Kart verilerini JSON formatında sunun
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    createProject: async (req, res) => {
        const imageUrls = req.files.map((file) => file.path);
        const { name, useremail, title, location, startDate, finishDate, description, housingnumber, features } = req.body;
      
        try {
          const newProject = new Project({
            name, useremail, title, location, description, startDate, images: imageUrls, finishDate, housingnumber, features
          });
      
          await newProject.save();
      
            res.json({ msg: "Yeni Proje Oluşturuldu." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    updateProject: async (req, res) => {
        try {
            const imageUrls = req.files.map((file) => file.path);
            const { name, useremail, title, location, startDate, finishDate, description, housingnumber, features } = req.body;
    
            await Project.findOneAndUpdate({ _id: req.params.id }, {
                name, useremail, title, location, description, images: imageUrls, startDate, finishDate, features, housingnumber
            })

            res.json({ msg: "Project Güncellendi." })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },
    deleteProject: async (req, res) => {
        try {
            await Project.findByIdAndDelete(req.params.id)
            res.json({ msg: "Project Silindi." })
        } catch (err) {
            return res.status(500).json({ msg: 'Silinemedi.' })
        }
    }
}

module.exports = ProjectCtrl