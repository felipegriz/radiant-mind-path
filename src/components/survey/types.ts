export type UserLevel = "Bronce" | "Plata" | "Oro" | "Diamante" | "Platino" | "Grey Platinum";

export interface Question {
  id: number;
  text: string;
  type: "income" | "text" | "radio";
  options?: string[];
}

export const questions: Question[] = [
  {
    id: 1,
    text: "¿A qué te dedicas?",
    type: "radio",
    options: [
      "Empresari@ consciente",
      "Empresari@",
      "Emprendedor tradicional",
      "Emprendedor digital",
      "Experto/Info-emprendedor",
      "Conferencista",
      "Coach",
      "Vendedor",
      "Networker",
      "Marketing de afiliados",
      "Emplead@",
      "Desemplead@",
      "Fuera del mercado/retirad@",
      "Otros"
    ]
  },
  {
    id: 2,
    text: "¿Cuál es tu edad?",
    type: "radio",
    options: [
      "18-24 años",
      "25-34 años",
      "35-44 años",
      "45-54 años",
      "55-64 años",
      "65 años o más"
    ]
  },
  {
    id: 3,
    text: "¿Hace cuánto tiempo conoces a Felipe y lo que hacemos?",
    type: "radio",
    options: [
      "Más de cinco años",
      "Más de cuatro años",
      "Más de tres años",
      "Más de dos años",
      "Más de un año",
      "De siete a 12 meses",
      "De tres a seis meses",
      "De uno a dos meses",
      "De una a tres semanas",
      "Menos de una semana"
    ]
  },
  {
    id: 4,
    text: "¿Cuáles son tus ingresos mensuales actuales?",
    type: "radio",
    options: [
      "Menos de $1,000",
      "$1,000 - $3,000",
      "$3,000 - $5,000",
      "$5,000 - $10,000",
      "$10,000 - $15,000",
      "Más de $15,000"
    ]
  },
  {
    id: 5,
    text: "¿Has invertido en programas de crecimiento personal en el último año?",
    type: "radio",
    options: [
      "Más de $100,000",
      "Más de $50,000",
      "Más de $30,000",
      "Más de $20,000",
      "Más de $10,000",
      "Más de $5,000",
      "Entre $1,000 y $5,000",
      "Menos de $1,000",
      "No, pero me interesa",
      "No, y no me interesa por ahora"
    ]
  },
  {
    id: 6,
    text: "¿Cuál es tu principal objetivo de crecimiento personal en este momento?",
    type: "radio",
    options: [
      "Cambiar mi vida",
      "Ganar más dinero",
      "Lograr maestría emocional",
      "Crear una vida extraordinaria",
      "Tengo dinero pero quiero plenitud",
      "Quiero mejorar mi relación de pareja",
      "Quiero trabajar mis finanzas personales",
      "Quiero descubrir mi propósito de vida",
      "Equilibrio vida-trabajo",
      "Salud y bienestar integral",
      "Liderazgo y desarrollo profesional",
      "Aprender un sistema de manejo del tiempo",
      "Espiritualidad y conexión interior",
      "Emprender",
      "Conocerme mejor",
      "Descubrir mi potencial",
      "Construir la mejor mentalidad posible"
    ]
  },
  {
    id: 7,
    text: "¿Cuál es tu mayor desafío actual?",
    type: "radio",
    options: [
      "Falta de claridad en mi propósito",
      "Limitaciones financieras",
      "Gestión del tiempo",
      "Relaciones personales",
      "Motivación y disciplina",
      "Estrés y ansiedad",
      "Otro"
    ]
  },
  {
    id: 8,
    text: "Si tuvieras una varita mágica y pudieras hacer realidad cualquier cosa, ¿cuál sería tu sueño o gran meta?",
    type: "radio",
    options: [
      "Impactar positivamente a millones de personas",
      "Libertad financiera total",
      "Construir un legado duradero",
      "Realización personal plena",
      "Viajar por el mundo sin limitaciones",
      "Crear una empresa exitosa",
      "Tener una familia feliz y armoniosa",
      "Alcanzar la paz y plenitud interior",
      "Otro"
    ]
  }
];
