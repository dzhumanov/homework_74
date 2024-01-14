import { Router } from "express";
const messagesRouter = Router();

messagesRouter.get('/messages', async (req, res) => {
    res.send('Messages will be here');
})

messagesRouter.post('/')