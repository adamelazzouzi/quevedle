// ============================================
// MODO - TEST DE VELOCIDAD
// Adivina la canción en 10 segundos
// ============================================

import { album } from '../data/album.js';
import { reproducirFragmento, pararAudio } from '../core/audio.js';
import { barajar, cogerAleatorios, segundoAleatorio, aleatorioEntre } from '../core/utils.js';

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    totalRondas: 10,
    duracionFragmento: 5,        // segundos de audio por ronda
    duracionPregunta: 10,        // segundos para responder
    opcionesPorPregunta: 4,
    margenFinal: 20              // margen al final de la canción
};

// ============================================
// ESTADO DEL JUEGO
// ============================================
const estado = {
    rondaActual: 0,
    puntuacion: 0,
    preguntas: [],       // array de preguntas generadas
    timer: null,         // timer de la pregunta actual
    tiempoRestante: 0,
    respondiendo: false  // evita doble respuesta
};

// ============================================
// GENERAR PREGUNTAS
// Genera las 10 preguntas de la partida
// ============================================
function generarPreguntas() {
    const canciones = album.canciones;

    // Elegir 10 canciones aleatorias (sin repetir)
    const cancionesElegidas = cogerAleatorios(canciones, CONFIG.totalRondas);

    return cancionesElegidas.map(cancion => {
        // Generar 3 opciones falsas (canciones distintas a la correcta)
        const otrasCanciones = canciones.filter(c => c.track !== cancion.track);
        const falsas = cogerAleatorios(otrasCanciones, CONFIG.opcionesPorPregunta - 1);

        // Mezclar todas las opciones
        const opciones = barajar([cancion, ...falsas]);

        // Calcular el segundo de inicio aleatorio
        const inicioSeg = segundoAleatorio(
            cancion.duracionSeg,
            CONFIG.duracionFragmento,
            CONFIG.margenFinal
        );

        return {
            correcta: cancion,
            opciones: opciones,
            inicioSeg: inicioSeg
        };
    });
}

// ============================================
// MONTAR EL JUEGO
// ============================================
export function montarVelocidad(contenedor, onVolver) {
    // Reiniciar estado
    estado.rondaActual = 0;
    estado.puntuacion = 0;
    estado.preguntas = generarPreguntas();

    // Pantalla inicial
    contenedor.innerHTML = `
        <div class="velocidad">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Test de Velocidad</div>
                <div class="juego-espacio"></div>
            </header>

            <div class="velocidad-inicio">
                <div class="velocidad-inicio-icono">⚡</div>
                <h1 class="velocidad-inicio-titulo">Test de Velocidad</h1>
                <p class="velocidad-inicio-descripcion">
                    Escucharás 5 segundos de una canción aleatoria del álbum.<br>
                    Tienes 10 segundos para adivinar cuál es.
                </p>
                <div class="velocidad-inicio-info">
                    <div class="velocidad-inicio-info-item">
                        <span class="velocidad-inicio-info-valor">10</span>
                        <span class="velocidad-inicio-info-label">Rondas</span>
                    </div>
                    <div class="velocidad-inicio-info-item">
                        <span class="velocidad-inicio-info-valor">10s</span>
                        <span class="velocidad-inicio-info-label">Por ronda</span>
                    </div>
                    <div class="velocidad-inicio-info-item">
                        <span class="velocidad-inicio-info-valor">5s</span>
                        <span class="velocidad-inicio-info-label">De audio</span>
                    </div>
                </div>
                <button class="velocidad-btn-empezar" id="btnEmpezar">Empezar partida</button>
            </div>
        </div>
    `;

    // Conectar botones
    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        if (estado.timer) clearTimeout(estado.timer);
        onVolver();
    });

    document.getElementById('btnEmpezar').addEventListener('click', () => {
        empezarPartida(contenedor, onVolver);
    });
}

