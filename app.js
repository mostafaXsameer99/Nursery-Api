const express = require("express");
const morgan = require("morgan");
const cors = require("cors")
const fs = require("fs");

const teacherRouter = require("./routes/teacherRouter");
const childRouter = require("./routes/childRouter");
const classRouter = require("./routes/classRouter");
const { default: mongoose } = require("mongoose");

const server = express();


//*************Starting Server**********// 

const port = process.env.PORT || 8080;

mongoose.connect("mongodb://127.0.0.1:27017/Nursery")
    .then(() => {
        console.log("Connected to MongoDB");

        server.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });

    })
    .catch(err => {
        console.log("Error connecting to MongoDB", err);
    });


//*************Middleware**************//

//*******Logging******/

// Create a log file to save requests info by tiny predefined format

var accessLogStream = fs.createWriteStream(('./requestLog/tiny format requests.log'), { flags: 'a' });
server.use(morgan('tiny', { stream: accessLogStream }));

// Create a log file to save requests info by common predefined format

var accessLogStream2 = fs.createWriteStream(('./requestLog/common format requests.log'), { flags: 'a' });
server.use(morgan('common', { stream: accessLogStream2 }));

// Create a log file to save requests info by custom format

const logFormat = 'Status ==> [:status], Response Time ==> [:response-time ms], Date & Time ==> [:date], Method ==> [:method], Url ==> [:url] ';
var accessLogStream3 = fs.createWriteStream(('./requestLog/custom format requests.log'), { flags: 'a' });
server.use(morgan(logFormat, { stream: accessLogStream3 }));

//***********Cors**************//

server.use(
    cors({
        origin: ["https://google.com", "https://facebook.com"],
        methods: ["GET"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

//**************Routes****************//

server.use(express.json());

server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

//************Not Found****************//
server.use((req, res, next) => {
    res.status(404).json({ message: "not found" });
});

//************Error MW*****************//
server.use((err, req, res) => {
    res.status(500).json({ message: err });
});
