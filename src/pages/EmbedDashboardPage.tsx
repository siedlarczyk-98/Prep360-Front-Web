import Dashboard from "@/components/Dashboard";
import { EmbedProvider } from "@/hooks/useEmbedNavigate";

const EmbedDashboardPage = () => {
  const email = localStorage.getItem("userEmail") || "embed@user.com";

  return (
    <EmbedProvider>
      <div className="h-screen w-full overflow-y-auto bg-transparent">
        <Dashboard email={email} onLogout={() => {}} />
      </div>
    </EmbedProvider>
  );
};

export default EmbedDashboardPage;
