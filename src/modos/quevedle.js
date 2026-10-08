// ============================================
// MODO - QUEVEDLE
// Adivina la canción en 10 segundos
// ============================================

import { album } from '../data/album.js';
import { reproducirFragmento, pararAudio } from '../core/audio.js';
import { barajar, cogerAleatorios, segundoAleatorio } from '../core/utils.js';

// ============================================
// CONFIGURACIÓN
// ============================================
const CONFIG = {
    totalRondas: 10,
    duracionFragmento: 5,
    duracionPregunta: 10,
    opcionesPorPregunta: 4,
    margenFinal: 20
};

// ============================================
// ESTADO DEL JUEGO
// ============================================
const estado = {
    rondaActual: 0,
    puntuacion: 0,
    preguntas: [],
    timer: null,
    tiempoRestante: 0,
    respondiendo: false
};

// ============================================
// GENERAR PREGUNTAS
// ============================================
function generarPreguntas() {
    const canciones = album.canciones;
    const cancionesElegidas = cogerAleatorios(canciones, CONFIG.totalRondas);

    return cancionesElegidas.map(cancion => {
        const otrasCanciones = canciones.filter(c => c.track !== cancion.track);
        const falsas = cogerAleatorios(otrasCanciones, CONFIG.opcionesPorPregunta - 1);
        const opciones = barajar([cancion, ...falsas]);

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
export function montarQuevedle(contenedor, onVolver) {
    estado.rondaActual = 0;
    estado.puntuacion = 0;
    estado.preguntas = generarPreguntas();

    contenedor.innerHTML = `
        <div class="quevedle">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Quevedle</div>
                <div class="juego-espacio"></div>
            </header>

            <div class="quevedle-inicio">
                <div class="quevedle-inicio-icono">🎧</div>
                <h1 class="quevedle-inicio-titulo">Quevedle</h1>
                <p class="quevedle-inicio-descripcion">
                    Escucharás 5 segundos de una canción aleatoria del álbum.<br>
                    Tienes 10 segundos para adivinar cuál es.
                </p>
                <div class="quevedle-inicio-info">
                    <div class="quevedle-inicio-info-item">
                        <span class="quevedle-inicio-info-valor">10</span>
                        <span class="quevedle-inicio-info-label">Rondas</span>
                    </div>
                    <div class="quevedle-inicio-info-item">
                        <span class="quevedle-inicio-info-valor">10s</span>
                        <span class="quevedle-inicio-info-label">Por ronda</span>
                    </div>
                    <div class="quevedle-inicio-info-item">
                        <span class="quevedle-inicio-info-valor">5s</span>
                        <span class="quevedle-inicio-info-label">De audio</span>
                    </div>
                </div>
                <button class="quevedle-btn-empezar" id="btnEmpezar">Empezar partida</button>
            </div>
        </div>
    `;

    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        if (estado.timer) clearInterval(estado.timer);
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

    if (!pregunta) {
        mostrarFinal(contenedor, onVolver);
        return;
    }

    estado.respondiendo = false;
    estado.tiempoRestante = CONFIG.duracionPregunta;

    const opcionesHTML = pregunta.opciones.map((opcion, i) => `
        <button class="quevedle-opcion" data-track="${opcion.track}">
            <span class="quevedle-opcion-letra">${String.fromCharCode(65 + i)}</span>
            <span class="quevedle-opcion-texto">${opcion.titulo}</span>
        </button>
    `).join('');

    contenedor.innerHTML = `
        <div class="quevedle">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Ronda ${estado.rondaActual + 1} / ${CONFIG.totalRondas}</div>
                <div class="juego-espacio">
                    <span class="quevedle-puntuacion">${estado.puntuacion} pts</span>
                </div>
            </header>

            <div class="quevedle-ronda">
                <div class="quevedle-timer">
                    <div class="quevedle-timer-barra">
                        <div class="quevedle-timer-relleno" id="timerRelleno"></div>
                    </div>
                    <div class="quevedle-timer-texto" id="timerTexto">${CONFIG.duracionPregunta}s</div>
                </div>

                <div class="quevedle-audio-indicador" id="audioIndicador">
                    <span class="quevedle-audio-icono">🔊</span>
                    <span class="quevedle-audio-texto">Reproduciendo fragmento...</span>
                </div>

                <h2 class="quevedle-pregunta">¿Qué canción es?</h2>

                <div class="quevedle-opciones" id="opciones">
                    ${opcionesHTML}
                </div>
            </div>
        </div>
    `;

    document.getElementById('btnVolver').addEventListener('click', () => {
        pararAudio();
        if (estado.timer) clearInterval(estado.timer);
        onVolver();
    });

    document.querySelectorAll('.quevedle-opcion').forEach(btn => {
        btn.addEventListener('click', () => {
            const trackElegido = parseInt(btn.getAttribute('data-track'));
            responder(trackElegido, contenedor, onVolver);
        });
    });

    reproducirFragmento(
        pregunta.correcta.audioArchivo,
        pregunta.inicioSeg,
        CONFIG.duracionFragmento
    ).then(() => {
        const indicador = document.getElementById('audioIndicador');
        if (indicador) {
            indicador.innerHTML = `
                <span class="quevedle-audio-icono">🔇</span>
                <span class="quevedle-audio-texto">Fragmento terminado</span>
            `;
        }
    });

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
            responder(null, contenedor, onVolver);
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

    if (estado.timer) clearInterval(estado.timer);
    pararAudio();

    const pregunta = estado.preguntas[estado.rondaActual];
    const correcta = pregunta.correcta.track;
    const acierto = trackElegido === correcta;

    if (acierto) {
        estado.puntuacion++;
    }

    document.querySelectorAll('.quevedle-opcion').forEach(btn => {
        const track = parseInt(btn.getAttribute('data-track'));
        btn.disabled = true;

        if (track === correcta) {
            btn.classList.add('correcta');
        } else if (track === trackElegido) {
            btn.classList.add('incorrecta');
        }
    });

    const indicador = document.getElementById('audioIndicador');
    if (indicador) {
        indicador.innerHTML = acierto
            ? '<span class="quevedle-audio-icono">✅</span><span class="quevedle-audio-texto">¡Correcto!</span>'
            : '<span class="quevedle-audio-icono">❌</span><span class="quevedle-audio-texto">' +
              (trackElegido === null ? 'Sin respuesta' : 'Incorrecto') + '</span>';
        indicador.classList.add(acierto ? 'acierto' : 'fallo');
    }

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
        mensaje = '¿Que haces jugando a esto?';
        emoji = '🥀';
    }

    contenedor.innerHTML = `
        <div class="quevedle">
            <div class="quevedle-final">
                <div class="quevedle-final-emoji">${emoji}</div>
                <div class="quevedle-final-puntuacion">
                    <span class="quevedle-final-numero">${puntuacion}</span>
                    <span class="quevedle-final-total">/ ${total}</span>
                </div>
                <p class="quevedle-final-mensaje">${mensaje}</p>

                <div class="quevedle-final-acciones">
                    <button class="quevedle-btn-empezar" id="btnJugarDeNuevo">Jugar de nuevo</button>
                    <button class="quevedle-btn-secundario" id="btnVolverInicio">Volver al inicio</button>
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
