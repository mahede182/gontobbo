/* eslint-disable no-empty-pattern */
/* eslint-disable import/no-unresolved */
import { Notification } from "../notificationCenter";

export function getNotificationCenterEvent({}, params: { notification: Notification }) {
  return {
    type: "NOTIFY",
    notification: params.notification,
  };
}
