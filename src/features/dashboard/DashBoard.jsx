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
      <NewScriptBoard
        title="🎉 New Scripts"
        baseType="newScripts"
        filterField="newScriptFilter"
      />
      <TopRatedBoard
        title="⭐️ Top rated"
        baseType="top_rated"
        filterField="topRatedFilter"
      />
      {/* <DashboardLayout /> */}
    </>
  );
}

export default Dashboard;