// ============================================
// EMPEZAR PARTIDA
// ============================================
function empezarPartida(contenedor, onVolver) {
    estado.rondaActual = 0;
    estado.puntuacion = 0;
    mostrarRonda(contenedor, onVolver);
}

// ============================================
// MOSTRAR RONDA
// ============================================
function mostrarRonda(contenedor, onVolver) {
    const pregunta = estado.preguntas[estado.rondaActual];

    // Si hemos terminado todas las rondas → pantalla final
    if (!pregunta) {
        mostrarFinal(contenedor, onVolver);
        return;
    }

    // Resetear flags
    estado.respondiendo = false;
    estado.tiempoRestante = CONFIG.duracionPregunta;

    // HTML de la ronda
    const opcionesHTML = pregunta.opciones.map((opcion, i) => `
        <button class="velocidad-opcion" data-track="${opcion.track}">
            <span class="velocidad-opcion-letra">${String.fromCharCode(65 + i)}</span>
            <span class="velocidad-opcion-texto">${opcion.titulo}</span>
        </button>
    `).join('');

    contenedor.innerHTML = `
        <div class="velocidad">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Ronda ${estado.rondaActual + 1} / ${CONFIG.totalRondas}</div>
                <div class="juego-espacio">
                    <span class="velocidad-puntuacion">${estado.puntuacion} pts</span>
                </div>
            </header>

            <div class="velocidad-ronda">
                <div class="velocidad-timer">
                    <div class="velocidad-timer-barra">
                        <div class="velocidad-timer-relleno" id="timerRelleno"></div>
                    </div>
                    <div class="velocidad-timer-texto" id="timerTexto">${CONFIG.duracionPregunta}s</div>
                </div>

                <div class="velocidad-audio-indicador" id="audioIndicador">
                    <span class="velocidad-audio-icono">🔊</span>
                    <span class="velocidad-audio-texto">Reproduciendo fragmento...</span>
                </div>

                <h2 class="velocidad-pregunta">¿Qué canción es?</h2>

                <div class="velocidad-opciones" id="opciones">
                    ${opcionesHTML}
                </div>
            </div>
        </div>
    `;

    // Botón volver
    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        if (estado.timer) clearTimeout(estado.timer);
        onVolver();
    });

    // Conectar opciones
    document.querySelectorAll('.velocidad-opcion').forEach(btn => {
        btn.addEventListener('click', () => {
            const trackElegido = parseInt(btn.getAttribute('data-track'));
            responder(trackElegido, contenedor, onVolver);
        });
    });

    // Reproducir audio
    reproducirFragmento(
        pregunta.correcta.audioArchivo,
        pregunta.inicioSeg,
        CONFIG.duracionFragmento
    ).then(() => {
        // Cuando termina el audio, actualizar indicador
        const indicador = document.getElementById('audioIndicador');
        if (indicador) {
            indicador.innerHTML = `
                <span class="velocidad-audio-icono">🔇</span>
                <span class="velocidad-audio-texto">Fragmento terminado</span>
            `;
        }
    });

    // Empezar cuenta atrás
    empezarCuentaAtras(contenedor, onVolver);
}

// ============================================
// CUENTA ATRÁS
// ============================================
function empezarCuentaAtras(contenedor, onVolver) {
    estado.tiempoRestante = CONFIG.duracionPregunta;

    actualizarTimer();

    const intervalo = setInterval(() => {
        if (estado.respondiendo) {
            clearInterval(intervalo);
            return;
        }

        estado.tiempoRestante -= 0.1;

        if (estado.tiempoRestante <= 0) {
            clearInterval(intervalo);
            responder(null, contenedor, onVolver); // sin respuesta
        } else {
            actualizarTimer();
        }
    }, 100);

    estado.timer = intervalo;
}

