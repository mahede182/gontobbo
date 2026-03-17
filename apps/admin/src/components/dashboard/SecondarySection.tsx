import { RevenueChart } from "./RevenueChart";
import { TopCountries } from "./TopCountries";
import { ChartHeader } from "./ChartHeader";
export const SecondarySection = () => {
  const data = [{ value: 10 }, { value: 40 }, { value: 20 }, { value: 50 }];
  return (
    <div className="flex gap-24">
      <div className="card flex-2">
        <ChartHeader title="Revenue Overview" />
        <RevenueChart data={data} />
      </div>
      <div className="flex-1 overflow-auto">
        <TopCountries />
      </div>
    </div>
  );
};
