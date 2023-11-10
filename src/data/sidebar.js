import { FaCommentAlt } from "react-icons/fa";
import { MdPersonAdd, MdDashboard  } from "react-icons/md";
import { RiAccountCircleFill  } from "react-icons/ri";



const menu = [
  {
    title: "Panel Pacientes",
    icon: <MdDashboard />,
    path: "/dashboard",
  },
  {
    title: "Panel Cuidadores",
    icon: <MdDashboard />,
    path: "/dashboard2",
  },
  {
    title: "Panel Enfermeros",
    icon: <MdDashboard />,
    path: "/dashboard3",
  },
  {
    title: "Agregar paciente",
    icon: <MdPersonAdd />,
    path: "/add-product",
  },
  {
    title: "Agregar enfermero",
    icon: <MdPersonAdd />,
    path: "/add-enfermero",
  },
  {
    title: "Agregar cuidador",
    icon: <MdPersonAdd />,
    path: "/add-cuidador",
  },
  {
    title: "Cuenta",
    icon: <RiAccountCircleFill />,
    childrens: [
      {
        title: "Perfil",
        path: "/profile",
      },
      {
        title: "Editar Perfil",
        path: "/edit-profile",
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default menu;
