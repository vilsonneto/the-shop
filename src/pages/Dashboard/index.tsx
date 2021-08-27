const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        // Gambiarra
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
