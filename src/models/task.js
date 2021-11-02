const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    name: {type: 'string', required: true},
    done: {type: 'boolean', default: false},
    checklist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Checklist',
        required: true,
    }
})

module.exports = mongoose.model('Task', taskSchema);