const path = require('path');

module.exports = function () {
    const express = require('express');
    const HelloWorldController = require(path.resolve(__dirname, '../../../app/controllers/helloWorld.api.controller'))();
    const v1HelloWorldController = express.Router();

    // HelloWorld
    v1HelloWorldController
        .post('/', HelloWorldController.create)
        .get('/', HelloWorldController.getAll)
        // .get('/:item_id', HelloWorldController.getItem)
        // .delete('/:item_id', HelloWorldController.delete)
        // .put('/:item_id', HelloWorldController.update)

    return v1HelloWorldController;
}