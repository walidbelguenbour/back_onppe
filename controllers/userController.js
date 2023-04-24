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