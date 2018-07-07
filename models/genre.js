const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema(
    {
        name: {type: String, required: true, max: 100, min: 3},
    }
);

GenreSchema.virtual('url').get(
    () => {
        return '/catalog/genre/' + this._id
    }
);
const Genre = mongoose.model('Genre', GenreSchema);
module.exports = Genre;