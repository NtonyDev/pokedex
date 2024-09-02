let offset=0;
let APIUrl  = `https:pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;
let nPokemon = 0;
let arrayPokemon = [];

const btnIndietro = document.getElementById("indietro");
const btnAvanti = document.getElementById("avanti");
const pokedex=document.querySelector("#pokedex");


const getData = () => { console.log(APIUrl);
    fetch(APIUrl)
        .then(result => result.json())
        .then(data => {
            console.log("Richiesta API:", data);
            nPokemon = data.count;
            console.log("Totale Pokemon:", nPokemon);
            arrayPokemon = data.results;
            console.log("Set di Pokemon ricevuto:", arrayPokemon);

            return Promise.all(arrayPokemon.map(pokemon => {
                return fetch(pokemon.url)
                    .then(result => result.json())
                    .then(data => {
                        return {
                            numero: data.order,
                            nome: data.name,
                            immagine: data.sprites.front_default,
                            tipo1: data.types[0].type.name,
                            tipo2: data.types[1]?.type.name || null
                        };
                    });
            }));
        })
        .then(cards => {
            console.log("Array di card Pokemon:", cards);
            cards.forEach((item)=>{
                const elementoCard = document.createElement("div");
                elementoCard.classList.add("card");
                pokedex.appendChild(elementoCard);

                const pNumero=document.createElement("p");
                elementoCard.appendChild(pNumero);
                pNumero.textContent=item.numero;
                pNumero.classList.add("numero");

                const h2Nome=document.createElement("h2");
                elementoCard.appendChild(h2Nome);
                h2Nome.textContent=item.nome;

                const imgPokemon=document.createElement("img");
                imgPokemon.setAttribute("src",item.immagine)
                elementoCard.appendChild(imgPokemon);

                const pTipo1=document.createElement("p");
                elementoCard.appendChild(pTipo1);
                pTipo1.textContent=item.tipo1;
                pTipo1.classList.add("tipo1");
                
                const pTipo2=document.createElement("p");
                elementoCard.appendChild(pTipo2);
                pTipo2.textContent=item.tipo2;
                pTipo2.classList.add("tipo2");
                
            })
            

        })
        .catch(error => {
            console.error("Errore nella richiesta:", error);
        });
};

getData();
console.log(pokedex);
btnAvanti.addEventListener("click", function() {
    offset+=9;
    APIUrl  = `https:pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;
    console.log("offset:",offset);
    pokedex.innerHTML = "";
    getData();
})

btnIndietro.addEventListener("click", function() {
    offset-=9;
    if (offset<0) {
        offset=0;
    };
    APIUrl  = `https:pokeapi.co/api/v2/pokemon/?limit=9&offset=${offset}`;
    console.log("offset:",offset);
    pokedex.innerHTML = "";
    getData();
})