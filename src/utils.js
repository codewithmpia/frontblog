import { format, formatDistanceToNow } from 'date-fns';
import { fr } from "date-fns/locale";

export const formatDate = (dateString) => {
    return format(new Date(dateString), "dd MMMM yyy", {locale: fr})
}

export const HumanFormatDate = (dateString) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: fr })
}