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
// REPRODUCIR UN FRAGMENTO (versión antigua)
//
// Crea un Audio nuevo cada vez. Útil para pruebas
// o casos en los que no se ha precargado.
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
        pararAudio();

        const audio = new Audio(rutaArchivo);
        audio.preload = 'auto';
        audioActual = audio;

        audio.addEventListener('canplaythrough', () => {
            try {
                audio.currentTime = inicioSeg;
                audio.play()
                    .then(() => {
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

        audio.addEventListener('error', (e) => {
            console.error('Error al cargar audio:', e);
            reject(new Error('No se pudo cargar el audio'));
        }, { once: true });

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
// PRECARGAR UN AUDIO (individual)
// ============================================
export function precargarAudio(rutaArchivo) {
    const audio = new Audio(rutaArchivo);
    audio.preload = 'auto';
    audio.load();
}

// ============================================
// PRECARGAR UN LOTE DE CANCIONES
//
// Carga N audios en lotes y devuelve un array
// de objetos { cancion, audio } listos para usar.
//
// Parámetros:
//   canciones:  array de canciones (con .audioArchivo)
//   tamanoLote: cuántas cargar en paralelo (default: 3)
//   onProgreso: callback(cargadas, total) para barra de progreso
//
// Devuelve: Promise<Array<{ cancion, audio }>>
// ============================================
export async function precargarCanciones(canciones, tamanoLote = 3, onProgreso = null) {
    const resultados = [];
    const total = canciones.length;
    let cargadas = 0;

    if (onProgreso) onProgreso(cargadas, total);

    for (let i = 0; i < canciones.length; i += tamanoLote) {
        const lote = canciones.slice(i, i + tamanoLote);

        const promesas = lote.map(cancion => cargarAudio(cancion));
        const resultadosLote = await Promise.allSettled(promesas);

        for (const resultado of resultadosLote) {
            if (resultado.status === 'fulfilled' && resultado.value) {
                resultados.push(resultado.value);
            }
            cargadas++;
            if (onProgreso) onProgreso(cargadas, total);
        }
    }

    return resultados;
}

// ============================================
// CARGAR UN AUDIO INDIVIDUAL
// Devuelve { cancion, audio } cuando está listo
// ============================================
function cargarAudio(cancion) {
    return new Promise((resolve) => {
        const audio = new Audio();
        audio.preload = 'auto';
        audio.src = cancion.audioArchivo;

        let resuelto = false;

        const resolver = (valor) => {
            if (resuelto) return;
            resuelto = true;
            audio.removeEventListener('canplaythrough', onReady);
            audio.removeEventListener('error', onError);
            resolve(valor);
        };

        const onReady = () => resolver({ cancion, audio });
        const onError = () => {
            console.warn(`⚠️ No se pudo cargar: ${cancion.titulo}`);
            resolver(null);
        };

        audio.addEventListener('canplaythrough', onReady, { once: true });
        audio.addEventListener('error', onError, { once: true });

        audio.load();

        // Timeout de seguridad: 5 segundos máximo por canción
        setTimeout(() => {
            if (audio.readyState < 3) {
                resolver({ cancion, audio });
            }
        }, 5000);
    });
}

// ============================================
// REPRODUCIR UN AUDIO YA PRECARGADO
//
// Usa un objeto Audio existente (ya cargado).
// El audio arranca instantáneamente.
//
// Parámetros:
//   audio:        el objeto Audio ya precargado
//   inicioSeg:    segundo donde empieza
//   duracionSeg:  cuántos segundos reproducir
//
// Devuelve una promesa que se resuelve cuando termina
// ============================================
export function reproducirAudioPrecargado(audio, inicioSeg, duracionSeg) {
    return new Promise((resolve, reject) => {
        if (!audio) {
            reject(new Error('Audio no válido'));
            return;
        }

        pararAudio();

        audioActual = audio;

        try {
            audio.currentTime = inicioSeg;
            audio.play()
                .then(() => {
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
    });
}
