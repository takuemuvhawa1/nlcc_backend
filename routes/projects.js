const express = require('express');
const projectsRouter = express.Router();
const projectsDbOperations = require('../cruds/projects');

projectsRouter.post('/', async (req, res) => {
    try {
        const postedValues = req.body;
        const results = await projectsDbOperations.postProject(postedValues.ProjectName, postedValues.Description, postedValues.StartDate, postedValues.EndDate, postedValues.Status);
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

projectsRouter.get('/', async (req, res) => {
    try {
        const results = await projectsDbOperations.getProjects();
        res.json(results);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

projectsRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await projectsDbOperations.getProjectById(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

projectsRouter.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedValues = req.body;
        const result = await projectsDbOperations.updateProject(id, updatedValues.ProjectName, updatedValues.Description, updatedValues.StartDate, updatedValues.EndDate, updatedValues.Status);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

projectsRouter.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const result = await projectsDbOperations.deleteProject(id);
        res.json(result);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = projectsRouter;