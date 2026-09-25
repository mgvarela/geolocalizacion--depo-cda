// API 1: USIG
async function geocodificarUSIG(calle, numero, localidad, partido) {
  if (!calle || calle === '-') return { success: false };
  const query = (calle + ' ' + (numero !== '-' ? numero : '') + ', ' + (localidad !== '-' ? localidad : partido)).trim();
  const url = 'https://servicios.usig.buenosaires.gob.ar/normalizar/?direccion=' + encodeURIComponent(query) + '&geocodificar=true';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.direccionesNormalizadas && data.direccionesNormalizadas.length > 0) {
      const match = data.direccionesNormalizadas[0];
      if (match.coordenadas) {
        return {
          success: true,
          direccionNormalizada: match.direccion,
          lat: parseFloat(match.coordenadas.y),
          lng: parseFloat(match.coordenadas.x),
          fuente: 'USIG'
        };
      }
    }
  } catch (err) {
    console.error("USIG error:", err);
  }
  return { success: false };
}

// API 2: Photon (OpenStreetMap Rapido)
async function geocodificarPhoton(calle, numero, localidad, partido) {
  if (!calle || calle === '-') return { success: false };
  const query = (calle + ' ' + (numero !== '-' ? numero : '') + ', ' + (localidad !== '-' ? localidad : partido) + ', Buenos Aires, Argentina').trim();
  const url = 'https://photon.komoot.io/api/?q=' + encodeURIComponent(query) + '&limit=1';

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data && data.features && data.features.length > 0) {
      const feat = data.features[0];
      const coords = feat.geometry.coordinates;
      const props = feat.properties;
      const label = (props.name || props.street || calle) + ' ' + (props.housenumber || (numero !== '-' ? numero : '')) + ', ' + (props.city || localidad) + ', ' + (props.state || 'Buenos Aires');

      return {
        success: true,
        direccionNormalizada: label,
        lat: parseFloat(coords[1]),
        lng: parseFloat(coords[0]),
        fuente: 'Photon (OSM)'
      };
    }
  } catch (err) {
    console.error("Photon error:", err);
  }
  return { success: false };
}

// API 3: Nominatim (OpenStreetMap Oficial)
async function geocodificarNominatim(calle, numero, localidad, partido) {
  if (!calle || calle === '-') return { success: false };
  const query = (calle + ' ' + (numero !== '-' ? numero : '') + ', ' + (localidad !== '-' ? localidad : partido) + ', Buenos Aires, Argentina').trim();
  const url = 'https://nominatim.openstreetmap.org/search?q=' + encodeURIComponent(query) + '&format=json&countrycodes=ar&limit=1';

  try {
    const response = await fetch(url, { headers: { 'Accept-Language': 'es' } });
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        success: true,
        direccionNormalizada: data[0].display_name,
        lat: parseFloat(data[0].lat),
        lng: parseFloat(data[0].lon),
        fuente: 'Nominatim (OSM)'
      };
    }
  } catch (err) {
    console.error("Nominatim error:", err);
  }
  return { success: false };
}