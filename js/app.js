let rawData = [];
let processedData = [];
let dtTable = null;
let stopProcess = false;

const fileInput = document.getElementById('fileInput');
const btnProcesar = document.getElementById('btnProcesar');
const btnDetener = document.getElementById('btnDetener');
const btnExportar = document.getElementById('btnExportar');
const btnAbrirMapa = document.getElementById('btnAbrirMapa');
const tableBody = document.getElementById('tableBody');
const statsRow = document.getElementById('statsRow');

function mostrarAlerta(mensaje, tipo = 'success') {
  const toastEl = document.getElementById('liveToast');
  const toastMessage = document.getElementById('toastMessage');
  toastMessage.innerHTML = `<i class="bi bi-check-circle-fill me-2"></i> ${mensaje}`;
  toastEl.className = `toast align-items-center text-bg-${tipo} border-0 shadow`;
  const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
  toast.show();
}

const defaultPeligrosas = "fiorito, diamante, centenario, budge, abertina, albertina, 9 de abril, solano, calzada, don orione, jose c paz, jose c. paz, 1684, lanus - carlos pellegrini, remedios de escalada, cnel osorio";
const defaultAndreani = "2800, 2806, 2764, 2812, 6701, 6705, 6708, 2760, 6720, 6660, 6601, 1731, 1733, 1741, 1815, 1888, 1909, 1900, 1925, 1923, 1931, 1980";
const defaultCda = "1401, 1610, 1616, 1626, 1628, 1630, 1632, 1634, 1639, 1647, 1652, 1654, 1662, 1666, 1689, 1690, 1691, 1692, 1701, 1717, 1731, 1733, 1735, 1736, 1737, 1738, 1739, 1740, 1741, 1743, 1749, 1751, 1756, 1758, 1763, 1764, 1765, 1776, 1778, 1780, 1781, 1782, 1783, 1784, 1785, 1786, 1787, 1788, 1789, 1790, 1791, 1792, 1793, 1801, 1802, 1803, 1804, 1805, 1806, 1807, 1808, 1809, 1811, 1812, 1813, 1814, 1815, 1816, 1821, 1823, 1829, 1831, 1835, 1836, 1837, 1838, 1839, 1840, 1841, 1842, 1843, 1846, 1858, 1862, 1863, 1864, 1868, 1869, 1888, 2707, 1448, 1452, 1602, 1603, 1604, 1605, 1606, 1607, 1609, 1612, 1613, 1614, 1615, 1618, 1624, 1629, 1631, 1633, 1635, 1636, 1637, 1638, 1640, 1641, 1642, 1643, 1644, 1645, 1646, 1648, 1649, 1667, 1669, 1750, 1825, 1833, 1834, 1852, 1854, 1856, 1870, 1871, 1872, 1874, 1875, 1882, 1773, 1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 1012, 1013, 1014, 1015, 1016, 1017, 1018, 1019, 1020, 1021, 1022, 1023, 1024, 1025, 1026, 1027, 1028, 1029, 1030, 1031, 1032, 1033, 1034, 1035, 1036, 1037, 1038, 1039, 1040, 1041, 1042, 1043, 1044, 1045, 1046, 1047, 1048, 1049, 1050, 1051, 1052, 1053, 1054, 1055, 1056, 1057, 1058, 1059, 1060, 1061, 1062, 1063, 1064, 1065, 1066, 1067, 1068, 1069, 1070, 1071, 1072, 1073, 1074, 1075, 1076, 1077, 1078, 1079, 1080, 1081, 1082, 1083, 1084, 1085, 1086, 1087, 1088, 1089, 1090, 1091, 1092, 1093, 1094, 1095, 1096, 1097, 1098, 1099, 1100, 1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110, 1111, 1112, 1113, 1114, 1115, 1116, 1117, 1118, 1119, 1120, 1121, 1122, 1123, 1124, 1125, 1126, 1127, 1128, 1129, 1130, 1133, 1134, 1135, 1136, 1137, 1138, 1139, 1140, 1141, 1143, 1147, 1148, 1150, 1151, 1152, 1153, 1154, 1155, 1156, 1157, 1158, 1159, 1160, 1161, 1162, 1163, 1164, 1165, 1166, 1167, 1168, 1169, 1170, 1171, 1172, 1173, 1174, 1175, 1176, 1177, 1178, 1179, 1180, 1181, 1182, 1183, 1184, 1185, 1186, 1187, 1188, 1189, 1190, 1191, 1192, 1193, 1194, 1195, 1196, 1197, 1198, 1199, 1200, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1214, 1215, 1216, 1217, 1218, 1219, 1220, 1221, 1222, 1223, 1224, 1225, 1226, 1227, 1228, 1229, 1230, 1231, 1232, 1233, 1234, 1235, 1236, 1237, 1238, 1239, 1240, 1241, 1242, 1243, 1244, 1245, 1246, 1247, 1248, 1249, 1250, 1251, 1252, 1253, 1254, 1255, 1256, 1257, 1258, 1259, 1260, 1261, 1262, 1263, 1264, 1265, 1266, 1267, 1268, 1269, 1270, 1271, 1272, 1273, 1274, 1275, 1276, 1277, 1278, 1279, 1280, 1281, 1282, 1283, 1284, 1285, 1286, 1287, 1288, 1289, 1290, 1291, 1292, 1293, 1294, 1295, 1296, 1307, 1313, 1335, 1337, 1351, 1358, 1362, 1366, 1385, 1387, 1392, 1393, 1395, 1396, 1405, 1406, 1407, 1408, 1414, 1416, 1417, 1419, 1424, 1425, 1426, 1427, 1428, 1429, 1430, 1431, 1437, 1439, 1440, 1608, 1611, 1650, 1656, 1657, 1658, 1659, 1660, 1661, 1663, 1672, 1674, 1675, 1676, 1678, 1682, 1683, 1684, 1685, 1686, 1687, 1688, 1702, 1703, 1704, 1705, 1706, 1707, 1708, 1709, 1710, 1711, 1712, 1713, 1714, 1715, 1716, 1718, 1721, 1722, 1723, 1724, 1725, 1726, 1742, 1744, 1745, 1746, 1747, 1748, 1752, 1753, 1754, 1755, 1757, 1759, 1761, 1766, 1770, 1771, 1774, 1775, 1876, 1878, 1879, 1880, 1881, 1884, 1885, 1886, 1889, 1890, 1891, 1893, 1894, 1895, 1896, 1897, 1900, 1901, 1902, 1903, 1904, 6451, 281, 2814, 6700, 6708, 1617, 1619, 1620, 1621, 1622, 1623, 1625, 1627, 1664, 1665, 1670, 1679, 2804, 1727";

