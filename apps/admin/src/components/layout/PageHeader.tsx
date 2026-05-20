export const PageHeader = ({ title, breadcrumb }: { title: string; breadcrumb: string }) => (
  <div className="page-header">
    <h2 className="page-header-title">{title}</h2>
    <small className="page-header-breadcrumb">{breadcrumb}</small>
  </div>
);
