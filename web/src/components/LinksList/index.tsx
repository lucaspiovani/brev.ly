import { api } from "../../services/api";
import { LinkItem } from "../LinkItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Link {
  id: string;
  originalUrl: string;
  shortUrl: string;
  accessCount: number;
  createdAt: string;
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

  if (isLoading) {
    return <p className="text-sm text-gray-500">Carregando links...</p>;
  }

  if (!links || links.length === 0) {
    return (
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
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {links.map((link) => (
        <LinkItem key={link.id} link={link} onDelete={deleteLink} />
      ))}
    </ul>
  );
}