'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.contactCreatePOST = function contactCreatePOST (req, res, next, body) {
  Default.contactCreatePOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.contactGET = function contactGET (req, res, next) {
  Default.contactGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

