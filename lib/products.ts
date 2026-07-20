export type Product = {
  n: string;
  name: string;
  category: string;
  blurb: string;
  status: "disponible" | "próximamente";
  // Gradient used for the floating hover preview (swap for real photos later).
  tint: [string, string];
};

// The UNIT lineup — only the AI Keyboard ships now, the rest are coming soon.
export const products: Product[] = [
  {
    n: "001",
    name: "AI Keyboard",
    category: "Teclado",
    blurb: "Teclado mecánico con asistente de IA integrado. Aluminio, switches lineales, atajos que aprenden de ti.",
    status: "disponible",
    tint: ["#4a4a50", "#0e0e11"],
  },
  {
    n: "002",
    name: "Lightsaber",
    category: "Sable",
    blurb: "Réplica de sable de luz con hoja LED, sonido reactivo y empuñadura mecanizada.",
    status: "próximamente",
    tint: ["#3c3c42", "#0d0d10"],
  },
  {
    n: "003",
    name: "Mini EV",
    category: "Auto",
    blurb: "Auto eléctrico a escala, controlable, con chasis de metal y suspensión real.",
    status: "próximamente",
    tint: ["#55555c", "#101013"],
  },
  {
    n: "004",
    name: "Pocket Bot",
    category: "Robot",
    blurb: "Compañero robótico de bolsillo. Expresivo y táctil — una mascota digital que vive contigo.",
    status: "próximamente",
    tint: ["#44444a", "#0f0f12"],
  },
];
