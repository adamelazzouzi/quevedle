// ============================================
// UI - PANTALLA DE INICIO
// ============================================

import { montarVelocidad } from '../modos/velocidad.js';

export function montarInicio(contenedor) {
    contenedor.innerHTML = `
        <header class="inicio-header">
            <div class="inicio-portada">
                <div class="inicio-portada-placeholder">🎵</div>
            </div>
            <h1 class="inicio-titulo">Donde Quiero Estar</h1>
            <p class="inicio-artista">Quevedo</p>
            <p class="inicio-subtitulo">Test de Velocidad</p>
        </header>

        <main class="inicio-modos">
            <button class="modo-card" data-modo="velocidad">
                <div class="modo-card-icono">⚡</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">Empezar partida</h2>
                    <p class="modo-card-descripcion">10 canciones. 10 segundos cada una. ¿Cuántas aciertas?</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>
        </main>

        <footer class="inicio-footer">
            <p>Proyecto personal sin ánimo de lucro. Las canciones son propiedad de Quevedo y su sello.</p>
        </footer>
    `;

    contenedor.querySelectorAll('[data-modo]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modo = btn.getAttribute('data-modo');

            if (modo === 'velocidad') {
                montarVelocidad(contenedor, () => montarInicio(contenedor));
            }
        });
    });
}
