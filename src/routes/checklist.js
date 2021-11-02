const express = require('express');
const router = express.Router();

const Checklist = require('../models/checklist')

router.get('/', async (req, res) => {
    try {
    let checklist = await Checklist.find({});
    res.status(200).render('checklist/index', {checklist: checklist});
    } catch (err) {
        res.status(200).render('pages/error', {error: 'Erro ao exibir listas'})
    }
})

router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklist/new', {checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', {errors: 'Erro ao carregar formulário'})
    }
})

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklist/edit', {checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao carregar Edição'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id);
        res.status(200).render('checklist/show', { checklist: checklist });
    } catch (e) {
       res.status(500).render('pages/error', {error: 'Erro ao exibir as listas de tarefas'});
    }
})

router.post('/', async (req, res) => {
    let { name } = req.body.checklist;
    let checklist = new Checklist({name})

    try {
        await checklist.save({ name })
        res.redirect('/checklist');
    } catch (e) {
        res.status(422).render('checklist/new', { checklist: { ...checklist, e } });
    }
})

router.put('/:id', async (req, res) => {
    let { name } = req.body.checklist
    let checklist = await Checklist.findById(req.params.id);

    try {
      await checklist.update({name});
      res.redirect('/checklist');
        res.status(200).json(checklist)
    } catch (e) {
        let erros = e.erros;
        res.status(422).render('checklist/edit', {checklist: { ...checklist, erros}})
    
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.redirect('/checklist');
    } catch (error) {
        res.status(500).render('pages/error', {error: 'Erro ao deletar a lista de tarefas'});
    }
})

module.exports = router;