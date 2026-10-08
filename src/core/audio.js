// ============================================
// CORE - AUDIO
// Control de reproducción de audio
// ============================================

// ============================================
// ESTADO INTERNO
// ============================================
let audioActual = null;
let timeoutParada = null;

// ============================================
// REPRODUCIR UN FRAGMENTO
//
// Parámetros:
//   rutaArchivo: string con la ruta al .opus
//   inicioSeg:   segundo donde empieza la reproducción
//   duracionSeg: cuántos segundos reproducir
//
// Devuelve una promesa que se resuelve cuando el audio
// termina de reproducirse (o cuando falla)
// ============================================
export function reproducirFragmento(rutaArchivo, inicioSeg, duracionSeg) {
    return new Promise((resolve, reject) => {
        // Parar cualquier audio anterior
        pararAudio();

        // Crear nuevo audio
        const audio = new Audio(rutaArchivo);
        audio.preload = 'auto';
        audioActual = audio;

        // Cuando esté listo para reproducir
        audio.addEventListener('canplaythrough', () => {
            try {
                audio.currentTime = inicioSeg;
                audio.play()
                    .then(() => {
                        // Programar la parada después de duracionSeg
                        timeoutParada = setTimeout(() => {
                            audio.pause();
                            resolve();
                        }, duracionSeg * 1000);
                    })
                    .catch(err => {
                        console.error('Error al reproducir:', err);
                        reject(err);
                    });
            } catch (e) {
                console.error('Error al configurar el audio:', e);
                reject(e);
            }
        }, { once: true });

        // Si hay error al cargar
        audio.addEventListener('error', (e) => {
            console.error('Error al cargar audio:', e);
            reject(new Error('No se pudo cargar el audio'));
        }, { once: true });

        // Empezar a cargar
        audio.load();
    });
}

// ============================================
// PARAR EL AUDIO ACTUAL
// ============================================
export function pararAudio() {
    if (timeoutParada) {
        clearTimeout(timeoutParada);
        timeoutParada = null;
    }

    if (audioActual) {
        audioActual.pause();
        audioActual.currentTime = 0;
        audioActual = null;
    }
}

// ============================================
// PRECARGAR UN AUDIO (opcional)
// Útil para precargar la canción siguiente
// ============================================
export function precargarAudio(rutaArchivo) {
    const audio = new Audio(rutaArchivo);
    audio.preload = 'auto';
    audio.load();
}
