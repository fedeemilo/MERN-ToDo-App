const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categorie = new Schema({
	categorie_name: {
		type: String
	},
	categorie_focus: {
		type: Boolean
	}
});

module.exports = mongoose.model('Categorie', Categorie);
