import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export function initialStartDate(): string {
  return format(new Date(), "yyyy-MM-dd'T'HH:mm");
}

export function formatToInputDateTime(date?: string): string {
  if (!date) return "—";
  return format(new Date(date), "yyyy-MM-dd'T'HH:mm");
}

export function formatToDisplayDateTime(date?: string): string {
  if (!date) return "—";
  return format(new Date(date), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR });
}

export function formatToInputDate(date?: string): string {
  if (!date) return "—";
  return format(new Date(date), "yyyy-MM-dd'T'").split("T")[0];
}
