import { FormattedMessage } from "react-intl";
import ApplyTutorBanner from "./ApplyTutorBanner";
import NewScriptBoard from "./NewScriptBoard";
import TopRatedBoard from "./TopRatedBoard";

function Dashboard() {
  return (
    <>
      {/* <TrendBoard
        title="🔥 Hot today"
        baseType="trending"
        filterField="trendingFilter"
      /> */}
      <ApplyTutorBanner />
      <NewScriptBoard
        title={<FormattedMessage id="dashBoard.titleNewScripts" />}
        baseType="newScripts"
        filterField="newScriptFilter"
      />
      <TopRatedBoard
        title={<FormattedMessage id="dashBoard.titleTopRated" />}
        baseType="top_rated"
        filterField="topRatedFilter"
      />
      {/* <DashboardLayout /> */}
    </>
  );
}

export default Dashboard;
