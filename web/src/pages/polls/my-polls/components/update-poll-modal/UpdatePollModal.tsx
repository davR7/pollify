import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { formatToInputDate } from "@/libs/format-date";
import { normalizePollDates } from "@/libs/normalizePollDates";
import { queryClient } from "@/libs/react-query";
import { type UpdatePollFormData, updatePollSchema } from "@/schemas/update-poll.schema";
import { uptadePoll } from "@/services/poll.service";
import type { UpdatePollModalProps } from "./update-poll-modal.props";

export function UpdatePollModal({ onClose, poll }: UpdatePollModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdatePollFormData>({
    resolver: zodResolver(updatePollSchema),
    defaultValues: {
      status: poll?.status,
      startsAt: formatToInputDate(poll.startsAt),
      endsAt: formatToInputDate(poll.endsAt),
    },
  });

  const { mutate } = useMutation({
    mutationFn: uptadePoll,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pollsWithUser"] });
      toast.success("Enquete salva com sucesso!");
      onClose();
    },
    onError: (error: unknown) => {
      if (isAxiosError(error)) {
        toast.error(`Oops! Erro: ${error.response?.data.message}`);
      }
    },
  });

  async function handleUpdatePoll(data: UpdatePollFormData): Promise<void> {
    const { inputStartsAt, inputEndsAt } = normalizePollDates(data);

    const payload = {
      status: data.status,
      startsAt: inputStartsAt.toISOString(),
      endsAt: inputEndsAt.toISOString(),
    };

    mutate({ id: poll.id, payload });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Atualizar enquete</h2>
          <p className="mt-1 text-sm text-gray-500">Altere o status e o período da enquete.</p>
        </div>
        <form onSubmit={handleSubmit(handleUpdatePoll)} className="space-y-5">
          <div>
            <label htmlFor="status" className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              {...register("status")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            >
              <option value="DRAFT">Rascunho</option>
              <option value="OPEN">Aberta</option>
            </select>
            {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
          </div>
          <div>
            <label htmlFor="startsAt" className="mb-2 block text-sm font-medium text-gray-700">
              Data de início
            </label>
            <input
              id="startsAt"
              type="date"
              {...register("startsAt")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
            {errors.startsAt && (
              <p className="mt-1 text-sm text-red-600">{errors.startsAt.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="endsAt" className="mb-2 block text-sm font-medium text-gray-700">
              Data de término
            </label>
            <input
              id="endsAt"
              type="date"
              {...register("endsAt")}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none transition focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20"
            />
            {errors.endsAt && <p className="mt-1 text-sm text-red-600">{errors.endsAt.message}</p>}
          </div>
          <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
            <Button type="button" variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