let config = {
  peligrosas: (localStorage.getItem('cfg_peligrosas') || defaultPeligrosas).toLowerCase().split(',').map(s=>s.trim()),
  andreaniCP: (localStorage.getItem('cfg_andreani_cp') || defaultAndreani).toLowerCase().split(',').map(s=>s.trim()),
  cdaCP: (localStorage.getItem('cfg_cda_cp') || defaultCda).toLowerCase().split(',').map(s=>s.trim())
};

window.abrirConfiguracion = function() {
  document.getElementById('cfgPeligrosas').value = localStorage.getItem('cfg_peligrosas') || defaultPeligrosas;
  document.getElementById('cfgAndreaniCP').value = localStorage.getItem('cfg_andreani_cp') || defaultAndreani;
  document.getElementById('cfgCdaCP').value = localStorage.getItem('cfg_cda_cp') || defaultCda;
  new bootstrap.Modal(document.getElementById('configModal')).show();
};

window.guardarConfiguracion = function() {
  localStorage.setItem('cfg_peligrosas', document.getElementById('cfgPeligrosas').value);
  localStorage.setItem('cfg_andreani_cp', document.getElementById('cfgAndreaniCP').value);
  localStorage.setItem('cfg_cda_cp', document.getElementById('cfgCdaCP').value);
  
  config.peligrosas = document.getElementById('cfgPeligrosas').value.toLowerCase().split(',').map(s=>s.trim());
  config.andreaniCP = document.getElementById('cfgAndreaniCP').value.toLowerCase().split(',').map(s=>s.trim());
  config.cdaCP = document.getElementById('cfgCdaCP').value.toLowerCase().split(',').map(s=>s.trim());
  
  bootstrap.Modal.getInstance(document.getElementById('configModal')).hide();
  mostrarAlerta("¡Configuración guardada correctamente!", "success");
};

