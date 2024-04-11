import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import './App.css';

function App() {

  const [personajes, setPersonajes] = useState([]);
  const [personajeSeleccionado, setPersonajeSeleccionado] = useState(null);
  const [planetas, setPlanetas] = useState([]);
  const [peliculas, setPeliculas] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [naves, setNaves] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  //peticion a la api personajes
 useEffect(()=>{
  const personaje = fetch('https://swapi.dev/api/people/')
  .then (res => res.json())
  .then((p) => {
    console.log(p);
    setPersonajes(p.results)
  })
  .catch(err => alert(err))
},[])

//peticion a la api planetas
  useEffect(()=>{
    const planeta = fetch('https://swapi.dev/api/planets/')
    .then (res => res.json())
    .then((p) => {
      console.log(p);
      setPlanetas(p.results)
    })
    .catch(err => alert(err))
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

  //ooobtener nombre del planeta
  const getNombrePlaneta = (url) => {
    const planeta = planetas.find(planeta => planeta.url === url);
    return planeta ? planeta.name : '';
  }

  //obtener nombre de las peliculas
  const getNombrePeliculas = (url) => {
    const pelicula = peliculas.find(peliculas => peliculas.url === url);
    return pelicula ? pelicula.title : '';
  }

  const handlePersonajeClick = (personaje) => {
    console.log("Personaje 1:",personaje);
    setPersonajeSeleccionado(personaje);
    setModalVisible(true);
  };

  //funcion para cerrar el modal

  const cerrarModal = () => {
    setModalVisible(false);
  }
  
  return (
    <main>
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
            
              <p>Peliculas: {getNombrePeliculas(personajeSeleccionado.films)}</p>
              <p>Vehiculos: {personajeSeleccionado.vehicles}</p>
              <p>Naves: {personajeSeleccionado.starships}</p>
            <button onClick={cerrarModal}>Cerrar</button>
          </div>
        </div>
      )}
    </main>
  )
}

export default App;