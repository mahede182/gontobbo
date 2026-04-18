export const StatTrend = ({ change, label }: { change: string; label: string }) => (
  <p className="stat-trend">
    <span>{change}</span> {label}
  </p>
);
