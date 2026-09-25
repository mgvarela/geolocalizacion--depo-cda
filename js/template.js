function generarTemplateEmail(item) {
  const mapLink = item.LinkMaps || '#';
  const cliente = item.cliente_nombre || 'Cliente';
  const operacion = item.id_operacion_code || '-';
  const direccion = item.direccion_calle_limpia + ' ' + item.direccion_numero_limpia;
  const localidad = item.localidad_limpia + ', ' + item.partido_limpio;
  
  let horarioTexto = item.tipo_envio;
  if (item.Envio_Flex === 'SI') {
    horarioTexto = 'Envío Flex - Entre las 14:00hs y las 21:00hs';
  } else if (item.Envio_CDA === 'SI') {
    horarioTexto = 'Entrega Programada (CDA) - ' + item.tipo_envio;
  }

  const mapButtonHtml = item.LinkMaps 
    ? '<a href="' + mapLink + '" style="display:inline-block; background-color:#28a745; color:#ffffff; text-decoration:none; padding:12px 25px; border-radius:5px; font-weight:bold;" target="_blank">📍 Ver/Confirmar Mi Ubicación en el Mapa</a>'
    : '<p style="color:red; font-weight:bold;">(Requiere confirmación manual de ubicación)</p>';

  let alertaOperador = '';
  if (item.Alerta_Peligrosa === 'SI') {
    alertaOperador += '<div style="background-color:#ffcccc; color:#cc0000; padding:10px; text-align:center; font-weight:bold; font-size:12px; margin-bottom:10px;">⚠️ ATENCIÓN: DIRECCIÓN EN ZONA PELIGROSA</div>';
  }
  if (item.Despacho_Andreani === 'SI') {
    alertaOperador += '<div style="background-color:#e6ccff; color:#6f42c1; padding:10px; text-align:center; font-weight:bold; font-size:12px; margin-bottom:10px;">📦 ATENCIÓN: DESPACHAR POR ANDREANI</div>';
  }

  const htmlCode = 
    alertaOperador +
    '<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">' +
      '<div style="background-color: #0056b3; color: #ffffff; padding: 15px; text-align: center;">' +
        '<h3 style="margin: 0;">Confirmación de Dirección de Envío</h3>' +
      '</div>' +
      '<div style="padding: 20px; color: #333333; line-height: 1.6;">' +
        '<p>Hola <strong>' + cliente + '</strong>,</p>' +
        '<p>Estamos coordinando la entrega de tu pedido <strong>#' + operacion + '</strong>.</p>' +
        '<p>Por favor, verificá si la ubicación en el mapa es correcta para asegurar que la logística llegue sin demoras:</p>' +
        '<div style="background-color: #f8f9fa; border-left: 4px solid #0056b3; padding: 12px; margin: 15px 0;">' +
          '<strong>Dirección:</strong> ' + direccion + '<br>' +
          '<strong>Localidad:</strong> ' + localidad + '<br>' +
          '<strong>Horario Estimado:</strong> <span style="color:#e65c00; font-weight:bold;">' + horarioTexto + '</span>' +
        '</div>' +
        '<div style="text-align: center; margin: 25px 0;">' +
          mapButtonHtml +
        '</div>' +
        '<p style="font-size: 13px; color: #666666;">Si la ubicación en el mapa no es exacta, por favor respondenos este correo con las entrecalles de referencia.</p>' +
      '</div>' +
    '</div>';

  return htmlCode;
}