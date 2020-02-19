const Categorie = require('../models/categorie_model');
const express = require('express');
const router = express.Router();

// GET list of categories /categories
router.get('/', (req, res) => {
    Categorie.find((err, categs) => {
		if (err) {
			console.log(err);
		} else {
			res.json(categs);
		}
	});
});

// POST create categorie /categories/add
router.post('/add', (req, res) => {
    // create new instance of categorie
    let categorie = new Categorie(req.body);

    // save created categorie to database
    categorie.save()
             .then((categ) => {
                res.status(200).json({ categ: 'categorie added successfully' });
             })
             .catch((err) => {
                res.status(400).send('adding new categorie failed');
             });
});

module.exports = router;