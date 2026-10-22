// Esperamos a que la página cargue completamente
window.onload = function () {

  // Links del menú: cada uno muestra su sección
  document.getElementById("linkInicio").onclick = function () {
    mostrarSeccion("inicio");
    return false;   // evita que el link recargue la página
  };

  document.getElementById("linkFormulario").onclick = function () {
    mostrarSeccion("formulario");
    return false;
  };

  // El link del pie no lleva a ningún sitio
  document.getElementById("linkAutor").onclick = function () {
    return false;
  };

  var formulario = document.getElementById("formulario");

  // Cuando el usuario pulsa "Enviar" se ejecuta la validación
  formulario.onsubmit = function () {
    var esValido = validar();
    return esValido;   // si es false, el formulario NO se envía
  };

  // Cuando el usuario pulsa "Limpiar" se borran también los mensajes
  document.getElementById("limpiar").onclick = function () {
    limpiarMensajes();
  };
};

// Muestra una sección y oculta la otra
function mostrarSeccion(nombre) {
  var inicio = document.getElementById("seccionInicio");
  var formulario = document.getElementById("seccionFormulario");

  if (nombre == "inicio") {
    inicio.className = "";           // se ve
    formulario.className = "oculto"; // se oculta
  } else {
    inicio.className = "oculto";
    formulario.className = "";
  }
}

// Borra todos los mensajes de la pantalla
function limpiarMensajes() {
  document.getElementById("errorNombre").innerHTML = "";
  document.getElementById("errorCi").innerHTML = "";
  document.getElementById("errorClave").innerHTML = "";
  document.getElementById("errorConfirmacion").innerHTML = "";
  document.getElementById("mensajeFinal").innerHTML = "";
}

// Función principal de validación
function validar() {

  // 1. Primero borramos los mensajes anteriores
  limpiarMensajes();

  // 2. Guardamos lo que escribió el usuario
  var nombre = document.getElementById("nombre").value;
  var ci = document.getElementById("ci").value;
  var clave = document.getElementById("clave").value;
  var confirmacion = document.getElementById("confirmacion").value;

  // 3. Esta variable nos dice si todo está bien
  var todoBien = true;

  // --- Regla 1: ningún campo vacío ---
  if (nombre == "") {
    document.getElementById("errorNombre").innerHTML = "El nombre no puede estar vacío.";
    todoBien = false;
  }

  // --- Regla 2: CI con 11 caracteres o más y solo números ---
  if (ci == "") {
    document.getElementById("errorCi").innerHTML = "El CI no puede estar vacío.";
    todoBien = false;
  } else if (isNaN(ci) || ci.indexOf(" ") != -1 || ci.indexOf(".") != -1 || ci.indexOf("-") != -1 || ci.indexOf("+") != -1) {
    // isNaN comprueba si NO es un número; los demás if descartan espacios, puntos y signos
    document.getElementById("errorCi").innerHTML = "El CI solo debe contener números.";
    todoBien = false;
  } else if (ci.length < 11) {
    document.getElementById("errorCi").innerHTML = "El CI no puede tener menos de 11 caracteres.";
    todoBien = false;
  }

  // --- Regla 1: contraseña no vacía ---
  if (clave == "") {
    document.getElementById("errorClave").innerHTML = "La contraseña no puede estar vacía.";
    todoBien = false;
  }

  // --- Regla 1 y 3: confirmación no vacía y contraseñas iguales ---
  if (confirmacion == "") {
    document.getElementById("errorConfirmacion").innerHTML = "La confirmación no puede estar vacía.";
    todoBien = false;
  } else if (clave != confirmacion) {
    document.getElementById("errorConfirmacion").innerHTML = "Las contraseñas deben ser iguales.";
    todoBien = false;
  }

  // 4. Mensaje final si todo salió bien
  if (todoBien == true) {
    document.getElementById("mensajeFinal").innerHTML = "¡Datos correctos! Registro enviado.";
    return false;   // devolvemos false solo para ver el mensaje (no recarga la página)
  }

  return false;
}
