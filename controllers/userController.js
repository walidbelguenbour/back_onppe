const pool = require('../config/db');
const User = require('../models/user');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.getAll(pool);
        console.log(users);
        res.status(200).json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.getUserById = async (req, res) => {
    try {
        const user = await User.getById(pool, req.params.id);
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        console.log(user);
        res.status(200).json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.addUser = async (req, res) => {
    try {
        const { id, nom, prenom, daten, sexe, titre, poste, service, direction, tel, fax, mail, adresse } = req.body;
        const user = new User(id, nom, prenom, daten, sexe, titre, poste, service, direction, tel, fax, mail, adresse);
        await user.save(pool);
        res.status(201).send('User added successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};


exports.updateUser = async (req, res) => {
    try {
        const { nom, prenom, daten, sexe, titre, poste, service, direction, tel, fax, mail, adresse } = req.body;
        const user = new User(req.params.userId, nom, prenom, daten, sexe, titre, poste, service, direction, tel, fax, mail, adresse);
        const result = await user.update(pool);
        if (result.changedRows === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).send('User updated successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const result = await User.delete(pool, req.params.userId);
        if (result.affectedRows === 0) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.status(200).send('User deleted successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};

exports.createUser = async (req, res) => {
    try {
        const { id, nom, prenom, daten, sexe, titre, poste, service, direction, tel, fax, mail, adresse } = req.body;
        const user = new User(id, nom, prenom, daten, sexe, titre, poste, service, direction, tel, fax, mail, adresse);
        await user.create(pool);
        res.status(201).send('User created successfully');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
};