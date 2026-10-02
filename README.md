# MIRADA ANCESTRAL AI — Guía de Despliegue en Dominio Propio

**Propietario:** Gustavo Gómez  
**Copyright:** © 2026 Gustavo Gómez — Todos los derechos reservados.  
**Marca:** MIRADA ANCESTRAL AI  
**Eslogan:** Tradición milenaria. Tecnología moderna.  

---

## 1. Requisitos Previos en tu Computadora

Para compilar y trabajar con este proyecto necesitas tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).

---

## 2. Instalación y Compilación Local

Una vez descargado y descomprimido el código fuente en tu computadora:

1. Abre tu terminal o consola (PowerShell, CMD o Terminal de macOS/Linux) en la carpeta del proyecto.
2. Instala todas las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Para probar la aplicación localmente en tu navegador:
   ```bash
   npm run dev
   ```
   Abre `http://localhost:3000` en tu navegador.

4. Para generar los archivos de producción listos para tu hosting o dominio propio:
   ```bash
   npm run build
   ```
   Este comando creará una carpeta llamada **`dist/`** con todos los archivos HTML, CSS, JavaScript e imágenes optimizados y minificados.

---

## 3. Opciones para Subir a tu Dominio Propio

### Opción A: Hosting Tradicional (cPanel, Hostinger, GoDaddy, DonWeb, etc.)
1. Ingresa al panel de control de tu proveedor de hosting (cPanel / Administrador de archivos).
2. Entra a la carpeta raíz de tu dominio (generalmente llamada `public_html` o `www`).
3. Sube **todo el contenido que está dentro de la carpeta `dist/`** (no la carpeta `dist` en sí, sino los archivos que contiene: `index.html`, carpeta `assets/`, `robots.txt`, `sitemap.xml`, `.htaccess`, etc.).
4. El archivo `.htaccess` ya incluido se encargará de que las rutas internas (`/analizar-rostro`, `/blog`, `/mian-xiang`) funcionen perfectamente sin errores 404 al recargar.

### Opción B: Vercel (Recomendado, Gratuito, Rápido y con SSL Automático)
1. Crea una cuenta gratuita en [Vercel](https://vercel.com).
2. Puedes subir el proyecto directamente o conectarlo con tu repositorio de GitHub.
3. En la configuración del proyecto, Vercel detectará automáticamente que es un proyecto **Vite**.
4. Haz clic en **Deploy**.
5. Ve a la sección **Settings > Domains**, escribe tu dominio propio (por ejemplo `www.tudominio.com`) y sigue las instrucciones para apuntar los registros DNS (CNAME o A). Vercel generará el certificado de seguridad SSL HTTPS gratis y automático.

### Opción C: Netlify
1. Crea una cuenta en [Netlify](https://netlify.com).
2. Arrastra la carpeta `dist/` directamente al panel de Netlify ("Drop your site folder here").
3. Asigna tu dominio propio en la pestaña **Domain Management**. El archivo `_redirects` ya incluido asegura que todas las rutas funcionen.

---

## 4. Medidas de Seguridad para tu Dominio Propio

1. **Certificado SSL / HTTPS:** Asegúrate de activar siempre HTTPS (el candado verde). Si usas cPanel, activa "AutoSSL" o "Let's Encrypt". En Vercel/Netlify/Cloudflare es automático.
2. **Privacidad de los Usuarios:** Toda la computación de cámara y análisis visual se ejecuta en el navegador (cliente) de cada usuario mediante la API Canvas de HTML5. Ninguna fotografía sensible se envía ni se almacena en bases de datos externas.
3. **Google AdSense:** Cuando tu dominio propio esté activo con HTTPS y tráfico, asocia la URL en tu panel de Google AdSense (`gsordo@gmail.com`) y reemplaza tu código publicitario en `src/config/siteConfig.ts` cambiando `adsenseEnabled: true`.
4. **Google Search Console:** Envía tu archivo sitemap (`https://tudominio.com/sitemap.xml`) en Google Search Console para indexar de inmediato los 20 artículos del blog y las herramientas principales.
