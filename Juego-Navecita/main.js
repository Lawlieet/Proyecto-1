//LLamando al canvas
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

//Crear dimensiones de la nave
let nave = {
    x: 100,
    y: canvas.height - 100,
    width: 50,
    height: 50,
    contador: 0,

}

let game = {
    estado: "inicio",
}

let mensaje = {
    contador: -1,
    titulo: '',
    subtitulo: ''
}

let navecita;
let enemigoNave;
let rashoLaser;
let rashoLaser2;

//Definir el movimiento por teclado sin ningun parametro
let teclado = {}

//Se define disparos la cual pasara a guardar el array
let disparos = []
let disparosEnemigos = []
let enemigos = []


//Se crea una variable la cual se nombra fondo
//Esta pasara a guardar la imagen del fondo y a su ves
//Instancia un nuevo fondo el cual pasa a cargar la imagen

let fondo;
let imagenes = ['./nave1.png', './enemigo1.png', './enemigo2.png', './bg1.png', './laser.png', './laser2.png']
let musicDisparo;
let musicDisparoEnemigo;
let musicInicio;
let musicEnd;
<<<<<<< HEAD
let musicEndEnemi;
=======
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1

let preloader;

function loadMedia(){
<<<<<<< HEAD
   
    preloader = new PreloadJS();
    preloader.onProgress = progresoCarga;
    cargar()
=======
    preloader = new PreloadJS();
preloader.onProgress = progresoCarga;
cargar()

>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
}
function cargar(){
    while(imagenes.length > 0){
        let imagen = imagenes.shift();
        preloader.loadFile(imagen);
    }
}

function progresoCarga(){
<<<<<<< HEAD
    

   
        let interval = window.setInterval(frameLoop,1000/5)
        fondo = new Image();
        fondo.src ='./images/bg1.png'

        navecita = new Image();
        navecita.src ='./images/nave1.png'

        enemigoNave = new Image();
        enemigoNave.src ='./images/enemigo1.png'

        rashoLaser = new Image();
        rashoLaser.src ='./images/laser2.png'

        rashoLaser2 = new Image();
        rashoLaser2.src ='./images/laserEnemigo.png'

        musicDisparo = document.createElement('audio')
        document.body.appendChild(musicDisparo);
        musicDisparo.setAttribute('src','./sonidos/sonidoDisparo.mp3')

        musicDisparoEnemigo = document.createElement('audio')
        document.body.appendChild(musicDisparoEnemigo);
        musicDisparoEnemigo.setAttribute('src','./sonidos/sonidoDisparoenemigo.wav')

        musicEnd = document.createElement('audio');
        document.body.appendChild(musicEnd);
        musicEnd.setAttribute('src','./sonidos/gameOver.mp3')

        musicEndEnemi = document.createElement('audio');
        document.body.appendChild(musicEndEnemi);
        musicEndEnemi.setAttribute('src','./sonidos/muerteEnemigo.wav')
        
=======
    // console.log(parseInt(preloader.progress * 100)+"%")
    // if(preloader.progress == 1){

    
        let interval = window.setInterval(frameLoop,1000/5)
        fondo = new Image();
        fondo.src ='./bg1.png'

        navecita = new Image();
        navecita.src ='./nave1.png'

        enemigoNave = new Image();
        enemigoNave.src ='./enemigo1.png'

        rashoLaser = new Image();
        rashoLaser.src ='./laser2.png'

        rashoLaser2 = new Image();
        rashoLaser2.src ='./laserEnemigo.png'

        musicDisparo = document.createElement('audio')
        document.body.appendChild(musicDisparo);
        musicDisparo.setAttribute('src','sonidoDisparo')


>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1


    //}
}




//se encarga de dibujar a los enemigos bueno darlesun color el cual deuna forma estan de un color y luego otroaunque falta  modificar porque no se arreglo
function enemigosDibujados() {
    for (let i in enemigos) {
        let enemigo = enemigos[i];
        ctx.save();
        if (enemigo.estado == 'vivo') {
            ctx.fillStyle = "red"
        }
        if (enemigo.estado == "muerto") {
            ctx.fillStyle = "orange"
        }
        ctx.drawImage(enemigoNave,enemigo.x, enemigo.y, enemigo.width, enemigo.height)
    }
}


