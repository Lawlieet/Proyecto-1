//LLamando al canvas
let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')

//Crear dimensiones de la nave
let nave = {
    x: 100,
    y: canvas.height - 100,
    width: 50,
    height: 50,

}

let game = {
    estado: "inicio",
}

let mensaje = {
    contador: -1,
    titulo: '',
    subtitulo: ''
}

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

function loadMedia() {
    fondo = new Image()
    fondo.src = 'bg1.png';
    fondo.onload = function () {
        let intervalo = window.setInterval(frameLoop, 1000 / 55)
    }
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
        ctx.fillRect(enemigo.x, enemigo.y, enemigo.width, enemigo.height)
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
    ctx.fillStyle = "white"
    ctx.fillRect(nave.x, nave.y, nave.width, nave.height)
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
    if (teclado[37]) {
        //move left
        nave.x -= 6;

        if (nave.x < 0) nave.x = 0
    }

    if (teclado[39]) {
        //mov rigth
        let limite = canvas.width - 50;
        nave.x += 6;
        //move r
        if (nave.x > limite) {
            nave.x = limite
        }
    }

    if (teclado[32]) {
        //Los disparo estan bien locos si se tocaba una vez la barra troanaba
        if (!teclado.fire) {
            fire()
            teclado.fire = true
        } else {
            teclado.fire = false
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
        ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height)
        ctx.restore()

    }
}


//Moverdisparos Enemigos
function moverDisparosEnemigos() {
    for (let i in disparosEnemigos) {
        let disparo = disparosEnemigos[i];
        disparo.y += 3
    }
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
            width: 15,
            height: 40,
            contador: 0,
        }
    }
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

            //Funcion aleatoria que aroja un random de los disparos 

            if (aleatorio(0, enemigos.length * 10) == 4) {
                disparosEnemigos.push(agregarDisparosEnemigos(enemigo))
            }
        }

        if (enemigo && enemigo.estado == 'hitBox') {
            enemigo.contador++;
            if (enemigo.contador >= 25) {
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
    disparos.push({
        x: nave.x - 20,
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
        ctx.fillRect(disparo.x, disparo.y, disparo.width, disparo.height)
    }

    ctx.restore();
}

function dibujarTexto() {
    if (mensaje.contador == -1) return;

    let alpha = mensaje.contador / 50.0

    if (alpha > 1) {
        for (let i in enemigos) {
            delete enemigos[i];
        }
    }
    ctx.save()
    ctx.globalAlpha = alpha
    if (game.estado == 'perdido') {
        ctx.fillStyle = 'white'
        ctx.font = 'bold 50pt Arial';
        ctx.fillText(mensaje.titulo, 140, 200)
        ctx.font = ' 30pt Arial';
        ctx.fillText(mensaje.subtitulo, 140, 250)
    }

    if (game.estado == 'victoria') {
        ctx.fillStyle = 'white'
        ctx.font = '50pt Arial-Black';
        ctx.fillText(mensaje.titulo, 140, 200)
        ctx.font = ' 30pt Arial';
        ctx.fillText(mensaje.subtitulo, 140, 250)
    }


}


function estadoDelJuego() {
    if (game.estado == 'jugando' && enemigos.length == 0) {

        game.estado = 'victoria'
        mensaje.titulo = "Destruiste la flota del MAL"
        mensaje.subtitulo = "Press R"
        mensaje.contador = 0;
    }
    if (mensaje.contador >= 0) {
        mensaje.contador++
    }

}


function hitBox(a, b) {
    let hitBox = false

    //     if( a.x < a.x + a.width &&
    //         a.x + a.width > a.x &&

    //         b.y < b.y + b.height &&
    //         b.height + b.y > b.y
    //     ){
    //             console.log("colicion")
    //             return hitBox
    //     }

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
        if (a.y <= b.y && a.y + a.height >= b.y + b.height) {}

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
                enemigo.estado = 'hitBox'
                enemigo.contador = 0;
                console.log('contato con el pinche nave espero que ahora si')
            }
        }

    }

    if (nave.estado == "hitBox" || nave.estado == "muerto") return
    for (let i in disparosEnemigos) {
        let disparo = disparosEnemigos[i];
        if (hitBox(disparo, nave)) {
            nave.estado = "hitBox";

        }
    }

}


function aleatorio(inferior, superior) {

    let disparoPosible = superior - inferior
    let a = Math.random() * disparoPosible
    a = Math.floor(a)
    return parseInt(inferior) + a;
}

function frameLoop() {
    estadoDelJuego();
    moverNave();
    moverDisparosEnemigos();
    moverDisparos();
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
loadMedia();
agregarEventosTeclado();