function evaluarReglas(cp, localidad, partido, calle, tipoEnvio) {
  const fullStr = `${calle} ${localidad} ${partido}`.toLowerCase();
  const envStr = tipoEnvio.toLowerCase();
  const cpStr = cp.toString().toLowerCase().trim();

  const esAndreani = config.andreaniCP.includes(cpStr);
  const esPeligrosa = config.peligrosas.some(regla => {
    if (!regla) return false;
    if (regla === cpStr) return true;
    if (regla.includes('-')) {
      const partes = regla.split('-').map(p => p.trim());
      return fullStr.includes(partes[0]) && fullStr.includes(partes[1]);
    } else {
      return fullStr.includes(regla) || cpStr === regla;
    }
  });

  const esFlex = envStr.includes('flex');
  const esCda = envStr.includes('programada') || envStr.includes('cda') || config.cdaCP.includes(cpStr);

  let badges = '';
  let metodoDetectado = "Estándar";

  if (esFlex) {
    metodoDetectado = "Flex";
    badges += `<span class="badge bg-warning text-dark mt-1"><i class="bi bi-lightning-fill"></i> Flex (14 a 21hs)</span><br>`;
  } else if (envStr.includes('andreani') || esAndreani) {
    metodoDetectado = "Andreani";
    badges += `<span class="badge mt-1" style="background-color:#6f42c1; color:white;">Despacho Andreani</span><br>`;
  } else if (esCda) {
    metodoDetectado = "CDA";
    badges += `<span class="badge bg-primary mt-1"><i class="bi bi-calendar-check"></i> Entrega CDA</span><br>`;
  } else {
    badges += `<span class="badge bg-secondary mt-1">Estándar</span><br>`;
  }

  if (esPeligrosa) {
    badges += `<span class="badge bg-danger mt-1"><i class="bi bi-exclamation-triangle"></i> Zona Peligrosa</span>`;
  }

  return { esAndreani: esAndreani || envStr.includes('andreani'), esPeligrosa, esFlex, esCda, metodoDetectado, badgesHtml: badges };
}

function getVal(obj, keys) {
  for (let i = 0; i < keys.length; i++) {
    if (obj[keys[i]] !== undefined && obj[keys[i]] !== null && obj[keys[i]].toString().trim() !== '') {
      return obj[keys[i]].toString().trim();
    }
  }
  return '-';
}

fileInput.addEventListener('change', function(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (file.name.toLowerCase().endsWith('.json')) {
    const reader = new FileReader();
    reader.onload = function(event) {
      try { prepararInterfaz(JSON.parse(event.target.result)); } 
      catch (err) { mostrarAlerta("Archivo JSON inválido.", "danger"); }
    };
    reader.readAsText(file);
  } else {
    Papa.parse(file, {
      header: true, skipEmptyLines: true,
      complete: function(res) {
        rawData = res.data.filter(r => r && Object.keys(r).some(k => r[k] && r[k].toString().trim() !== ''));
        prepararInterfaz(rawData);
      }
    });
  }
});

