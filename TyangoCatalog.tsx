"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface Product {
  id: string;
  name: string;
  heroTitle: string;
  tag?: string;
  description: string;
  price: number;
  themeColor: string;
  image: string;
  cardBg?: string;
  isSoldOut?: boolean;
}

export interface CatalogProps {
  line: "TYAZUCA" | "TYHOT";
  onAddToCart?: (product: Product) => void;
}

// Icono Sparkles SVG autónomo y ligero
const SparklesIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="none"
  >
    <path d="M12 2L14.4 7.6L20 10L14.4 12.4L12 18L9.6 12.4L4 10L9.6 7.6L12 2Z" />
    <path d="M19 15L20.2 17.8L23 19L20.2 20.2L19 23L17.8 20.2L15 19L17.8 17.8L19 15Z" />
    <path d="M5 15L6.2 17.8L9 19L6.2 20.2L5 23L3.8 20.2L1 19L3.8 17.8L5 15Z" />
  </svg>
);

export const CATALOG_DATA: Record<"TYAZUCA" | "TYHOT", Product[]> = {
  TYAZUCA: [
    {
      id: "raffaello",
      name: "RAFFAELLO",
      heroTitle: "STRAWBERRY & RAFFAELLO",
      tag: "POPULAR",
      description: "Fresas frescas con crema Velvet y Raffaello",
      price: 4.50,
      themeColor: "#8A1C22",
      cardBg: "#2B1627",
      image: "/vasos/raffaello.png",
    },
    {
      id: "paccari",
      name: "PACCARI",
      heroTitle: "STRAWBERRY & PACCARI",
      description: "Fresas cremosas con chocolate Paccari",
      price: 4.50,
      themeColor: "#3D1E12",
      cardBg: "#2B1627",
      image: "/vasos/paccari.png",
    },
    {
      id: "franui",
      name: "FRANUI",
      heroTitle: "STRAWBERRY & FRANUI",
      tag: "NUEVO",
      description: "Fresas con crema Velvet y Franui",
      price: 4.50,
      themeColor: "#6B1323",
      cardBg: "#2B1627",
      image: "/vasos/franui.png",
    },
    {
      id: "kinder",
      name: "KINDER BUENO",
      heroTitle: "STRAWBERRY & KINDER",
      description: "Fresas frescas con crema Velvet y Kinder Bueno",
      price: 4.50,
      themeColor: "#593720",
      cardBg: "#2B1627",
      image: "/vasos/kinder.png",
    },
    {
      id: "mango-raffaello",
      name: "MANGO & RAFFAELLO",
      heroTitle: "MANGO & RAFFAELLO",
      tag: "EDICIÓN LIMITADA",
      description: "Mango fresco con crema Velvet y Raffaello",
      price: 4.50,
      themeColor: "#C87A19",
      cardBg: "#2B1627",
      image: "/vasos/mango.png",
    },
  ],
  TYHOT: [
    {
      id: "tyango-clasico",
      name: "TYANGO CLÁSICO",
      heroTitle: "TYANGO CLÁSICO",
      tag: "FAVORITO",
      description: "Trocitos de mango fresco con salsas picantes y chilito en polvo",
      price: 4.50,
      themeColor: "#C84B31",
      cardBg: "#3E1F14",
      image: "/tyhot/tyango-clasico.png",
    },
    {
      id: "bendito-mango",
      name: "BENDITO MANGO",
      heroTitle: "BENDITO MANGO",
      tag: "POPULAR",
      description: "Mango fresco bañado en chamoy con cintas de gomita ácida azul",
      price: 4.80,
      themeColor: "#D05A28",
      cardBg: "#3E1F14",
      image: "/tyhot/bendito-mango.png",
      isSoldOut: true,
    },
    {
      id: "takimango",
      name: "TAKIMANGO",
      heroTitle: "TAKIMANGO",
      tag: "NUEVO",
      description: "Delicioso mango en cubos mezclado con crujientes Takis fuego",
      price: 5.00,
      themeColor: "#9E2A2B",
      cardBg: "#3E1F14",
      image: "/tyhot/takimango.png",
    },
    {
      id: "pinadiablo",
      name: "PINADIABLO",
      heroTitle: "PIÑA DIABLO",
      tag: "PICANTE",
      description: "Piña fresca en cubos con salsa especial picante y chilito de la casa",
      price: 4.50,
      themeColor: "#B83B1E",
      cardBg: "#3E1F14",
      image: "/tyhot/pinadiablo.png",
    },
    {
      id: "pepinazo",
      name: "PEPINAZO",
      heroTitle: "PEPINAZO FRESH",
      tag: "REFRESCANTE",
      description: "Pepino crujiente en cubos con limón, salsa picante y chilito",
      price: 4.00,
      themeColor: "#2D6A4F",
      cardBg: "#1B4332",
      image: "/tyhot/pepinazo.png",
    },
    {
      id: "picazana",
      name: "PICAZANA",
      heroTitle: "MANZANA PICAZANA",
      tag: "CLÁSICO",
      description: "Manzana crujiente en cubos y gajos con chamoy y chilito en polvo",
      price: 4.50,
      themeColor: "#A3333D",
      cardBg: "#3E1F14",
      image: "/tyhot/picazana.png",
    },
    {
      id: "iceuva",
      name: "ICEUVA",
      heroTitle: "ICE UVA HELADA",
      tag: "EDICIÓN LIMITADA",
      description: "Uvas verdes congeladas y escarchadas con limón y chilito",
      price: 4.50,
      themeColor: "#52B788",
      cardBg: "#1B4332",
      image: "/tyhot/iceuva.png",
      isSoldOut: true,
    },
    {
      id: "uva-pulpa",
      name: "UVA PULPA",
      heroTitle: "UVA TAMARINDO",
      tag: "TOP VENTAS",
      description: "Uvas envueltas en pulpa de tamarindo natural y escarchadas",
      price: 4.80,
      themeColor: "#7B2CBF",
      cardBg: "#3E1F14",
      image: "/tyhot/uva-pulpa.png",
      isSoldOut: true,
    },
  ],
};

