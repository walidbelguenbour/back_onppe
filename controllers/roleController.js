const express = require('express');
const router = express.Router();
const pool = require('../config/db');

//GET /roles
router.get('/', (req, res) => {
    pool.query('SELECT * FROM security_role', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        res.status(200).json(result.rows);
    });
});

//POST /roles
router.post('/', (req, res) => {
    const { id, name, designation, notes, modifieddate, application_id } = req.body;
    const query = 'INSERT INTO security_role(id, name, designation, notes, modifieddate, application_id) VALUES ($1, $2, $3, $4, $5, $6)';
    const values = [id, name, designation, notes, modifieddate, application_id];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        res.status(201).json({ message: 'Role created successfully' });
    });
});

module.exports = router;