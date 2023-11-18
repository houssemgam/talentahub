const Project = require('../models/Project');

const handleSuccess = (res, message, status = 200) => {
    res.status(status).json({ message });
};

const handleNotFound = (res) => {
    res.status(404).json({ message: 'User not found' });
};

const handleServerError = (res) => {
    res.status(500).json({ message: 'An error occurred!' });
};

const index = async (req, res) => {
    try {
        const projects = await Project.find();
        handleSuccess(res, projects);
    } catch (error) {
        handleServerError(res);
    }
}

const show = async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectID);
        if (admin) {
            handleSuccess(res, project);
        } else {
            handleNotFound(res);
        }
    } catch (error) {
        handleServerError(res);
    }
}
const store = async (req, res) => {
    try {
        const projectData = req.body;

        if (req.file) {
            projectData.image = req.file.path;
            console.log('Fichier téléchargé avec succès');
        } else {
            projectData.image = ''; // Définir une valeur par défaut, par exemple une chaîne vide
        }

        const project = await Project.create(projectData); // Corrigez le nom du modèle
        // Remplacez par une logique appropriée de gestion du succès ou définissez handleSuccess
        res.status(201).json({ message: 'Projet ajouté avec succès', data: project });
    } catch (error) {
        console.error(error);
        // Remplacez par une logique appropriée de gestion des erreurs ou définissez handleServerError
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
};

const update = async (req, res) => {
    try {
        const projectID = req.params.projectID;
        const updateData = req.body;
        await Project.findByIdAndUpdate(projectID, updateData);
        handleSuccess(res, 'project updated successfully');
    } catch (error) {
        handleServerError(res);
    }
}
const destroy = async (req, res) => {
    try {
        const projectID = req.params.projectID;
        const deletedProject = await Project.findOneAndDelete({ _id: projectID });
        if (deletedProject) {
            handleSuccess(res, 'Project Deleted successfully');
        } else {
            handleNotFound(res);
        }
    } catch (error) {
        handleServerError(res);
    }
}

module.exports = {
    index,
    show,
    store,
    update,
    destroy
};
