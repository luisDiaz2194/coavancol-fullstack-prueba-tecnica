// -----------------------------
// IMPORTACIONES
// -----------------------------
const express = require('express');           // Framework web para Node.js
const cors = require('cors');                 // Para permitir peticiones desde otros dominios
const bodyParser = require('body-parser');    // Para parsear JSON en las requests
const fs = require('fs');                     // Para leer y escribir archivos
const path = require('path');                 // Para manejar rutas de archivos

// -----------------------------
// INICIALIZACIÓN DE LA APP
// -----------------------------
const app = express();
app.use(cors());                              // Permitir peticiones desde cualquier origen
app.use(bodyParser.json());                   // Parsear automáticamente JSON en el body

// -----------------------------
// CARGA DE DATOS
// -----------------------------
const dataPath = path.join(__dirname, 'data', 'asociados.json');
let asociados = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// -----------------------------
// ESTADOS Y TRANSICIONES
// -----------------------------
const estadosValidos = [
  "Prospecto",
  "Expediente en Construcción",
  "Pendiente Jurídico",
  "Pendiente Cierre de Crédito",
  "Pendiente Firma y Litivo",
  "Pendiente Revisión Abogado",
  "Cartera Activa",
  "Desembolsado/Finalizado"
];

const transiciones = {
  "Prospecto": ["Expediente en Construcción"],
  "Expediente en Construcción": ["Pendiente Jurídico", "Pendiente Cierre de Crédito"],
  "Pendiente Jurídico": ["Pendiente Firma y Litivo"],
  "Pendiente Firma y Litivo": ["Pendiente Revisión Abogado"],
  "Pendiente Revisión Abogado": ["Cartera Activa"],
  "Cartera Activa": ["Desembolsado/Finalizado"],
  "Desembolsado/Finalizado": []
};

// -----------------------------
// FUNCION updateEstadoPipeline
// -----------------------------
/**
 * Función que actualiza el estado de un asociado.
 * @param {string} asociadoId - ID del asociado a actualizar
 * @param {string} nuevoEstado - Nuevo estado a asignar
 * @returns {object} - Asociado actualizado
 * @throws {Error} - Si hay validaciones fallidas
 */
function updateEstadoPipeline(asociadoId, nuevoEstado) {
  const asociado = asociados.find(a => a.id === asociadoId);
  if (!asociado) throw new Error('Asociado no encontrado');

  // Validación transición lógica
  const posiblesTransiciones = transiciones[asociado.estado_pipeline] || [];
  if (!posiblesTransiciones.includes(nuevoEstado)) {
    throw new Error(`No se puede pasar de ${asociado.estado_pipeline} a ${nuevoEstado}`);
  }

  // Validación aporte_49900
  if (nuevoEstado === "Pendiente Jurídico" && !asociado.aporte_49900_pagado) {
    throw new Error('No puede avanzar a Pendiente Jurídico, aporte_49900_pagado = false');
  }

  // Actualizar estado y registrar fecha
  asociado.estado_pipeline = nuevoEstado;
  asociado.ultima_actualizacion = new Date();

  return asociado;
}

// -----------------------------
// ENDPOINT POST /asociados/:id
// -----------------------------
/**
 * Endpoint que recibe el ID del asociado en la URL y el nuevo estado en el body
 * {
 *   "nuevoEstado": "Pendiente Jurídico"
 * }
 */
app.post('/asociados/:id', (req, res) => {
  try {
    const asociadoId = req.params.id;
    const { nuevoEstado } = req.body;

    if (!nuevoEstado) return res.status(400).json({ error: 'Faltan datos obligatorios.' });
    if (!estadosValidos.includes(nuevoEstado)) return res.status(400).json({ error: 'Estado inválido.' });

    const actualizado = updateEstadoPipeline(asociadoId, nuevoEstado);

    // Guardar cambios en JSON
    fs.writeFileSync(dataPath, JSON.stringify(asociados, null, 2));

    return res.json({ mensaje: 'Estado actualizado correctamente.', asociado: actualizado });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

// -----------------------------
// INICIAR SERVIDOR
// -----------------------------
app.listen(5000, () => console.log('Servidor corriendo en http://localhost:5000'));
