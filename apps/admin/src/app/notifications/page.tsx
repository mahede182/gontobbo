"use client";
import { useState } from "react";
import { broadcastNotification } from "@/hooks/useNotifications";
import { PageHeader } from "@/components/layout/PageHeader";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userIds, setUserIds] = useState("");

  const handleSend = async () => {
    const ids = userIds
      .split(",")
      .map((id) => id.trim())
      .filter(Boolean);
    const res = await broadcastNotification(title, body, ids.length ? ids : undefined);
    alert(res.message || "Notification sent!");
  };

  return (
    <div className="notifications-page">
      <PageHeader title="Notifications" breadcrumb="Home > Tools" />
      <div className="card">
        <h3>Broadcast Notification</h3>
        <div className="flex flex-col gap-12 mt-12">
          <input
            className="p-12 border border-radius-std"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="p-12 border border-radius-std"
            placeholder="Message body"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            className="p-12 border border-radius-std"
            placeholder="User IDs (comma separated, optional)"
            value={userIds}
            onChange={(e) => setUserIds(e.target.value)}
          />
          <button
            className="bg-primary-light text-primary p-12 border-radius-std"
            onClick={handleSend}>
            Send Broadcast
          </button>
        </div>
      </div>
    </div>
  );
}
