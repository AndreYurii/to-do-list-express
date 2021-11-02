const mongoose = require('mongoose');

const checklistSchema = mongoose.Schema({
    name: {type: 'string', required: true},
    tasks: [{
        type: mongoose.Schema.Types.Object,
        ref: 'Tasks'
    }]
})

module.exports = mongoose.model('Checklist', checklistSchema);