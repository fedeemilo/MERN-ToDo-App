const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Categorie = new Schema({
	categorie_name: {
		type: String
	},
	categorie_todos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Todo'
		}
	]
});

module.exports = mongoose.model('Categorie', Categorie);
