// ============================================
// UI - PANTALLA DE INICIO
// ============================================

export function montarInicio(contenedor) {
    contenedor.innerHTML = `
        <header class="inicio-header">
            <div class="inicio-portada">
                <div class="inicio-portada-placeholder">🎵</div>
            </div>
            <h1 class="inicio-titulo">Donde Quiero Estar</h1>
            <p class="inicio-artista">Quevedo</p>
            <p class="inicio-subtitulo">3 juegos. 1 álbum. Sin registro.</p>
        </header>

        <main class="inicio-modos">
            <button class="modo-card" data-modo="velocidad">
                <div class="modo-card-icono">⚡</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">Test de Velocidad</h2>
                    <p class="modo-card-descripcion">Adivina la canción en 10 segundos</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>

            <button class="modo-card" data-modo="heardle">
                <div class="modo-card-icono">🔊</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">Heardle Progresivo</h2>
                    <p class="modo-card-descripcion">Reconoce la canción por fragmentos</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>

            <button class="modo-card" data-modo="wordle">
                <div class="modo-card-icono">🎯</div>
                <div class="modo-card-info">
                    <h2 class="modo-card-titulo">Wordle Estadístico</h2>
                    <p class="modo-card-descripcion">Deduce la canción con pistas</p>
                </div>
                <div class="modo-card-flecha">→</div>
            </button>
        </main>

        <footer class="inicio-footer">
            <p>Proyecto personal sin ánimo de lucro. Las canciones son propiedad de Quevedo y su sello.</p>
        </footer>
    `;

    // Conectar los botones (por ahora solo muestran un aviso)
    contenedor.querySelectorAll('[data-modo]').forEach(btn => {
        btn.addEventListener('click', () => {
            const modo = btn.getAttribute('data-modo');
            alert(`Modo "${modo}" próximamente`);
        });
    });
}
