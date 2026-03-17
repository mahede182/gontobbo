import { StatValue } from "./StatValue";
import { StatTrend } from "./StatTrend";
export const StatCard = ({ title, value, change, className }: any) => (
  <div className={`card ${className}`}>
    <h3>{title}</h3>
    <StatValue value={value} />
    <StatTrend change={change} label="Last Month" />
  </div>
);
