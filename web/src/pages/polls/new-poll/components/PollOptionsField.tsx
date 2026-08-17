import {
  type FieldArrayWithId,
  type FieldErrors,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormRegister,
} from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { CreatePollFormData } from "@/schemas/create-poll-schema";

interface PollOptionsFieldProps {
  fields: FieldArrayWithId<CreatePollFormData, "options">[];
  append: UseFieldArrayAppend<CreatePollFormData, "options">;
  remove: UseFieldArrayRemove;
  errors: FieldErrors<CreatePollFormData>;
  register: UseFormRegister<CreatePollFormData>;
}

export function PollOptionsField({
  fields,
  append,
  remove,
  errors,
  register,
}: PollOptionsFieldProps) {
  return (
    <fieldset className="my-5">
      <legend className="mb-2 block text-sm font-medium text-slate-800">Opções de resposta</legend>
      <div className="space-y-5">
        {fields.map((field, index) => (
          <div key={field.id}>
            <div className="flex gap-2">
              <Input
                input={`option-${index + 1}`}
                placeholder={`Opção ${index + 1}`}
                {...register(`options.${index}.text`)}
              />
              {fields.length > 2 && (
                <Button
                  type="button"
                  variant="static"
                  className="py-7 px-3 text-sm text-slate-500 hover:text-red-500 focus:ring-2 focus:ring-red-500/20"
                  aria-label={`Remover opção ${index + 1}`}
                  onClick={() => remove(index)}
                >
                  x
                </Button>
              )}
            </div>
            {errors.options?.[index]?.text && (
              <p className="mt-1 text-sm text-red-600">{errors.options[index]?.text?.message}</p>
            )}
          </div>
        ))}
      </div>
      {errors.options?.message && (
        <p className="mt-1 text-sm text-red-600">{errors.options.message}</p>
      )}
      <Button
        type="button"
        className="mt-5"
        onClick={() => append({ text: "" })}
        disabled={fields.length >= 5}
      >
        <span className="text-base leading-none">⊕</span>
        Adicionar opção
      </Button>
    </fieldset>
  );
}
