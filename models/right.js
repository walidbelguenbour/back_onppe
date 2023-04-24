const express = require('express');
const router = express.Router();
const Right = require('../models/right');

// Get all rights
router.get('/', async (req, res) => {
  try {
    const rights = await Right.find();
    res.json(rights);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific right
router.get('/:id', getRight, (req, res) => {
  res.json(res.right);
});

// Create a right
router.post('/', async (req, res) => {
  const right = new Right({
    name: req.body.name,
    code: req.body.code
  });

  try {
    const newRight = await right.save();
    res.status(201).json(newRight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a right
router.patch('/:id', getRight, async (req, res) => {
  if (req.body.name != null) {
    res.right.name = req.body.name;
  }
  if (req.body.code != null) {
    res.right.code = req.body.code;
  }
  try {
    const updatedRight = await res.right.save();
    res.json(updatedRight);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a right
router.delete('/:id', getRight, async (req, res) => {
  try {
    await res.right.remove();
    res.json({ message: 'Right has been deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a specific right by id
async function getRight(req, res, next) {
  try {
    const right = await Right.findById(req.params.id);
    if (right == null) {
      return res.status(404).json({ message: 'Right not found' });
    }
    res.right = right;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
