import { RoomCard } from "./RoomCard";
export const RoomGroup = ({ title }: { title: string }) => (
  <div>
    <h3>{title}</h3>
    <RoomCard no="101" />
  </div>
);
