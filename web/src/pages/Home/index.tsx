import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { LinkSimple } from "@phosphor-icons/react";
import { createLinkSchema, type CreateLinkFormData } from "../../schemas/create-link.schema";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import { LinksList } from "../../components/LinksList";
import { api } from "../../services/api";

export function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm<CreateLinkFormData>({
    resolver: zodResolver(createLinkSchema),
    defaultValues: {
      originalUrl: "",
      shortUrl: "",
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateLinkFormData) => api.post("/links", data),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["links"] });
    },
    onError: (error) => {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : "Erro inesperado ao salvar o link.";

      setError("shortUrl", { message });
    },
  });

  function onSubmit(data: CreateLinkFormData) {
    mutate(data);
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 md:px-8 md:py-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <header className="flex items-center justify-center gap-2 md:justify-start">
          <LinkSimple size={24} weight="bold" className="text-blue-base" />
          <span className="text-lg font-bold text-blue-base">brev.ly</span>
        </header>

        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <div className="w-full rounded-lg bg-white p-6 shadow-md md:max-w-xs">
            <h1 className="mb-4 text-lg font-bold text-gray-600">Novo link</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
              <Input
                label="Link original"
                placeholder="https://www.exemplo.com.br"
                {...register("originalUrl")}
                error={errors.originalUrl?.message}
              />
              <Input
                label="Link encurtado"
                placeholder="brev.ly/"
                {...register("shortUrl")}
                error={errors.shortUrl?.message}
              />
              <Button variant="primary" type="submit" disabled={isPending}>
                Salvar link
              </Button>
            </form>
          </div>

          <div className="w-full">
            <LinksList />
          </div>
        </div>
      </div>
    </div>
  );
}