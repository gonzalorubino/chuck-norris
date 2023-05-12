import APIKEY from '../config.js';

const API_KEY = APIKEY;
const elementoBoton = document.getElementById('sendButton');
const elementoPhrase = document.getElementById('phrase');
const elementoImg = document.getElementById('image'); 

// Uso de Promise All
// uso una function async
const fetchNames = async () => {
    // Genero un numero random para el offset, entonces obtengo resultados distintos en cada fetch
    const random = Math.floor(Math.random() * 100);


    try {
      // Promise all, va a esperar que se ejecuten un array de promesas (https://es.javascript.info/promise-api)
      const response = await Promise.all([
        fetch('https://api.chucknorris.io/jokes/random'),
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q='Chuck Norris'&limit=1&offset=${random}&rating=g&lang=en`)
      ]);

      // Espero que se ejecuten ambas promises con un await
      // Cuando esten listas, van a ejecutar un map para juntar la respuesta en un array
      const data = await Promise.all(response.map(resp => resp.json()));

      // Imprimo lo que me vino desde la API
      // data[0] es la posicion 0 del array, y van a venir los datos del primer fetch
      // data[1] es la posicion 1 del array, y van a venir los datos del segundo fetch
      elementoPhrase.innerHTML = `<p><b>El gran Chuck Norris dijo:</b></p><p>${data[0].value}</p>`;
      elementoImg.innerHTML = `<img src="${data[1].data[0].images.downsized.url}" />`;
    } catch {
      throw Error("Promise failed");
    }
};

elementoBoton.addEventListener('click', fetchNames);
