import { Message } from "../models/messageSchema.js";
import { Asynchandler } from "../utils/asynchandler.js";
import ErrorHandler from "../utils/ApiError.js";


export const sendMessage = Asynchandler(async (req, resp, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  console.log(firstName, lastName, email, phone, message);

  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new ErrorHandler("Please Fill Full form", 400));
  }
  const msg = await Message.create({
    firstName,
    lastName,
    email,
    phone,
    message,
  });

  resp.status(200).send({
    success: true,
    message: "Message sent successsfully",
    msg,
  });
});

export const getAllMessages = Asynchandler(async (req, resp, next) => {
  const messages = await Message.find();
  resp.status(200).send({
    success: true,
    messages,
  });
});
