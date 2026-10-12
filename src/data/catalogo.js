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
        },

        // ============================================
        // BUENAS NOCHES (2024)
        // ============================================
        {
            id: 'bn-01',
            album: 'bn',
            titulo: 'KASSANDRA',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-01-kassandra.m4a'
        },
        {
            id: 'bn-02',
            album: 'bn',
            titulo: 'DURO',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-02-duro.m4a'
        },
        {
            id: 'bn-03',
            album: 'bn',
            titulo: 'IGUALES',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-03-iguales.m4a'
        },
        {
            id: 'bn-04',
            album: 'bn',
            titulo: 'GRAN VÍA',
            feat: ['Aitana'],
            audioArchivo: 'assets/audio-fragmentos/bn-04-gran-via.m4a'
        },
        {
            id: 'bn-05',
            album: 'bn',
            titulo: 'CHAPIADORA.COM',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-05-chapiadora-com.m4a'
        },
        {
            id: 'bn-06',
            album: 'bn',
            titulo: 'POR ATRÁS',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-06-por-atras.m4a'
        },
        {
            id: 'bn-07',
            album: 'bn',
            titulo: '14 FEBREROS',
            feat: ['Sin Nombre'],
            audioArchivo: 'assets/audio-fragmentos/bn-07-14-febreros.m4a'
        },
        {
            id: 'bn-08',
            album: 'bn',
            titulo: 'LA 125',
            feat: ['Yung Beef'],
            audioArchivo: 'assets/audio-fragmentos/bn-08-la-125.m4a'
        },
        {
            id: 'bn-09',
            album: 'bn',
            titulo: 'HALO',
            feat: ['La Pantera'],
            audioArchivo: 'assets/audio-fragmentos/bn-09-halo.m4a'
        },
        {
            id: 'bn-10',
            album: 'bn',
            titulo: 'MR. MOONDIAL',
            feat: ['Pitbull'],
            audioArchivo: 'assets/audio-fragmentos/bn-10-mr-moondial.m4a'
        },
        {
            id: 'bn-11',
            album: 'bn',
            titulo: 'QUÉ ASCO DE TODO',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-11-que-asco-de-todo.m4a'
        },
        {
            id: 'bn-12',
            album: 'bn',
            titulo: 'NOEMÚ',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-12-noemu.m4a'
        },
        {
            id: 'bn-13',
            album: 'bn',
            titulo: 'SHIBATTO',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-13-shibatto.m4a'
        },
        {
            id: 'bn-14',
            album: 'bn',
            titulo: 'LOS DÍAS CONTADOS',
            feat: ['Rels B'],
            audioArchivo: 'assets/audio-fragmentos/bn-14-los-dias-contados.m4a'
        },
        {
            id: 'bn-15',
            album: 'bn',
            titulo: 'EL ESTRIBILLO',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-15-el-estribillo.m4a'
        },
        {
            id: 'bn-16',
            album: 'bn',
            titulo: 'AMANECIÓ',
            feat: ['De La Rose', 'De La Ghetto'],
            audioArchivo: 'assets/audio-fragmentos/bn-16-amanecio.m4a'
        },
        {
            id: 'bn-17',
            album: 'bn',
            titulo: 'TE FALLÉ',
            feat: ['Sech'],
            audioArchivo: 'assets/audio-fragmentos/bn-17-te-falle.m4a'
        },
        {
            id: 'bn-18',
            album: 'bn',
            titulo: 'BUENAS NOCHES',
            feat: null,
            audioArchivo: 'assets/audio-fragmentos/bn-18-buenas-noches.m4a'
        }

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