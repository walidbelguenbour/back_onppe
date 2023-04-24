const express = require('express');
const router = express.Router();
const Role = require('../models/role');

// Get all roles
router.get('/', async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific role
router.get('/:id', getRole, (req, res) => {
  res.json(res.role);
});

// Create a role
router.post('/', async (req, res) => {
  const role = new Role({
    name: req.body.name,
    rights: req.body.rights
  });

  try {
    const newRole = await role.save();
    res.status(201).json(newRole);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a role
// Update a role
router.patch('/:id', getRole, async (req, res) => {
    if (req.body.name != null) {
      res.role.name = req.body.name;
    }
  
    if (req.body.rights != null) {
      res.role.rights = req.body.rights;
    }
  
    try {
      const updatedRole = await res.role.save();
      res.json(updatedRole);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete a role
  router.delete('/:id', getRole, async (req, res) => {
    try {
      await res.role.remove();
      res.json({ message: 'Role deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  async function getRole(req, res, next) {
    let role;
    try {
      role = await Role.findById(req.params.id);
      if (role == null) {
        return res.status(404).json({ message: 'Role not found' });
      }
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  
    res.role = role;
    next();
  }
  
  module.exports = router;
  