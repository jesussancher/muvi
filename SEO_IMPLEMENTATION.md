# Implementación SEO para Ver Muvi

## Resumen

Se ha implementado una solución completa de SEO para mejorar la visibilidad de vermuvi.com en Google y LLMs. La implementación incluye meta tags dinámicas, Schema.org markup, sitemap automático y optimizaciones para bots de búsqueda.

## Características Implementadas

### 1. Meta Tags Dinámicas (react-helmet-async)

Cada página ahora tiene meta tags específicas y optimizadas:

#### Páginas de Películas (`/movie/:id`)

- **Title**: `{Título de la Película} ({Año}) | Ver Muvi - Películas Online`
- **Description**: Primeros 155 caracteres del overview
- **Keywords**: Géneros + keywords de TMDB + términos generales
- **Open Graph**: Tipo `video.movie` con poster de alta calidad
- **Schema.org**: Markup completo de tipo `Movie` con:
  - Nombre, descripción, imagen
  - Fecha de lanzamiento, géneros, duración
  - Rating agregado (estrellas + votos)
  - Director y cast principal
  - URL canónica

#### Páginas de Series (`/tv/:id`)

- **Title**: `{Título de la Serie} ({Año}) | Ver Muvi - Series Online`
- **Schema.org**: Markup tipo `TVSeries` con:
  - Número de temporadas y episodios
  - Estado de la serie
  - Red de transmisión

#### Página Principal (`/`)

- **Title**: `Ver Muvi - Catálogo de Películas y Series Online | Streaming`
- **Schema.org**: Markup tipo `WebSite` con SearchAction
- Open Graph optimizado para compartir en redes sociales

#### Página de Series (`/tv`)

- Meta tags específicas para la sección de series de TV

### 2. Sitemap Automático

**Script**: `scripts/generate-sitemap.js`

Genera un sitemap.xml completo con:

- **~1,500+ películas** (populares y top-rated)
- **~1,000+ series de TV** (populares y top-rated)
- **3 páginas estáticas** (home, tv, favorites)
- Prioridades dinámicas basadas en popularidad
- Fechas de última modificación
- Frecuencias de actualización

**Uso**:

```bash
# Generar sitemap manualmente
npm run generate-sitemap

# Se genera automáticamente antes de cada build
npm run build
```

**Nota**: Requiere variables de entorno:

- `REACT_APP_TMDB_API_KEY` o
- `REACT_APP_TMDB_ACCESS_TOKEN`

### 3. Pre-renderizado con react-snap

Las páginas principales se pre-renderizan estáticamente para mejor indexación:

- Home (`/`)
- TV Series (`/tv`)
- Favorites (`/favorites`)

Los bots de Google verán HTML completo con contenido en lugar de una SPA vacía.

### 4. Robots.txt Optimizado

El archivo `robots.txt` ahora incluye:

- Referencia al sitemap
- Permisos específicos para:
  - **Bots de búsqueda**: Googlebot, Bingbot
  - **LLM Bots**: GPTBot, ChatGPT-User, Claude-Web, anthropic-ai, Google-Extended
  - **Social Media**: facebookexternalhit, Twitterbot

### 5. Configuración de Vercel

Headers HTTP optimizados para SEO:

- Cache-Control para sitemap y robots.txt
- Headers de seguridad (X-Content-Type-Options, X-Frame-Options)
- Cache inmutable para assets estáticos
- Content-Type correcto para XML y texto plano

### 6. Manifest.json Mejorado

PWA manifest actualizado con:

- Nombre descriptivo
- Descripción completa
- Categorías (entertainment, movies, tv)
- Idioma español
- Iconos con purpose "maskable"

## Cómo Funciona

### Flujo de Build

```
1. prebuild: Genera sitemap.xml desde TMDB API
2. build: Compila la aplicación React
3. react-snap: Pre-renderiza páginas principales
4. postbuild: Confirmación de completado
```

### Meta Tags Dinámicas

Cada vez que un usuario (o bot) visita una página de detalle:

1. **MovieDetails.jsx** o **TVSeriesDetails.jsx** carga datos de TMDB
2. **Helmet** actualiza el `<head>` del documento con:
   - Title específico de la película/serie
   - Description del overview
   - Keywords de géneros + tags de TMDB
   - Open Graph tags para redes sociales
   - Schema.org JSON-LD para buscadores

### Sitemap Automático

El script `generate-sitemap.js`:

