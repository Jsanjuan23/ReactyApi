import React from 'react'
import {firebase} from './firebase'
import swal from 'sweetalert'
import elimi from './eliminar.png'
import actu from './actualizar.png'


const Formulario = () => {
    const [id,setId] = React.useState('')
    const [nombre,setNombre] = React.useState('')
    const [apellido,setApellido] = React.useState('')
    const [edad,setEdad] = React.useState('')
    const [sexo,setSexo] = React.useState('')
    const [dir,setDir] = React.useState('')
    const [tel,setTel] = React.useState('')
    const [lista,setLista] = React.useState([])
    const [estado,setEstado] = React.useState(false)
    const [imagen,setImagen] = React.useState('')

React.useEffect(()=>{
const cargar = async ()=> {
try {
  const db = firebase.firestore()
  const data = await db.collection('registros').get()
  const array = data.docs.map(item=>({
    id : item.id, ...item.data()
}))
setLista(array)
  
} catch (error) {
swal(error)
}

}
cargar()

    })
   const obtener = async (e)=>{
     try {
           const num = parseInt(Math.random()*100)
      const res = await fetch("https://picsum.photos/id/"+num+"/500");
      const data = await res.url     
      setImagen(data)
     } catch (error) {
      swal(error)
     }
   }

    const guardar = async (e)=>{
      e.preventDefault()
      if(!nombre.trim() || !apellido.trim() || !dir.trim() || !tel.trim() || !edad.trim() || !sexo.trim()){
        swal({
          title: "Error",
          text: "No puede dejar ningún campo vacio.",
          icon: "error",
          button: "Aceptar"
        })
        
        return
    }

    obtener()
 
   const db = firebase.firestore()
   const nuevo = {
     nombre_ : nombre,
     apellido_ : apellido,
     edad_ : edad,
     sexo_ : sexo,
     dir_ : dir,
     tel_ : tel,
     imagen_ :  imagen
   }

   db.collection('registros').add(nuevo)
   setLista([...lista,{
    nombre_ : nombre,
    apellido_ : apellido,
    edad_ : edad,
    sexo_ : sexo,
    dir_ : dir,
    tel_ : tel ,
    imagen_ :  imagen
   }])
   
   

   swal({
    title: "Correcto",
    text: "Su registro ha sido guardado exitosamente.",
    icon: "success",
    button: "Aceptar"
  })
  

  setNombre('')
  setApellido('')
  setEdad('')
  setSexo('')
  setDir('')
  setTel('')


    }
   
 
    const eliminar = async id => {
     
      try {

      const db = firebase.firestore()
      await db.collection('registros').doc(id).delete()
      swal({
        title: "Correcto",
        text: "Su registro ha sido eliminado con exito.",
        icon: "success",
        button: "Aceptar"
      })
      const aux =lista.filter(item=>item.id !== id)
      setLista(aux)
      } catch (error) {
        swal(error)
      }
      


    }
    
    const editar = item =>{
      setId(item.id)
      setNombre(item.nombre_)
      setApellido(item.apellido_)
      setEdad(item.edad_)
      setSexo(item.sexo_)
      setDir(item.dir_)
      setTel(item.tel_)
      setEstado(true)

    }
    const actualizar = async(e) =>{
    e.preventDefault();

    try {
      const db = firebase.firestore()
       db.collection('registros').doc(id).update({
       nombre_ : nombre,
       apellido_ : apellido,
       tel_ : tel,
       edad_ : edad,
       sexo_ : sexo,
       dir_ : dir
      })
      const array = lista.map(item => item.id === id ?{
        id_:id,
        nombre_ : nombre,
        apellido_ : apellido,
        tel_ : tel,
        edad_ : edad,
        sexo_ : sexo,
        dir_ : dir,
      }:
      item
      )
      setLista(array)
      swal({
        title: "Actualizacion exitosa!",
        icon: "info",
        timer:"3000"
        })
        setId('')
        setNombre('')
        setApellido('')
        setEdad('')
        setSexo('')
        setDir('')
        setTel('')
        setEstado(false)

    } catch (error) {
      console.log(error)
    }
      
    }
  return (

    <div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <div class="bg-secondary" align="left"><p class="text-info">|</p></div>
          </div>
          <div class="form-group col-md-6">
            <div class="bg-secondary" align="right"><p class="text-info">|</p></div>
          </div>
        </div>

        <div class="bg-info">
        <h1 class="text-white" align="center">FORMULARIO</h1>
        </div>
        <br />
        {
         estado ?
         <h5>Actualiza la información</h5>
         :
         ''
        }
        
        <br />
     <div class="form-row">  
       <div  class="form-group col-md-6">
         <input type="text" class="form-control" value={nombre} onChange={(e)=> setNombre(e.target.value)} placeholder='Nombres'/>
       </div>
       <div  class="form-group col-md-6">
         <input type="text"   class="form-control" value={apellido} onChange={(e)=> setApellido(e.target.value)} placeholder='Apellidos'/> 
       </div>
     </div>
     <div class="form-row">  
       <div  class="form-group col-md-2">
         <input type="text" class="form-control" value={edad} onChange={(e)=> setEdad(e.target.value)} placeholder='Edad'/>
       </div>
       <div  class="form-group col-md-3">
           <select class="form-control" value={sexo} onChange={(e)=> setSexo(e.target.value)}>
               <option >Seleccione genero</option>
               <option >Masculino</option>
               <option >Femenino</option>
           </select> 
       </div>
       <div  class="form-group col-md-4">
         <input type="text"   class="form-control" value={dir} onChange={(e)=> setDir(e.target.value)} placeholder='Dirección'/> 
       </div>
       <div  class="form-group col-md-3">
         <input type="text"   class="form-control" value={tel} onChange={(e)=> setTel(e.target.value)} placeholder='Telefono'/> 
       </div>
     </div>
     <div class="card">
       {
         estado ? 
         <>
         <button class="btn btn-success" onClick={actualizar}>Actualizar</button>
         </>
         :
         <>
         <button class="btn btn-secondary" onClick={guardar}>Agregar</button>{
           
         }
         </>
       }
      
     </div>
     <br />
     <br />
     <div class="table-responsive">
     <table class="table">
         <thead>
          <tr>
              <th class="text-center text-info" >#</th>
              <th class="text-center text-info">Nombres</th>
              <th class="text-center text-info" >Apellidos</th>
              <th class="text-center text-info" >Edad</th>
              <th class="text-center text-info">Sexo</th>
              <th class="text-center text-info" >Direccion</th>
              <th class="text-center text-info" >Telefono</th>
              <th class="text-center text-info" >Imagen</th>
              <th class="text-center text-info" > </th>
              
          </tr>

         </thead>

         <tbody>
         {
           lista.map((item,index)=>(
             
            <tr key={item.id}>
            <td class="text-center"><p id="filas">{index+1}</p></td>
            <td class="text-center" ><p>{item.nombre_}</p></td>
            <td class="text-center"><p>{item.apellido_}</p></td>
            <td class="text-center"><p>{item.edad_}</p></td>
            <td class="text-center"><p>{item.sexo_}</p></td>
            <td class="text-center"><p>{item.dir_}</p></td>
            <td class="text-center"><p>{item.tel_}</p></td>
            <td ><div  style={{width:"50px", height:"50px", margin:"auto"}}><img src={item.imagen_} style={{width:"100%", height:"100%", borderRadius:"40px"}} alt="" /></div> </td>
            <td class="text-center"><button type='sumbit' class="btn btn-outline-info" onClick={()=>eliminar(item.id)}><img src={elimi} alt="" /></button>  <button type='sumbit' class="btn btn-outline-info" onClick={()=>editar(item)}><img src={actu} alt="" /></button></td>

            </tr>
           ))
         }
           

         </tbody>

     </table>

     </div>

    </div>
  )
}

export default Formulario