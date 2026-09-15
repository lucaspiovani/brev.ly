import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LinkSimple, CircleNotch } from "@phosphor-icons/react";
import { api } from "../../services/api";
import { NotFound } from "../NotFound";

interface OriginalUrlResponse {
  originalUrl: string;
}

export function Redirect() {
  const { shortUrl } = useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["redirect", shortUrl],
    queryFn: async () => {
      const response = await api.get<OriginalUrlResponse>(`/links/${shortUrl}`);
      return response.data;
    },
  });

  useEffect(() => {
    if (data?.originalUrl) {
      window.location.href = data.originalUrl;
    }
  }, [data]);

  if (isError) {
    return <NotFound />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-sm flex-col items-center gap-3 rounded-lg bg-white p-10 text-center shadow-md">
        {isLoading ? (
          <CircleNotch size={32} className="animate-spin text-blue-base" />
        ) : (
          <LinkSimple size={32} className="text-blue-base" />
        )}

        <h1 className="text-lg font-bold text-gray-600">Redirecionando...</h1>

        <p className="text-sm text-gray-500">
          O link será aberto automaticamente em alguns instantes.
          <br />
          Não foi redirecionado?{" "}
          {data?.originalUrl && (
            <a
              href={data.originalUrl}
              className="font-bold text-blue-base underline"
            >
              Acesse aqui
            </a>
          )}
        </p>
      </div>
    </div>
  );
}