1. Se conecta a TMDB API usando credenciales de `.env`
2. Obtiene películas populares (50 páginas = ~1000 películas)
3. Obtiene películas top-rated (25 páginas = ~500 películas)
4. Obtiene series populares y top-rated (~1000 series)
5. Elimina duplicados
6. Genera XML con prioridades basadas en popularidad
7. Guarda en `public/sitemap.xml`

## Verificación

### 1. Verificar Meta Tags

Visita cualquier página de película y revisa el código fuente (View Source):

```html
<title>Inception (2010) | Ver Muvi - Películas Online</title>
<meta name="description" content="..." />
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Movie",
    ...
  }
</script>
```

### 2. Verificar Sitemap

Accede a: `https://vermuvi.com/sitemap.xml`

Debe mostrar todas las URLs de películas, series y páginas estáticas.

### 3. Verificar Robots.txt

Accede a: `https://vermuvi.com/robots.txt`

Debe mostrar permisos para bots y referencia al sitemap.

### 4. Google Rich Results Test

1. Ve a: https://search.google.com/test/rich-results
2. Ingresa una URL de película: `https://vermuvi.com/movie/550`
3. Verifica que detecte el Schema.org Movie markup

### 5. Google Search Console

1. Agrega el sitemap: `https://vermuvi.com/sitemap.xml`
2. Solicita indexación de páginas importantes
3. Monitorea el rendimiento en 2-4 semanas

## Próximos Pasos

### Inmediatos (Ya implementado)

- ✅ Meta tags dinámicas en todas las páginas
- ✅ Schema.org markup para películas y series
- ✅ Sitemap automático
- ✅ Robots.txt optimizado
- ✅ Pre-renderizado de páginas principales

### Recomendaciones Futuras

1. **Google Search Console**

   - Registrar el sitio
   - Enviar sitemap
   - Monitorear indexación

2. **Regeneración Periódica del Sitemap**

   - Configurar un CRON job o GitHub Action
   - Regenerar sitemap semanalmente para incluir nuevas películas

3. **Páginas Pre-renderizadas Dinámicas**

   - Considerar Next.js para SSR completo
   - Pre-renderizar top 100 películas más populares

4. **Backlinks y Contenido**

   - Crear blog con reseñas
   - Compartir en redes sociales
   - Colaboraciones con sitios de cine

5. **Performance**

   - Optimizar imágenes (WebP)
   - Lazy loading de componentes
   - CDN para assets

6. **Analytics**
   - Google Analytics 4
   - Tracking de búsquedas
   - Monitoreo de conversiones

## Recursos y Herramientas

### Validación

- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Schema.org Validator](https://validator.schema.org/)
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)

### Monitoreo

- [Google Search Console](https://search.google.com/search-console)
- [Bing Webmaster Tools](https://www.bing.com/webmasters)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### Documentación

- [Schema.org Movie](https://schema.org/Movie)
- [Schema.org TVSeries](https://schema.org/TVSeries)
- [Open Graph Protocol](https://ogp.me/)
- [Sitemaps.org](https://www.sitemaps.org/)

## Mantenimiento

### Actualizar Sitemap

```bash
# Localmente
npm run generate-sitemap

# En CI/CD (antes del deploy)
npm run build  # Ya incluye generación de sitemap
```

### Verificar Funcionamiento

```bash
# Iniciar desarrollo
npm start

# Verificar que Helmet funcione
# Abrir DevTools > Elements > <head>
# Deben verse meta tags dinámicas

# Build de producción
npm run build

# Verificar sitemap
cat build/sitemap.xml
```

## Notas Importantes

1. **Variables de Entorno**: El script de sitemap requiere credenciales de TMDB en `.env`

2. **Rate Limiting**: El script tiene delays de 250ms entre requests a TMDB para respetar rate limits

3. **Build Time**: La generación del sitemap añade ~30-60 segundos al tiempo de build

4. **react-snap**: Puede generar warnings durante el build, es normal

5. **Vercel**: La configuración en `vercel.json` ya está optimizada para el hosting

## Soporte

Para problemas o dudas sobre la implementación SEO:

- Revisar logs del build
- Verificar variables de entorno
- Consultar documentación de TMDB API
- Validar meta tags con herramientas mencionadas

---

**Implementado**: Octubre 2025
**Stack**: React + react-helmet-async + react-snap + TMDB API
**Hosting**: Vercel
