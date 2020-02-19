const Categorie = require('../models/categorie_model');

module.exports = {
	async categorieList(req, res, next) {
		await Categorie.find((err, categs) => {
            if (err) {
                console.log(err);
            } else {
                res.json(categs);
            }
        });
	}
};
