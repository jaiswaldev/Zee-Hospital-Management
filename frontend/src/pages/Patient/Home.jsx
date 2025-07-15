import React from "react";
import PatientHeader from "../../components/patient/header";
import FeatureCards from "../../components/patient/featurecards";
import RecentActivity from "../../components/patient/recentActivity";

function PatientDashboard() {
  return (
    <div className="mt-15">
      <PatientHeader />

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

export default PatientDashboard;
