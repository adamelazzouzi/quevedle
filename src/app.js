// ============================================
// APP - Punto de entrada
// ============================================

import { montarInicio } from './ui/inicio.js';

// Arrancar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Donde Quiero Estar · Juegos');

    const app = document.getElementById('app');
    montarInicio(app);
});
