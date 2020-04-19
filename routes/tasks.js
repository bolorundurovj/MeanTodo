const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");

const db = mongojs('mongodb://josh:josh1234@ds031618.mlab.com:31618/tasklist', ['tasks']);

//Get All Tasks
router.get('/tasks', (req, res, next) =>{
    db.tasks.find((err, Tasks) =>{
        if(err){
            res.send(err);
        }
        res.json(Tasks);
    })
});

//Get Single Task
router.get('/task/:id', (req, res, next) =>{
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, (err, task) =>{
        if(err){
            res.send(err);
        }
        res.json(task);
    })
});

//Create Task
router.post('/task', (req, res, next) =>{
    let task = req.body;
    if(!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    }
    else{
        db.tasks.save(task, (err, task) =>{
            if(err){
                res.json(err);
            }
            res.json(task);
        })
    }
})

//Delete Task
router.delete('/task/:id', (req, res, next) =>{
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, (err, task) =>{
        if(err){
            res.send(err);
        }
        res.json(task);
    })
});

//Update Task
router.put('/task/:id', (req, res, next) =>{
    let task = req.body;
    let updTask = {};

    if(task.isDone){
        updTask.isDone = task.isDone;
    }

    if(task.title){
        updTask.title = task.title;
    }

    if(!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        })
    } else{
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, (err, task) =>{
            if(err){
                res.send(err);
            }
            res.json(task);
        })
    }
});


module.exports = router;