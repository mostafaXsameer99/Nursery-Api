const teacherSchema = require("./../models/teacherModel");
const classSchema = require("./../models/classModel")


//*********************  /teacher  **********************//
exports.getAllTeachers = (request, response, next) => {
    teacherSchema.find({})
        .then(teachers => {
            response.status(200).json(teachers);
        })
        .catch(error => next(error));
};

exports.addTeacher = (request, response, next) => {
    let teacher = new teacherSchema({
        _id: request.body._id,
        fullName: request.body.fullName,
        password: request.body.password,
        email: request.body.email,
        image: request.body.image
    })
    teacher.save()
        .then(teacher => {
            response.status(200).json({ data: `Teacher ${teacher.fullName} Added`, teacher });
        })
        .catch(error => next(error));
};

exports.updateTeacher = (request, response, next) => {
    teacherSchema.updateOne({
        _id: request.body._id
    }, {
        $set: { password: request.body.password }
    }).then(data => {
        response.status(201).json({ data: `modifiedCount : ${data.modifiedCount}` });
    }).catch(error => next(error));
};

exports.deleteTeacher = (request, response) => {
    teacherSchema.deleteOne({ _id: request.body._id })
        .then(teacher => {
            if (teacher == null)
                throw new Error("Teacher Does Not Exist");

            response.status(200).json(`deletedCount : ${teacher.deletedCount}`);
        }).catch(error => next(error));
}


//*********************  /teacher/:id  **********************//
exports.getOneTeacher = (request, response, next) => {
    teacherSchema.findOne({ _id: request.params.id })
        .then(teacher => {
            if (teacher == null)
                throw new Error("Teacher Does Not Exist");

            response.status(200).json(teacher);
        }).catch(error => next(error));

};

//*********************  /teachers/supervisors  **********************//
exports.getSupervisors = (request, response, next) => {
    classSchema.find({}, { supervisor: 1, name: 1 })
        .populate({ path: "supervisor", model: teacherSchema, select: "fullName" })
        .then(data => {
            response.status(200).json(data);
        }).catch(error => next(error));
};


