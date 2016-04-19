var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Post = new Schema({
    file: String,
    type_file: String,
    caption: String,
    board_id: String,
    user_id: String,
    data_created: Date,
    post_id: String
});

module.exports = mongoose.model('Post', Post);