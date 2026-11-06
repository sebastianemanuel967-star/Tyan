'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TyhotProduct {
  id: string;
  name: string;
  heroTitle: string;
  tag?: string;
  tagType?: 'green' | 'orange' | 'red' | 'default';
  description: string;
  basePrice: number;
  price?: string;
  priceNum?: number;
  themeColor: string;
  arcColor?: string;
  accentBg?: string;
  image: string;
  isSoldOut?: boolean;
}

export const TYHOT_PRODUCTS: TyhotProduct[] = [
  {
    id: 'tyango-clasico',
    name: 'TYANGO CLÁSICO',
    heroTitle: 'TYANGO CLÁSICO',
    tag: 'FAVORITO',
    tagType: 'orange',
    description: 'Trocitos de mango fresco con salsas picantes y chilito en polvo',
    basePrice: 4.50,
    priceNum: 4.50,
    price: '$4.50',
    themeColor: '#C84B31',
    arcColor: '#C84B31',
    accentBg: '#3E1F14',
    image: '/tyhot/tyango-clasico.png',
  },
  {
    id: 'bendito-mango',
    name: 'BENDITO MANGO',
    heroTitle: 'BENDITO MANGO',
    tag: 'POPULAR',
    tagType: 'orange',
    description: 'Mango fresco bañado en chamoy con cintas de gomita ácida azul',
    basePrice: 4.80,
    priceNum: 4.80,
    price: '$4.80',
    themeColor: '#D05A28',
    arcColor: '#D05A28',
    accentBg: '#3E1F14',
    image: '/tyhot/bendito-mango.png',
    isSoldOut: true,
  },
  {
    id: 'takimango',
    name: 'TAKIMANGO',
    heroTitle: 'TAKIMANGO',
    tag: 'NUEVO',
    tagType: 'red',
    description: 'Delicioso mango en cubos mezclado con crujientes Takis fuego',
    basePrice: 5.00,
    priceNum: 5.00,
    price: '$5.00',
    themeColor: '#9E2A2B',
    arcColor: '#9E2A2B',
    accentBg: '#3E1F14',
    image: '/tyhot/takimango.png',
  },
  {
    id: 'pinadiablo',
    name: 'PINADIABLO',
    heroTitle: 'PIÑA DIABLO',
    tag: 'PICANTE',
    tagType: 'red',
    description: 'Piña fresca en cubos con salsa especial picante y chilito de la casa',
    basePrice: 4.50,
    priceNum: 4.50,
    price: '$4.50',
    themeColor: '#B83B1E',
    arcColor: '#B83B1E',
    accentBg: '#3E1F14',
    image: '/tyhot/pinadiablo.png',
  },
  {
    id: 'pepinazo',
    name: 'PEPINAZO',
    heroTitle: 'PEPINAZO FRESH',
    tag: 'REFRESCANTE',
    tagType: 'green',
    description: 'Pepino crujiente en cubos con limón, salsa picante y chilito',
    basePrice: 4.00,
    priceNum: 4.00,
    price: '$4.00',
    themeColor: '#2D6A4F',
    arcColor: '#2D6A4F',
    accentBg: '#1B4332',
    image: '/tyhot/pepinazo.png',
  },
  {
    id: 'picazana',
    name: 'PICAZANA',
    heroTitle: 'MANZANA PICAZANA',
    tag: 'CLÁSICO',
    tagType: 'red',
    description: 'Manzana crujiente en cubos y gajos con chamoy y chilito en polvo',
    basePrice: 4.50,
    priceNum: 4.50,
    price: '$4.50',
    themeColor: '#A3333D',
    arcColor: '#A3333D',
    accentBg: '#3E1F14',
    image: '/tyhot/picazana.png',
  },
  {
    id: 'iceuva',
    name: 'ICEUVA',
    heroTitle: 'ICE UVA HELADA',
    tag: 'EDICIÓN LIMITADA',
    tagType: 'green',
    description: 'Uvas verdes congeladas y escarchadas con limón y chilito',
    basePrice: 4.50,
    priceNum: 4.50,
    price: '$4.50',
    themeColor: '#52B788',
    arcColor: '#52B788',
    accentBg: '#1B4332',
    image: '/tyhot/iceuva.png',
    isSoldOut: true,
  },
  {
    id: 'uva-pulpa',
    name: 'UVA PULPA',
    heroTitle: 'UVA TAMARINDO',
    tag: 'TOP VENTAS',
    tagType: 'orange',
    description: 'Uvas envueltas en pulpa de tamarindo natural y escarchadas',
    basePrice: 4.80,
    priceNum: 4.80,
    price: '$4.80',
    themeColor: '#7B2CBF',
    arcColor: '#7B2CBF',
    accentBg: '#3E1F14',
    image: '/tyhot/uva-pulpa.png',
    isSoldOut: true,
  },
];

