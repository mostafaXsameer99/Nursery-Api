const express = require("express");
const controller = require("./../controller/classController")

const router = express.Router();

router.route("/class")
    .get(controller.getAllClasses)
    .post(controller.addClass)
    .put(controller.updateClass)
    .delete(controller.deleteClass);


router.route("/class/:id")
    .get(controller.getOneClass)

    router.route("/class/teacher/:id")
    .get(controller.getClassSupervisor)

router.route("/class/child/:id")
    .get(controller.getChildren)

module.exports = router;