'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface TyazucaProduct {
  id: string;
  name: string;
  displayName?: string;
  tag?: string;
  tagType?: 'green' | 'orange' | 'default';
  description: string;
  price: string;
  priceNum: number;
  arcColor: string;
  themeColor?: string;
  accentBg: string;
  image: string;
}

export const TYAZUCA_PRODUCTS: TyazucaProduct[] = [
  {
    id: 'azuca_raffaello',
    name: 'RAFFAELLO',
    displayName: 'RAFFAELLO',
    tag: 'POPULAR',
    tagType: 'green',
    description: 'Fresas frescas con crema Velvet y Raffaello',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#8A1C22',
    themeColor: '#8A1C22',
    accentBg: '#5c1318',
    image: '/raffaello.jpg',
  },
  {
    id: 'azuca_paccari',
    name: 'PACCARI',
    displayName: 'PACCARI',
    tag: '',
    tagType: 'default',
    description: 'Fresas cremosas con chocolate Paccari',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#3D1E12',
    themeColor: '#3D1E12',
    accentBg: '#2a140c',
    image: '/paccari.jpg',
  },
  {
    id: 'azuca_franui',
    name: 'FRANUI',
    displayName: 'STRAWBERRY & FRANUI',
    tag: 'NUEVO',
    tagType: 'green',
    description: 'Fresas con crema Velvet y Franui',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#6B1323',
    themeColor: '#6B1323',
    accentBg: '#470c17',
    image: '/franui.jpg',
  },
  {
    id: 'azuca_kinder_bueno',
    name: 'KINDER BUENO',
    displayName: 'KINDER BUENO',
    tag: '',
    tagType: 'default',
    description: 'Fresas frescas con crema Velvet y Kinder Bueno',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#593720',
    themeColor: '#593720',
    accentBg: '#3d2415',
    image: '/kinder-bueno.jpg',
  },
  {
    id: 'azuca_mango_raffaello',
    name: 'MANGO & RAFFAELLO',
    displayName: 'MANGO & RAFFAELLO',
    tag: 'EDICIÓN LIMITADA',
    tagType: 'orange',
    description: 'Mango fresco con crema Velvet y Raffaello',
    price: '$4.50',
    priceNum: 4.5,
    arcColor: '#C87A19',
    themeColor: '#C87A19',
    accentBg: '#8c520a',
    image: '/mango-raffaello.jpg',
  },
];

interface TyazucaSectionProps {
  onAddToCart?: (product: TyazucaProduct) => void;
  className?: string;
}

