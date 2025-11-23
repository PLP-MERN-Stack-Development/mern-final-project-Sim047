// backend/src/routes/conversations.js
import express from "express";
import auth from "../middleware/auth.js";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

const router = express.Router();

/**
 * GET /api/conversations
 * returns conversations for current user (populated participants + lastMessage)
 */
router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const convs = await Conversation.find({ participants: userId })
      .populate("participants", "username avatar email")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "username avatar" },
      })
      .sort({ updatedAt: -1 });

    res.json(convs);
  } catch (err) {
    console.error("[conversations/get]", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * POST /api/conversations
 * body: { partnerId }  (for 1:1)
 * creates or returns existing 1:1 conversation
 */
router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { partnerId, name, isGroup, participants } = req.body;

    if (!isGroup) {
      if (!partnerId) return res.status(400).json({ message: "partnerId required" });

      // find existing 1:1 conversation (both participants)
      let conv = await Conversation.findOne({
        participants: { $all: [userId, partnerId] },
        isGroup: false,
      });

      if (!conv) {
        conv = await Conversation.create({
          participants: [userId, partnerId],
          isGroup: false,
        });
      }

      const populated = await Conversation.findById(conv._id).populate("participants", "username avatar email");
      return res.json(populated);
    } else {
      // create a group conversation
      const groupParticipants = (participants || []).map((p) => p);
      if (!Array.isArray(groupParticipants) || groupParticipants.length < 2) {
        return res.status(400).json({ message: "participants required for group" });
      }

      const conv = await Conversation.create({
        participants: groupParticipants,
        isGroup: true,
        name: name || "Group",
      });

      const populated = await Conversation.findById(conv._id).populate("participants", "username avatar email");
      return res.json(populated);
    }
  } catch (err) {
    console.error("[conversations/post]", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * GET /api/conversations/:id/messages
 * returns messages for the conversation room ID (excluding messages hidden for the current user)
 */
router.get("/:id/messages", auth, async (req, res) => {
  try {
    const convId = req.params.id;
    const userId = req.user.id;

    const msgs = await Message.find({ room: convId, hiddenFor: { $ne: userId } })
      .populate("sender", "username avatar")
      .populate("replyTo")
      .populate("readBy", "username")
      .sort({ createdAt: 1 })
      .limit(2000);

    res.json(msgs);
  } catch (err) {
    console.error("[conversations/messages/get]", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/conversations/:id
 * deletes conversation document and all messages permanently (owner/admin action).
 * Note: Be careful - this is global.
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const convId = req.params.id;
    // remove messages that have room = convId
    await Message.deleteMany({ room: convId });

    // remove conversation document
    await Conversation.findByIdAndDelete(convId);

    res.json({ success: true });
  } catch (err) {
    console.error("[conversations/delete]", err);
    res.status(500).json({ message: "Server error" });
  }
});

/**
 * DELETE /api/conversations/:id/messages
 * Per-user clear: mark all messages in conversation as hidden for the requesting user.
 */
router.delete("/:id/messages", auth, async (req, res) => {
  try {
    const convId = req.params.id;
    const userId = req.user.id;

    await Message.updateMany({ room: convId }, { $addToSet: { hiddenFor: userId } });

    // notify the requesting user's socket to clear UI if you want
    const io = req.app.get("io");
    const onlineUsers = req.app.get("onlineUsers");
    if (io && onlineUsers && onlineUsers.has(userId)) {
      const sid = onlineUsers.get(userId);
      io.to(sid).emit("conversation_cleared", { conversationId: convId });
    }

    res.json({ success: true });
  } catch (err) {
    console.error("[conversations/clearMessages]", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
