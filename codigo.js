// Inicializa elementos ocultos

ocultarBotonCopiar();
ocultarSalida();


// Inicializa variables globales

var letrasValidas = [" ","!","?","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
var letrasACodificar = ["a","e","i","o","u"];
var codigoLetras = ["ai","enter","imes","ober","ufat"];

// Func para obtener elementos HTML

function obtenerEntrada() {
    return document.getElementById('entrada');
}

function obtenerSalida() {
    return document.getElementById("salida");
}

function obtenerResultadoVacio() {
    return document.getElementById("sin-resultado");
}

function obtenerBoton() {
    return document.getElementById("boton-copiar");
}

function obtenerAviso() {
    return document.getElementById("aviso");
}

//--- Comportamiento Botones

function enviarTextoAEncriptar() {
    let texto = obtenerEntrada().value;
    var textoCodificado = "";
    
    if (validarCadena(texto,letrasValidas) && (texto.length > 0))
        {
        mostrarBotonCopiar();
        ocultarSinResultado();
        mostrarSalida();
        
        textoCodificado = codificarCadena(texto,letrasACodificar,codigoLetras);
        asignarCampoSalida(textoCodificado);
        }
        
        else {
            mostrarSinResultado();
            ocultarSalida();
            ocultarBotonCopiar();
            
        }
}

function enviarTextoADesencriptar() {
    
    let texto = obtenerEntrada().value;
    var textoCodificado = "";
    
    if (validarCadena(texto,letrasValidas) && (texto.length > 0)) {
    
        ocultarSinResultado()
        mostrarBotonCopiar();        
        mostrarSalida();
        
        textoCodificado = decodificarCadena(texto,letrasACodificar,codigoLetras);
        asignarCampoSalida(textoCodificado);
        }

        else {
            
        mostrarSinResultado();
        ocultarSalida();
        ocultarBotonCopiar();
        
    }
}


function copiarTexto() {
    let texto = obtenerSalida();
    
    texto.select();
    navigator.clipboard.writeText(texto.value);    
}

// MOSTRAR / OCULTAR elementos html

function mostrarBotonCopiar() {
    obtenerBoton().style.display = 'block';
}

function ocultarBotonCopiar() {
    obtenerBoton().style.display = 'none';
}

function mostrarSinResultado() {
    obtenerResultadoVacio().style.display = 'block';
}

function ocultarSinResultado() {
    obtenerResultadoVacio().style.display = 'none';
}

function mostrarSalida() {
    obtenerSalida().style.display = "block";
}

function ocultarSalida() {
    obtenerSalida().style.display = "none";
}



// Funciones para asignar datos a campos

function asignarCampoEntrada(cadena) {
    obtenerEntrada().value = cadena;
}

function asignarCampoSalida(cadena) {
    obtenerSalida().value = cadena;
}

// Funciones booleanas

function validarCaracter(caracter,arreglo) { 
//Recibe un caracter y un array de caracteres y devuelve TRUE si pertenece 
    var bandera = false;
    var i = 0;

    while ((i < arreglo.length) && (bandera==false) ){

        if  (arreglo[i] == caracter)  {
            bandera = true;
        }
            else {
                i++;
            }
    }
    return bandera; 
}

function validarCadena(cadena,arreglo) {
//Recibe un string y un arreglo de caracteres y devuelve si todos pertenecen   
    var bandera = true;
    var i = 0;
    
    cadena = sacarRetornosCarro(cadena);

    while ( ( i <= ((cadena.length)-1)) && (bandera==true) ) {
        if (validarCaracter((cadena[i]),arreglo)) {
            i++;
        }
            else {
                bandera=false;
            }
    }
    return bandera;
}

function verificarPertenece (letra,arregloLetras) {
//devuelve TRUE si la letra pertenece al arregloLetras 
    var i = 0;
    bandera = false;
    
    while ( (i <= ((arregloLetras.length) -1)) && (bandera == false) ){
               
        if (letra == arregloLetras[i]) {
            bandera = true;
        }
            else {
                i++;
            }
    }
    return bandera;
        
}

// Funciones operativas y procedimientos

function codificarLetra (letra,arregloLetras,arregloCodigos) {
//devuelve el codigo de arregloCodigos que corresponde a la letra 
    var i = 0;
    
    while  (i <= ((arregloLetras.length) -1)) {
               
        if (letra == arregloLetras[i]) {
            return arregloCodigos[i];
        }
            else {
                i++;
            }
    }
}

function codificarCadena(cadenaEntrada,arregloLetras,arregloCodigo) {
//recibe una cadena y la devuelve codificada  
    var cadenaSalida = "";

    for (var i = 0; i <= ((cadenaEntrada.length)- 1 ); i++) {
        
        if ( verificarPertenece((cadenaEntrada[i]),arregloLetras) ) {
            cadenaSalida = cadenaSalida + (codificarLetra(cadenaEntrada[i],arregloLetras,arregloCodigo));
        }
            else {
                cadenaSalida = cadenaSalida + (cadenaEntrada[i]);
            } 
        
    } 
    
    return cadenaSalida;
}


function decodificarLetra(cadena,letra,codigo) {
// devuelve la letra que corresponde a un codigo    

    while (cadena.includes(codigo)) {
       cadena=cadena.replace(codigo,letra);
    }

    return cadena;
}

function decodificarCadena(cadena,arregloLetras,arregloCodigo) {
 // devuelve una cadena decodificada   
    
    for (var i = 0; i <= ((arregloLetras.length)- 1 ); i++) {
        cadena = decodificarLetra(cadena,arregloLetras[i],arregloCodigo[i]);
    }
   
    return cadena;
}

function sacarRetornosCarro(cadena) {
//quita los retornos de carro de una cadena 
    return cadena.replace(/(\r\n|\n|\r)/gm, "");  
}
