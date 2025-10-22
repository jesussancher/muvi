# SEO Quick Start - Ver Muvi

## ✅ ¿Qué se implementó?

Tu sitio ahora tiene SEO completo para aparecer en Google y LLMs cuando alguien busque películas. Cada película tiene su propia página optimizada que aparecerá en resultados de búsqueda.

## 🚀 Cómo usarlo

### 1. Configurar Variables de Entorno (IMPORTANTE)

Si aún no tienes un archivo `.env`, créalo copiando `env.template`:

```bash
cp env.template .env
```

Edita `.env` y agrega tus credenciales de TMDB (ya las debes tener):

```
REACT_APP_TMDB_ACCESS_TOKEN=tu_token_aqui
REACT_APP_TMDB_API_KEY=tu_api_key_aqui
```

### 2. Generar el Sitemap

```bash
npm run generate-sitemap
```

Esto creará `public/sitemap.xml` con ~2,500 URLs de películas y series.

### 3. Build y Deploy

```bash
npm run build
```

El sitemap se genera automáticamente antes del build. Luego despliega a Vercel como siempre.

## 📊 Verificar que funcione

### En Local

1. **Iniciar el servidor**:

   ```bash
   npm start
   ```

2. **Abrir una película**: http://localhost:3000/movie/550

3. **Ver el código fuente**: Click derecho > "Ver código fuente"

4. **Buscar**: Debes ver en el `<head>`:
   - `<title>Fight Club (1999) | Ver Muvi - Películas Online</title>`
   - Meta tags con descripción de la película
   - Schema.org JSON-LD con datos estructurados

### En Producción

1. **Sitemap**: https://vermuvi.com/sitemap.xml

   - Debe mostrar XML con todas las URLs

2. **Robots**: https://vermuvi.com/robots.txt

   - Debe permitir bots y referenciar el sitemap

3. **Meta tags en película**: https://vermuvi.com/movie/550
   - View Source y verificar meta tags dinámicas

## 🔍 Indexar en Google

### Paso 1: Google Search Console

1. Ve a: https://search.google.com/search-console
2. Agrega tu propiedad: `vermuvi.com`
3. Verifica la propiedad (método DNS o HTML file)

### Paso 2: Enviar Sitemap

1. En Search Console, ve a "Sitemaps"
2. Agrega: `https://vermuvi.com/sitemap.xml`
3. Enviar

### Paso 3: Solicitar Indexación

1. Ve a "Inspección de URLs"
2. Ingresa URL importante: `https://vermuvi.com/movie/550`
3. Click "Solicitar indexación"
4. Repite con 5-10 películas populares

### Paso 4: Esperar

- **Primeras indexaciones**: 2-7 días
- **Indexación completa**: 2-4 semanas
- **Ranking mejorado**: 1-3 meses

## 🤖 Para que LLMs te encuentren

Los LLMs (ChatGPT, Claude, etc.) ahora pueden indexarte porque:

1. ✅ Robots.txt permite GPTBot, ChatGPT-User, Claude-Web
2. ✅ Sitemap lista todas las páginas
3. ✅ Schema.org markup ayuda a entender el contenido
4. ✅ Meta descriptions claras

No hay que hacer nada adicional, solo esperar a que rastreen el sitio.

## 🎯 Resultados Esperados

### En Google

Cuando alguien busque:

- **"Ver Fight Club online"** → Aparecerá tu página `/movie/550`
- **"Fight Club 1999 reparto"** → Aparecerá tu página con info del cast
- **"Películas de drama"** → Puede aparecer tu home

### En LLMs

Cuando pregunten:

- **"¿Dónde puedo ver Fight Club?"** → Puede sugerir vermuvi.com
- **"¿Cuál es el rating de Fight Club?"** → Puede citar datos de tu sitio

## 📈 Monitoreo

### Google Search Console

Revisa cada semana:

- **Cobertura**: Cuántas páginas están indexadas
- **Rendimiento**: Impresiones y clicks
- **Problemas**: Errores de indexación

### Analytics (Recomendado)

Instala Google Analytics 4 para ver:

- Tráfico orgánico
- Páginas más visitadas
- Keywords que generan tráfico

## 🔧 Mantenimiento

### Semanal/Mensual

Regenera el sitemap para incluir nuevas películas:

```bash
npm run generate-sitemap
npm run build
git add public/sitemap.xml
git commit -m "Update sitemap"
git push
```

### Cuando agregues contenido

Si agregas nuevas secciones o páginas importantes:

1. Agregar meta tags con Helmet
2. Agregar al sitemap
3. Solicitar indexación en Search Console

## ❓ Troubleshooting

### "No se genera el sitemap"

- Verifica que `.env` tenga las credenciales de TMDB
- Revisa la consola del build para errores
- Prueba ejecutar: `node scripts/generate-sitemap.js`

### "Google no indexa mis páginas"

- Verifica robots.txt: debe permitir Googlebot
- Verifica sitemap: debe estar accesible públicamente
- Espera más tiempo (puede tomar semanas)
- Solicita indexación manual en Search Console

### "Las meta tags no aparecen"

- Verifica que Helmet esté importado
- Verifica en View Source, no en DevTools Elements
- Los bots ven el HTML pre-renderizado

### "Build tarda mucho"

Es normal, el sitemap consulta ~100 páginas de TMDB. Puedes:

- Reducir páginas en `generate-sitemap.js`
- O ejecutar el script por separado, no en prebuild

## 📚 Más Información

Lee `SEO_IMPLEMENTATION.md` para detalles técnicos completos.

## ✨ Resumen

Ya está todo listo. Solo necesitas:

1. ✅ Tener `.env` con credenciales TMDB
2. ✅ Hacer `npm run build`
3. ✅ Deployar a Vercel
4. ✅ Agregar sitemap en Google Search Console
5. ⏰ Esperar 2-4 semanas

Tu sitio ahora aparecerá en Google cuando busquen películas. 🎬🔍
