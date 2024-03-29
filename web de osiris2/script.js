// Agregamos un evento al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    const elementos1 = document.getElementById('lista-1');
    const listaCarro = document.querySelector('#lista-carro tbody');
    const vaciarCarroBtn = document.getElementById('vaciar-carro');

    // Inicializamos el carrito como un arreglo vacío
    const carrito = [];

    cargarEventListeners();

    function cargarEventListeners() {
        elementos1.addEventListener('click', comprarElemento);
        listaCarro.addEventListener('click', eliminarElemento);
        vaciarCarroBtn.addEventListener('click', vaciarCarrito);
    }

    function comprarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('agregar-carro')) {
            const elemento = e.target.parentElement.parentElement;
            leerDatosElemento(elemento);
        }
    }

    function leerDatosElemento(elemento) {
        const infoElemento = {
            imagen: elemento.querySelector('img').src,
            nombre: elemento.querySelector('h3').textContent,
            precio: parseFloat(elemento.querySelector('.Precio').textContent),
            id: elemento.querySelector('.agregar-carro').getAttribute('data-id')
        };
        insertarCarrito(infoElemento);
    }

    function insertarCarrito(infoElemento) {
        carrito.push(infoElemento);
        actualizarCarrito();
    }

    function actualizarCarrito() {
        listaCarro.innerHTML = '';
        carrito.forEach((elemento) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${elemento.imagen}" width="50"></td>
                <td>${elemento.nombre}</td>
                <td>${elemento.precio.toFixed(2)}</td>
                <td><a href="#" class="borrar-curso" data-id="${elemento.id}">X</a></td>
            `;
            listaCarro.appendChild(row);
        });
    }

    function eliminarElemento(e) {
        e.preventDefault();
        if (e.target.classList.contains('borrar-curso')) {
            const elementoId = e.target.getAttribute('data-id');
            carrito.forEach((elemento, index) => {
                if (elemento.id === elementoId) {
                    carrito.splice(index, 1);
                }
            });
            actualizarCarrito();
        }
    }

    function vaciarCarrito() {
        carrito.length = 0;
        actualizarCarrito();
    }
});
