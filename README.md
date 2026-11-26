# 💍 Invitación Digital de Boda · Sofía & Mateo
### Arquitectura Modelo-Vista-Controlador (MVC)

Aplicación web interactiva para invitación de Boda con confirmación de asistencia en tiempo real (RSVP), generación de enlaces personalizados con firma de seguridad, integración directa con WhatsApp, música ambiental y panel de control para los novios/anfitriones.

---

## 📂 Archivos principales

- `invitacion.html` — Invitación digital pública de boda (Paleta Nupcial: Marfil, Champán, Dorado y Azul Noche).
- `index.html` / `admin.html` — Panel de Anfitriones VIP (clave por defecto: `bodasofiamateo2026`).
- `css/boda-theme.css` & `css/variables.css` — Sistema de diseño y tokens de la paleta nupcial.
- `js/models/` (`EventoModel.js`, `InvitadoModel.js`, `ConfirmacionDAO.js`) — Datos de la boda, validaciones y persistencia.
- `js/views/` & `js/controllers/` — Vistas y controladores MVC.
- `server.js` — Servidor HTTP local en Node.js (`npm start`).

---

## 🚀 Ejecución rápida

1. **Con Node.js**:
   ```bash
   npm start
   ```
   Abre `http://localhost:3000/invitacion.html` para ver la invitación o `http://localhost:3000/` para el panel de anfitriones.
2. **Directo en navegador**:
   Abre `invitacion.html` o `index.html`.
