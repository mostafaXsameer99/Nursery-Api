const express = require("express");
const controller = require("./../controller/childController");
const router = express.Router();


router.route("/child")
    .get(controller.getAllChildren)
    .post(controller.addChild)
    .put(controller.updateChild)
    .delete(controller.deleteChild);

router.route("/child/class/:id")
    .get(controller.getClass);

router.route("/child/:id")
    .get(controller.getOneChild);

module.exports = router;
