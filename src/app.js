// ============================================
// APP - Punto de entrada
// ============================================

import { montarInicio } from './ui/inicio.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎵 Donde Quiero Estar · Juegos');

    const app = document.getElementById('app');
    montarInicio(app);
});
