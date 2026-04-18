export const InfoTile = ({ label, value }: { label: string; value: string }) => (
  <div className="info-tile">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);
