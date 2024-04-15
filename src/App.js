import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [personajes, setPersonajes] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const [planetas, setPlanetas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [naves, setNaves] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [personajesCopia, setPersonajesCopia] = useState([]);
  const [url,setUrl] = useState("https://swapi.dev/api/people/?page=1")
  const [paginaSeleccionada,setPaginaSeleccionada] = useState(1)
  const ElementosApi = 82;
  const paginas = Math.ceil(ElementosApi/10)

  //-------------------------------------------------------------
  const handleClickPagina = (pagina) => {
    setPaginaSeleccionada(pagina)
    setUrl("https://swapi.dev/api/people/?page="+pagina)
  }
  
  //peticion a la api personajes
 useEffect(()=>{
  const personaje = fetch(url)
  .then (res => res.json())
  .then((p) => {
    console.log(p);
    setPersonajes(p.results)
    setPersonajesCopia(p.results)
  })
  .catch(err => alert(err))
},[url])
//-------------------------------------------------------------

//obtencion de planetas

  useEffect(()=>{
    const obtenerPlanetas = async () => {
      try {
  
          const response = await fetch('https://swapi.dev/api/planets/');
          let datosPlaneta = await response.json()
          let planetas = []
          while (datosPlaneta){
              let planetasArray = []
              for(const planeta of datosPlaneta.results){
  
                  const newPlaneta = {
                    name: planeta.name,
                      url:planeta.url,
                  }
                  planetasArray.push(newPlaneta)
              }
              planetas.push(...planetasArray)
              if(datosPlaneta.next === null){
                  break
              }
              const responseTemp = await fetch(datosPlaneta.next)
              datosPlaneta = await responseTemp.json()
  
          }
          console.log("planetas",planetas)
          setPlanetas(planetas)
      } catch (error) {
          console.log("errror ",error)
      }
  }
  obtenerPlanetas()
},[])


  //peticion a la api de  peliculas

  useEffect(()=>{
    const pelicula = fetch('https://swapi.dev/api/films/')
    .then (res => res.json())
    .then((p) => {
      console.log("peliculas", p);
      setPeliculas(p.results)
    })
    .catch(err => alert(err))
  }, [])

  //peticion a la api de vehiculos

  useEffect(() =>{
    const vehiculos = fetch('https://swapi.dev/api/vehicles/')
    .then (res => res.json())
    .then ((v) => {
      console.log("vehiculos", v);
      setVehiculos(v.results)
    })
    .catch(err => alert(err))
  }, [])

  //petiion a la api de naves

  useEffect(() =>{
    const naves = fetch('https://swapi.dev/api/starships/')
    .then (res => res.json())
    .then ((n) => {
      console.log("naves", n);
      setNaves(n.results)
    })
    .catch(err => alert(err))
  }, [])

  //-------------------------------------------------------------

  //obtener nombre del planeta
  const getNombrePlaneta = (url) => {
    const planeta = planetas.find(planeta => planeta.url === url);
    return planeta ? planeta.name : 'Desconocido';
  }

  //obtener nombre de las peliculas
  const getNombrePeliculas = () => {
    if(!personajeSeleccionado.films) return '';
    const NombresPeliculas = personajeSeleccionado.films.map((url) =>{
      const pelicula = peliculas.find(peliculas => peliculas.url === url);
      return pelicula ? pelicula.title : "";
    })
    return NombresPeliculas.join(', ');
  }

  const handlePersonajeClick = (personaje) => {

    console.log("Personaje 1:",personaje);
    setPersonajeSeleccionado(personaje);
    setModalVisible(true);


    //promise para las naves

    Promise.all(personaje.starships.map((url) => fetch(url).then(res => res.json())))
    .then((naves) => {
      return naves.map((nave) => nave.name)
    }).then((nombresNaves) => {
      console.log("Naves2:", nombresNaves);
      setNaves(nombresNaves);
    })

    //promise para los vehiculos

    Promise.all(personaje.vehicles.map((url) => fetch(url).then(res => res.json())))
    .then((vehiculos) => {
      return vehiculos.map((vehiculo) => vehiculo.name)
    }).then((nombresVeh) => {
      console.log("Naves2:", nombresVeh);
      setVehiculos(nombresVeh);
    })

  };
  //-------------------------------------------------------------

  //funcion para cerrar el modal

  const cerrarModal = () => {
    setModalVisible(false);
  }

  //filtrar personajes
  const filtrarPersonajes = (e) => {
      const personajesFiltrados = personajesCopia.filter((personaje) => {
        return personaje.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
      setPersonajes(personajesFiltrados);
  }
  //________________________________________________________________
  return (
    <main>
      <input type="text" onChange={(e) => filtrarPersonajes(e)} placeholder='Busqueda de Personajes'></input>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Altura</th>
            <th>Peso</th>
            <th>Color de cabello</th>
            <th>Color de piel</th>
            <th>Color de ojos</th>
            <th>Fecha de nacimiento</th>
            <th>Genero</th>
            <th>Planeta de nacimiento</th>
          </tr>
        </thead>
        <tbody>
      {personajes.map((personaje) => (
              <tr key={personaje.name}>
              <td onClick={ () =>handlePersonajeClick(personaje)}>{personaje.name}</td>
              <td>{personaje.height}</td>
              <td>{personaje.mass}</td>
              <td>{personaje.hair_color}</td>
              <td>{personaje.skin_color}</td>
              <td>{personaje.eye_color}</td>
              <td>{personaje.birth_year}</td>
              <td>{personaje.gender}</td>        
              <td>{getNombrePlaneta(personaje.homeworld)}</td>
            </tr>
          ))}
      </tbody>
      </table>

      {modalVisible && (
        <div className="modal">
          <div className = "modal-content">
            <span className="cerrar" onClick={cerrarModal}>&times;</span>
              <p>Peliculas: {getNombrePeliculas()}</p>
              <p>Vehiculos: {vehiculos.join(",")}</p>
              <p>Naves: {naves.join(",")}</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}

      <ul className="paginado">
        {
          Array.from(Array(paginas), (e, i) => {
            return(
              <li onClick={()=> handleClickPagina(i+1)}  key={i+1}>
                {paginaSeleccionada === i+1 ? (<strong>{i+1}</strong>) : i+1 }
              </li>
            )
        })} 
      </ul>
    </main>
  )
}

export default App;