//Se crra la funcion fondo la cual pasara a dibujar el mismo
function dibujarFondo() {
    ctx.drawImage(fondo, 0, 0)
}

//Funcion que dibuja la nave
//Recordatorio se marca solo con un recuadro de color blanco
//Para evitar problemas de no mostrar la imagen
//https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/save

function dibujarNave() {
    ctx.save();
    //Cuadrotp guia ctx.fillStyle = "white"
    ctx.drawImage(navecita,nave.x, nave.y, nave.width, nave.height)
    ctx.restore()
}


//Se declara la funcion la cual guardara el evento del teclado solo movimiento
//Se define por dentro aregar enevtnto el cual reconocera el keydown y up
//https://developer.mozilla.org/es/docs/Web/API/Element/keydown_event  /https://developer.mozilla.org/es/docs/Web/API/Document/keyup_event

function agregarEventosTeclado() {
    agregarEvento(document, "keydown", function (e) {
        //True tecla push
        teclado[e.keyCode] = true;
    })

    agregarEvento(document, "keyup", function (e) {
        //True tecla dejada de presionar
        teclado[e.keyCode] = false;
    })

    //Se crea la funcion agregarEvento el cual recibe tres parametros
    //Elemeto = document , nombreEvento = keydown y keyup y funcion =  e
    //Si el addEventListener es = True  retorna el eveneto de la tecla pesionada dicha tecla  se define en una funcion
    //La cual le damos el movimiento de izq y derecha
    function agregarEvento(elemento, nombreEvento, funcion) {
        if (elemento.addEventListener) {
            elemento.addEventListener(nombreEvento, funcion, false)
        } else if (elemento.attachEvent) {
            elemento.attachEvent(nombreEvento, funcion)
        }
    }
}

//La funcion mover nave m se ejecuta en la funcion de loop la cual es la que se encuentra llamando a todas las funciones


function moverNave() {
    if (teclado[65]) {
        //move left
        nave.x -= 6;

        if (nave.x < 0) nave.x = 0
    }

    if (teclado[68]) {
        //mov rigth
        let limite = canvas.width - nave.width;
        nave.x += 6;
        //move r
        if (nave.x > limite) {
            nave.x = limite
        }
    }

    if (teclado[87]) {
        //Los disparo estan bien locos si se tocaba una vez la barra troanaba
        if (!teclado.fire) {
            fire()
            teclado.fire = true
<<<<<<< HEAD
        }
=======
        } 
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
    }    

    else teclado.fire = false;
        if (nave.estado == "hitBox") {
            nave.contador++
            if (nave.contador >= 20) {
                nave.contador = 0
                nave.estado = 'muerto'
                game.estado = 'perdido'
                mensaje.titulo = '¡¡-GAME OVER-!!'
                mensaje.subtitulo = 'Press R to Restart'
                mensaje.contador = 0;
            }
        }


}
//Dibujar disparos de los enemigos contienen el color de los enemigos bueno los disparo
//fala agregar la nave y demas detalles

function dibujarDisparosEnemigos() {
    for (let i in disparosEnemigos) {
        let disparo = disparosEnemigos[i];
        ctx.save();
        ctx.fillStyle = "blue "
        ctx.drawImage(rashoLaser2,disparo.x, disparo.y, disparo.width, disparo.height)
        ctx.restore()

    }
}


//Moverdisparos Enemigos
function moverDisparosEnemigos() {
    for (let i in disparosEnemigos) {
        let disparo = disparosEnemigos[i];
        disparo.y += 3
    }
    //Si el disparo es mayor que el canvas el disparo se elimina
    //lo que comento Joss para que no se quede en un ciclo y se sobre carge o alente el navegador
    disparosEnemigos = disparosEnemigos.filter(function (disparo) {
        return disparo.y < canvas.height

    });

}

//funcion que genera los enemigosr random  al igual se agregan los disparos
//for in  para recorrer el arreglo completo despues empujando con el push las estadisticas de los enemigos

