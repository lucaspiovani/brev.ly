import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
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
    <div>
      <h1 className="text-xl font-bold text-blue-base">Home</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
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
      <LinksList />
    </div>
  );
}
