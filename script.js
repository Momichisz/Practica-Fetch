document.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.mercadolibre.com/sites/MLA/search?q=computadoras')
      .then(res => res.json())
      .then(res => {
          const productos = res.results;
          const output = document.getElementById('productos');
          let htmlString = '';

          productos.forEach(producto => {
              fetch(`https://api.mercadolibre.com/items/${producto.id}`)
                  .then(res => res.json())
                  .then(detalleProducto => {
                      const imagenAltaCalidad = detalleProducto.pictures[0].url;
                      htmlString += `
                          <div class="card">
                              <div class="prod-img">
                                  <img src="${imagenAltaCalidad}" alt="${producto.title}">
                              </div>
                              <div class="data">
                                  <span class="prod-name">${producto.title}</span>
                                  <span class="prod-precio"> $${producto.price}</span>
                                  <a href="${producto.permalink}" target="_blank">Ver Producto</a>
                              </div>
                          </div>
                      `;
                      output.innerHTML = htmlString;
                  })
                  .catch(err => console.error(err));
          });
      })
      .catch(err => console.error(err));
});
