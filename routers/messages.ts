import express, { Router } from "express";
import { promises as fs } from "fs";
import { Message } from "../types";

const messagesRouter: Router = express.Router();
const messagesPath = "./messages";

messagesRouter.post("/create", async (req, res) => {
  const messageItem: Message = {
    message: req.body.message,
    datetime: new Date().toISOString().replace(/:/g, "_"),
  };
  const fileName = `${messagesPath}/${messageItem.datetime}.txt`;

  try {
    await fs.writeFile(fileName, JSON.stringify(messageItem.message));
    res.send(messageItem);
  } catch (error) {
    console.error(error);
  }
});

messagesRouter.get("/", async (req, res) => {
  try {
    const files = await fs.readdir(messagesPath);

    const promises = files.map(async (file) => {
      const fileContent = await fs.readFile(`${messagesPath}/${file}`);
      const data: string = fileContent.toString();

      const oneMessage: Message = {
        message: JSON.parse(data),
        datetime: file,
      };

      return oneMessage;
    });

    const messages = await Promise.all(promises);
    const lastMessages = messages.slice(-5);
    res.send(lastMessages);
  } catch (error) {
    console.error(error);
  }
});

export default messagesRouter;
