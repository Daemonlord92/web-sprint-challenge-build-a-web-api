const express = require('express');
const Project = require('../../data/helpers/projectModel');
const Action = require('../../data/helpers/actionModel');
const router = express.Router();

//GET ROUTES
router.get('/', (req, res) => {
    Action.get()
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({mes:"Server Error", err}))
})

router.get('/:id', validateByActionId, (req, res) => {
    Action.get(req.params.id)
        .then(action => res.status(200).json(action))
        .catch(err => res.status(500).json({mes:'Server Error', err}))
})

//UPDATE ROUTES

router.put('/:id', validateByActionId, (req, res) => {
    Action.update(req.params.id, req.body)
        .then(action => res.status(200).json({mes:'The Action is Update', action}))
        .catch(err => res.status(500).json({mes: "Server Error", err}))
})

//DELETE ROUTES

router.delete('/:id', (req, res) => {
    const { id } = req.params

    Action.remove(id)
        .then(id => {
            if (id === 0) {
                res.status(400).json({ err: "That action doesn't exist"})
            } else {
                res.status(200).json({
                    mes: 'Action destroyed'
                })
            }
        })
        .catch(err => {
            res.status(404).json({
                err: "Action not found"
            })
        })
})

// MIDDLEWARE FUNCTION

function validateByActionId(req,res,next){
    const {id} = req.params;
    Action.get(id)
        .then(action => {
            req.action = action;
            action ? next() : res.status(404).json({mes: "No project with that ID"})
        })
        .catch(err => res.status(500).json({mes: 'Could not validate the Project Id'}))
}

module.exports = router;