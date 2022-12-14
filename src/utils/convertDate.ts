import { format as formatFns } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export function formatInBR(data: string, format: string): string {
  return formatFns(
    new Date(data),
    format,
    { locale: ptBR }
  )
}