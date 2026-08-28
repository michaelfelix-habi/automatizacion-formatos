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
const FILE_ID_VINCULACION  = '1fEK_DdjoPGc8qIeLibXBCvilN7sAPL6G';
const FILE_ID_NOMINA       = '1UkZniPngtIKZjOrYBnYYEx4sQjEP8aJ4';
const FILE_ID_CONOCIMIENTO = '1_N1py3FX-CtzN_gVdFhPOuItbYJ_90z6';

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
