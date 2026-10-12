// ============================================
// CORE - QUEVEDEX
// Persistencia del progreso del usuario
// Todo se guarda en localStorage
// ============================================

// ============================================
// CLAVE DE LOCALSTORAGE
// ============================================
const CLAVE = 'quevedle-quevedex';

// ============================================
// ESTADO INICIAL
// Devuelve SIEMPRE un objeto nuevo, sin referencias compartidas
// ============================================
function estadoInicial() {
    return {
        desbloqueadas: [],
        desbloqueosNuevos: 0,
        partidasJugadas: 0,
        mejorPuntuacion: 0
    };
}

// ============================================
// LEER ESTADO
// Si no existe o está corrupto, devuelve el inicial
// ============================================
export function leerQuevedex() {
    try {
        const raw = localStorage.getItem(CLAVE);
        if (!raw) return estadoInicial();

        const estado = JSON.parse(raw);

        return {
            desbloqueadas: Array.isArray(estado.desbloqueadas) ? estado.desbloqueadas : [],
            desbloqueosNuevos: typeof estado.desbloqueosNuevos === 'number' ? estado.desbloqueosNuevos : 0,
            partidasJugadas: typeof estado.partidasJugadas === 'number' ? estado.partidasJugadas : 0,
            mejorPuntuacion: typeof estado.mejorPuntuacion === 'number' ? estado.mejorPuntuacion : 0
        };
    } catch (e) {
        console.warn('Error al leer Quevedex:', e);
        return estadoInicial();
    }
}

// ============================================
// GUARDAR ESTADO
// ============================================
export function guardarQuevedex(estado) {
    try {
        localStorage.setItem(CLAVE, JSON.stringify(estado));
    } catch (e) {
        console.warn('Error al guardar Quevedex:', e);
    }
}

// ============================================
// COMPROBAR SI UNA CANCIÓN ESTÁ DESBLOQUEADA
// ============================================
export function estaDesbloqueada(id) {
    const estado = leerQuevedex();
    return estado.desbloqueadas.includes(id);
}

// ============================================
// DESBLOQUEAR UNA CANCIÓN
//
// Devuelve:
//   true  → era nueva, se ha desbloqueado
//   false → ya estaba desbloqueada
// ============================================
export function desbloquear(id) {
    const estado = leerQuevedex();

    if (estado.desbloqueadas.includes(id)) {
        return false;
    }

    estado.desbloqueadas.push(id);
    estado.desbloqueosNuevos++;
    guardarQuevedex(estado);
    return true;
}

// ============================================
// TOTAL DE CANCIONES DESBLOQUEADAS
// ============================================
export function totalDesbloqueadas() {
    const estado = leerQuevedex();
    return estado.desbloqueadas.length;
}

// ============================================
// DESBLOQUEADAS DE UN ÁLBUM CONCRETO
// ============================================
export function desbloqueadasPorAlbum(albumId, catalogo) {
    const estado = leerQuevedex();
    const idsDelAlbum = catalogo.canciones
        .filter(c => c.album === albumId)
        .map(c => c.id);

    return estado.desbloqueadas.filter(id => idsDelAlbum.includes(id)).length;
}

// ============================================
// ¿HAY DESBLOQUEOS NUEVOS DESDE LA ÚLTIMA VISITA?
// ============================================
export function hayDesbloqueosNuevos() {
    const estado = leerQuevedex();
    return estado.desbloqueosNuevos > 0;
}

// ============================================
// NÚMERO DE DESBLOQUEOS NUEVOS
// ============================================
export function numeroDesbloqueosNuevos() {
    const estado = leerQuevedex();
    return estado.desbloqueosNuevos;
}

// ============================================
// MARCAR COMO VISTO
// ============================================
export function marcarComoVisto() {
    const estado = leerQuevedex();
    estado.desbloqueosNuevos = 0;
    guardarQuevedex(estado);
}

// ============================================
// REGISTRAR PARTIDA JUGADA
// ============================================
export function registrarPartida(puntuacion) {
    const estado = leerQuevedex();
    estado.partidasJugadas++;
    if (puntuacion > estado.mejorPuntuacion) {
        estado.mejorPuntuacion = puntuacion;
    }
    guardarQuevedex(estado);
}

// ============================================
// RESETEAR QUEVEDEX (por si acaso)
// ============================================
export function resetearQuevedex() {
    try {
        localStorage.removeItem(CLAVE);
    } catch (e) {
        console.warn('Error al resetear Quevedex:', e);
    }
}