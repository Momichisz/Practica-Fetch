document.addEventListener('DOMContentLoaded', function () {
  fetch('https://api.mercadolibre.com/sites/MLA/search?q=malabares')
    .then(res => res.json())
    .then(res => {
      const productos = res.results;
      const output = document.getElementById('productos');
      let htmlString = '';

      productos.forEach(producto => {
        htmlString += `
                  <div class="card">
                  
                    <div class = "prod-img">
                    <style>
                      .prod-img{
                        background-image: url('${producto.thumbnail}');
                        backgro
                      }
                    </style>
                    </div>

                    <div class = "data">
                      <span class = "prod-name">${producto.title}</span>
                      <span class = "prod-precio"> $${producto.price}</span>
                      <a href="${producto.permalink}" target="_blank">Ver Producto</a>
                    </div>
                      
                  </div>
              `;
      });

      output.innerHTML = htmlString;
    })
    .catch(err => console.error(err));
});