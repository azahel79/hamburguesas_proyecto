let pagina = 1;


document.addEventListener('DOMContentLoaded',e=>{
  const ctr_menu = document.querySelector(`.ctr-menu-${pagina}`);
   ctr_menu.classList.add('activo');
  ///FUNCION DE IMPRIMIR 
  imprimirMenu();
  ///VALIDACION DE FORMULARIOS
  inputValidaciones();
////FECHA MINIMA
  fechaMinima();
  /////BOTON DE SIGUIENTE
  botonSiguiente();
  ///BOTON DE ATRAS
  botonAtras();

  controlMenu();
  ////MOSTRAR MENSAJE DE LISTA VACIA
  mostrarCompra();
////AGREGAR AL RESUMEN
agregarResumenMenu();

////EVENTO PARA ABRIR EL MODAL
abrirModal();
///EVENTO PARA CERRAR EL MODAL
cerrarModal();
})

////ABRIR EL MODAL DEL RESUMEN
const abrirModal = ()=>{
  const body = document.querySelector('body');
  const modal = document.querySelector('.modal-resumen');
    const  btn_lista = document.querySelector('.menu-resumen');
     btn_lista.addEventListener('click',e=>{
       e.preventDefault();
        modal.classList.add('mostrar');
        body.classList.add('ocultar');
     })
};


////CERRAR EL MODAL DEL RESUMEN
const cerrarModal = ()=>{

   const modal = document.querySelector('.modal-resumen');
    const body = document.querySelector('body');
   modal.addEventListener('click',e=>{
       if(e.target.classList.contains('salir')){
           modal.classList.remove('mostrar');
           body.classList.remove('ocultar');  
       }
   })




  
  // const btn_salir = document.querySelector('.salir');
  // console.log(btn_salir);
  // const modal = document.querySelector('.modal-resumen');
  // btn_salir.addEventListener('click',e=>{
  //    modal.classList.remove('mostrar');
  //    body.classList.remove('ocultar');      
  // })
};

////LEER MENU DEL SERVIDOR
const imprimirMenu = async()=>{
     const llamarAlMenu = await fetch('/menu',{
       method: 'get'
     });
     const verMenu =  await llamarAlMenu.json();


      mostrarMenu1(verMenu.result);
      mostrarMenu2(verMenu.result);
      mostrarMenu3(verMenu.result);
        //  for(let i = 6; i <= 8;i++ ){
        //       console.log(verMenu.result[i])
        //  }
    //  console.log(verMenu.result);
}
   
////MOSTRAR EL  MENU  

  const mostrarMenu1 = (menu = [])=>{
    const ctr_menu1 = document.querySelector('.ctr-menu-1');
        for(let i = 0; i <= 2; i++){
           const item =  templateMenu(menu[i]);
               ctr_menu1.appendChild(item)
        }
  }
  const mostrarMenu2 = (menu = [])=>{
    const ctr_menu2 = document.querySelector('.ctr-menu-2');
    for(let i = 3; i <= 5; i++){
      const item =  templateMenu(menu[i]);
      ctr_menu2.appendChild(item);
 }
  }
  const mostrarMenu3 = (menu = [])=>{
    const ctr_menu3 = document.querySelector('.ctr-menu-3');
    for(let i = 6; i <= 8; i++){
      const item =  templateMenu(menu[i]);
      ctr_menu3.appendChild(item);   
    }
  }

///BOTON EN SIGUIENTE
const botonSiguiente = ()=>{
     const boton_Siguiente = document.querySelector('.derecha');
       boton_Siguiente.addEventListener('click',e=>{
           pagina++;
           controlMenu();
       })
}

////BOTON ATRAS 
const botonAtras  = ()=>{
  const boton_atras = document.querySelector('.izquierda');
  boton_atras.addEventListener('click',e=>{
     pagina--;
     controlMenu();
  })
}


///CONTROLAR EL MENU
const controlMenu = ()=>{
  const boton_Siguiente = document.querySelector('.derecha');
  const boton_atras = document.querySelector('.izquierda');
     const activo = document.querySelector('.activo');
  if(activo){
      activo.classList.remove('activo');
  }
  const ctr_menu = document.querySelector(`.ctr-menu-${pagina}`);
  ctr_menu.classList.add('activo');
 
   if(pagina === 1){
    boton_atras.classList.remove('añadir-pedido');
    boton_Siguiente.classList.remove('añadir-pedido');
         boton_atras.classList.add('ocultar');
          
   }else if(pagina === 2){
          boton_atras.classList.remove('ocultar');
          boton_Siguiente.classList.remove('ocultar');
      
   }else if(pagina === 3){
         boton_Siguiente.classList.add('ocultar');
   
   }
}


/////EVENTO PARA REALIZAR LA COMPRA 


