import React, { useEffect, useState } from "react";
import axios from "axios";
import clsx from "clsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ConversationsList({
  token,
  onOpenConversation,
  currentUserId,
}: {
  token: string;
  onOpenConversation: (conv: any) => void;
  currentUserId: string;
}) {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  function cleanAvatar(avatar?: string) {
    if (!avatar) return "/placeholder-avatar.png";
    if (avatar.startsWith("http")) return avatar;
    if (avatar.startsWith("/")) return API + avatar;
    return API + "/uploads/" + avatar;
  }

  async function loadConversations() {
    try {
      const res = await axios.get(API + "/api/conversations", {
        headers: { Authorization: "Bearer " + token },
      });
      setList(res.data || []);
    } catch (err) {
      console.error("conv list err", err);
    } finally {
      setLoading(false);
    }
  }

  // DELETE entire conversation
  async function deleteConversation(id: string) {
    if (!confirm("Delete this conversation? All messages will be removed.")) return;
    try {
      await axios.delete(API + "/api/conversations/" + id, {
        headers: { Authorization: "Bearer " + token },
      });
      loadConversations();
    } catch (err) {
      console.error("delete conv error:", err);
    }
  }

  // CLEAR messages only
  async function clearMessages(id: string) {
    if (!confirm("Clear all messages in this conversation?")) return;
    try {
      await axios.delete(API + `/api/conversations/${id}/messages`, {
        headers: { Authorization: "Bearer " + token },
      });
      loadConversations();
    } catch (err) {
      console.error("clear messages error:", err);
    }
  }

  useEffect(() => {
    if (token) loadConversations();
  }, [token]);

  if (loading) {
    return (
      <div className="px-2 text-sm opacity-70">Loading conversations…</div>
    );
  }

  return (
    <div className="conversations-list px-2 mt-6">
      <h4 className="font-semibold mb-2">Conversations</h4>

      {list.length === 0 && (
        <div className="px-2 text-sm opacity-60 mb-3">No conversations yet</div>
      )}

      <div className="flex flex-col gap-2">
        {list.map((conv) => {
          // partner = the other person
          const partner =
            conv.participants?.find((p: any) => String(p._id) !== String(currentUserId)) ||
            conv.participants?.[0];

          const last = conv.lastMessage;

          return (
            <div
              key={conv._id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-slate-700/30 cursor-pointer border border-transparent hover:border-slate-600"
            >
              {/* LEFT clickable area */}
              <div
                onClick={() => onOpenConversation(conv)}
                className="flex items-center gap-3 flex-1"
              >
                <img
                  src={cleanAvatar(partner?.avatar)}
                  className="w-10 h-10 rounded-md object-cover border border-slate-700"
                />

                <div className="flex flex-col">
                  <span className="font-semibold">{partner?.username || "Unknown"}</span>
                  <span className="text-xs opacity-70">
                    {last
                      ? last.text?.slice(0, 25) + (last.text?.length > 25 ? "…" : "")
                      : "No messages yet"}
                  </span>
                </div>
              </div>

              {/* actions */}
              <div className="flex items-center gap-2 ml-3">
                <button
                  onClick={() => clearMessages(conv._id)}
                  className="text-xs px-2 py-1 rounded border border-slate-600 hover:bg-slate-700/40"
                >
                  Clear
                </button>
                <button
                  onClick={() => deleteConversation(conv._id)}
                  className="text-xs px-2 py-1 rounded border border-red-500/60 text-red-300 hover:bg-red-600/20"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
