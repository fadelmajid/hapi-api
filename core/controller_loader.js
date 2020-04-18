'use strict';

const assert = require('assert-plus');
const fs = require('fs');

function ControllerLoader() {}

ControllerLoader.loadToAppFromPath = function (app, controllerPath) {
    assert.string(controllerPath);

    fs.readdirSync(controllerPath).forEach(function (objectName) {
        const objectPath = controllerPath + '/' + objectName;
        const objectStats = fs.lstatSync(objectPath);

        if (objectName.indexOf('.') === 0) {
            return;
        }

        if (objectStats.isFile()) {
            require(objectPath)(app);
        } else if (objectStats.isDirectory()) {
            ControllerLoader.loadToAppFromPath(app, objectPath);
        }
    });
};

module.exports = ControllerLoader;
