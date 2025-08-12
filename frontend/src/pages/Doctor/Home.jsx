import React from "react";
import DoctorHeader from "../../components/doctor/header";
import FeatureCards from "../../components/doctor/featurecards";
import RecentActivity from "../../components/doctor/recentActivity";

function DoctorDashboard() {
  return (
    <div className="pt-20">
      <DoctorHeader />

      <div className="flex flex-col lg:flex-row gap-4 mt-4">
        {/* StatsCards */}
        <div className="w-full lg:w-2/3">
          <FeatureCards />
        </div>

        {/* RecentActivity */}
        <div className="w-full lg:w-1/3">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
