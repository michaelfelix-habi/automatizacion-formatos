// ============================================================
// HABICREDIT — Automatización formatos BBVA
// Servidor: Google Apps Script
// ============================================================

function doGet(e) {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Formatos BBVA — HABICREDIT')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
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
    throw new Error('No se pudo acceder al PDF Vinculación. Error: ' + e.message);
  }
}

function getPlantillaNomina() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_NOMINA).getBlob().getBytes());
  } catch (e) {
    throw new Error('No se pudo acceder al PDF Nómina. Error: ' + e.message);
  }
}

function getPlantillaConocimiento() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_CONOCIMIENTO).getBlob().getBytes());
  } catch (e) {
    throw new Error('No se pudo acceder al PDF Conocimiento de Cliente. Error: ' + e.message);
  }
}

function getPlantillaCuotaInicial() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_CUOTA_INICIAL).getBlob().getBytes());
  } catch (e) {
    throw new Error('No se pudo acceder al PDF Cuota Inicial COLEX. Error: ' + e.message);
  }
}

function getPlantillaCreacion() {
  try {
    return Utilities.base64Encode(DriveApp.getFileById(FILE_ID_CREACION).getBlob().getBytes());
  } catch (e) {
    throw new Error('No se pudo acceder al PDF Creación de Cliente COLEX. Error: ' + e.message);
  }
}

// ────────────────────────────────────────────────────────
// REGISTRO DE USO — escribe en Google Sheets
// ────────────────────────────────────────────────────────

// Ejecuta esta función manualmente en el editor para obtener o crear la hoja
function getUrlRegistro() {
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

function registrarUso(datos) {
  try {
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
    hoja.appendRow([
      datos.fecha,
      datos.director,
      datos.brokerNombre,
      datos.brokerCedula,
      datos.brokerCorreo,
      datos.formatos
    ]);
    return 'ok';
  } catch(e) {
    console.error('registrarUso error:', e.message);
    return 'error: ' + e.message;
  }
}
