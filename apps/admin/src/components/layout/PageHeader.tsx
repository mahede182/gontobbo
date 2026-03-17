export const PageHeader = ({ title, breadcrumb }: { title: string; breadcrumb: string }) => (
  <div className="mb-24">
    <h2>{title}</h2>
    <small style={{ color: "#777" }}>{breadcrumb}</small>
  </div>
);
