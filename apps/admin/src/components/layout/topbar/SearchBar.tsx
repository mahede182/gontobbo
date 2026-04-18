import { Search } from "lucide-react";
export const SearchBar = () => (
  <div className="flex align-center p-8 gap-12 border-radius-std border">
    <Search size={16} />
    <input type="text" placeholder="Search..." className="border-none bg-transparent" />
  </div>
);