export default function TyangoCatalog({ line, onAddToCart }: CatalogProps) {
  const products = CATALOG_DATA[line] || CATALOG_DATA.TYAZUCA;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailView, setIsDetailView] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Reiniciar índice si cambia la línea de catálogo
  useEffect(() => {
    setActiveIndex(0);
    setIsDetailView(false);
  }, [line]);

  const total = products.length;
  const activeProduct = products[activeIndex] || products[0];
  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  // Bloquear scroll nativo al abrir detalles
  useEffect(() => {
    if (isDetailView) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDetailView]);

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + total) % total);

  // Fallback de imágenes inteligente
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.includes("/vasos/kinder.png")) {
      target.src = "/vasos/kinder-bueno.png";
    } else if (target.src.includes("/vasos/mango.png")) {
      target.src = "/vasos/mango-raffaello.png";
    } else if (target.src.endsWith(".png")) {
      target.src = target.src.replace(".png", ".jpg");
    } else if (target.src.includes("/vasos/")) {
      target.src = target.src.replace("/vasos/", "/");
    } else if (target.src.includes("/tyhot/")) {
      target.src = target.src.replace("/tyhot/", "/");
    }
  };

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    setJustAdded(true);

    if (onAddToCart) {
      onAddToCart(activeProduct);
    }

    // Compatibilidad global con addToCart si está disponible
    if (typeof window !== "undefined") {
      if (typeof (window as any).addToCart === "function") {
        (window as any).addToCart(activeProduct.id);
      }
    }

    setTimeout(() => {
      setJustAdded(false);
      setIsDetailView(false);
    }, 1100);
  };

  const cupBgColor = activeProduct.cardBg || (line === "TYAZUCA" ? "#2B1627" : "#3E1F14");

  return (
    <section className="relative w-full min-h-[calc(100vh-64px)] pb-32 overflow-hidden bg-[#FAF7F2] flex flex-col justify-between select-none">
      
      {/* CABECERA DINÁMICA SUPERIOR */}
      <div className="relative z-20 text-center pt-5 pb-2 px-4">
        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400">
          {line === "TYAZUCA" ? "Línea Dulce & Frutas Velvet" : "Línea Picosita & Frutas Frescas"}
        </span>

        <AnimatePresence mode="wait">
          {!isDetailView && (
            <motion.div
              key={`header-${line}-${activeProduct.id}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
              className="mt-1 flex flex-col items-center"
            >
              <div className="flex items-center gap-1.5 mb-1">
                {activeProduct.tag && (
                  <span
                    style={{
                      backgroundColor: `${activeProduct.themeColor}18`,
                      color: activeProduct.themeColor,
                    }}
                    className="inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest"
                  >
                    {activeProduct.tag}
                  </span>
                )}
                {activeProduct.isSoldOut && (
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest bg-red-500 text-white shadow-sm">
                    AGOTADO
                  </span>
                )}
              </div>

              <h2 className="font-serif text-3xl sm:text-5xl font-black tracking-tight text-[#1E222D] uppercase leading-none">
                {activeProduct.name}
              </h2>

              <p className="text-xs sm:text-sm text-gray-500 mt-1 max-w-[280px] sm:max-w-md line-clamp-1">
                {activeProduct.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ESCENARIO PRINCIPAL */}
      <div className="relative flex-1 flex flex-col items-center justify-start pt-2 sm:justify-center sm:pt-0 overflow-hidden">
        
        {/* ARCO CIRCULAR CON TEXTO CURVO */}
        <motion.div
          animate={{
            backgroundColor: activeProduct.themeColor,
            y: isDetailView ? "100%" : "0%",
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[28%] md:top-[38%] left-1/2 -translate-x-1/2 w-[235vw] h-[235vw] sm:w-[160vw] sm:h-[160vw] md:w-[115vw] md:h-[115vw] rounded-full z-10 flex items-center justify-center shadow-[0_-20px_60px_rgba(0,0,0,0.18)] pointer-events-none"
        >
          <motion.svg
            animate={{ rotate: activeIndex * -25 }}
            transition={{ type: "spring", stiffness: 45, damping: 18 }}
            viewBox="0 0 1200 1200"
            className="w-full h-full opacity-25 md:opacity-[0.16] overflow-visible select-none"
          >
            <defs>
              <path
                id="catalogArcClean"
                d="M 55,600 A 545,545 0 1,1 1145,600 A 545,545 0 1,1 55,600"
                fill="transparent"
              />
            </defs>
            <text className="fill-white text-[50px] md:text-[68px] font-serif uppercase tracking-[0.16em]">
              <textPath href="#catalogArcClean" startOffset="0%">
                • {line} • FRUTAS FRESCAS • SABOR Y CREATIVIDAD • TYANGO •
              </textPath>
            </text>
          </motion.svg>
        </motion.div>

        {/* CARRUSEL DE TARJETAS (Bordes uniformes rounded-[32px]) */}
        <motion.div
          drag={!isDetailView ? "x" : false}
          dragConstraints={{ left: 0, right: 0 }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40) handleNext();
            if (info.offset.x > 40) handlePrev();
          }}
          className="relative z-30 w-full max-w-6xl h-[330px] sm:h-[430px] flex items-center justify-center touch-pan-y"
        >
          {/* Anterior */}
          <div
            onClick={handlePrev}
            className="absolute -left-28 sm:-left-44 cursor-pointer opacity-75 hover:opacity-100 transition-all scale-75 sm:scale-85"
          >
            <div
              style={{ backgroundColor: `${products[prevIndex].cardBg || cupBgColor}E6` }}
              className="w-[200px] h-[250px] rounded-[32px] p-2 shadow-xl flex items-center justify-center border border-white/10 relative overflow-hidden"
            >
              {products[prevIndex].isSoldOut && (
                <span className="absolute top-2.5 z-10 rounded-full bg-red-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow">
                  AGOTADO
                </span>
              )}
              <img
                src={products[prevIndex].image}
                alt="prev"
                onError={handleImageError}
                className="w-full h-full object-contain drop-shadow-lg pointer-events-none"
              />
            </div>
          </div>

          {/* Central Activo */}
          <motion.div
            layoutId={`cup-${activeProduct.id}`}
            onClick={() => setIsDetailView(true)}
            className="relative z-30 cursor-pointer group flex flex-col items-center"
          >
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              style={{ backgroundColor: cupBgColor }}
              className="w-[215px] h-[270px] sm:w-[260px] sm:h-[330px] rounded-[32px] p-3 shadow-[0_25px_50px_rgba(0,0,0,0.5)] border-2 border-white/20 flex flex-col items-center justify-center relative overflow-hidden"
            >
              {/* Badge AGOTADO o Tag */}
              {activeProduct.isSoldOut ? (
                <div className="absolute top-3.5 z-20 flex items-center gap-1 rounded-full bg-red-600 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg border border-white/30 animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                  AGOTADO
                </div>
              ) : activeProduct.tag ? (
                <span className="absolute top-3 z-10 rounded-full bg-[#E6F4F1] text-[#2A9D8F] px-3 py-0.5 text-[9px] font-extrabold uppercase tracking-widest shadow">
                  {activeProduct.tag}
                </span>
              ) : null}

              <img
                src={activeProduct.image}
                alt={activeProduct.name}
                onError={handleImageError}
                className={`w-full h-full object-contain drop-shadow-2xl group-hover:scale-105 transition-transform duration-300 pointer-events-none ${
                  activeProduct.isSoldOut ? "opacity-90 grayscale-[15%]" : ""
                }`}
              />

              {/* BOTÓN VER DETALLES */}
              <div
                className={`absolute bottom-3 z-10 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-extrabold tracking-wider shadow-md ${
                  activeProduct.isSoldOut
                    ? "bg-red-600 text-white"
                    : "bg-white/95 text-gray-900"
                }`}
              >
                {activeProduct.isSoldOut ? "AGOTADO • VER DETALLES" : "VER DETALLES"}
              </div>
            </motion.div>
          </motion.div>

          {/* Siguiente */}
          <div
            onClick={handleNext}
            className="absolute -right-28 sm:-right-44 cursor-pointer opacity-75 hover:opacity-100 transition-all scale-75 sm:scale-85"
          >
            <div
              style={{ backgroundColor: `${products[nextIndex].cardBg || cupBgColor}E6` }}
              className="w-[200px] h-[250px] rounded-[32px] p-2 shadow-xl flex items-center justify-center border border-white/10 relative overflow-hidden"
            >
              {products[nextIndex].isSoldOut && (
                <span className="absolute top-2.5 z-10 rounded-full bg-red-600 text-white px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow">
                  AGOTADO
                </span>
              )}
              <img
                src={products[nextIndex].image}
                alt="next"
                onError={handleImageError}
                className="w-full h-full object-contain drop-shadow-lg pointer-events-none"
              />
            </div>
          </div>
        </motion.div>

        {/* DOTS + INDICADOR */}
        {!isDetailView && (
          <div className="relative z-30 mt-3 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5">
              {products.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Ir al vaso ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex ? "w-6 bg-white shadow" : "w-1.5 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setIsDetailView(true)}
              className="text-[11px] font-medium text-white/80 hover:text-white transition cursor-pointer"
            >
              Toca el vaso para ver detalles y pedir ↑
            </button>
          </div>
        )}
      </div>

      {/* VISTA DE DETALLE COMPACTA (SIN EXTRAS, PROPORCIONADA Y SEGURA) */}
      <AnimatePresence>
        {isDetailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#FAF7F2] flex flex-col items-center justify-between pt-12 pb-28 overflow-hidden select-none"
          >
            {/* Brillo Temático */}
            <div
              style={{ backgroundColor: activeProduct.themeColor }}
              className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full blur-3xl opacity-20 pointer-events-none"
            />

            {/* Vaso Superior Centrado con soporte de swipe horizontal */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.3}
              onDragEnd={(_, info) => {
                if (info.offset.x < -40) handleNext();
                if (info.offset.x > 40) handlePrev();
              }}
              initial={{ scale: 0.85, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              className="relative z-20 my-auto flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
              title="Desliza para cambiar de vaso"
            >
              <div
                style={{ backgroundColor: cupBgColor }}
                className="w-[220px] h-[270px] sm:w-[260px] sm:h-[320px] rounded-[32px] p-3 shadow-2xl border-2 border-white/20 flex items-center justify-center"
              >
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  onError={handleImageError}
                  className="w-full h-full object-contain drop-shadow-2xl pointer-events-none"
                />
              </div>
            </motion.div>

            {/* PANEL BLANCO INFERIOR COMPACTO Y LIMPIO */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 70) setIsDetailView(false);
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative z-30 w-full max-w-lg bg-white rounded-t-[32px] px-6 pt-4 pb-8 shadow-[0_-15px_40px_rgba(0,0,0,0.15)] flex flex-col justify-between"
            >
              {/* Barrita superior para deslizar */}
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2" />

              {/* Encabezado con la X de cierre en la esquina */}
              <div className="relative flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    {activeProduct.tag && (
                      <span className="inline-block rounded-full bg-[#E6F4F1] text-[#2A9D8F] px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest">
                        {activeProduct.tag}
                      </span>
                    )}
                    {activeProduct.isSoldOut && (
                      <span className="inline-block rounded-full bg-red-600 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-sm">
                        AGOTADO
                      </span>
                    )}
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1E222D] uppercase leading-tight">
                    {activeProduct.name}
                  </h3>
                </div>

                {/* Botón X intuitivo para cerrar */}
                <button
                  type="button"
                  onClick={() => setIsDetailView(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 transition rounded-full -mr-2 -mt-1 cursor-pointer"
                  aria-label="Cerrar detalles"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeWidth="2.5" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 mt-0.5">{activeProduct.description}</p>
              
              <p className="text-[11px] font-medium text-gray-500 mt-2.5 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeProduct.themeColor }} /> 
                Preparado al momento con fruta 100% fresca
              </p>

              {/* Línea Divisoria */}
              <div className="my-3 border-t border-gray-100" />

              {/* Fila de Compra Oficial */}
              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Precio Oficial
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-black text-[#1E222D]">
                    ${activeProduct.price.toFixed(2)}
                  </span>
                </div>

                <button
                  type="button"
                  disabled={activeProduct.isSoldOut}
                  onClick={activeProduct.isSoldOut ? undefined : handleAdd}
                  style={
                    activeProduct.isSoldOut
                      ? { backgroundColor: "#9CA3AF" }
                      : { backgroundColor: activeProduct.themeColor }
                  }
                  className={`flex-1 rounded-full py-3.5 px-6 text-xs font-extrabold uppercase tracking-widest text-white shadow-lg transition-all ${
                    activeProduct.isSoldOut
                      ? "opacity-60 cursor-not-allowed shadow-none"
                      : justAdded
                      ? "bg-green-600 active:scale-95 hover:opacity-90 cursor-pointer"
                      : "active:scale-95 hover:opacity-90 cursor-pointer"
                  }`}
                >
                  {activeProduct.isSoldOut
                    ? "AGOTADO"
                    : justAdded
                    ? "¡AGREGADO AL PEDIDO!"
                    : "AGREGAR"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}