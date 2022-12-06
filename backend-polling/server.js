const express = require("express");
const app = express();

const server = require("http").createServer(app);
const PORT = process.env.PORT || 3030;

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const students = [];
const questions = [];

function deleteFromArray(my_array, element) {
  position = my_array.indexOf(element);
  my_array.splice(position, 1);
}
let clients = [];

io.on("connection", (socket) => {
  clients.push(socket.id);
  socket.broadcast.emit("conection", { id: clients });
  socket.on("disconnect", function () {
    deleteFromArray(clients, socket.id);
  });

  // on student joining
  socket.on("studentJoined", (payload) => {
    if (payload) students.push(payload);
    return;
  });

  // on adding new question
  socket.on("newQuestion", (payload) => {
    if (payload) {
      questions.push(payload);
      let { _id, question, options, timer } = payload;
      io.emit("newQuestionAdded", {
        _id,
        question,
        options,
        timer,
        totalStudents: students.length,
      });
      io.emit(
        "pollData",
        questions.find((ques) => ques._id === payload._id).options
      );
    } else {
      io.emit("newQuestionAdded", payload);
    }
  });

  // on option choosed by student
  socket.on("optionChoosed", (payload) => {
    questions.find((ques) => ques._id === payload.question_id).options[
      payload.optionIndex
    ].votes += 1;
    io.emit(
      "pollData",
      questions.find((ques) => ques._id === payload.question_id).options
    );
  });
});

server.listen(PORT, () => console.log(`server is listening at port ${PORT}...`));
