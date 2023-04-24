const express = require('express');
const router = express.Router();
const pool = require('../db');

//GET /rights
router.get('/', (req, res) => {
    pool.query('SELECT * FROM security_right', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        res.status(200).json(result.rows);
    });
});

//POST /rights
router.post('/', (req, res) => {
    const { roleid, moduleid, modifieddate, isinsert, isupdate, isdelete, iscancel, isfind, isrefresh, isprint, issave, isworkflow, application_id } = req.body;
    const query = 'INSERT INTO security_right(roleid, moduleid, modifieddate, isinsert, isupdate, isdelete, iscancel, isfind, isrefresh, isprint, issave, isworkflow, application_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)';
    const values = [roleid, moduleid, modifieddate, isinsert, isupdate, isdelete, iscancel, isfind, isrefresh, isprint, issave, isworkflow, application_id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        res.status(201).json({ message: 'Right created successfully' });
    });
});

module.exports = router;