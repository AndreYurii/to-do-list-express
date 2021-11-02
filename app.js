const express = require('express');

require('./config/database');
const path = require('path');

const checkListRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');
const rootRouter = require('./src/routes/index');
const methodOverride = require('method-override')


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}))
app.use(methodOverride('_method', {methods: ['POST', 'GET']}));

app.use(express.static(path.join(__dirname, 'public')))

app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', rootRouter);
app.use('/checklist', checkListRouter);
app.use('/checklist', taskRouter.ChecklistDependent);
app.use('/tasks', taskRouter.simple);

app.listen(3000, () => {
    console.log('listen on port 3000')
})