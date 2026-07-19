export type Product = {
  n: string;
  name: string;
  category: string;
  blurb: string;
  status: "próximamente" | "en desarrollo" | "lista de espera";
  // Gradient used for the floating hover preview (swap for real photos later).
  tint: [string, string];
};

// Placeholder catalog — rename freely, the layout adapts to any count.
export const products: Product[] = [
  {
    n: "001",
    name: "Pulse",
    category: "Audio",
    blurb: "Audífonos in-ear con cancelación adaptativa y latencia mínima.",
    status: "lista de espera",
    tint: ["#4d7cff", "#0b1638"],
  },
  {
    n: "002",
    name: "Field",
    category: "Sonido",
    blurb: "Altavoz portátil de rango completo. Aluminio mecanizado.",
    status: "en desarrollo",
    tint: ["#ff5d5d", "#2a0b0b"],
  },
  {
    n: "003",
    name: "Arc",
    category: "Luz",
    blurb: "Lámpara de escritorio con temperatura variable y brazo magnético.",
    status: "en desarrollo",
    tint: ["#ffb347", "#2a1a05"],
  },
  {
    n: "004",
    name: "Node",
    category: "Energía",
    blurb: "Hub de carga GaN. Cuatro puertos, 140W, del tamaño de una baraja.",
    status: "próximamente",
    tint: ["#5de0a0", "#062017"],
  },
];
