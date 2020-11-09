const express = require('express');
const Project = require('../../data/helpers/projectModel');
const Action = require('../../data/helpers/actionModel');
const router = express.Router();

// GET ROUTES
router.get('/', (req, res) => {
    Project.get()
        .then(project => {
            res.status(200).json(project)
        })
        .catch(err => {
            console.log('error', err)
            res.status(500).json({mes: 'server error'})
        })
})

router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project)
})

router.get('/:id/actions', validateProjectId, (req, res) => {
    const {id} = req.params;
    Project.getProjectActions(id)
        .then(action => res.status(200).json(action))
        .catch(err=>res.status(500).json({mes:'server error', err}))
})

//POST ROUTES

router.post('/',validateProject, (req, res) => {
    Project.insert(req.body)
        .then(project => res.status(201).json({mes: 'Project Created', project}))
        .catch(err => res.status(500).json({mes:'Problem with the server', err}))
} )

router.post('/:id/actions', validateProjectId, validateActions, (req, res) =>{
    const newAction = req.body;
    newAction.project_id = req.params.id;
    Action.insert(newAction)
        .then(action => res.status(201).json(action))
        .catch(err => res.status(500).json({mes:'server error', err}))
})

//UPDATE ROUTES



function validateProject(req,res,next){
    const project = req.body;

    if (req.body && Object.keys(project).length >0){
        next()
    } else {
        res.status(400).json({mes: 'No Body'})
    }
}
function validateActions(req,res,next){
    const project = req.body;

    if (req.body && Object.keys(project).length >0){
        next()
    } else {
        res.status(400).json({mes: 'No Body'})
    }
}

function validateProjectId(req,res,next){
    const {id} = req.params;
    Project.get(id)
        .then(project => {
            req.project = project;
            console.log(req.project);
            project ? next() : res.status(404).json({ mes: 'No project by that id'})
        })
        .catch(err => res.status(500).json({ mes: 'Validation Error'}))
}

module.exports = router;