// ============================================
// CATÁLOGO COMPLETO DE QUEVEDO
//
// Todas las canciones de Quevedo en un solo array.
// Cada canción tiene un campo "album" que apunta a
// una clave de albumes.js ('dqe', 'bn', 'eb', 'single').
//
// Estructura de cada canción:
//   id:            string único (ej: 'dqe-01')
//   album:         string con clave del álbum
//   track:         número de pista dentro del álbum (null para singles)
//   titulo:        string en MAYÚSCULAS
//   feat:          array de artistas o null
//   duracionSeg:   duración total en segundos
//   reproducciones: número de streams en Spotify
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
            track: 1,
            titulo: 'INTRO - SPEECH CRUZZI',
            feat: ['Cruz Cafuné'],
            duracionSeg: 60,
            reproducciones: 15100030,
            audioArchivo: 'assets/audio-fragmentos/dqe-01-intro-speech-cruzzi.m4a'
        },
        {
            id: 'dqe-02',
            album: 'dqe',
            track: 2,
            titulo: 'AHORA QUÉ',
            feat: null,
            duracionSeg: 171,
            reproducciones: 170713013,
            audioArchivo: 'assets/audio-fragmentos/dqe-02-ahora-que.m4a'
        },
        {
            id: 'dqe-03',
            album: 'dqe',
            track: 3,
            titulo: 'YANKEE',
            feat: null,
            duracionSeg: 194,
            reproducciones: 136666272,
            audioArchivo: 'assets/audio-fragmentos/dqe-03-yankee.m4a'
        },
        {
            id: 'dqe-04',
            album: 'dqe',
            track: 4,
            titulo: 'VISTA AL MAR',
            feat: null,
            duracionSeg: 180,
            reproducciones: 735710793,
            audioArchivo: 'assets/audio-fragmentos/dqe-04-vista-al-mar.m4a'
        },
        {
            id: 'dqe-05',
            album: 'dqe',
            track: 5,
            titulo: 'PLAYA DEL INGLÉS',
            feat: ['Myke Towers'],
            duracionSeg: 237,
            reproducciones: 501332523,
            audioArchivo: 'assets/audio-fragmentos/dqe-05-playa-del-ingles.m4a'
        },
        {
            id: 'dqe-06',
            album: 'dqe',
            track: 6,
            titulo: 'SIN SEÑAL',
            feat: ['Ovy on the Drums'],
            duracionSeg: 185,
            reproducciones: 378199333,
            audioArchivo: 'assets/audio-fragmentos/dqe-06-sin-senal.m4a'
        },
        {
            id: 'dqe-07',
            album: 'dqe',
            track: 7,
            titulo: 'DAME',
            feat: ['Omar Montes'],
            duracionSeg: 231,
            reproducciones: 161286327,
            audioArchivo: 'assets/audio-fragmentos/dqe-07-dame.m4a'
        },
        {
            id: 'dqe-08',
            album: 'dqe',
            track: 8,
            titulo: 'CUÉNTALE',
            feat: null,
            duracionSeg: 198,
            reproducciones: 53937676,
            audioArchivo: 'assets/audio-fragmentos/dqe-08-cuentale.m4a'
        },
        {
            id: 'dqe-09',
            album: 'dqe',
            track: 9,
            titulo: 'LUCES AZULES',
            feat: null,
            duracionSeg: 160,
            reproducciones: 45191733,
            audioArchivo: 'assets/audio-fragmentos/dqe-09-luces-azules.m4a'
        },
        {
            id: 'dqe-10',
            album: 'dqe',
            track: 10,
            titulo: 'PUNTO G',
            feat: null,
            duracionSeg: 151,
            reproducciones: 784778457,
            audioArchivo: 'assets/audio-fragmentos/dqe-10-punto-g.m4a'
        },
        {
            id: 'dqe-11',
            album: 'dqe',
            track: 11,
            titulo: 'MUÑECA',
            feat: ['JC Reyes'],
            duracionSeg: 210,
            reproducciones: 53932091,
            audioArchivo: 'assets/audio-fragmentos/dqe-11-muneca.m4a'
        },
        {
            id: 'dqe-12',
            album: 'dqe',
            track: 12,
            titulo: 'WANDA',
            feat: null,
            duracionSeg: 160,
            reproducciones: 406614785,
            audioArchivo: 'assets/audio-fragmentos/dqe-12-wanda.m4a'
        },
        {
            id: 'dqe-13',
            album: 'dqe',
            track: 13,
            titulo: 'ME FALTA ALGO',
            feat: null,
            duracionSeg: 192,
            reproducciones: 56053336,
            audioArchivo: 'assets/audio-fragmentos/dqe-13-me-falta-algo.m4a'
        },
        {
            id: 'dqe-14',
            album: 'dqe',
            track: 14,
            titulo: 'LISBOA',
            feat: null,
            duracionSeg: 151,
            reproducciones: 87105343,
            audioArchivo: 'assets/audio-fragmentos/dqe-14-lisboa.m4a'
        },
        {
            id: 'dqe-15',
            album: 'dqe',
            track: 15,
            titulo: 'ÉRAMOS DOS',
            feat: null,
            duracionSeg: 174,
            reproducciones: 40882704,
            audioArchivo: 'assets/audio-fragmentos/dqe-15-eramos-dos.m4a'
        },
        {
            id: 'dqe-16',
            album: 'dqe',
            track: 16,
            titulo: 'DONDE QUIERO ESTAR',
            feat: null,
            duracionSeg: 200,
            reproducciones: 40565116,
            audioArchivo: 'assets/audio-fragmentos/dqe-16-donde-quiero-estar.m4a'
        }

        // ============================================
        // BUENAS NOCHES (2024)
        // (se añadirán cuando tengamos los audios)
        // ============================================

        // ============================================
        // EL BAIFO (2026)
        // (se añadirán cuando tengamos los audios)
        // ============================================

        // ============================================
        // SINGLES Y COLABORACIONES
        // (se añadirán cuando tengamos los audios)
        // ============================================
    ]
};