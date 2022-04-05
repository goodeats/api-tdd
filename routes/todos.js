var express = require('express');
var router = express.Router();

const todos = [
  {
    id: 1,
    name: 'do something',
    completed: false,
  },
];

router.get('/', function (req, res, next) {
  res.send(todos);
});

router.get('/:id', function (req, res, nex) {
  const todo = todos.find(
    (todo) => todo.id === Number(req.params.id)
  );

  res.json(todo);
});

module.exports = router;
