const API_KEY = "AZCjM68y1GkgBjzTFlISEwbwQGJqPdjZ";
const elementoBoton = document.getElementById('sendButton');
const elementoPhrase = document.getElementById('phrase');
const elementoTranslated = document.getElementById('translated-phrase');
const elementoImg = document.getElementById('image'); 

const buscarFrase = ()=>{
    elementoPhrase.innerHTML = `<div class="spinner-border" role="status">
        <span class="sr-only">Cargando frase...</span>
    </div>`;

    fetch('https://api.chucknorris.io/jokes/random')
    .then(function(response){        
        return response.json();
    }).then(function(json){
        elementoPhrase.innerHTML = `<p><b>El gran Chuck Norris dijo:</b></p><p>${json.value}</p>`;
        return json.value;
    }).then(async function(frase){
        elementoTranslated.innerHTML =`<div class="spinner-border" role="status">
            <span class="sr-only">Cargando traduccion...</span>
        </div>`;

        const res = await fetch("https://translate.argosopentech.com/translate", {
            method: "POST",
            body: JSON.stringify({
                q: frase,
                source: "en",
                target: "es"
            }),
            headers: { "Content-Type": "application/json" }
        });

        const text = await res.json();
        elementoTranslated.innerHTML = text.translatedText;
    })
    .finally(function(){
        console.log('finalice la primer parte')
    })
    .catch(function(err){
        console.log("Something went wrong", err);
    });
}

const buscarImagen = (author) => {
    fetch("https://api.giphy.com/v1/gifs/search?api_key="+ API_KEY +"&q="+ author +"&limit=1&offset=0&rating=g&lang=en")
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log('data img - linea 33: ', data);
        elementoImg.innerHTML = `<img src="${data.data[0].images.downsized.url}" />`;
    })
    .catch(function(err){console.log('error!: ',err)})
}

elementoBoton.addEventListener('click', buscarFrase);

function imprimirResultado(data){
    const resultDiv = document.getElementById('main');
    let images = '';


    // images += `<div><img src="${data.images.downsized.url}" height="${data.images.downsized.height * 2}"/><div>`
    images += `<a href="${data.bitly_gif_url}">${data.id}</a>`
    resultDiv.innerHTML = `<div class='row'>${images}</div>`;
}