function prepararInterfaz(data) {
  if (dtTable) { dtTable.destroy(); dtTable = null; }
  tableBody.innerHTML = '';
  statsRow.classList.remove('d-none');
  document.getElementById('totalRows').innerText = data.length;

  data.forEach(function(row, index) {
    const idUnico = index + 1;
    const idOpMag = getVal(row, ['id_operacion_magento', 'id_operacion']);
    const idSuc = getVal(row, ['id_sucursal']);
    const fechaEnt = getVal(row, ['Fecha de Entrega', 'tipo_envio_descripcion', 'fecha_entrega']);
    const nDoc = getVal(row, ['N° DOCUMENTO', 'N Documento', 'id_de_referencia']);
    const cliNom = getVal(row, ['cliente_nombre_completo', 'cliente']);
    const calle = getVal(row, ['calle', 'direccion_calle', 'Direccion']);
    const num = getVal(row, ['numero', 'direccion_numero']);
    const piso = getVal(row, ['piso_depto', 'piso_dpto']);
    const entre = getVal(row, ['entre_calles']);
    const obs = getVal(row, ['observaciones']);
    const cp = getVal(row, ['codigo_postal', 'postcode']);
    const loc = getVal(row, ['localidad']);
    const part = getVal(row, ['partido_o_provincia', 'partido']);
    const pais = getVal(row, ['pais']);
    const tipoEnvio = getVal(row, ['tipo_envio_descripcion']);
    const tel = getVal(row, ['telefono']);
    const email = getVal(row, ['email', 'correo', 'customer_email']);
    
    // Si N° DOCUMENTO existe, se usa como base; sino editable vacío
    const nDocVal = nDoc !== '-' ? nDoc : '';

    const eva = evaluarReglas(cp, loc, part, calle, tipoEnvio);

    const tr = document.createElement('tr');
    tr.id = 'row-' + index;
    tr.innerHTML = 
      `<td><strong>${idUnico}</strong></td>` +
      `<td>${idOpMag}</td>` +
      `<td>${idSuc}</td>` +
      `<td><small>${fechaEnt}</small><br>${eva.badgesHtml}</td>` +
      `<td><input type="text" class="form-control form-control-sm editable-input" value="${nDocVal}" onchange="actualizarDato(${index}, 'N° DOCUMENTO', this.value)"></td>` +
      `<td>${cliNom}</td>` +
      `<td>${calle}</td>` +
      `<td>${num}</td>` +
      `<td>${piso}</td>` +
      `<td>${entre}</td>` +
      `<td>${obs}</td>` +
      `<td>${cp}</td>` +
      `<td>${loc}</td>` +
      `<td>${part}</td>` +
      `<td>${pais}</td>` +
      `<td>${tipoEnvio}</td>` +
      `<td>${tel}</td>` +
      `<td><input type="text" class="form-control form-control-sm editable-input" value="${email !== '-' ? email : ''}" onchange="actualizarDato(${index}, 'email', this.value)"></td>` +
      `<td class="text-muted">-</td><td class="text-muted">-</td><td class="text-muted">-</td>` +
      `<td><span class="badge bg-secondary badge-status">Pendiente</span></td><td>-</td>`;
    tableBody.appendChild(tr);
  });

  dtTable = $('#resultsTable').DataTable({ language: { url: 'https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json' }, paging: false, info: false, searching: true, order: [[0, 'asc']] });
  btnProcesar.disabled = false;
  btnDetener.disabled = true;
  mostrarAlerta("Archivo cargado correctamente. Listo para procesar.", "success");
}

window.actualizarDato = function(i, campo, val) { 
  if(processedData[i]) processedData[i][campo] = val; 
  if(rawData[i]) rawData[i][campo] = val; 
};

