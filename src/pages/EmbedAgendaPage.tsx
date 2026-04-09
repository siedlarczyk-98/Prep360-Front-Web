import Agenda from "@/pages/Agenda";
import { EmbedProvider } from "@/hooks/useEmbedNavigate";

const EmbedAgendaPage = () => {
  return (
    <EmbedProvider>
      <div className="h-screen w-full overflow-y-auto bg-transparent">
        <Agenda />
      </div>
    </EmbedProvider>
  );
};

export default EmbedAgendaPage;
