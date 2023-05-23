const { model } = require("mongoose");
const childSchema = require("./../models/childModel");
const classSchema = require("./../models/classModel")
const teacherSchema = require("./../models/teacherModel")


//*********************  /child  **********************//
exports.getAllChildren = (request, response, next) => {
    childSchema.find({})
        .then(Children => {
            response.status(200).json(Children);
        })
        .catch(error => next(error));
};

exports.addChild = (request, response, next) => {
    let child = new childSchema({
        _id: request.body._id,
        fullName: request.body.fullName,
        age: request.body.age,
        level: request.body.level,
        address: request.body.address,
        class:request.body.class
    })
    child.save()
        .then(child => {
            response.status(200).json({ data: `Child ${child.fullName} Added`, child });
        })
        .catch(error => next(error));
};

exports.updateChild = (request, response, next) => {
    childSchema.updateOne({
        _id: request.body._id
    }, {
        $set: { age: request.body.age }
    })
        .then(child => {
            response.status(200).json({ child: `modifiedCount : ${child.modifiedCount}` });
        })
        .catch(error => next(error));
};

exports.deleteChild = (request, response, next) => {
    childSchema.deleteOne({ _id: request.body._id })
        .then((child) => {
            if (child.deletedCount == 0)
                throw new Error("child Does Not Exist");
            response.status(200).json({ child: `deletedCount : ${child.deletedCount}` })
        })
        .catch((error) => { next(error) })
}



//*********************  /child/:id  **********************//

exports.getOneChild = (request, response, next) => {
    childSchema.findOne({ _id: request.params.id })
        .then(child => {
            if (child == null)
                throw new Error("Child Does Not Exist");

            response.status(200).json(child);
        }).catch(error => next(error));
};



//*********************  /child/class/:id  **********************//
exports.getClass = (request, response, next) => {
    childSchema.find({ _id: request.params.id },{class:1,fullName:1})
        .populate({ path: "class", model: classSchema})
        .then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
};