btnProcesar.addEventListener('click', async function() {
  btnProcesar.disabled = true;
  btnDetener.disabled = false;
  stopProcess = false;
  processedData = [];
  let sCount = 0, eCount = 0;

  for (let i = 0; i < rawData.length; i++) {
    if (stopProcess) {
      mostrarAlerta("Proceso detenido por el usuario.", "warning");
      break;
    }

    const row = rawData[i];
    const idOpMag = getVal(row, ['id_operacion_magento', 'id_operacion']);
    const idSuc = getVal(row, ['id_sucursal']);
    const fechaEnt = getVal(row, ['Fecha de Entrega', 'tipo_envio_descripcion', 'fecha_entrega']);
    const nDoc = row['N° DOCUMENTO'] || getVal(row, ['N° DOCUMENTO', 'N Documento', 'id_de_referencia']);
    const cliNom = getVal(row, ['cliente_nombre_completo', 'cliente']);
    let calle = getVal(row, ['calle', 'direccion_calle', 'Direccion']);
    const num = getVal(row, ['numero', 'direccion_numero']);
    const piso = getVal(row, ['piso_depto', 'piso_dpto']);
    const entre = getVal(row, ['entre_calles']);
    const obs = getVal(row, ['observaciones']);
    const cp = getVal(row, ['codigo_postal', 'postcode']);
    const loc = getVal(row, ['localidad']);
    const part = getVal(row, ['partido_o_provincia', 'partido']);
    const pais = getVal(row, ['pais']);
    const tipoEnvio = getVal(row, ['tipo_envio_descripcion']);
    const tel = getVal(row, ['telefono']);
    const email = row.email || getVal(row, ['email', 'correo', 'customer_email']);

    const eva = evaluarReglas(cp, loc, part, calle, tipoEnvio);

    if (loc.toLowerCase().includes('plata') || part.toLowerCase().includes('plata')) {
      if (!isNaN(calle.trim()) && !calle.toLowerCase().includes('calle')) calle = 'Calle ' + calle.trim();
    }

    let geo = await geocodificarUSIG(calle, num, loc, part);
    if (!geo.success) geo = await geocodificarPhoton(calle, num, loc, part);
    if (!geo.success) geo = await geocodificarNominatim(calle, num, loc, part);

    // Estructura exacta con N° DOCUMENTO integrado y sin columna factura duplicada
    const rowExport = {
      id_operacion_magento: idOpMag !== '-' ? idOpMag : '',
      id_sucursal: idSuc !== '-' ? idSuc : '',
      "Fecha de Entrega": fechaEnt !== '-' ? fechaEnt : '',
      "N° DOCUMENTO": nDoc !== '-' ? nDoc : '',
      cliente_nombre_completo: cliNom !== '-' ? cliNom : '',
      calle: calle !== '-' ? calle : '',
      numero: num !== '-' ? num : '',
      piso_depto: piso !== '-' ? piso : '',
      entre_calles: entre !== '-' ? entre : '',
      observaciones: obs !== '-' ? obs : '',
      codigo_postal: cp !== '-' ? cp : '',
      localidad: loc !== '-' ? loc : '',
      partido_o_provincia: part !== '-' ? part : '',
      pais: pais !== '-' ? pais : '',
      tipo_envio_descripcion: tipoEnvio !== '-' ? tipoEnvio : '',
      telefono: tel !== '-' ? tel : '',
      email: email !== '-' ? email : '',
      Alerta_Peligrosa: eva.esPeligrosa ? 'SI' : 'NO',
      Despacho_Andreani: eva.esAndreani ? 'SI' : 'NO',
      Envio_Flex: eva.esFlex ? 'SI' : 'NO',
      Envio_CDA: eva.esCda ? 'SI' : 'NO',
      Metodo_Envio: eva.metodoDetectado,
      Latitud: geo.success ? geo.lat : '',
      Longitud: geo.success ? geo.lng : '',
      Direccion_Normalizada: geo.success ? geo.direccionNormalizada : '',
      Fuente_Geocodificacion: geo.success ? geo.fuente : 'NINGUNA',
      Google_Maps_Link: geo.success ? `https://www.google.com/maps?q=${geo.lat},${geo.lng}` : '',
      Estado_GEO: geo.success ? 'OK' : 'ERROR'
    };

    processedData.push(rowExport);

    if (geo.success) {
      sCount++;
      let bg = geo.fuente === 'USIG' ? 'bg-info' : (geo.fuente === 'Photon (OSM)' ? 'bg-primary' : 'bg-warning text-dark');
      let act = `<div class="btn-group btn-group-sm"><a href="${rowExport.Google_Maps_Link}" target="_blank" class="btn btn-outline-primary py-0 px-2"><i class="bi bi-geo-alt"></i></a><button class="btn btn-outline-dark py-0 px-2" onclick="abrirModalEmail(${i})"><i class="bi bi-envelope"></i></button></div>`;
      actualizarFila(i, `<small class="text-success">${geo.direccionNormalizada}</small><br><span class="badge ${bg} p-1" style="font-size:0.7rem">${geo.fuente}</span>`, `<code>${geo.lat}</code>`, `<code>${geo.lng}</code>`, `<span class="badge bg-success badge-status">OK</span>`, act);
    } else {
      eCount++;
      let act = `<button class="btn btn-sm btn-outline-dark py-0 px-2" onclick="abrirModalEmail(${i})"><i class="bi bi-envelope"></i> Mail</button>`;
      actualizarFila(i, '<span class="text-danger small">No hallada</span>', '-', '-', '<span class="badge bg-danger badge-status">Error</span>', act);
    }

    document.getElementById('successRows').innerText = sCount; 
    document.getElementById('errorRows').innerText = eCount;
    document.getElementById('progressPercent').innerText = Math.round(((i + 1) / rawData.length) * 100) + '%';
    await new Promise(r => setTimeout(r, 200));
  }

  btnProcesar.disabled = false;
  btnDetener.disabled = true;
  if (!stopProcess) {
    btnExportar.disabled = false; 
    btnAbrirMapa.disabled = false;
    mostrarAlerta("¡Proceso de geocodificación finalizado con éxito!", "success");
  }
});

