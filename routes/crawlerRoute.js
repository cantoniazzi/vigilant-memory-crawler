const express = require('express');
const router = express.Router();
const service = require('../services/crawlerService.js');

const _service = new service();

router.get('/', function (req, res, next) {
    _service.getPageInfo(req.query.uri).then(function(infos) {
        res.status(200).send(infos);
    }).catch(function(error){
        res.status(500).send(error);
    });
});

module.exports = router;