# Generador de Códigos QR

Sitio web estático para generar códigos QR a partir de una URL, con opciones de personalización (tamaño, color de puntos, color de fondo, estilo de puntos y nivel de corrección de errores). Permite descargar el QR en PNG, JPEG, WEBP o SVG.

## Características
- Input para pegar una URL.
- Botón para generar el QR.
- Vista previa del QR generado.
- Descarga en PNG/JPEG/SVG/WEBP.
- Personalización: tamaño, margen, colores, estilo de puntos y nivel de corrección de errores.
- Interfaz responsive y accesible.

## Vista rápida
Abre `index.html` en tu navegador (no requiere servidor). Asegúrate de tener conexión a Internet para cargar la librería del QR desde CDN.

## Uso
1. Pega tu URL en el campo "URL" (debe comenzar con `http://` o `https://`).
2. Ajusta el tamaño, margen, corrección de errores y colores.
3. Elige el estilo de puntos.
4. Haz clic en "Generar QR" para actualizar la vista previa.
5. Selecciona el formato y pulsa "Descargar" para guardar la imagen.

## Tecnologías
- HTML, CSS, JavaScript
- qr-code-styling (desde CDN)

## Estructura
index.html
style.css
app.js
README.md
LICENSE
captures/

## Capturas sugeridas
Guarda en `captures/` imágenes de:
- Pantalla principal con campos y controles.
- Un QR generado.
- Descarga del archivo.
- Foto escaneando el QR con el celular.

## Servir localmente (opcional)
PowerShell en Windows:

```
python -m http.server 8080
```

Luego visita `http://localhost:8080`.

## Licencia
MIT - ver `LICENSE`.

## Créditos
Actividad académica: Generador de QR. Librería QR: qr-code-styling.
