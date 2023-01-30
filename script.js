const formulario = document.getElementById('formulario');
const paso = document.getElementById('paso');
const inputs = document.querySelectorAll('#formulario input');
const regresar = document.getElementById('regresar');

const num = document.getElementById('num_tarjeta');
const usuario =document.getElementById('usuario');
const fecha_tar_mes =document.getElementById('tar_fecha_mes');
const fecha_tar_age =document.getElementById('tar_fecha_age');
const cvc_tar =document.getElementById('tar_cvc');

const expresionesRegulares = {
    nombre:/^[a-zA-ZÀ-ÿ\s]{5,30}$/,
    numero:/^([\d]{4})+(\s)+([\d]{4})+(\s)+([\d]{4})+(\s)+([\d]{4})$/,
    mes:/^[\d]{2}$/,
    age:/^[\d]{2}$/,
    cvc: /^[\d]{3}$/
}
const campos ={
    nombre:false,
    numero:false,
    mes:false,
    age:false,
    cvc:false
}

const validarFromulario = (e) =>{
    switch (e.target.name){
        case "nombre":
           validarCampo(expresionesRegulares.nombre,e.target,'nombre');
            if (e.target.value.length == 0 ){
                usuario.innerHTML="Jane Appleseed";
            }else if(e.target.value.length < 25){
                usuario.innerHTML=e.target.value;
            }
        break;
        case "numero":
            validarCampo(expresionesRegulares.numero,e.target,'numero');
            if (e.target.value.length == 0 ){
                num.innerHTML="0000 0000 0000 0000";
            }else if(e.target.value.length < 20){
                num.innerHTML=e.target.value;
            }
        break;
        case "mes":
            validarCampo(expresionesRegulares.mes,e.target,'mes');
            if (e.target.value.length == 0 ){
                fecha_tar_mes.innerHTML="00";
            }else if(e.target.value.length < 3){
                fecha_tar_mes.innerHTML=e.target.value;
            }
        break;
        case "age":
            validarCampo(expresionesRegulares.age,e.target,'age');
            if (e.target.value.length == 0 ){
                fecha_tar_age.innerHTML="00";
            }else if(e.target.value.length < 3){
                fecha_tar_age.innerHTML=e.target.value;
            }
        break;
        case "cvc":
            validarCampo(expresionesRegulares.cvc,e.target,'cvc');
            if (e.target.value.length == 0 ){
                cvc_tar.innerHTML="000";
            }else if(e.target.value.length < 4){
                cvc_tar.innerHTML=e.target.value;
            }
        break;
    }
}
const validarCampo = (expresion,input,campo)=>{
    if(expresion.test(input.value)){
        if(campo == "mes" || campo == "age" ){
            document.getElementById(campo).classList.remove('Fecha_error');
            document.getElementById(campo).classList.add('Fecha_correcto');
        }else{
            document.getElementById(campo).classList.remove('error');
            document.getElementById(campo).classList.add('correcto');
        }
        campos[campo] = true;
        if(campos.mes && campos.age){
            document.getElementById('fecha').classList.remove('mal');
        }
    }else{
        if(campo == "mes" || campo == "age" ){
            document.getElementById(campo).classList.add('Fecha_error');
            document.getElementById(campo).classList.remove('Fecha_correcto');
        }else{
            document.getElementById(campo).classList.add('error');
            document.getElementById(campo).classList.remove('correcto');
        }
        campos[campo] = false;
        if( (campos.mes && campos.age) == false){
            document.getElementById('fecha').classList.add('mal');
        }
    }
}
inputs.forEach((i) =>{
    i.addEventListener('keyup',validarFromulario);
    i.addEventListener('blur',validarFromulario);
});

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();
    inputs.forEach((i) =>{
        //console.log(i.value,i.name);
        validarCampo(expresionesRegulares[i.name],i,i.name);
    });
    if(campos.nombre && campos.numero && campos.mes && campos.age && campos.cvc){
        formulario.style.display="none";
        paso.style.display="block";
    }
});

regresar.addEventListener('click',function(){
    formulario.reset();
    formulario.style.display="block";
    paso.style.display="none";
 });