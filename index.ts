import express from "express";
import messagesRouter from "./routers/messages";

const app = express();
const port = 8080;

app.use(express.json());
app.use("/messages", messagesRouter);

const run = async () => {
  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });
};

void run();
