// ============================================================
// HABICREDIT — Automatización formatos BBVA
// Servidor: Google Apps Script
// ============================================================

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Formatos BBVA — HABICREDIT')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.DEFAULT); // X-Frame-Options: SAMEORIGIN
}

// IDs de los PDFs plantilla en Google Drive
const FILE_ID_VINCULACION   = '1fEK_DdjoPGc8qIeLibXBCvilN7sAPL6G';
const FILE_ID_NOMINA        = '1UkZniPngtIKZjOrYBnYYEx4sQjEP8aJ4';
const FILE_ID_CONOCIMIENTO  = '1_N1py3FX-CtzN_gVdFhPOuItbYJ_90z6';
// COLEX
const FILE_ID_CUOTA_INICIAL = '1AehZNAPRtPLUVBn2TFH-l0C_MtKIScKd';
const FILE_ID_CREACION      = '1pBTc9OnJfeGhNktXwyRke1FIfbiLT7BF';

function getPlantilla() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_VINCULACION).getBlob().getBytes());
  } catch (e) {
    console.error('getPlantilla error:', e.message);
    throw new Error('No se pudo acceder al PDF de plantilla.');
  }
}

function getPlantillaNomina() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_NOMINA).getBlob().getBytes());
  } catch (e) {
    console.error('getPlantillaNomina error:', e.message);
    throw new Error('No se pudo acceder al PDF de plantilla.');
  }
}

function getPlantillaConocimiento() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_CONOCIMIENTO).getBlob().getBytes());
  } catch (e) {
    console.error('getPlantillaConocimiento error:', e.message);
    throw new Error('No se pudo acceder al PDF de plantilla.');
  }
}

function getPlantillaCuotaInicial() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_CUOTA_INICIAL).getBlob().getBytes());
  } catch (e) {
    console.error('getPlantillaCuotaInicial error:', e.message);
    throw new Error('No se pudo acceder al PDF de plantilla.');
  }
}

function getPlantillaCreacion() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_CREACION).getBlob().getBytes());
  } catch (e) {
    console.error('getPlantillaCreacion error:', e.message);
    throw new Error('No se pudo acceder al PDF de plantilla.');
  }
}

// ────────────────────────────────────────────────────────
// REGISTRO DE USO — escribe en Google Sheets
// ────────────────────────────────────────────────────────

// Función interna (prefijo _ = no invocable desde google.script.run).
// Ejecutar manualmente en el editor de Apps Script para obtener/crear la hoja.
function _getUrlRegistro() {
  const NOMBRE_HOJA = 'Registro de uso';
  let ss;
  const props = PropertiesService.getScriptProperties();
  let ssId = props.getProperty('REGISTRO_SHEET_ID');
  if (ssId) {
    try { ss = SpreadsheetApp.openById(ssId); } catch(e) { ssId = null; }
  }
  if (!ssId) {
    ss = SpreadsheetApp.create('Registro de uso — Formatos BBVA HABICREDIT');
    props.setProperty('REGISTRO_SHEET_ID', ss.getId());
    let hoja = ss.getActiveSheet();
    hoja.setName(NOMBRE_HOJA);
    hoja.appendRow(['Fecha', 'Director Comercial', 'Nombre Broker', 'Cédula Broker', 'Correo Broker', 'Formatos generados']);
    hoja.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
  }
  Logger.log('URL del registro: ' + ss.getUrl());
  return ss.getUrl();
}

// Neutraliza formula injection (CWE-1236): prefija con ' cualquier valor
// que empiece por =, +, -, @, tab o CR para que Sheets no lo evalúe como fórmula.
function _limpiar(v, max) {
  let s = String(v == null ? '' : v).trim().slice(0, max || 200);
  if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
  return s;
}

// Rate-limit global: máx 500 registros por hora (CWE-770).
function _checkRateLimit() {
  const cache = CacheService.getScriptCache();
  const key = 'reg_h_' + new Date().getUTCHours();
  const n = parseInt(cache.get(key) || '0');
  if (n >= 500) return false;
  cache.put(key, String(n + 1), 3600);
  return true;
}

function registrarUso(datos) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(5000);

    if (!_checkRateLimit()) {
      return 'error: límite de registros alcanzado';
    }

    // Validar cédula (solo dígitos, 5-12 chars) y correo antes de sanitizar
    const rawCedula  = String(datos.brokerCedula  == null ? '' : datos.brokerCedula).trim();
    const rawCorreo  = String(datos.brokerCorreo  == null ? '' : datos.brokerCorreo).trim();
    if (!/^\d{5,12}$/.test(rawCedula)) return 'error: cédula inválida';
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(rawCorreo)) return 'error: correo inválido';

    // Sanitizar todas las columnas antes de escribir a Sheets
    const fecha        = _limpiar(datos.fecha,        50);
    const director     = _limpiar(datos.director,     200);
    const brokerNombre = _limpiar(datos.brokerNombre, 200);
    const brokerCedula = _limpiar(rawCedula,          20);
    const brokerCorreo = _limpiar(rawCorreo,          200);
    const formatos     = _limpiar(datos.formatos,     500);

    const NOMBRE_HOJA = 'Registro de uso';
    let ss;
    const props = PropertiesService.getScriptProperties();
    let ssId = props.getProperty('REGISTRO_SHEET_ID');
    if (ssId) {
      try { ss = SpreadsheetApp.openById(ssId); } catch(e) { ssId = null; }
    }
    if (!ssId) {
      ss = SpreadsheetApp.create('Registro de uso — Formatos BBVA HABICREDIT');
      props.setProperty('REGISTRO_SHEET_ID', ss.getId());
    }
    let hoja = ss.getSheetByName(NOMBRE_HOJA);
    if (!hoja) {
      hoja = ss.getActiveSheet();
      hoja.setName(NOMBRE_HOJA);
      hoja.appendRow(['Fecha', 'Director Comercial', 'Nombre Broker', 'Cédula Broker', 'Correo Broker', 'Formatos generados']);
      hoja.getRange(1, 1, 1, 6).setFontWeight('bold').setBackground('#1565c0').setFontColor('#ffffff');
    }

    // Limitar crecimiento de la hoja (máx 50 000 filas de datos)
    if (hoja.getLastRow() >= 50001) return 'error: registro lleno';

    hoja.appendRow([fecha, director, brokerNombre, brokerCedula, brokerCorreo, formatos]);
    return 'ok';
  } catch(e) {
    console.error('registrarUso error:', e.message);
    return 'error: no se pudo registrar el uso';
  } finally {
    try { lock.releaseLock(); } catch(_) {}
  }
}
