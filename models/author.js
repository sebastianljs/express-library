const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, max: 100},
        family_name: {type: String, required: true, max: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date}
    }
);
AuthorSchema.virtual('name').get(
    function() {
        return this.first_name + ', ' + this.family_name;
    }
);

AuthorSchema.virtual('url').get(
    function() {
        return '/catalog/author/' + this._id;
    }
);
const Author = mongoose.model('Author', AuthorSchema);
module.exports = Author;

