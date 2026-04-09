import SimuladoFiltros from "@/pages/SimuladoFiltros";
import { EmbedProvider } from "@/hooks/useEmbedNavigate";

const EmbedSimuladoFiltrosPage = () => {
  return (
    <EmbedProvider>
      <div className="h-screen w-full overflow-y-auto bg-transparent">
        <SimuladoFiltros />
      </div>
    </EmbedProvider>
  );
};

export default EmbedSimuladoFiltrosPage;
