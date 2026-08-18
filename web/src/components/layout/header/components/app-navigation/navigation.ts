import { FiBarChart2, FiHome, FiPlusCircle } from "react-icons/fi";

export const navigation = [
  {
    to: "/",
    label: "Início",
    icon: FiHome,
    end: true,
  },
  {
    to: "/polls",
    label: "Enquetes",
    icon: FiBarChart2,
    end: true,
  },
  {
    to: "/polls/new",
    label: "Criar",
    icon: FiPlusCircle,
    end: true,
  },
];
