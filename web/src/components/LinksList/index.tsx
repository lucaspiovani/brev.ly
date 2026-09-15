import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DownloadSimple } from "@phosphor-icons/react";
import { api } from "../../services/api";
import { LinkItem } from "../LinkItem";

interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
}

interface ExportLinksResponse {
  url: string;
}

export function LinksList() {
  const queryClient = useQueryClient();

  const { mutate: deleteLink } = useMutation({
    mutationFn: (id: string) => api.delete(`/links/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
  });

  const { data: links, isLoading } = useQuery({
    queryKey: ["links"],
    queryFn: async () => {
      const response = await api.get<Link[]>("/links");
      return response.data;
    },
  });

  const { mutate: exportLinks, isPending: isExporting } = useMutation({
    mutationFn: async () => {
      const response = await api.get<ExportLinksResponse>("/exportLinks");
      return response.data;
    },
    onSuccess: (data) => {
      window.open(data.url, "_blank");
    },
  });

  return (
    <div className="rounded-lg bg-white p-6 shadow-md">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-600">Meus links</h2>
        <button
          onClick={() => exportLinks()}
          disabled={!links || links.length === 0 || isExporting}
          className="flex items-center gap-1 rounded-lg bg-gray-200 px-3 py-2 text-xs font-bold uppercase text-gray-500 transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <DownloadSimple size={14} />
          Baixar CSV
        </button>
      </div>

      {isLoading && (
        <p className="text-sm text-gray-500">Carregando links...</p>
      )}

      {!isLoading && (!links || links.length === 0) && (
        <div className="flex flex-col items-center gap-3 py-6">
          <svg
            width="40"
            height="40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="text-gray-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
            />
          </svg>
          <p className="text-xs uppercase text-gray-500 text-center">
            Ainda não existem links cadastrados
          </p>
        </div>
      )}

      {!isLoading && links && links.length > 0 && (
        <ul className="flex flex-col gap-2">
          {links.map((link) => (
            <LinkItem key={link.id} link={link} onDelete={deleteLink} />
          ))}
        </ul>
      )}
    </div>
  );
}