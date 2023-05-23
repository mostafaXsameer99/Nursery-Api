const express = require("express");
const controller = require("./../controller/teacherController");
const router = express.Router();



router.route("/teachers")
    .get(controller.getAllTeachers)
    .post(controller.addTeacher)
    .put(controller.updateTeacher)
    .delete(controller.deleteTeacher);


router.route("/teachers/supervisors")
    .get(controller.getSupervisors);

router.route("/teachers/:id")
    .get(controller.getOneTeacher);



module.exports = router