function nuevosEnemigos() {

    function agregarDisparosEnemigos(enemigo) {

        return {
            x: enemigo.x,
            y: enemigo.y,
            width: 10,
            height: 30,
            contador: 0,
        }
    }
    //Aqui se crean los enemigos necesito ver como aumentarlos
    if (game.estado == 'inicio') {

        for (let i = 0; i < 10; i++) {
            enemigos.push({
                x: 10 + (i * 50),
                y: 10,
                height: 40,
                width: 40,
                estado: 'vivo',
                contador: 0
            });
        }

        game.estado = 'jugando'

    }
    for (let i in enemigos) {
        let enemigo = enemigos[i];

        if (!enemigo) continue;
        if (enemigo && enemigo.estado == "vivo") {
            enemigo.contador++;
            enemigo.x += Math.sin(enemigo.contador * Math.PI / 90) * 5;

<<<<<<< HEAD
            //Funcion aleatoria que aroja un random de los disparos
=======
            //Funcion aleatoria que aroja un random de los disparos 
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
            //Es rara porque si se aumenta mucho se convierte en un bullethell

            if (aleatorio(0, enemigos.length * 10) == 4) {

//Falta agregar de igual forma y buscar un audio para el disparo del enemigo                
<<<<<<< HEAD
            musicDisparoEnemigo.pause();
            musicDisparoEnemigo.currentTime = 0;
            musicDisparoEnemigo.play();
=======

>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1

                disparosEnemigos.push(agregarDisparosEnemigos(enemigo))
            }
        }

        if (enemigo && enemigo.estado == 'hitBox') {
            enemigo.contador++;
            if (enemigo.contador >= 20) {
                enemigo.estado = 'muerto'
                enemigo.contador = 0
            }
        }

    }

    enemigos = enemigos.filter(function (enemigo) {
        if (enemigo && enemigo.estado != 'muerto') return true
        return false


    })

}



//Funcion mover disparos la separe porque no logrba que disparaba y se moviera
//

function moverDisparos() {
    for (let i in disparos) {
        let disparo = disparos[i];
        disparo.y -= 2
    }
    disparos = disparos.filter(function (disparo) {
        return disparo.y > 0
    })
}

//Funcion fire la cual empuja disparos con el push lo que ayuda a filtrar para despues borrarlos
//Si disparo persiste saliendo del Eje y puede ocacionar una sobre carga ya que el elemento aun seguiriai ejecutandose
//
function fire() {
    //Falta agregar y buscar el sonidos
<<<<<<< HEAD
     musicDisparo.pause();
     musicDisparo.currentTime = 0;
     musicDisparo.play();
=======
    // musicDisparo.pause();
    // musicDisparo.currentTime = 0;
    // musicDisparo.play();
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
    disparos.push({
        x: nave.x + 20,
        y: nave.y - 10,
        width: 10,
        height: 30
    })
}

//SE dibuja el disparo se aplica el save para guairdar el estado previo del mismo
//luego se dibuja el disparo que pósterior espeero cambiarlo por una imagen y o un sprite
//Por ultimo restaua el evento prebio antes guardadocon el save
function dibujarDisparos() {
    ctx.save();
    ctx.fillStyle = "white"
    for (let i in disparos) {
        let disparo = disparos[i]
        ctx.drawImage(rashoLaser,disparo.x, disparo.y, disparo.width, disparo.height)
    }

    ctx.restore();
}

function dibujarTexto() {
    if (mensaje.contador == -1) return;
<<<<<<< HEAD
//El alfa ayuuda a que el texto simule un difuminado
=======
//El alfa ayuuda a que el texto simule un difuminado 
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
    let alpha = mensaje.contador / 50.0

    if (alpha > 1) {
        for (let i in enemigos) {
            delete enemigos[i];
        }
    }
    ctx.save()
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha    
    ctx.globalAlpha = alpha;
    if (game.estado == 'perdido') {
        ctx.fillStyle = 'white'
        ctx.font = '50pt Arial';
        ctx.fillText(mensaje.titulo, 150, 250)
        ctx.font = ' 20pt Arial';
        ctx.fillText(mensaje.subtitulo, 200, 350)
    }

    if (game.estado == 'victoria') {
        ctx.fillStyle = 'white'
        ctx.font = '50pt Arial-Black';
        ctx.fillText(mensaje.titulo, 150, 250)
        ctx.font = ' 30pt Arial';
        ctx.fillText(mensaje.subtitulo, 200, 350)
    }


}