interface TyhotSectionProps {
  onAddToCart?: (product: any) => void;
  className?: string;
}

export default function TyhotSection({ onAddToCart, className = '' }: TyhotSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDetailView, setIsDetailView] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const total = TYHOT_PRODUCTS.length;
  const activeProduct = TYHOT_PRODUCTS[activeIndex];

  const prevIndex = (activeIndex - 1 + total) % total;
  const nextIndex = (activeIndex + 1) % total;

  const prevProduct = TYHOT_PRODUCTS[prevIndex];
  const nextProduct = TYHOT_PRODUCTS[nextIndex];

  // Precio estrictamente oficial del producto
  const formattedPrice = `$${activeProduct.basePrice.toFixed(2)}`;

  // 1. Congelar el scroll nativo de la página cuando la vista de detalles esté abierta
  useEffect(() => {
    if (isDetailView) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isDetailView]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Gestor táctil horizontal exclusivo para cambiar entre los vasos (Scroll vertical libre)
  const touchStart = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStart.current = {
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStart.current) return;
    const deltaX = touchStart.current.x - e.changedTouches[0].clientX;
    const deltaY = touchStart.current.y - e.changedTouches[0].clientY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 40) {
      if (!isDetailView) {
        if (deltaX > 0) handleNext();
        else handlePrev();
      }
    }
    touchStart.current = null;
  };

  // Controles por teclado
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isDetailView) handleNext();
      if (e.key === 'ArrowLeft' && !isDetailView) handlePrev();
      if (e.key === 'Escape' && isDetailView) setIsDetailView(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNext, handlePrev, isDetailView]);

  // Conexión del botón al carrito real global de la app
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    const formattedProduct = {
      ...activeProduct,
      category: 'TYHOT',
    };

    if (onAddToCart) {
      onAddToCart(formattedProduct);
    }

    // Compatibilidad directa con la función global de la app
    if (typeof window !== 'undefined') {
      if (typeof (window as any).addToCart === 'function') {
        (window as any).addToCart(activeProduct.id);
      }
    }

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
    }, 1000);
  };

  // Helper para fallback de imágenes automático
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget;
    if (target.src.endsWith('.png')) {
      target.src = target.src.replace('.png', '.jpg');
    } else if (target.src.includes('/tyhot/')) {
      target.src = target.src.replace('/tyhot/', '/');
    }
  };

  const springTransition = {
    type: 'spring' as const,
    stiffness: 180,
    damping: 22,
  };

  return (
    <section
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`relative w-full min-h-[640px] sm:min-h-[750px] lg:min-h-[820px] bg-[#FAF7F2] overflow-hidden select-none flex flex-col justify-between pt-3 pb-4 sm:py-6 px-3 sm:px-6 md:px-8 transition-colors duration-700 ${className}`}
      aria-label="Catálogo TYHOT 3D"
    >
      {/* 1. CABECERA DINÁMICA SUPERIOR */}
      <div className="relative z-20 text-center pt-4 pb-1 px-4">
        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400">
          Línea Picosita &amp; Frutas Frescas
        </span>

        <AnimatePresence mode="wait">
          {!isDetailView && (
            <motion.div
              key={`header-${activeProduct.id}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mt-1.5 flex flex-col items-center"
            >
              {activeProduct.tag && (
                <span
                  style={{
                    backgroundColor: `${activeProduct.themeColor}18`,
                    color: activeProduct.themeColor,
                  }}
                  className="inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest mb-1"
                >
                  {activeProduct.tag}
                </span>
              )}

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

      {/* 2. ESCENARIO AGRUMEA (CARRUSEL 3D INTERACTIVO) */}
      <div className="relative flex-1 flex flex-col items-center justify-start pt-4 sm:justify-center sm:pt-0 overflow-hidden">
        {/* ARCO DE COLOR Y TEXTO CURVO GIRATORIO */}
        <motion.div
          animate={{
            backgroundColor: activeProduct.themeColor,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute top-[27%] md:top-[38%] left-1/2 -translate-x-1/2 w-[235vw] h-[235vw] sm:w-[160vw] sm:h-[160vw] md:w-[115vw] md:h-[115vw] rounded-full z-10 flex items-center justify-center shadow-[0_-20px_60px_rgba(0,0,0,0.18)] pointer-events-none"
        >
          <motion.svg
            animate={{ rotate: activeIndex * -25 }}
            transition={{ type: 'spring', stiffness: 45, damping: 18 }}
            viewBox="0 0 1200 1200"
            className="w-full h-full opacity-25 md:opacity-[0.16] overflow-visible select-none"
          >
            <defs>
              <path
                id="tyhotCircleArc"
                d="M 55,600 A 545,545 0 1,1 1145,600 A 545,545 0 1,1 55,600"
                fill="transparent"
              />
            </defs>
            <text className="fill-white text-[48px] md:text-[66px] font-serif uppercase tracking-[0.16em]">
              <textPath href="#tyhotCircleArc" startOffset="0%">
                • FRUTAS FRESCAS • CHAMOY Y CHILITO • TYHOT • PICANTE Y SABOR • FRUTA CON CHAMOY • TYHOT • PICANTE Y SABOR •
              </textPath>
            </text>
          </motion.svg>
        </motion.div>

        {/* CONTENEDOR DE TARJETAS 3D FLOTANTES */}
        <div className="relative z-30 w-full max-w-6xl h-[340px] sm:h-[430px] flex items-center justify-center touch-pan-x">
          {/* VASO IZQUIERDO (Anterior) */}
          <motion.button
            key={`prev-${prevProduct.id}`}
            onClick={handlePrev}
            aria-label={`Ver producto anterior: ${prevProduct.name}`}
            initial={{ opacity: 0, scale: 0.5, x: -280, y: 70 }}
            animate={{
              opacity: 0.85,
              scale: 0.72,
              rotate: -14,
              x: typeof window !== 'undefined' && window.innerWidth < 640 ? -145 : -280,
              y: typeof window !== 'undefined' && window.innerWidth < 640 ? 45 : 70,
            }}
            transition={springTransition}
            whileHover={{ scale: 0.78, opacity: 1 }}
            className="absolute z-20 cursor-pointer focus:outline-none group"
            style={{
              filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
            }}
          >
            <div className="relative w-[155px] h-[200px] sm:w-[195px] sm:h-[250px] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-[#3E1F14]/90 p-2 border border-white/10 flex items-center justify-center">
              <img
                src={prevProduct.image}
                alt={prevProduct.name}
                onError={handleImageError}
                className="w-full h-full object-contain rounded-[22px] pointer-events-none drop-shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-2.5 text-center">
                <span className="inline-block bg-[#1E222D]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {prevProduct.name}
                </span>
              </div>
            </div>
          </motion.button>

          {/* VASO CENTRAL (Activo) */}
          <motion.div
            layout
            key={`center-${activeProduct.id}`}
            transition={springTransition}
            className="relative z-30 flex flex-col items-center justify-center cursor-pointer"
            onClick={() => setIsDetailView(true)}
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: -7,
              }}
              transition={{
                y: {
                  duration: 3.6,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  ease: 'easeInOut',
                },
                rotate: springTransition,
              }}
              whileHover={{
                scale: 1.08,
                rotate: -3,
              }}
              className="relative transition-shadow duration-500"
              style={{
                filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
              }}
            >
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] w-[215px] h-[275px] sm:w-[260px] sm:h-[330px] bg-[#3E1F14] p-3 border-2 border-white/20 flex flex-col items-center justify-center">
                {activeProduct.isSoldOut ? (
                  <div className="absolute top-3.5 z-20 flex items-center gap-1 rounded-full bg-red-600 px-3 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-white shadow-lg border border-white/30 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
                    AGOTADO
                  </div>
                ) : activeProduct.tag ? (
                  <span className="absolute top-3.5 z-10 rounded-full bg-[#E6F4F1] text-[#2A9D8F] px-3 py-0.5 text-[9px] sm:text-[10px] font-black uppercase tracking-widest shadow">
                    {activeProduct.tag}
                  </span>
                ) : null}

                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  onError={handleImageError}
                  className={`w-full h-full object-contain rounded-[24px] pointer-events-none select-none transition-transform duration-700 drop-shadow-2xl ${
                    activeProduct.isSoldOut ? 'opacity-90 grayscale-[15%]' : ''
                  }`}
                />

                {/* BOTÓN FLOTANTE */}
                <div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className={`${
                      activeProduct.isSoldOut ? 'bg-red-600' : 'bg-[#1E222D]/90'
                    } text-white text-[9px] sm:text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1.5 border border-white/20 active:scale-95 transition-transform`}
                  >
                    <span>{activeProduct.isSoldOut ? 'AGOTADO • VER DETALLES' : 'VER DETALLES'}</span>
                  </motion.span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* VASO DERECHO (Siguiente) */}
          <motion.button
            key={`next-${nextProduct.id}`}
            onClick={handleNext}
            aria-label={`Ver producto siguiente: ${nextProduct.name}`}
            initial={{ opacity: 0, scale: 0.5, x: 280, y: 70 }}
            animate={{
              opacity: 0.85,
              scale: 0.72,
              rotate: 14,
              x: typeof window !== 'undefined' && window.innerWidth < 640 ? 145 : 280,
              y: typeof window !== 'undefined' && window.innerWidth < 640 ? 45 : 70,
            }}
            transition={springTransition}
            whileHover={{ scale: 0.78, opacity: 1 }}
            className="absolute z-20 cursor-pointer focus:outline-none group"
            style={{
              filter: 'drop-shadow(0 25px 35px rgba(0,0,0,0.45))',
            }}
          >
            <div className="relative w-[155px] h-[200px] sm:w-[195px] sm:h-[250px] rounded-[26px] sm:rounded-[34px] overflow-hidden bg-[#3E1F14]/90 p-2 border border-white/10 flex items-center justify-center">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                onError={handleImageError}
                className="w-full h-full object-contain rounded-[22px] pointer-events-none drop-shadow-lg"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-2.5 text-center">
                <span className="inline-block bg-[#1E222D]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {nextProduct.name}
                </span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* DOTS Y BOTÓN GUÍA */}
        <div className="relative z-30 mt-2 pb-6 sm:pb-8 flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            {TYHOT_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Ir al vaso ${prod.name}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 bg-white shadow-md'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsDetailView(true)}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-white/90 hover:text-white transition group py-1.5 px-4 rounded-full bg-white/15 hover:bg-white/20 backdrop-blur-md shadow-sm border border-white/20 active:scale-95 cursor-pointer"
          >
            <span className="group-hover:-translate-y-0.5 transition-transform">
              Toca el vaso para ver detalles y pedir ↑
            </span>
          </button>
        </div>

        {/* FLECHAS DE NAVEGACIÓN */}
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Producto anterior"
          className="absolute left-1 sm:left-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/85 text-[#1E222D] shadow-lg backdrop-blur-md flex items-center justify-center border border-white font-black text-base sm:text-lg active:scale-90 transition-transform cursor-pointer"
        >
          ←
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Producto siguiente"
          className="absolute right-1 sm:right-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/85 text-[#1E222D] shadow-lg backdrop-blur-md flex items-center justify-center border border-white font-black text-base sm:text-lg active:scale-90 transition-transform cursor-pointer"
        >
          →
        </button>
      </div>

      {/* 3. VISTA DE DETALLE (OVERLAY FIJO / BOTTOM SHEET) */}
      <AnimatePresence>
        {isDetailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAF7F2] flex flex-col items-center justify-between pt-12 pb-0 overflow-hidden select-none"
          >
            {/* MITAD SUPERIOR: Halo de color suave + Tarjeta interactiva con swipe horizontal */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-4 pt-4 pb-2">
              <div
                className="w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-25 pointer-events-none absolute"
                style={{ backgroundColor: activeProduct.themeColor }}
              />

              <motion.div
                key={`detail-card-${activeProduct.id}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.35}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -45) {
                    handleNext();
                  } else if (info.offset.x > 45) {
                    handlePrev();
                  }
                }}
                initial={{ scale: 0.88, y: 15, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.88, y: 15, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 cursor-grab active:cursor-grabbing touch-pan-y"
                title="Desliza horizontalmente para ver otros vasos"
              >
                <div className="w-[220px] h-[270px] sm:w-[260px] sm:h-[320px] rounded-[28px] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.35)] relative border-4 border-white/70 bg-[#3E1F14] p-3 flex items-center justify-center">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    onError={handleImageError}
                    className="w-full h-full object-contain rounded-[24px] pointer-events-none select-none drop-shadow-2xl"
                  />
                </div>
              </motion.div>
            </div>

            {/* MITAD INFERIOR: Bottom Sheet blanco compacto y estilizado */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={{ top: 0, bottom: 0.5 }}
              onDragEnd={(_, info) => {
                if (info.offset.y > 70) {
                  setIsDetailView(false);
                }
              }}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-lg mx-auto bg-white rounded-t-[32px] sm:rounded-t-[36px] pt-4 pb-8 px-6 shadow-[0_-15px_40px_rgba(0,0,0,0.12)] relative z-20 flex flex-col justify-between touch-pan-y"
            >
              {/* Barra gris superior para arrastrar */}
              <div
                onClick={() => setIsDetailView(false)}
                className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-2 cursor-pointer active:scale-95 transition-transform"
                title="Cerrar detalle"
              />

              {/* Info del producto */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span
                      style={{
                        backgroundColor: `${activeProduct.themeColor}18`,
                        color: activeProduct.themeColor,
                      }}
                      className="inline-flex items-center rounded-full px-3 py-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest border border-current/20"
                    >
                      {activeProduct.tag || 'ESPECIALIDAD TYHOT'}
                    </span>
                    {activeProduct.isSoldOut && (
                      <span className="inline-flex items-center rounded-full bg-red-600 text-white px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest shadow-sm">
                        AGOTADO
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsDetailView(false)}
                    className="text-gray-400 hover:text-gray-700 text-sm font-bold p-1 rounded-full active:scale-90 transition-transform cursor-pointer ml-auto"
                    aria-label="Cerrar detalle"
                  >
                    ✕
                  </button>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-black text-[#1E222D] uppercase leading-tight">
                  {activeProduct.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-600 mt-1 leading-relaxed">
                  {activeProduct.description}
                </p>

                {/* Línea de confianza con dot de color */}
                <p className="text-[11px] font-medium text-gray-500 mt-2 flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full inline-block shrink-0"
                    style={{ backgroundColor: activeProduct.themeColor }}
                  />
                  <span>Preparado al momento con fruta 100% fresca</span>
                </p>
              </div>

              {/* Línea divisoria sutil */}
              <div className="my-3 border-t border-gray-100" />

              {/* Fila de compra: Precio Oficial a la izquierda y Botón + AGREGAR a la derecha con color temático */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gray-400 block mb-0.5">
                    PRECIO OFICIAL
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl font-black text-[#1E222D] leading-none">
                    {formattedPrice}
                  </span>
                </div>

                <motion.button
                  whileHover={!activeProduct.isSoldOut ? { scale: 1.02 } : undefined}
                  whileTap={!activeProduct.isSoldOut ? { scale: 0.95 } : undefined}
                  animate={justAdded ? { scale: 0.95 } : { scale: 1 }}
                  type="button"
                  disabled={activeProduct.isSoldOut}
                  onClick={activeProduct.isSoldOut ? undefined : handleAddToCart}
                  style={
                    activeProduct.isSoldOut
                      ? { backgroundColor: '#9CA3AF' }
                      : !justAdded
                      ? { backgroundColor: activeProduct.themeColor }
                      : undefined
                  }
                  className={`py-3.5 px-7 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                    activeProduct.isSoldOut
                      ? 'opacity-60 cursor-not-allowed shadow-none'
                      : justAdded
                      ? 'bg-emerald-600 cursor-pointer'
                      : 'hover:brightness-95 cursor-pointer'
                  }`}
                >
                  {activeProduct.isSoldOut
                    ? 'AGOTADO'
                    : justAdded
                    ? '¡AGREGADO AL PEDIDO!'
                    : 'AGREGAR'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
