const router = require("express").Router()
const todoController = require("../controllers/todoController")

router.post("/todo",todoController.todoAdd);
router.get("/todo",todoController.todoGetAll);
router.get("/todo/:id",todoController.todoGetOne);
router.put("/todo/:id",todoController.todoUpdate);
router.delete("/todo/:id",todoController.todoDelete);


module.exports = router;