const agregarResumenMenu = ()=>{
    const menu = document.querySelector('.menu');
    // console.log(menu);
     
    menu.addEventListener('click',e=>{
       if(e.target.tagName === 'BUTTON'){
         const boton_añadir = e.target;
        //  console.log(boton_añadir);
          if(!boton_añadir.classList.contains('añadir-pedido')){
            // console.log(e.target.parentElement.parentElement);

            let obj = {
              nombre: e.target.parentElement.parentElement.querySelector('h1').textContent,
              precio: Number(e.target.parentElement.parentElement.querySelector('.precio > p').textContent.replace('$','')),
              url: e.target.parentElement.parentElement.querySelector('img').src,
              id:  e.target.parentElement.parentElement.querySelector('button').dataset.id
            } 
               agregarApedido(obj);
                boton_añadir.classList.add('añadir-pedido');
                boton_añadir.innerHTML = "<i class='bx bx-food-menu'></i> quitar de pedido";
          }else{
            const id = boton_añadir.dataset.id;
            eliminarPedido(id);
            boton_añadir.innerHTML = "<i class='bx bx-food-menu'></i>agregar a pedido";
            boton_añadir.classList.remove('añadir-pedido');
          }
          
         
        
        
       }else if(e.target.tagName === 'I'){
            // const boton_añadir = e.target.parentElement;

            // console.log(boton_añadir);
         
            //   if(!boton_añadir.classList.contains('añadir-pedido')){
            //     let obj = {
            //       nombre: e.target.parentElement.parentElement.parentElement.querySelector('h1').textContent,
            //       precio: Number(e.target.parentElement.parentElement.parentElement.querySelector('.precio > p').textContent.replace('$','')),
            //       url: e.target.parentElement.parentElement.parentElement.querySelector('img').src
            //     }
            //        console.log(obj);
                   
            //     console.log('click en el boton');
            //         boton_añadir.classList.add('añadir-pedido');
            //         boton_añadir.innerHTML = "<i class='bx bx-food-menu'></i> quitar de pedido";
                
            //   }else{
            //     boton_añadir.innerHTML = "<i class='bx bx-food-menu'></i>agregar a pedido";
            //     boton_añadir.classList.remove('añadir-pedido');
            //   }
             
           
       }
    })
     
}




///AGREGAR A MI PEDIDO
const agregarApedido = (obj = {})=>{
  const {pedidos} = cliente;
  cliente.pedidos = [...pedidos,obj];
  mostrarCompra();
}

////QUITAR COMPRA DE MI PEDIDO
const eliminarPedido = (id)=>{
   const {pedidos} = cliente;
    cliente.pedidos = pedidos.filter(pedido=> pedido.id !== id);  
       console.log(cliente);
       mostrarCompra();
}


/////VALIDACION DEL FORMULARIO
const inputValidaciones = ()=>{
       const expresiones = {
        nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^\d{10}$/ // 7 a 14 numeros.
      }
 
       const formularioInputs = document.querySelectorAll('.formulario input');
        ///VALIDAR EL FORMULARIO
  


        ///VALIDAR EL NOMBRE DEL CLIENTE
        formularioInputs[0].addEventListener('keyup',e=>{
          
          if(expresiones.nombre.test(e.target.value)){
                cliente.nombre = e.target.value;
                validaciones.nombre = true;
                mostrarCompra();
              return;
          }
            msgAdvertencias("escribe un nombre valido");
            validaciones.nombre = false;
            mostrarCompra();
        })

        formularioInputs[1].addEventListener('input',e=>{
          const fecha = new Date(e.target.value);
           const noDisponible = fecha.getDay();
          
            if(noDisponible === 0){
           
               validaciones.fecha = false;
               msgAdvertencias('dia lunes no hay envios disponibles');
               mostrarCompra();
               return;
            }
              cliente.fecha =  e.target.value;
              validaciones.fecha = true;
              mostrarCompra();
        })
       formularioInputs[2].addEventListener('keyup',e=>{
        if(expresiones.correo.test(e.target.value)){
          cliente.contacto = e.target.value;
          validaciones.contacto = true;
          mostrarCompra();
        return;
    }
      msgAdvertencias("escribe un email valido");
      validaciones.contacto = false;
      mostrarCompra();
       }) 

       formularioInputs[3].addEventListener('input',e=>{
         const horario = Number(e.target.value.split(':')[0]);
          if(horario < 9 ){
              msgAdvertencias('ese horario esta cerrada la tienda');
              validaciones.hora = false;
              mostrarCompra();
              return;
          }
           cliente.hora = e.target.value;
           validaciones.hora = true;
           mostrarCompra();
       })

       formularioInputs[4].addEventListener('keyup',e=>{
        if(expresiones.telefono.test(e.target.value)){
          cliente.numero = e.target.value;
          validaciones.numero = true;
          mostrarCompra();
        return;
    }
      msgAdvertencias("numero telefonico minimo 10 caracteres");
      validaciones.numero = false;
      mostrarCompra();
       })
}






/////FECHA DISPONIBLES
const fechaMinima = ()=>{
    const fechaInput = document.querySelector('.fecha');
      const fecha = new Date();
       const resultado = `${fecha.getFullYear()}-${fecha.getMonth() + 1}-${fecha.getDate()}`;
        fechaInput.min = resultado;
} 




///FUNCION DE MENSAJES 
const  msgAdvertencias = (msg)=>{
    const errores = document.querySelector('.container-errors');
    errores.classList.add('error');
    errores.innerHTML = msg;
   setTimeout(()=>{
    errores.classList.remove('error');
   },1700)
}





const templateMenu = (template = {} )=>{
     const div_template = document.createElement('div');
     div_template.className = 'card card-menu ';
     div_template.setAttribute('data-aos','flip-right');
      
     div_template.innerHTML = `
     <div class="menu-img position-relative">
     <img src="${template.url}" alt="" class="rounded-2">
     
     <div class="precio d-flex justify-content-center align-items-center position-absolute">
         <p>$${template.precio}</p>
     </div>
    </div>
    <div class="menu-descripcion">
     <h1 class="text-center py-2">${template.nombre}</h1>
     <p class="px-3">incluye:</p>
     <ul class="">
         <li>${template.descripcion[0]}</li>
         <li>${template.descripcion[1]}</li>
         <li>${template.descripcion[2]}</li>
     </ul>
     <button class="agregar-pedido" data-id=${template.data_id}><i class='bx bx-food-menu'></i> agregar a pedido</button>
 </div>
     `
   return div_template;
}



