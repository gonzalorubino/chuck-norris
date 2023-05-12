const elementoBoton = document.getElementById('sendButton');
const elementoPhrase = document.getElementById('phrase');
const elementoTranslated = document.getElementById('translated-phrase');

const buscarFrase = ()=>{
    // Creo un loader
    elementoPhrase.innerHTML = `
    <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Cargando frase...</span>
    </div>
    <p class="mt-2 text-danger">Cargando frase...</p>`;

    // Primer Fetch
    fetch('https://api.chucknorris.io/jokes/random')
    .then(function(response){        
        return response.json();
    }).then(function(json){
        elementoPhrase.innerHTML = `<p><b>El gran Chuck Norris dijo:</b></p><p>${json.value}</p>`;
        return json.value;
    }).then(async function(frase){
        // Uso de fetch con una funcion async 

        // Creo un loader
        elementoTranslated.innerHTML =`
        <div class="spinner-border text-success" role="status">
            <span class="sr-only">Cargando traduccion...</span>
        </div>
        <p class="mt-2 text-success">Traduciendo...</p>`;

        // Segundo Fetch
        // Uso lo que me vino del primer fetch
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
        console.log('Me ejecuto al final siempre')
    })
    .catch(function(err){
        console.log("Something went wrong", err);
    });
}

// Agrego listener al boton
elementoBoton.addEventListener('click', buscarFrase);