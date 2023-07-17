window.addEventListener('load',iniciar,false);

var contador=0;

function iniciar(){
    setInterval('cambiarImg()',3000);
}

   var obj=document.getElementById('slider');
var obj2=obj.getElementsByTagName('img');

function cambiarImg(){          

    if(contador==obj2.length){
        for(var i=0; i<obj2.length; i++){
            obj2[i].style.opacity='0';
            contador--;
        }
        obj2[contador].style.opacity='1';
    }
    else
    {
        obj2[contador].style.opacity='1';
        contador++;
    }
    
}


let pagina = 1; 
let modo = "popular"
let titulo = "Filmes Motivacionais"
const btnAnterior = document.getElementById('btnAnterior'); 
const btnSiguiente = document.getElementById('btnSiguiente'); 
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-list');

const btnUp = document.getElementById('btnUp')

const idBusqueda = document.getElementById('popular')
const idBusqueda1 = document.getElementById('top-rated')
const idBusqueda2 = document.getElementById('now-playing')

const add_btn = () =>{
    if (window.scrollY > 200) {
        btnUp.classList.add("btnUp-on")
    }else {
        btnUp.classList.remove("btnUp-on")
    }
}

btnUp.addEventListener('click', () =>{
    document.documentElement.scrollTop=0;
})

idBusqueda.addEventListener('click', () =>{
    modo = "popular";
    titulo = "Filmes Motivacionais";
    pagina = 1;
    console.log(modo);
    carregarFilmes();
    navMenu.classList.toggle("nav-list_visible")
})

idBusqueda1.addEventListener('click', () =>{
    modo = "top_rated";
    titulo = "Filmes Reflexivos";
    pagina = 1;
    console.log(modo);
    carregarFilmes();
    navMenu.classList.toggle("nav-list_visible")
})

idBusqueda2.addEventListener('click', () =>{
    modo = "now_playing";
    titulo = "Filmes Alegres"
    pagina = 1;
    console.log(modo);
    carregarFilmes();
    navMenu.classList.toggle("nav-list_visible")
})

btnSiguiente.addEventListener('click', () => {
    if(pagina < 1000){
        pagina += 1;
        carregarFilmes();
    }
    document.documentElement.scrollTop=0;
}); 

btnAnterior.addEventListener('click', () => { 
    if(pagina > 1){
        pagina -= 1;
        carregarFilmes();
    }
    document.documentElement.scrollTop=0;
}); 

const carregarFilmes = async() => {
	try {
		const resposta = await fetch(`https://api.themoviedb.org/3/movie/${modo}?api_key=2666f82d8ae3b0f7a2d24eefc3953980&language=pt-BR&page=${pagina}`);

		if(resposta.status === 200){
			const dados = await resposta.json();

			let filmes = '';
			dados.results.forEach(filme => {
				filmes += `
					<div class="filmes">
                        <div class="descricao">
                            <img class="poster" src="https://image.tmdb.org/t/p/w500/${filme.poster_path}">
                            <div class="descricao-link">
                                <h2 class="descricao-name">${filme.title}</h2>
                                <p class="descricao-name">${filme.release_date}</p> 
                                <p class="descricao-name">${filme.overview}</p>
                            </div>
                        </div>           
					</div>
				`;
			});
            document.getElementById('contenedor').innerHTML = filmes;
            document.getElementById('titulo').innerHTML = titulo;

		} else if(resposta.status === 401){
			console.log("Colocou a chave mal");
            alert('Colocou a chave mal')
		} else if(resposta.status === 404){
			console.log("O filme que procura nao existe");
            alert('O filme que procura nao existe')
		} else {
			console.log('Ha um erro');
            alert('Ha um erro')
		}

	} catch(error){
		console.log(error);
	}

}

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle("nav-list_visible")
})

window.onscroll = () =>{
    add_btn()
}

carregarFilmes() // ejecutamos la funcion para mostrarlas en el navegador
//detallesPliculas()