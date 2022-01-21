

const validaciones = {
  nombre: false,
  contacto: false,
  numero: false,
  hora: false,
  fecha: false,
}

const cliente = {
    nombre : '',
    contacto: '',
    numero: '',
    hora: '',
    fecha: '',
    pedidos:[]
}


const mostrarCompra = ()=>{
  let modal_resumen = document.querySelector('.modal-resumen');
  // console.log(validaciones);
  ////VALIDAR SI TODOS LOS CAMPOS ESTAN LLENADOS Y MOSTRAR EL RESUMEN DEL PEDIDO
  if(validaciones.nombre && validaciones.contacto && validaciones.numero && validaciones.hora && validaciones.fecha){
      // console.log('ya puedes ver el resumen de tu pedido');
     
        if(cliente.pedidos.length <= 0){
                template_vacio();
                return;
        }
           templateResumen(cliente);
        
        
     
      return;
  }
    template_vacio();
    // console.log('aun no puedes ver tu resumen de pedido');

}


const template_vacio = ()=>{
  let modal_resumen = document.querySelector('.modal-resumen');
  modal_resumen.classList.add('modal-resumenes');
  modal_resumen.innerHTML = `<div class="modal-alerta">
  <img src="img/undraw_hamburger_-8-ge6.svg" alt="">
  <p class="alerta-msg text-center">tu lista de pedido esta vacio</p>
    <div class="boton d-flex justify-content-center">
       <button class="btn-menu  mx-auto">ir al menu</button>
    </div>
</div>
<i class='bx bxs-x-circle position-absolute salir'></i>`;
}


const templateResumen = (cliente = {})=>{
    //  console.log(cliente);
  const modal_resumen = document.querySelector('.modal-resumen');

    while(modal_resumen.firstChild){
        modal_resumen.removeChild(modal_resumen.firstChild);
    }

      const btn_salir = document.createElement('i');
      btn_salir.className = 'bx bxs-x-circle position-absolute salir';
      modal_resumen.appendChild(btn_salir);

   ///CONTENEDOR DEL RESUMEN
    const ctr_final = document.createElement('div');
    ctr_final.classList.add('resumen-final');
    modal_resumen.appendChild(ctr_final);
    

    ///TITULO
    const titulo = document.createElement('h1');
    titulo.className ='text-white text-center mb-5 mt-3';
    titulo.innerHTML ='resumen del pedido';
      ctr_final.appendChild(titulo);
     

     ///CONTENEDOR RESUMEN
     const ctr_resumen =  document.createElement('div');
     ctr_resumen.className = 'resumen-ctr';
    ctr_final.appendChild(ctr_resumen);     


    ////contenedor resumen lista
     const lista_resumen = document.createElement('div');
     lista_resumen.className =  'resumen-lista';
     ctr_resumen.appendChild(lista_resumen);

     ///AGREGAR TABLA
     const tabla = document.createElement('table');
     tabla.className = "table table-dark table-striped";
     tabla.innerHTML = `
     <thead>
     <tr>
       <th scope="col">imagen</th>
       <th scope="col">nombre</th>
       <th scope="col">precio</th>
     </tr>
   </thead>
   <tbody>
   </tbody>`
      lista_resumen.appendChild(tabla);
    const agregar = document.querySelector('tbody');
     
      ////CONTENIDO DE LAS TABLAS
      cliente.pedidos.forEach(element => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
            <th scope="row"><img src="${element.url}" alt="" width="120px"></th>
            <td>${element.nombre}</td>
            <td class="precios">$${element.precio}</td>
            `
        agregar.appendChild(tr);
      });
      
      let  envio = 200;
   let gratis;
    const cantidadPedidos = cliente.pedidos.length;
    let precioFinal =   0;
    
      const precios = document.querySelectorAll('.precios');
      
      
      precios.forEach(precio=>{
         const precio_contado =   Number(precio.textContent.replace('$',''));   
         precioFinal = precioFinal + precio_contado;
         envio = envio - precio_contado;
        //  console.log(envio);
      })

      ///RESUMEN DE LA COMPRA
       const resumen_final = document.createElement('div');
       resumen_final.className = 'resumen-compra bg-dark';
       resumen_final.innerHTML = `
       <div class="resumen-envio d-flex justify-content-center align-items-center mt-4">
                    <i class='bx bxs-truck icon-envio'></i>
                    <p class="mb-0 envio_gratis">te faltan ${envio}$ para el envio gratis</p>
                  </div>
                    <div class="resumen-pago mt-3 px-2 pb-2">
                        <p class="title-resumen my-2 mx-2">RESUMEN:</p>
                        
                        <div class="resumen-articulos d-flex justify-content-between mb-3">
                            <p>total de pedidos:</p>
                            <p>${cantidadPedidos}</p>
                        </div>
                        <div class="resumen-total d-flex justify-content-between mb-3">
                            <p>total a pagar:</p>
                            <p>${precioFinal}</p>
                        </div>
                     <button class="boton-compra py-2">realizar la compra</button>
                    </div>
       `
      
        const p_envio = resumen_final.querySelector('.envio_gratis');
            console.log(p_envio);
            if(envio <= 0){
                  p_envio.innerHTML = "envio gratis";
                  // return;
            }
        

        
      ctr_resumen.appendChild(resumen_final);

}































//   const mostrarCompra = ()=>{

//         let modal_resumen = document.querySelector('.modal-resumen');
//     if(Object.values(Cliente).includes('')){
//         modal_resumen.classList.add('modal-resumenes');
//      modal_resumen.innerHTML = `<div class="modal-alerta">
//      <img src="img/undraw_hamburger_-8-ge6.svg" alt="">
//      <p class="alerta-msg text-center">tu lista de pedido esta vacio</p>
//        <div class="boton d-flex justify-content-center">
//           <button class="btn-menu  mx-auto">ir al menu</button>
//        </div>
// </div>
// <i class='bx bxs-x-circle position-absolute salir'></i>`;

//      console.log('tu lista de compras esta vacia');
            
//         // return;
//     }else{

//       console.log('puedes agregar a tu lista');
//       templateResumen(Cliente);
//     }   
      
     
//     //   console.log(Cliente);
//     // console.log('se agregaron a tu menu de lista');

//   }




  // const templateResumen = (clienteResumen = {})=>{
  //   console.log(clienteResumen);
  //   let modal_resumen = document.querySelector('.modal-resumen');
  //   modal_resumen.classList.remove('modal-resumenes');
  //   modal_resumen.classList.add('res-final');
  //       // console.log(clienteResumen);
  //   modal_resumen.innerHTML = "<i class='bx bxs-x-circle position-absolute salir'></i>";
  //  const template = {
  //    titulo: (msg,tipo)=>{
  //     const title = document.createElement(`${tipo}`);
  //     title.className = 'text-white';
  //      title.innerHTML = msg;
  //      console.log(title);
  //      modal_resumen.appendChild(title);
  //    },
  //    ctr_listado: (tipo)=>{
        
  //    }
  //  }

  //  template.titulo("resumen del pedido","h1");



  // }





  

