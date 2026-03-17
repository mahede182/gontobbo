import { Bell, Maximize, Grid, Moon } from "lucide-react";
import { SearchBar } from "./SearchBar";
export const Topbar = () => (
  <header className="topbar flex justify-between p-12 align-center">
    <SearchBar />
    <div className="flex gap-24 align-center">
      <Bell size={20} />
      <Maximize size={20} />
      <Grid size={20} />
      <Moon size={20} />
      <div className="profile-img">U</div>
    </div>
  </header>
);
