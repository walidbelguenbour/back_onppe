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

exports.getAllRoles = (req, res) => {
    pool.query('SELECT * FROM security_role', (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        res.status(200).json(result.rows);
    });
};

exports.createRole = (req, res) => {
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
};

exports.getRoleById = (req, res) => {
    const roleId = req.params.roleId;
    const query = 'SELECT * FROM security_role WHERE id = $1';
    const values = [roleId];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        if (result.rows.length === 0) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.status(200).json(result.rows[0]);
    });
};

exports.updateRole = (req, res) => {
    const roleId = req.params.roleId;
    const { name, designation, notes, modifieddate, application_id } = req.body;
    const query = 'UPDATE security_role SET name = $1, designation = $2, notes = $3, modifieddate = $4, application_id = $5 WHERE id = $6';
    const values = [name, designation, notes, modifieddate, application_id, roleId];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.status(200).json({ message: 'Role updated successfully' });
    });
};

exports.deleteRole = (req, res) => {
    const roleId = req.params.roleId;
    const query = 'DELETE FROM security_role WHERE id = $1';
    const values = [roleId];

    pool.query(query, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'server error' });
            return;
        }
        if (result.rowCount === 0) {
            res.status(404).json({ message: 'Role not found' });
            return;
        }
        res.status(200).json({ message: 'Role deleted successfully' });
    });
};

module.exports = router;