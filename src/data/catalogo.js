// ============================================
// CATÁLOGO COMPLETO DE QUEVEDO
//
// Estructura de cada canción:
//   id:            string único (ej: 'dqe-01', 'bn-01')
//   album:         string con clave del álbum ('dqe', 'bn', 'eb', 'single')
//   titulo:        string en MAYÚSCULAS
//   feat:          array de artistas o null
//   audioArchivo:  ruta al fragmento de 7s en .m4a
// ============================================

export const catalogo = {
    artista: 'Quevedo',

    canciones: [
        // ============================================
        // DONDE QUIERO ESTAR (2023)
        // ============================================
        {
            id: 'dqe-01',
            album: 'dqe',
            titulo: 'INTRO - SPEECH CRUZZI',
            feat: ['Cruz Cafuné'],
            audioArchivo: 'assets/audio-fragmentos/dqe-01-intro-speech-cruzzi.m4a'
        },
        {
            id: 'dqe-02',
            album: 'dqe',
            titulo: 'AHORA QUÉ',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-02-ahora-que.m4a'
        },
        {
            id: 'dqe-03',
            album: 'dqe',
            titulo: 'YANKEE',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-03-yankee.m4a'
        },
        {
            id: 'dqe-04',
            album: 'dqe',
            titulo: 'VISTA AL MAR',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-04-vista-al-mar.m4a'
        },
        {
            id: 'dqe-05',
            album: 'dqe',
            titulo: 'PLAYA DEL INGLÉS',
            feat: ['Myke Towers'],
            audioArchivo: 'assets/audio-fragmentos/dqe-05-playa-del-ingles.m4a'
        },
        {
            id: 'dqe-06',
            album: 'dqe',
            titulo: 'SIN SEÑAL',
            feat: ['Ovy on the Drums'],
            audioArchivo: 'assets/audio-fragmentos/dqe-06-sin-senal.m4a'
        },
        {
            id: 'dqe-07',
            album: 'dqe',
            titulo: 'DAME',
            feat: ['Omar Montes'],
            audioArchivo: 'assets/audio-fragmentos/dqe-07-dame.m4a'
        },
        {
            id: 'dqe-08',
            album: 'dqe',
            titulo: 'CUÉNTALE',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-08-cuentale.m4a'
        },
        {
            id: 'dqe-09',
            album: 'dqe',
            titulo: 'LUCES AZULES',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-09-luces-azules.m4a'
        },
        {
            id: 'dqe-10',
            album: 'dqe',
            titulo: 'PUNTO G',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-10-punto-g.m4a'
        },
        {
            id: 'dqe-11',
            album: 'dqe',
            titulo: 'MUÑECA',
            feat: ['JC Reyes'],
            audioArchivo: 'assets/audio-fragmentos/dqe-11-muneca.m4a'
        },
        {
            id: 'dqe-12',
            album: 'dqe',
            titulo: 'WANDA',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-12-wanda.m4a'
        },
        {
            id: 'dqe-13',
            album: 'dqe',
            titulo: 'ME FALTA ALGO',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-13-me-falta-algo.m4a'
        },
        {
            id: 'dqe-14',
            album: 'dqe',
            titulo: 'LISBOA',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-14-lisboa.m4a'
        },
        {
            id: 'dqe-15',
            album: 'dqe',
            titulo: 'ÉRAMOS DOS',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-15-eramos-dos.m4a'
        },
        {
            id: 'dqe-16',
            album: 'dqe',
            titulo: 'DONDE QUIERO ESTAR',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/dqe-16-donde-quiero-estar.m4a'
        }

        // ============================================
        // BUENAS NOCHES (2024)
        // (se añadirán tras cortar los audios)
        // ============================================

        // ============================================
        // EL BAIFO (2026)
        // (se añadirán tras cortar los audios)
        // ============================================

        // ============================================
        // SINGLES Y COLABORACIONES
        // (se añadirán tras cortar los audios)
        // ============================================
    ]
};