const router = require('express').Router();
const User = require('../models/userModel');
const Message = require('../models/messageModel');
const MessageUserList = require('../models/messageUserListModel');


exports.SentMessage = async (req, res) => {
    const senderId = req.body.currentUserId;
    const receiverId = req.body.otherUserId;
    // console.log(senderId, 'se');
    // console.log(receiverId, 're');
    const message = req.body.msg;
    try {
        const newMessage = new Message({
            sender: senderId,
            receiver: receiverId,
            messages: [{ content: message }]
        })
        await newMessage.save();
        res.send({
            success: true,
            message: "sent successfully"
        });
    } catch (error) {
        res.send(error.message);
    }
}

exports.GetMessage = async (req, res) => {
    const senderId = req.body.currentUserId;
    const receiverId = req.body.otherUserId;
    // console.log(senderId === receiverId);
    try {
        const message = await Message.find({
            $or: [
                {
                    $and: [
                        { sender: senderId },
                        { receiver: receiverId }
                    ]
                },
                {
                    $and: [
                        { sender: receiverId },
                        { receiver: senderId }
                    ]
                }
            ]
        }
        ).sort({ createdAt: 1 })
        // console.log(message);
        res.send({
            data: message,
            message: "message retrived successfully",
            success: true
        })
    } catch (error) {
        res.send(error.message);
    }
}

exports.MessaageUserList = async (req, res) => {

    const receiverId = req.body.otherUserId;
    const senderId = req.body.currentUserId;
    try {
        let senderDocument = await MessageUserList.findOne({ sender: senderId });
        if (!senderDocument) {
            senderDocument = new MessageUserList({
                sender: senderId,
                receiver: []
            });
        }
        if (!senderDocument.receiver.includes(receiverId)) {
            senderDocument.receiver.push(receiverId);
            await senderDocument.save();
        }
        await senderDocument.populate('receiver');
        res.send({
            success: true,
            message: "list of user Message",
            recievers: senderDocument.receiver
        })
    } catch (error) {
        res.send(error.message);
    }
}