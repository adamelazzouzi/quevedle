// ============================================
// UI - PANTALLA QUEVEDEX
// Colección de canciones desbloqueadas
// ============================================

import { catalogo } from '../data/catalogo.js';
import { albumes } from '../data/albumes.js';
import {
    leerQuevedex,
    marcarComoVisto,
    totalDesbloqueadas
} from '../core/quevedex.js';

// ============================================
// ORDEN DE LOS ÁLBUMES EN LA QUEVEDEX
// ============================================
const ORDEN_ALBUMES = ['dqe', 'bn', 'eb'];

// ============================================
// MONTAR QUEVEDEX
// ============================================
export function montarQuevedex(contenedor, onVolver) {
    // Marcar como visto (quita el badge de la pantalla de inicio)
    marcarComoVisto();

    const estado = leerQuevedex();
    const desbloqueadas = estado.desbloqueadas;
    const total = catalogo.canciones.length;
    const desbloqueadasTotal = totalDesbloqueadas();

    // ============================================
    // RENDERIZAR
    // ============================================
    contenedor.innerHTML = `
        <div class="quevedex">
            <header class="juego-header">
                <button class="juego-btn-volver" id="btnVolver">← Volver</button>
                <div class="juego-titulo-header">Quevedex</div>
                <div class="juego-espacio"></div>
            </header>

            <div class="quevedex-progreso">
                <div class="quevedex-progreso-header">
                    <span class="quevedex-progreso-texto">Tu colección</span>
                    <span class="quevedex-progreso-numero">${desbloqueadasTotal} / ${total}</span>
                </div>
                <div class="quevedex-progreso-barra">
                    <div class="quevedex-progreso-relleno" style="width: ${(desbloqueadasTotal / total) * 100}%"></div>
                </div>
            </div>

            <div class="quevedex-filtros">
                <button class="quevedex-filtro activo" data-filtro="todas">Todas</button>
                <button class="quevedex-filtro" data-filtro="desbloqueadas">Desbloqueadas</button>
                <button class="quevedex-filtro" data-filtro="bloqueadas">Bloqueadas</button>
            </div>

            <div class="quevedex-albumes" id="quevedexAlbumes">
                ${renderizarAlbumes(desbloqueadas)}
            </div>
        </div>
    `;

    // ============================================
    // CONECTAR BOTONES
    // ============================================
    document.getElementById('btnVolver').addEventListener('click', () => {
        onVolver();
    });

    // Filtros
    contenedor.querySelectorAll('.quevedex-filtro').forEach(btn => {
        btn.addEventListener('click', () => {
            // Quitar activo de todos
            contenedor.querySelectorAll('.quevedex-filtro').forEach(b => b.classList.remove('activo'));
            // Poner activo al pulsado
            btn.classList.add('activo');
            // Filtrar
            const filtro = btn.getAttribute('data-filtro');
            aplicarFiltro(filtro);
        });
    });
}

// ============================================
// RENDERIZAR ÁLBUMES
// ============================================
function renderizarAlbumes(desbloqueadas) {
    return ORDEN_ALBUMES.map(albumId => {
        const album = albumes[albumId];
        const cancionesDelAlbum = catalogo.canciones.filter(c => c.album === albumId);
        const desbloqueadasDelAlbum = cancionesDelAlbum.filter(c => desbloqueadas.includes(c.id)).length;
        const totalDelAlbum = cancionesDelAlbum.length;

        const cancionesHTML = cancionesDelAlbum.map(cancion => {
            const desbloqueada = desbloqueadas.includes(cancion.id);
            return renderizarCancion(cancion, desbloqueada, album);
        }).join('');

        return `
            <div class="quevedex-album" data-album="${albumId}">
                <div class="quevedex-album-header">
                    <h2 class="quevedex-album-titulo">${album.titulo}</h2>
                    <span class="quevedex-album-contador">${desbloqueadasDelAlbum} / ${totalDelAlbum}</span>
                </div>
                <div class="quevedex-grid">
                    ${cancionesHTML}
                </div>
            </div>
        `;
    }).join('');
}

// ============================================
// RENDERIZAR UNA CANCIÓN
// ============================================
function renderizarCancion(cancion, desbloqueada, album) {
    if (desbloqueada) {
        return `
            <div class="quevedex-cancion desbloqueada" data-id="${cancion.id}">
                <div class="quevedex-cancion-imagen">
                    <img src="${album.portada}" alt="${album.titulo}">
                </div>
                <div class="quevedex-cancion-nombre">${cancion.titulo}</div>
            </div>
        `;
    } else {
        return `
            <div class="quevedex-cancion bloqueada" data-id="${cancion.id}">
                <div class="quevedex-cancion-imagen">
                    <span class="quevedex-cancion-interrogacion">?</span>
                </div>
                <div class="quevedex-cancion-nombre">???</div>
            </div>
        `;
    }
}

// ============================================
// APLICAR FILTRO
// ============================================
function aplicarFiltro(filtro) {
    const canciones = document.querySelectorAll('.quevedex-cancion');

    canciones.forEach(cancion => {
        const estaDesbloqueada = cancion.classList.contains('desbloqueada');

        if (filtro === 'todas') {
            cancion.style.display = '';
        } else if (filtro === 'desbloqueadas') {
            cancion.style.display = estaDesbloqueada ? '' : 'none';
        } else if (filtro === 'bloqueadas') {
            cancion.style.display = estaDesbloqueada ? 'none' : '';
        }
    });
}