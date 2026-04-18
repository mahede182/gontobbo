"use client";

export async function broadcastNotification(title: string, body: string, userIds?: string[]) {
  return fetch("/api/admin/notifications/broadcast", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userIds }),
  }).then((res) => res.json());
}
