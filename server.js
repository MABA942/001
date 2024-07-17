const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware para servir archivos estáticos
app.use(express.static('public'));

// Ruta para buscar por descripción
app.get('/buscar/descripcion/:palabraClave', (req, res) => {
  const palabraClave = req.params.palabraClave.toLowerCase();
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer la base de datos');
      return;
    }
    const datos = JSON.parse(data);
    const resultados = datos.filter(item => item.Descripción.toLowerCase().includes(palabraClave));
    res.json(resultados);
  });
});

// Ruta para buscar por número de referencia
app.get('/buscar/referencia/:referencia', (req, res) => {
  const referencia = req.params.referencia.toUpperCase();
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) {
      res.status(500).send('Error al leer la base de datos');
      return;
    }
    const datos = JSON.parse(data);
    const resultado = datos.find(item => item['No. De Referencia'].toUpperCase() === referencia);
    res.json(resultado ? [resultado] : []);
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
