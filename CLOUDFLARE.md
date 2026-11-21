# Conectar GPT-6 Luna a Diario diario

La app se publica con GitHub Pages. El modo local del perezoso funciona desde el enlace del diario. Para usar GPT-6 Luna, se conecta un Worker aparte.

1. En [Cloudflare](https://dash.cloudflare.com/), entrá a **Workers & Pages** y creá un **Worker** en el plan **Free**. Elegí el ejemplo inicial y llamalo `diario-diario-api`.
2. Abrí **Edit code**, reemplazá el ejemplo por el contenido de [worker.mjs](worker.mjs) y tocá **Deploy**.
3. En **Settings → Variables and Secrets → Add**, configurá:

   | Nombre | Tipo | Valor |
   | --- | --- | --- |
   | `ALLOWED_ORIGIN` | Text | `https://aica-code-studio.github.io` |
   | `OPENAI_API_KEY` | Secret | La clave de tu proyecto de la API de OpenAI |
   | `DIARY_ACCESS_CODE` | Secret | Un código aleatorio exclusivo del diario, de 24 caracteres o más |

   Guardá y aplicá los cambios. Copiá la dirección HTTPS del Worker que termina en `.workers.dev`.

4. En [Diario diario](https://aica-code-studio.github.io/diario-diario/), tocá el **perezoso → Configurar GPT**. Pegá la dirección del Worker y el código del diario. Tocá **Conectar**. En el encabezado del chat tiene que aparecer **GPT-6 Luna**. El código del diario se puede compartir con quien lo vaya a usar y se conserva durante la sesión.
5. Probá con un mensaje como «¿Qué puedo almorzar?». La casilla de comidas recientes permite adjuntar hasta 40 nombres, fechas, momentos y caritas. Los datos de las otras secciones y las fotos quedan en el dispositivo.

El plan Workers Free cubre el alojamiento dentro de sus límites. Las respuestas se cobran según el consumo de tu cuenta de la API de OpenAI. La clave de OpenAI va únicamente como secreto del Worker.
