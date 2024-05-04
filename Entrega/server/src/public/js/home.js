const socket = io();

socket.on("products", (data) => {
  const products = document.querySelector("#productsRealTime2");
  products.innerHTML = data.map((product) => {
    return `
      <tr>
        <td>${product.title}</td>
        <td>${product.description}</td>
        <td>${product.price}</td>
        <td>${product.thumbnail}</td>
        <td>${product.code}</td>
        <td>${product.stock}</td>
        <td><button id=${product.id}>Eliminar</button></td>
      </tr>
    `;
  }).join("");
});