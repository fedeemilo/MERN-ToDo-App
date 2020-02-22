const Categorie = require('../models/categorie_model');

module.exports = {
	async categorieIndex(req, res, next) {
		await Categorie.find((err, categs) => {
            if (err) {
                console.log(err);
            } else {
                res.json(categs);
            }
        });
    },
    
    async categoriePost (req, res)  {
        // create new instance of categorie
        let categorie = new Categorie(req.body);
    
        // save created categorie to database
        await categorie
            .save()
            .then((categ) => {
                res.status(200).json({ categ: 'categorie added successfully' });
            })
            .catch((err) => {
                res.status(400).send('adding new categorie failed');
            });
    },

    async categorieDelete (req, res)  {
        let _id = req.params.id;
        try {
            const categ = await Categorie.findByIdAndDelete({ _id });
            res.json(categ);
        } catch (e) {
            return res.status(400).json({
                mensaje: 'Ocurrio un error',
                error
            });
        }
    }
};