function estadoDelJuego() {
    if (game.estado == 'jugando' && enemigos.length == 0) {

        game.estado = 'victoria'
        mensaje.titulo = "Destruiste la Flota"
        mensaje.subtitulo = "Press R"
        mensaje.contador = 0;
    }
    if (mensaje.contador >= 0) {
        mensaje.contador++
    }
    if ((game.estado == 'perdido' || game.estado == 'victoria') && teclado[82]) {
        game.estado = 'inicio';
        nave.estado = 'vivo'
        mensaje.contador = -1

    }
}


function hitBox(a, b) {
    let hitBox = false;

    //     if( a.x < a.x + a.width &&a.x + a.width > a.x &&b.y < b.y + b.height &&b.height + b.y > b.y  console.log("colicion")
    //   return hitBox
   
    //col vertical
    if (b.x + b.width >= a.x && b.x < a.x + a.width) {
        //coll horizontal  
        if (b.y + b.height >= a.y && b.y < a.y + a.height) {
            hitBox = true
        }
    }

    if (b.x <= a.x && b.x + b.width >= a.x + a.width) {
        if (b.y <= a.y && b.y + b.height >= a.y + a.height) {
            hitBox = true
        }

    }

    if (a.x <= b.x && a.x + a.width >= b.x + b.width) {
        if (a.y <= b.y && a.y + a.height >= b.y + b.height) {
        hitBox = true
    }
}

    return hitBox

}


//La pinche funcion que mas me ah dado lata puesto que siempre quiero mandar a llamar todas las cosas aqui
// y llamo las que no debo de llamar aqui ocacionanado que marque error
//Recordatorio revisar las funciones donde se estan llamando y antes y despues de que
//Para que estas no pasen a afectar al dibujado de la nave


function verificarContacto() {
    for (let i in disparos) {
        let disparo = disparos[i];
        for (j in enemigos) {
            let enemigo = enemigos[j];
            if (hitBox(disparo, enemigo)) {
<<<<<<< HEAD
               
                
                musicEndEnemi.currentTime = 0;
                musicEndEnemi.play();
                
            
               
=======
                
//De igual forma falta agregar el auidio de colision con el enemigo                
                
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
                enemigo.estado = 'hitBox'
                enemigo.contador = 0;
                console.log('contato cn el pinche nave espero que ahora si')
            }
        }

    }

    if (nave.estado == "hitBox" || nave.estado == "muerto") {return;}
    for (let i in disparosEnemigos) {
        let disparo = disparosEnemigos[i];
        if (hitBox(disparo, nave)) {

<<<<<<< HEAD
            musicEnd.currentTime = 0;
            musicEnd.play();


//Falta agregar el sonido de la nave muriendo            
            nave.estado = "hitBox";
           
=======

//Falta agregar el sonido de la nave muriendo            
            nave.estado = "hitBox";
            
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
        }
    }

}

<<<<<<< HEAD
//Esta la encontre en un foro
=======
//Esta la encontre en un foro 
>>>>>>> 28953049a74b56cf4487c0c72d632f283d9a07c1
function aleatorio(inferior, superior) {

    let disparoPosible = superior - inferior
    let a = Math.random() * disparoPosible
    a = Math.floor(a)
    return parseInt(inferior) + a;
}

function frameLoop() {
    estadoDelJuego();
    moverNave();
    moverDisparos();
    moverDisparosEnemigos();
    dibujarFondo();
    verificarContacto();
    nuevosEnemigos();
    enemigosDibujados();
    dibujarDisparosEnemigos();
    dibujarDisparos();
    dibujarTexto();
    dibujarNave();

}

//SE llama al fla funcion fondo y al evento del teclado que este es el encargado de manejar que tecla se esta marcando


   
window.addEventListener('load',init) 
function init() {
        agregarEventosTeclado();
        loadMedia();
    }

