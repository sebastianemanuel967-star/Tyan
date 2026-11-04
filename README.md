# Sebastián Mena — Podcast & Pensamiento Editorial

Página web personal minimalista bajo la estética **"Quiet Luxury"** (inspirada en marcas como *Aesop*, *Kinfolk* y estudios de arquitectura contemporánea).

---

## Estructura del Proyecto

```text
sebastian-mena-podcast/
├── index.html       # Web completa (HTML5 + Tailwind CSS + Lucide Icons + JS interactivo)
├── server.ps1       # Servidor HTTP local ligero nativo en PowerShell (.NET)
├── start.bat        # Acceso directo para ejecutar el servidor con doble clic
└── README.md        # Documentación y guía de uso
```

---

## Cómo Probar y Visualizar

### Opción 1: Abrir directamente en el navegador (Sin servidor)
Haz doble clic en `index.html` o ábrelo con Chrome, Edge o Firefox. Funciona al 100% gracias a los CDNs de Tailwind y Lucide.

### Opción 2: Ejecutar el servidor local HTTP (Recomendado)
Haz doble clic en `start.bat` o ejecuta en la consola:
```powershell
powershell -ExecutionPolicy Bypass -File .\server.ps1 -Port 8080
```
Abrirá automáticamente tu navegador en `http://localhost:8080`.

---

## Características Implementadas

1. **Header Minimalista Fijo:**
   - Tipografía serif de amplio espaciado ("SEBASTIÁN MENA").
   - Enlaces de navegación con transiciones suaves.
   - Selector discreto de **Modo Oscuro Luxury** (Alabastro / Obsidiana).

2. **Hero Editorial Asimétrico:**
   - Titular principal con cursivas y acentos en bronce.
   - Enlaces directos a plataformas de escucha (Spotify, Apple Podcasts, YouTube).
   - Retrato editorial con marco ultrafino.

3. **Episodio Destacado + Reproductor Persistente (Sticky Bottom Player):**
   - Reproductor fijado en la parte inferior de la pantalla.
   - Contador de tiempo dinámico, barra de progreso interactiva con búsqueda (*seeking*).
   - Selector de velocidad (`1.0x`, `1.2x`, `1.5x`, `2.0x`).
   - Ecualizador visual animado sincronizado con el estado de reproducción.

4. **Archivo de Episodios Estilo Índice:**
   - Tabla editorial numerada tipo revista Kinfolk.
   - Filtros por categorías (*Filosofía*, *Crecimiento*, *Disciplina*).
   - Carga instantánea de cualquier episodio al reproductor inferior.

5. **Sección "Quién Soy":**
   - Fotografía editorial en blanco y negro a la izquierda.
   - Narrativa personal auténtica y mención a sus libros *El Cementerio de los Propósitos Olvidados* y *Las Cicatrices del Alma*.
   - Acordeón interactivo con sus 4 pilares: Escritura, Podcast, Música & Arte, y Emprendimiento.

6. **Obras Literarias:**
   - Presentación de sus dos libros en tapa dura y digital.

7. **Carta Privada (Newsletter):**
   - Input minimalista de línea inferior ("Ideas que merecen silencio") con confirmación interactiva.

8. **Footer Minimalista:**
   - Cita sobre el silencio, mapa del sitio y enlaces a redes sociales.
