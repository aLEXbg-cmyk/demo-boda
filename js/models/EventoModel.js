/**
 * ========================================================
 * MODELO: EventoModel.js (Arquitectura MVC)
 * Encapsula la información, fechas, ubicaciones y lógica de negocio
 * del evento de Boda (Sofía & Mateo).
 * ========================================================
 */

class EventoModel {
    constructor() {
        this.datos = {
            quinceanera: {
                nombre: "Sofía & Mateo",
                apellidos: "Mendoza & Navarro",
                titulo: "Nuestra Boda",
                frase: "El amor verdadero no tiene final feliz, porque el amor verdadero nunca termina. Hoy unimos nuestras vidas para caminar juntos por siempre.",
                foto: "assets/whatsapp-preview.jpg"
            },
            padres: {
                papa: "Carlos Mendoza Silva",
                mama: "Elena Ramírez Torres"
            },
            padrinos: {
                padrino: "Roberto Navarro Ruiz",
                madrina: "Patricia Vega Morales"
            },
            fechaEvento: new Date("2026-11-21T17:30:00"),
            fechaLimiteConfirmacion: new Date("2026-11-10T23:59:59"),
            ceremonia: {
                tipo: "Ceremonia Religiosa",
                lugar: "Templo Expiatorio del Sagrado Corazón",
                hora: "17:30 hrs",
                direccion: "Madero 721, Centro Histórico, C.P. 37000 León, Gto.",
                mapsUrl: "https://www.google.com/maps/search/?api=1&query=Templo+Expiatorio+del+Sagrado+Corazon+Leon+Gto"
            },
            recepcion: {
                tipo: "Recepción y Fiesta",
                lugar: "Hacienda Los Ángeles",
                hora: "19:30 hrs",
                direccion: "Blvd. Campestre 2100, Lomas del Campestre, León, Gto.",
                mapsUrl: "https://www.google.com/maps/search/?api=1&query=Hacienda+Los+Angeles+Blvd+Campestre+Leon+Gto"
            },
            itinerario: [
                { hora: "17:30 hrs", titulo: "Ceremonia Religiosa", descripcion: "Templo Expiatorio del Sagrado Corazón" },
                { hora: "19:30 hrs", titulo: "Cóctel de Bienvenida", descripcion: "Hacienda Los Ángeles" },
                { hora: "20:30 hrs", titulo: "Entrada de los Novios & Primer Baile", descripcion: "Nuestro primer baile como esposos" },
                { hora: "21:30 hrs", titulo: "Cena de Gala", descripcion: "Banquete formal en tres tiempos" },
                { hora: "22:45 hrs", titulo: "Brindis & Pastel", descripcion: "Palabras de agradecimiento" },
                { hora: "23:15 hrs", titulo: "¡Apertura de Pista & Fiesta!", descripcion: "Música, show y celebración bajo las estrellas" }
            ],
            codigoVestimenta: {
                tipo: "Rigurosa Etiqueta",
                nota: "Damas: Vestido largo de noche · Caballeros: Smoking o traje oscuro."
            },
            regalos: {
                tipo: "Mesa de Regalos & Lluvia de Sobres",
                mensaje: "Tu presencia en nuestra boda es el mayor regalo. Si deseas tener un detalle con nosotros, contaremos con mesa de regalos departamental y lluvia de sobres en la recepción.",
                tienda: "Mesa Departamental & Lluvia de Sobres disponible en la Recepción"
            },
            contactoWhatsApp: "524774097517",
            musica: {
                titulo: "Para Elisa, Beethoven",
                artista: "Ludwig van Beethoven"
            }
        };
    }

    /**
     * Obtiene todos los datos del evento
     */
    getDatos() {
        return this.datos;
    }

    /**
     * Calcula la diferencia de tiempo hasta la fecha del evento
     */
    obtenerTiempoRestante() {
        const ahora = new Date().getTime();
        const destino = this.datos.fechaEvento.getTime();
        let diferencia = destino - ahora;

        // Si la fecha configurada ya pasó respecto a la fecha del sistema, proyecta automáticamente al próximo 21 de noviembre
        if (diferencia <= 0) {
            const d = new Date();
            const year = (d.getMonth() < 10 || (d.getMonth() === 10 && d.getDate() < 21)) ? d.getFullYear() : d.getFullYear() + 1;
            const proximoNov = new Date(year, 10, 21, 17, 30, 0);
            diferencia = proximoNov.getTime() - ahora;
        }

        if (diferencia <= 0) {
            return { dias: 0, horas: 0, minutos: 0, segundos: 0, finalizado: true };
        }

        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        return { dias, horas, minutos, segundos, finalizado: false };
    }

    /**
     * Genera la URL para agregar el evento a Google Calendar
     */
    generarGoogleCalendarUrl() {
        const titulo = encodeURIComponent(`Nuestra Boda · ${this.datos.quinceanera.nombre}`);
        const fechaInicio = "20261121T233000Z";
        const fechaFin = "20261122T083000Z";
        const detalles = encodeURIComponent(`Celebración de la Boda de ${this.datos.quinceanera.nombre}. Ceremonia en ${this.datos.ceremonia.lugar} y Recepción en ${this.datos.recepcion.lugar}.`);
        const ubicacion = encodeURIComponent(`${this.datos.ceremonia.lugar}, ${this.datos.ceremonia.direccion}`);

        return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${titulo}&dates=${fechaInicio}/${fechaFin}&details=${detalles}&location=${ubicacion}`;
    }

    /**
     * Genera el archivo .ICS (iCalendar) para descargar y abrir en iPhone/Outlook/Android
     */
    descargarArchivoICS() {
        const contenido = [
            "BEGIN:VCALENDAR",
            "VERSION:2.0",
            "PRODID:-//Boda Sofia y Mateo//Invitacion Digital//ES",
            "CALSCALE:GREGORIAN",
            "METHOD:PUBLISH",
            "BEGIN:VEVENT",
            "UID:boda-sofia-mateo@invitacion.com",
            "DTSTAMP:20261105T120000Z",
            "DTSTART:20261121T233000Z",
            "DTEND:20261122T083000Z",
            `SUMMARY:Nuestra Boda - ${this.datos.quinceanera.nombre}`,
            `DESCRIPTION:Acompáñanos a celebrar la Boda de ${this.datos.quinceanera.nombre}. Recepción en ${this.datos.recepcion.lugar}.`,
            `LOCATION:${this.datos.ceremonia.lugar}, ${this.datos.ceremonia.direccion}`,
            "STATUS:CONFIRMED",
            "END:VEVENT",
            "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([contenido], { type: "text/calendar;charset=utf-8" });
        const enlace = document.createElement("a");
        enlace.href = URL.createObjectURL(blob);
        enlace.download = "Boda_Sofia_y_Mateo.ics";
        document.body.appendChild(enlace);
        enlace.click();
        document.body.removeChild(enlace);
    }
}

// Exportación compatible tanto con módulos ES como con inclusión directa
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EventoModel;
}
