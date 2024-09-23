const express = require('express');
const eventTasksRouter = express.Router();
const eventsDbOperations = require('../cruds/events_tasks');

eventTasksRouter.post('/', async (req, res) => {
    try {
        const { type, theme, description, date, time, enddate, endtime, volunteertasks } = req.body;

        // Post the event first
        const eventResult = await eventsDbOperations.postEvent(type, theme, description, date, time, enddate, endtime);
        
        // Get the newly created event ID
        const eventId = eventResult.insertId;

        // Post each volunteer task associated with the event
        for (const task of volunteertasks) {
            await eventsDbOperations.postVolunteerTask(eventId, task.task, task.requirements);
        }

        res.json({ status: '200', message: 'Event and tasks added successfully' });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

eventTasksRouter.get('/', async (req, res) => {
    try {
        const events = await eventsDbOperations.getEvents(); // Fetch all events
        const tasksPromises = events.map(event => 
            eventsDbOperations.getVolunteerTasksByEventId(event.id)
        );

        const tasks = await Promise.all(tasksPromises); // Fetch tasks for each event

        // Combine events and their respective tasks into the desired JSON structure
        const response = events.map((event, index) => ({
            ...event,
            volunteertasks: tasks[index]
        }));

        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});



eventTasksRouter.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const event = await eventsDbOperations.getEventById(id);
        const tasks = await eventsDbOperations.getVolunteerTasksByEventId(id);
        
        // Combine event and tasks into the desired JSON structure
        const response = {
            ...event,
            volunteertasks: tasks
        };

        res.json(response);
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports = eventTasksRouter;