export default function TyazucaSection({ onAddToCart, className = '' }: TyazucaSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDetailView, setIsDetailView] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const total = TYAZUCA_PRODUCTS.length;
  const activeProduct = TYAZUCA_PRODUCTS[currentIndex];
  const activeIndex = currentIndex;

  const prevIndex = (currentIndex - 1 + total) % total;
  const nextIndex = (currentIndex + 1) % total;

  const prevProduct = TYAZUCA_PRODUCTS[prevIndex];
  const nextProduct = TYAZUCA_PRODUCTS[nextIndex];

  // Precio estrictamente oficial del producto
  const formattedPrice = activeProduct.price || `$${(activeProduct.priceNum || 4.50).toFixed(2)}`;

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
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // 3. Gestor táctil horizontal exclusivo para cambiar entre los 5 vasos (Scroll vertical nativo completamente libre)
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

    // Solo si el gesto fue principalmente horizontal
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

  // 4. Conexión del botón al carrito real global de la app
  const handleAddToCart = (e?: React.MouseEvent) => {
    if (e && typeof e.stopPropagation === 'function') {
      e.stopPropagation();
    }

    const formattedProduct: TyazucaProduct & {
      category: string;
    } = {
      ...activeProduct,
      category: 'TYAZUCA',
    };

    if (onAddToCart) {
      onAddToCart(formattedProduct);
    }

    // Compatibilidad directa con la función global de la app si está disponible
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

  const renderTag = (product: TyazucaProduct) => {
    if (!product.tag) return null;
    const isGreen = product.tagType === 'green';
    const isOrange = product.tagType === 'orange';

    return (
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-widest uppercase transition-all duration-300 ${
          isGreen
            ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
            : isOrange
            ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
            : 'bg-purple-900/10 text-[#5B4B8A] border border-[#5B4B8A]/30'
        }`}
      >
        {product.tag}
      </span>
    );
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
      aria-label="Catálogo TYAZUCA 3D"
    >
      {/* 1. CABECERA DINÁMICA QUE LLENA EL ESPACIO BLANCO SUPERIOR */}
      <div className="relative z-20 text-center pt-4 pb-1 px-4">
        <span className="block text-[10px] font-bold uppercase tracking-[0.28em] text-gray-400">
          Línea Dulce &amp; Frutas Velvet
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
              <span
                style={{
                  backgroundColor: `${activeProduct.themeColor || activeProduct.arcColor}18`,
                  color: activeProduct.themeColor || activeProduct.arcColor,
                }}
                className="inline-flex items-center rounded-full px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest mb-1"
              >
                {activeProduct.tag || 'ESPECIALIDAD TYAZUCA'}
              </span>

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
            backgroundColor: activeProduct.themeColor || activeProduct.arcColor,
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
                id="perfectCircleArc"
                d="M 55,600 A 545,545 0 1,1 1145,600 A 545,545 0 1,1 55,600"
                fill="transparent"
              />
            </defs>
            <text className="fill-white text-[50px] md:text-[68px] font-serif uppercase tracking-[0.16em]">
              <textPath href="#perfectCircleArc" startOffset="0%">
                • FRUTAS FRESCAS • CREMA VELVET • TYAZUCA • FRUTAS FRESCAS • CREMA VELVET • TYAZUCA • FRUTAS FRESCAS • CREMA VELVET •
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
            <div className="relative w-[155px] h-[200px] sm:w-[195px] sm:h-[250px] rounded-[26px] sm:rounded-[34px] overflow-hidden">
              <img
                src={prevProduct.image}
                alt={prevProduct.name}
                className="w-full h-full object-cover rounded-[26px] sm:rounded-[34px] pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-2.5 text-center">
                <span className="inline-block bg-[#2B1627]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
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
              <div className="relative overflow-hidden rounded-[28px] sm:rounded-[36px] w-[215px] h-[275px] sm:w-[260px] sm:h-[330px]">
                <img
                  src={activeProduct.image}
                  alt={activeProduct.name}
                  className="w-full h-full object-cover rounded-[28px] sm:rounded-[36px] pointer-events-none select-none transition-transform duration-700"
                />

                <div className="absolute inset-x-0 bottom-3 sm:bottom-4 flex justify-center">
                  <motion.span
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="bg-[#2B1627]/90 text-white text-[9px] sm:text-[11px] font-black px-3.5 py-1.5 rounded-full shadow-lg backdrop-blur-md flex items-center gap-1 border border-white/20 active:scale-95 transition-transform"
                  >
                    <span>VER DETALLES</span>
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
            <div className="relative w-[155px] h-[200px] sm:w-[195px] sm:h-[250px] rounded-[26px] sm:rounded-[34px] overflow-hidden">
              <img
                src={nextProduct.image}
                alt={nextProduct.name}
                className="w-full h-full object-cover rounded-[26px] sm:rounded-[34px] pointer-events-none"
                loading="lazy"
              />
              <div className="absolute inset-x-0 bottom-2.5 text-center">
                <span className="inline-block bg-[#2B1627]/85 backdrop-blur-md text-white text-[9px] sm:text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                  {nextProduct.name}
                </span>
              </div>
            </div>
          </motion.button>
        </div>

        {/* 2. LIMPIEZA DEL CARRUSEL: Solo Dots y Botón para ver detalles (Sin botón amarillo ni precio en carrusel) */}
        <div className="relative z-30 mt-2 pb-6 sm:pb-8 flex flex-col items-center gap-3">
          {/* Puntos de paginación */}
          <div className="flex items-center gap-2">
            {TYAZUCA_PRODUCTS.map((prod, idx) => (
              <button
                key={prod.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Ir al vaso ${prod.name}`}
                className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                  idx === activeIndex
                    ? 'w-7 bg-white shadow-md'
                    : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Botón interactivo limpio */}
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
          className="absolute left-1 sm:left-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/85 text-[#2B1627] shadow-lg backdrop-blur-md flex items-center justify-center border border-white font-black text-base sm:text-lg active:scale-90 transition-transform cursor-pointer"
        >
          ←
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Producto siguiente"
          className="absolute right-1 sm:right-4 z-40 w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white/85 text-[#2B1627] shadow-lg backdrop-blur-md flex items-center justify-center border border-white font-black text-base sm:text-lg active:scale-90 transition-transform cursor-pointer"
        >
          →
        </button>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          1. OVERLAY FIJO A PANTALLA COMPLETA (VISTA DE DETALLE)
          Solución definitiva: z-40 fijo, no se corta con el footer
      ═══════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isDetailView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#FAF7F2] flex flex-col items-center justify-between pt-12 pb-0 overflow-hidden select-none"
          >
            {/* MITAD SUPERIOR: Halo de color suave suave y tarjeta morada con swipe horizontal entre vasos */}
            <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-4 pt-4 pb-2">
              {/* 1. Halo de color suave (w-72 h-72 blur-3xl opacity-25) sin letras cortadas */}
              <div
                className="w-72 h-72 sm:w-96 sm:h-96 rounded-full blur-3xl opacity-25 pointer-events-none absolute"
                style={{ backgroundColor: activeProduct.themeColor || activeProduct.arcColor }}
              />

              {/* 1 & 2. Tarjeta del vaso con swipe horizontal drag="x" para navegar entre vasos sin salir */}
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
                <div className="w-[220px] h-[270px] sm:w-[260px] sm:h-[320px] rounded-[28px] overflow-hidden shadow-[0_25px_50px_rgba(0,0,0,0.28)] relative border-4 border-white/70 bg-[#2B1627]">
                  <img
                    src={activeProduct.image}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover rounded-[24px] pointer-events-none select-none"
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

              {/* Info del producto: Tag dinámico + Botón cerrar + Título serif + Descripción + Línea de confianza */}
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span
                    style={{
                      backgroundColor: `${activeProduct.themeColor || activeProduct.arcColor}18`,
                      color: activeProduct.themeColor || activeProduct.arcColor,
                    }}
                    className="inline-flex items-center rounded-full px-3 py-0.5 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest border border-current/20"
                  >
                    {activeProduct.tag || 'ESPECIALIDAD TYAZUCA'}
                  </span>

                  <button
                    type="button"
                    onClick={() => setIsDetailView(false)}
                    className="text-gray-400 hover:text-gray-700 text-sm font-bold p-1 rounded-full active:scale-90 transition-transform cursor-pointer"
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
                    style={{ backgroundColor: activeProduct.themeColor || activeProduct.arcColor || '#5B4B8A' }}
                  />
                  <span>Preparado al momento con fruta 100% fresca</span>
                </p>
              </div>

              {/* Línea divisoria sutil */}
              <div className="my-3 border-t border-gray-100" />

              {/* Fila de compra: Precio Oficial a la izquierda y Botón + AGREGAR a la derecha */}
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
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  animate={justAdded ? { scale: 0.95 } : { scale: 1 }}
                  type="button"
                  onClick={handleAddToCart}
                  style={
                    !justAdded
                      ? { backgroundColor: activeProduct.themeColor || activeProduct.arcColor || '#5B4B8A' }
                      : undefined
                  }
                  className={`py-3.5 px-7 rounded-full font-black text-xs sm:text-sm tracking-wider uppercase text-white shadow-lg flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                    justAdded ? 'bg-emerald-600' : 'hover:brightness-95'
                  }`}
                >
                  {justAdded ? '¡AGREGADO AL PEDIDO!' : 'AGREGAR'}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
