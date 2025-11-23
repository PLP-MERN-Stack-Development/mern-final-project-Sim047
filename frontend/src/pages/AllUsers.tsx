import React, { useEffect, useState } from "react";
import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";
const SAMPLE_AVATAR = "https://placehold.co/80";

export default function AllUsers({ token, onOpenConversation, currentUserId }) {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  function makeAvatar(avatar?: string) {
    if (!avatar) return SAMPLE_AVATAR;
    if (avatar.startsWith("http")) return avatar;
    return API + avatar; // backend returns "/uploads/filename"
  }

  // ---------------- LOAD ALL USERS ----------------
  useEffect(() => {
    if (!token) return;

    axios
      .get(API + "/api/users", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((r) => setUsers(r.data || []))
      .catch((e) => console.error("all users err", e));
  }, [token]);

  // ---------------- START A DM ----------------
  async function startConversation(targetUser) {
    try {
      const res = await axios.post(
        API + "/api/conversations",
        { partnerId: targetUser._id },
        { headers: { Authorization: "Bearer " + token } }
      );

      onOpenConversation(res.data);
    } catch (err) {
      console.error("start DM failed:", err);
    }
  }

  // ---------------- FILTER USERS ----------------
  const filtered = users.filter((u) =>
    (u.username || "")
      .toLowerCase()
      .includes(search.toLowerCase().trim())
  );

  return (
    <div className="p-4">
      <h2 className="font-semibold text-lg mb-3">All Users</h2>

      <input
        className="input w-full mb-4"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {filtered.length === 0 && (
        <div className="opacity-70 text-sm">No users found.</div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filtered
          .filter((u) => u._id !== currentUserId) // hide yourself
          .map((u) => (
            <div
              key={u._id}
              className="p-3 rounded-md card flex items-center gap-4"
            >
              <img
                src={makeAvatar(u.avatar)}
                className="w-12 h-12 rounded-md object-cover"
              />

              <div className="flex-1">
                <div className="font-semibold">{u.username}</div>
                <div className="text-xs text-muted">{u.email}</div>
              </div>

              <button
                className="btn px-3 py-2"
                onClick={() => startConversation(u)}
              >
                Chat
              </button>
            </div>
          ))}
      </div>
    </div>
  );
}
