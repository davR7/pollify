import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Container } from "@/components/layout/container";
import { SectionSpace } from "@/components/layout/section-space";
import { Button } from "@/components/ui/Button";
import { InputGroup } from "@/components/ui/InputGroup";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { type CreatePollFormData, createPollSchema } from "@/schemas/create-poll.schema";
import { createPoll } from "@/services/poll.service";
import { PollOptionsField } from "./components/PollOptionsField";

export function NewPollPage() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatePollFormData>({
    resolver: zodResolver(createPollSchema),
    defaultValues: {
      title: "",
      options: [{ text: "" }, { text: "" }, { text: "" }],
      startsAt: "",
      endsAt: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "options",
  });

  const { mutateAsync } = useMutation({
    mutationFn: createPoll,
    onSuccess: () => {
      toast.success("Enquete criada com sucesso!");
    },
  });

  const onSubmit = async (data: CreatePollFormData) => {
    const payload = {
      ...data,
      startsAt: new Date(data.startsAt).toISOString(),
      endsAt: new Date(data.endsAt).toISOString(),
    };
    await mutateAsync(payload);
    reset();
  };

  return (
    <Container className="flex-1">
      <SectionSpace>
        <SectionHeader
          title="Nova enquete"
          description="Faça uma pergunta e descubra diferentes opiniões."
        />
        <div className="mx-auto w-full max-w-lg rounded-xl mt-12">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-md border border-slate-200 bg-white p-6 shadow-sm"
          >
            <InputGroup
              label="Título"
              input="title"
              type="text"
              placeholder="Digite aqui a sua pergunta"
              error={errors.title?.message}
              {...register("title")}
            />
            <PollOptionsField
              fields={fields}
              register={register}
              errors={errors}
              append={append}
              remove={remove}
            />
            <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <InputGroup
                label="Data de início"
                input="start-date"
                type="datetime-local"
                error={errors.startsAt?.message}
                {...register("startsAt")}
              />
              <InputGroup
                label="Data de término"
                input="end-date"
                type="datetime-local"
                error={errors.endsAt?.message}
                {...register("endsAt")}
              />
            </div>
            <div className="flex justify-center">
              <Button type="submit" size="block">
                Criar enquete
              </Button>
            </div>
          </form>
        </div>
      </SectionSpace>
    </Container>
  );
}
