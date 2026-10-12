// ============================================
// UI - PANTALLA DE INICIO
// ============================================

import { montarQuevedle } from '../modos/quevedle.js';
import { montarQuevedex } from './quevedex.js';
import { catalogo } from '../data/catalogo.js';
import { albumes } from '../data/albumes.js';
import { totalDesbloqueadas, hayDesbloqueosNuevos, numeroDesbloqueosNuevos } from '../core/quevedex.js';

// ============================================
// CONFIGURACIÓN DEL CARRUSEL
// ============================================
const CARRUSEL_INTERVALO = 3000; // 3 segundos

// ============================================
// MONTAR INICIO
// ============================================
export function montarInicio(contenedor) {
    const totalCanciones = catalogo.canciones.length;
    const desbloqueadas = totalDesbloqueadas();
    const hayNuevos = hayDesbloqueosNuevos();
    const numNuevos = numeroDesbloqueosNuevos();

    contenedor.innerHTML = `
        <header class="inicio-header">
            <div class="inicio-portada">
                <div class="inicio-carrusel" id="carrusel">
                    <img src="${albumes.dqe.portada}" alt="Portada DONDE QUIERO ESTAR" class="activa">
                    <img src="${albumes.bn.portada}" alt="Portada BUENAS NOCHES">
                    <img src="${albumes.eb.portada}" alt="Portada EL BAIFO">
                </div>
            </div>
            <h1 class="inicio-titulo">Quevedle</h1>
            <p class="inicio-artista">Quevedo</p>
            <p class="inicio-subtitulo">${totalCanciones} canciones. 10 rondas. Sin registro.</p>
        </header>

        <main class="inicio-modos">
            <button class="modo-card" data-modo="quevedle">
                <div class="modo-card-icono">🎧</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">Jugar al Quevedle</h2>
                    <p class="modo-card-descripcion">Adivina cuántas canciones puedes reconocer</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>

            <button class="modo-card modo-card-quevedex" data-modo="quevedex">
                <div class="modo-card-icono">📖</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">
                        Quevedex
                        ${hayNuevos ? `<span class="quevedex-badge-nuevo">+${numNuevos}</span>` : ''}
                    </h2>
                    <p class="modo-card-descripcion">Tu colección: ${desbloqueadas} / ${totalCanciones}</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>
        </main>

        <footer class="inicio-footer">
            <p>Proyecto personal sin ánimo de lucro. Las canciones son propiedad de Quevedo y su sello.</p>
        </footer>
    `;

    // Arrancar el carrusel
    iniciarCarrusel();

    // Conectar botones
    contenedor.querySelectorAll('[data-modo]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modo = btn.getAttribute('data-modo');

            if (modo === 'quevedle') {
                montarQuevedle(contenedor, () => montarInicio(contenedor));
            } else if (modo === 'quevedex') {
                montarQuevedex(contenedor, () => montarInicio(contenedor));
            }
        });
    });
}

// ============================================
// CARRUSEL DE PORTADAS
// ============================================
let carruselInterval = null;

function iniciarCarrusel() {
    if (carruselInterval) {
        clearInterval(carruselInterval);
        carruselInterval = null;
    }

    const imagenes = document.querySelectorAll('#carrusel img');
    if (imagenes.length === 0) return;

    let indiceActual = 0;

    carruselInterval = setInterval(() => {
        imagenes[indiceActual].classList.remove('activa');
        indiceActual = (indiceActual + 1) % imagenes.length;
        imagenes[indiceActual].classList.add('activa');
    }, CARRUSEL_INTERVALO);
}

// ============================================
// PARAR CARRUSEL
// ============================================
export function pararCarrusel() {
    if (carruselInterval) {
        clearInterval(carruselInterval);
        carruselInterval = null;
    }
}