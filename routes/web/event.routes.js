const path = require('path');

module.exports = function () {
    const express = require('express');
    const EventController = require(path.resolve(__dirname, '../../../app/controllers/event.controller'))();
    const eventControllerRouter = express.Router();

    // HelloWorld
    eventControllerRouter
        .get('/', EventController.index)
        .get('/first', EventController.firstEvent)

    return eventControllerRouter;
}