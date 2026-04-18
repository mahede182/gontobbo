export const CountryItem = ({ name, value, trend }: any) => (
  <div className="flex justify-between py-8">
    <span>
      {name} <small style={{ color: "#62DEB1" }}>{trend}</small>
    </span>
    <strong>{value}</strong>
  </div>
);
