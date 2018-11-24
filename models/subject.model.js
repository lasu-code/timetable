let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let SubjectSchema = new Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    periods: {
        type: Number,
        required: true,
    },
    status: {
        type: Boolean,
        default: true
    },
    class: [{
        type: Schema.Types.ObjectId,
        ref: 'classes'
    }]
});

module.exports = mongoose.model('subjects', SubjectSchema);