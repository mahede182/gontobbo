"use client";
import { useState } from "react";
import { broadcastNotification } from "@/hooks/useNotifications";
import { PageHeader } from "@/components/layout/PageHeader";
import { useTranslation } from "react-i18next";

export default function NotificationsPage() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [userIds, setUserIds] = useState("");
  const { t } = useTranslation();

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
      <PageHeader title={t("notifications.title")} breadcrumb={t("notifications.breadcrumb")} />
      <div className="card">
        <h3>{t("notifications.broadcastNotification")}</h3>
        <div className="flex flex-col gap-12 mt-12">
          <input
            className="p-12 border border-radius-std"
            placeholder={t("notifications.titlePlaceholder")}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="p-12 border border-radius-std"
            placeholder={t("notifications.messagePlaceholder")}
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <input
            className="p-12 border border-radius-std"
            placeholder={t("notifications.userIdsPlaceholder")}
            value={userIds}
            onChange={(e) => setUserIds(e.target.value)}
          />
          <button
            className="bg-primary-light text-primary p-12 border-radius-std"
            onClick={handleSend}>
            {t("notifications.sendBroadcast")}
          </button>
        </div>
      </div>
    </div>
  );
}
