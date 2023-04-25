const express = require('express');
const router = express.Router();
const pool = require('../config/db');

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

//GET /rights/:rightId
router.get('/:rightId', (req, res) => {
  const { rightId } = req.params;
  pool.query('SELECT * FROM security_right WHERE id = $1', [rightId], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'server error' });
      return;
    }
    if (result.rows.length === 0) {
      res.status(404).json({ message: 'Right not found' });
      return;
    }
    res.status(200).json(result.rows[0]);
  });
});

//PUT /rights/:rightId
router.put('/:rightId', (req, res) => {
    const { rightId } = req.params;
    const { roleid, moduleid, modifieddate, isinsert, isupdate, isdelete, iscancel, isfind, isrefresh, isprint, issave, isworkflow, application_id } = req.body;
    const query = 'UPDATE security_right SET roleid = $1, moduleid = $2, modifieddate = $3, isinsert = $4, isupdate = $5, isdelete = $6, iscancel = $7, isfind = $8, isrefresh = $9, isprint = $10, issave = $11, isworkflow = $12, application_id = $13 WHERE id = $14';
    const values = [roleid, moduleid, modifieddate, isinsert, isupdate, isdelete, iscancel, isfind, isrefresh, isprint, issave, isworkflow, application_id, rightId];
  
    pool.query(query, values, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'server error' });
        return;
    }
    res.status(200).json({ message: `Right with id ${rightId} updated successfully` });
  });
});