btnDetener.addEventListener('click', function() {
  stopProcess = true;
  btnProcesar.disabled = false;
  btnDetener.disabled = true;
  mostrarAlerta("Deteniendo proceso de geocodificación...", "danger");
});

function actualizarFila(idx, norm, lat, lng, state, act) {
  if (dtTable) {
    const rData = dtTable.row('#row-' + idx).data();
    if (rData) { 
      rData[18] = norm; rData[19] = lat; rData[20] = lng; rData[21] = state; rData[22] = act; 
      dtTable.row('#row-' + idx).data(rData).draw(false); 
    }
  }
}

window.abrirModalEmail = function(idx) {
  const item = processedData[idx];
  if (!item) return;
  const htmlText = generarTemplateEmail(item);
  document.getElementById('emailPreviewContent').innerHTML = htmlText;
  
  // Botón Copiar HTML para Gmail
  document.getElementById('btnCopiarHtml').onclick = function() {
    navigator.clipboard.writeText(htmlText);
    mostrarAlerta("¡HTML copiado al portapapeles! Ya podés pegarlo (Ctrl+V) en Gmail.", "success");
  };

  // Botón de Prueba a Matias (Copia el código limpio y abre el correo de forma segura)
  const btnMatias = document.getElementById('btnEnviarPruebaMatias');
  btnMatias.onclick = function(e) {
    e.preventDefault();
    navigator.clipboard.writeText(htmlText);
    
    // Abre el correo de manera limpia solo con asunto
    const asunto = encodeURIComponent("Validación Envío Pedido #" + item.id_operacion_code);
    window.location.href = `mailto:varelamatiasgerardo@gmail.com?subject=${asunto}`;
    
    mostrarAlerta("¡Template copiado! Pegalo (Ctrl+V) en el correo que se acaba de abrir para Matias.", "success");
  };

  new bootstrap.Modal(document.getElementById('emailModal')).show();
};


btnAbrirMapa.addEventListener('click', function() {
  const ptos = processedData.filter(p => p.Latitud && p.Longitud && p.Latitud.toString().trim() !== '' && p.Longitud.toString().trim() !== '');
  
  if (!ptos.length) {
    return mostrarAlerta("No hay ubicaciones geocodificadas (OK) para mostrar en el mapa.", "warning");
  }

  const w = window.open("", "_blank");
  w.document.write(`<!DOCTYPE html><html><head><meta charset="utf-8"><link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/><style>body{margin:0;}#map{height:100vh;}</style></head><body><div id="map"></div><script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"><\/script><script>const m=L.map("map").setView([-34.6,-58.4],10);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(m);const d=${JSON.stringify(ptos)};const mk=[];d.forEach(p=>{let a="";if(p.Alerta_Peligrosa==="SI")a+="<b style='color:red'>[⚠️ Zona Peligrosa]</b><br>";let op=p.id_operacion || p['N Documento'] || p.id_operacion_code || 'S/N';let cli=p.cliente_nombre_completo || p.cliente || p.titular_tarjeta || 'Cliente';let calle=p.calle || p.direccion_calle_limpia || '';let num=p.numero || p.direccion_numero_limpia || '';let mk2=L.marker([parseFloat(p.Latitud),parseFloat(p.Longitud)]).addTo(m).bindPopup("<div style='font-family:sans-serif;font-size:13px;'>"+a+"<b style='color:#0056b3'>#"+op+"</b><br>"+cli+"<br>"+calle+" "+num+"</div>");mk.push(mk2);});if(mk.length){m.fitBounds(new L.featureGroup(mk).getBounds().pad(0.1));}<\/script></body></html>`);
  
  mostrarAlerta(`Se cargaron ${ptos.length} puntos en el mapa con éxito.`, "success");
});
btnExportar.addEventListener('click', function() {
  const csv = Papa.unparse(processedData);
  const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' })); a.download = 'envios_geocodificados.csv'; a.click();
  mostrarAlerta("Archivo CSV exportado con éxito sin columnas duplicadas.", "success");
});

