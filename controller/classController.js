const classSchema = require("./../models/classModel");
const childSchema = require("./../models/childModel");
const teacherSchema = require("./../models/teacherModel");


//*********************  /class  **********************//
exports.getAllClasses = (request, response, next) => {
    classSchema.find({})
        .then(classRoom => {
            response.status(200).json(classRoom);
        })
        .catch(error => next(error));
};

exports.updateClass = (request, response, next) => {
    classSchema.updateOne({ _id: request.body._id }, {
        $set: { name: request.body.name, }
    })
        .then(classRoom => {
            response.status(200).json({ data: `class Updated` })
        })
        .catch(error => next(error));
};

exports.deleteClass = (request, response, next) => {
    classSchema.deleteOne({ _id: request.body._id })
        .then(classRoom => {
            response.status(200).json({ data: `class Deleted` })
        })
        .catch(error => next(error));
};

exports.addClass = async (request, response, next) => {
    try {
        const classRoom = new classSchema({
            _id: request.body._id,
            name: request.body.name,
            supervisor: request.body.superId,
            children: request.body.children
        });
        // const teacher = await teacherSchema.findOne({ _id: request.body.superId });
        // if (teacher === null) {
        //     throw new Error("Supervisor ID Does Not Exist");
        // }

        // for (const element of request.body.children) {
        //     console.log(`element ===> ${element}`);
        //     const child = await childSchema.findOne({ _id: element });
        //     if (child === null) {
        //         throw new Error("Child ID Does Not Exist");
        //     }
        //     console.log(`child ==>  ${child}`);
        // }

        await classRoom.save();

        response.status(201).json({ data: `Class added` });
    } catch (error) {
        next(error);
    }
};





//*********************  /class/:id  **********************//
exports.getOneClass = (request, response, next) => {
    classSchema.findOne({ _id: request.params.id })
        .populate({ path: "children", model: childSchema })
        .then(classRoom => {
            if (classRoom == null)
                throw new Error("Class ID Does Not Exist");
            response.status(200).json({ data: classRoom })
        })
        .catch(error => next(error));
};






//*********************  /class/child/:id  **********************//
exports.getChildren = (request, response, next) => {
    classSchema.findOne({ _id: request.params.id }, { children: 1, name: 1 })
        .populate({ path: "children", model: childSchema })
        .then(classRoom => {
            if (classRoom == null)
                throw new Error("class ID Does Not Exist");
            response.status(200).json({ data: classRoom });
        })
        .catch(error => next(error));
};


//*********************  /class/teacher/:id  **********************//
exports.getClassSupervisor = (request, response, next) => {
    classSchema.find({ supervisor: request.params.id }, { "supervisor": 1, name: 1 })
        .populate({ path: "supervisor", model: teacherSchema })
        .then(classRoom => {
            if (classRoom.length == 0)
                throw new Error("Teacher ID Does Not Exist");
            response.status(200).json({ data: classRoom });
        })
        .catch(error => next(error));
};
