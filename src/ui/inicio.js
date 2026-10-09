// ============================================
// UI - PANTALLA DE INICIO
// ============================================

import { montarQuevedle } from '../modos/quevedle.js';

export function montarInicio(contenedor) {
    contenedor.innerHTML = `
        <header class="inicio-header">
            <div class="inicio-portada">
                <img src="assets/portada.jpg" alt="Portada de DONDE QUIERO ESTAR" class="inicio-portada-img">
            </div>
            <h1 class="inicio-titulo">Quevedle</h1>
            <p class="inicio-artista">DONDE QUIERO ESTAR · Quevedo</p>
            <p class="inicio-subtitulo">10 canciones. 10 segundos cada una.</p>
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
        </main>

        <footer class="inicio-footer">
            <p>Proyecto personal sin ánimo de lucro. Las canciones son propiedad de Quevedo y su sello.</p>
        </footer>
    `;

    contenedor.querySelectorAll('[data-modo]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modo = btn.getAttribute('data-modo');

            if (modo === 'quevedle') {
                montarQuevedle(contenedor, () => montarInicio(contenedor));
            }
        });
    });
}
