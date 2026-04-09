import SimuladoView from "@/pages/SimuladoView";
import { EmbedProvider } from "@/hooks/useEmbedNavigate";

const EmbedSimuladoPage = () => {
  return (
    <EmbedProvider>
      <div className="h-screen w-full overflow-y-auto bg-transparent">
        <SimuladoView />
      </div>
    </EmbedProvider>
  );
};

export default EmbedSimuladoPage;
