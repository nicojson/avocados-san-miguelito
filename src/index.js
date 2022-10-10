/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app/";

const appNode = document.querySelector("#app");

//Intl
//1 -format date
//2 -format currency
const formatPrice = (price) => {
	const newPrice = new window.Intl.NumberFormat("en-EN", {
		style: "currency",
		currency: "USD"
	}).format(price);

	return newPrice;
}

//web api
//conectarnos al server
window
  .fetch(`${baseUrl}api/avo`)
//procesar la respuesta y convertirla a JSON();
	.then((respuesta) => respuesta.json())
//JSON -> Data -> Renderizar info browser
	.then(responseJson => {
		const todosLosItems = [];
		responseJson.data.forEach((item) => {
			//crear imagen
			const imagen = document.createElement("img");
			imagen.src = `${baseUrl}${item.image}`;
			imagen.className = "rounded-full"

			//crear titulo
			const title = document.createElement("h2");
			title.className = "text-2xl font-bold";
			title.textContent = item.name;

			//crear precio
			const precio = document.createElement("div");
			precio.className = "text-lg text-gray-500 font-bold";
			precio.textContent = formatPrice(item.price);

			//crear un contenedor y meter los elementod que hemos creado
			const container = document.createElement("div");
			container.append(imagen, title, precio);
			container.className = "mb-4 p-3 bg-gray-100 hover:bg-indigo-200 md:ml-4 lg:grid lg:place-content-center";

			//Meter el contenedor en el array todos los items
			todosLosItems.push(container);
		});

		appNode.append(...todosLosItems);
	})