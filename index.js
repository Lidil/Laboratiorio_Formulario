const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{2,40}$/, 
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, //Comprobar que sea un email 
	clave: /^.{1,8}$/, 
}

const campos = {
	nombre: false,
	email: false,
	clave: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
		break;
		case "email":
			validarCampo(expresiones.correo, e.target, 'email');
		break;
		case "clave":
			validarCampo(expresiones.clave, e.target, 'clave');
			validarClave2();
		break;
		case "clave2":
			validarClave2();
		break;
		
	
	}
}

const validarCampo = (expresion, input, campo) => {
	if(expresion.test(input.value)){
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.remove('formulario_input_error_activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo_incorrecto');
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo_correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_${campo} .formulario_input_error`).classList.add('formulario_input_error_activo');
		campos[campo] = false;
	}
}

const validarClave2 = () => {
	const inputClave1 = document.getElementById('clave');
	const inputClave2 = document.getElementById('clave2');

	if(inputClave1.value !== inputClave2.value){
		document.getElementById(`grupo_clave2`).classList.add('formulario_grupo_incorrecto');
		document.getElementById(`grupo_clave2`).classList.remove('formulario_grupo_correcto');
		document.querySelector(`#grupo_clave2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo_clave2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo_clave2 .formulario_input_error`).classList.add('formulario_input_error_activo');
		campos['clave'] = false;
	} else {
		document.getElementById(`grupo_clave2`).classList.remove('formulario_grupo_incorrecto');
		document.getElementById(`grupo_clave2`).classList.add('formulario_grupo_correcto');
		document.querySelector(`#grupo_clave2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo_clave2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo_clave2 .formulario_input_error`).classList.remove('formulario_input_error_activo');
		campos['clave'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});

formulario.addEventListener('submit', (e) => {
	e.preventDefault();

	if(campos.nombre && campos.email && campos.clave ){
		alert("Enviado correctamente")
		formulario.reset();
		/*Para eliminar los iconos */ 
		document.querySelectorAll('.formulario_grupo_correcto').forEach((icono) => {
			icono.classList.remove('formulario_grupo_correcto');
		});
	} else {
		

		/*Para que salten los mensajes de error*/ 
		
		 document.querySelectorAll('.formulario_input_error').forEach((mensaje)=>{
			mensaje.classList.add('formulario_input_error_activo');
		 });
	}
});