function actualizarTimer() {
    const relleno = document.getElementById('timerRelleno');
    const texto = document.getElementById('timerTexto');

    if (!relleno || !texto) return;

    const porcentaje = (estado.tiempoRestante / CONFIG.duracionPregunta) * 100;
    relleno.style.width = porcentaje + '%';
    texto.textContent = Math.ceil(estado.tiempoRestante) + 's';

    // Cambiar color cuando queda poco tiempo
    if (estado.tiempoRestante <= 3) {
        relleno.classList.add('urgente');
    } else {
        relleno.classList.remove('urgente');
    }
}

// ============================================
// RESPONDER
// ============================================
function responder(trackElegido, contenedor, onVolver) {
    if (estado.respondiendo) return;
    estado.respondiendo = true;

    // Parar timer
    if (estado.timer) clearInterval(estado.timer);

    // Parar audio
    pararAudio();

    const pregunta = estado.preguntas[estado.rondaActual];
    const correcta = pregunta.correcta.track;
    const acierto = trackElegido === correcta;

    // Actualizar puntuación
    if (acierto) {
        estado.puntuacion++;
    }

    // Marcar opciones
    document.querySelectorAll('.velocidad-opcion').forEach(btn => {
        const track = parseInt(btn.getAttribute('data-track'));
        btn.disabled = true;

        if (track === correcta) {
            btn.classList.add('correcta');
        } else if (track === trackElegido) {
            btn.classList.add('incorrecta');
        }
    });

    // Feedback visual
    const indicador = document.getElementById('audioIndicador');
    if (indicador) {
        indicador.innerHTML = acierto
            ? '<span class="velocidad-audio-icono">✅</span><span class="velocidad-audio-texto">¡Correcto!</span>'
            : '<span class="velocidad-audio-icono">❌</span><span class="velocidad-audio-texto">' +
              (trackElegido === null ? 'Sin respuesta' : 'Incorrecto') + '</span>';
        indicador.classList.add(acierto ? 'acierto' : 'fallo');
    }

    // Siguiente ronda después de 1.5s
    setTimeout(() => {
        estado.rondaActual++;
        mostrarRonda(contenedor, onVolver);
    }, 1500);
}

// ============================================
// PANTALLA FINAL
// ============================================
function mostrarFinal(contenedor, onVolver) {
    const puntuacion = estado.puntuacion;
    const total = CONFIG.totalRondas;

    // Mensaje según puntuación
    let mensaje, emoji;
    if (puntuacion === total) {
        mensaje = '¡Perfecto! Eres un crack';
        emoji = '🏆';
    } else if (puntuacion >= 8) {
        mensaje = '¡Brutal! Controlas el álbum';
        emoji = '🔥';
    } else if (puntuacion >= 5) {
        mensaje = 'Nada mal. Se nota que lo escuchas';
        emoji = '👍';
    } else if (puntuacion >= 3) {
        mensaje = 'Hay que escucharlo más';
        emoji = '🤔';
    } else {
        mensaje = 'Vuelve a escuchar el álbum';
        emoji = '😅';
    }

    contenedor.innerHTML = `
        <div class="velocidad">
            <div class="velocidad-final">
                <div class="velocidad-final-emoji">${emoji}</div>
                <div class="velocidad-final-puntuacion">
                    <span class="velocidad-final-numero">${puntuacion}</span>
                    <span class="velocidad-final-total">/ ${total}</span>
                </div>
                <p class="velocidad-final-mensaje">${mensaje}</p>

                <div class="velocidad-final-acciones">
                    <button class="velocidad-btn-empezar" id="btnJugarDeNuevo">Jugar de nuevo</button>
                    <button class="velocidad-btn-secundario" id="btnVolverInicio">Volver al inicio</button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('btnJugarDeNuevo').addEventListener('click', () => {
        estado.preguntas = generarPreguntas();
        empezarPartida(contenedor, onVolver);
    });

    document.getElementById('btnVolverInicio').addEventListener('click', () => {
        onVolver();
    });
}
