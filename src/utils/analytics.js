/**
 * Envía datos de eventos heatmap al backend para análisis de UI
 */

const ANALYTICS_URL = 'https://heat-map-backend-production.up.railway.app/analytics/event';

/**
 * Envía un evento de heatmap al servidor de análisis
 * @param {Object} params - Parámetros del evento
 * @param {string} params.userId - ID del usuario actual
 * @param {string} params.screen - Nombre de la pantalla donde ocurrió el evento
 * @param {string} params.elementType - Tipo de elemento UI (button, card, banner, etc)
 * @param {string} params.elementId - Identificador único del elemento
 * @param {number} params.x - Coordenada X del toque
 * @param {number} params.y - Coordenada Y del toque
 */
export const sendHeatmapEvent = (params) => {
  try {
    const { userId, screen, elementType, elementId, x, y } = params;
    
    const payload = {
      userId,
      appType: 'client',
      screen,
      elementType,
      elementId,
      x,
      y,
      timestamp: new Date().toISOString()
    };

    // Envío de tipo fire-and-forget (sin esperar respuesta)
    fetch(ANALYTICS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }).catch(error => {
      // Error silencioso para no interrumpir la experiencia del usuario
      console.log('Error enviando datos de heatmap:', error);
    });
  } catch (error) {
    console.log('Error procesando evento de heatmap:', error);
  }
}; 