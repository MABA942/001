function buscarPorDescripcion() {
    const palabraClave = document.getElementById('search').value;
    fetch(`/buscar/descripcion/${palabraClave}`)
        .then(response => response.json())
        .then(data => mostrarResultados(data));
}

function buscarPorReferencia() {
    const referencia = document.getElementById('search').value;
    fetch(`/buscar/referencia/${referencia}`)
        .then(response => response.json())
        .then(data => mostrarResultados(data));
}

function mostrarResultados(data) {
    const resultadosDiv = document.getElementById('resultados');
    resultadosDiv.innerHTML = '';
    if (data.length === 0) {
        resultadosDiv.innerHTML = '<p>No se encontraron resultados</p>';
        return;
    }
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerHTML = `
            <p>No. De Referencia: ${item['No. De Referencia']}</p>
            <p>Descripción: ${item['Descripción']}</p>
            <p>Caracteristicas: ${item['Caracteristicas']}</p>
            <p>Rango: ${item['Rango']}</p>
            <p>Precio referencia antes de IVA: ${item['Precio referencia antes de IVA']}</p>
        `;
        resultadosDiv.appendChild(itemDiv);
    });
}
