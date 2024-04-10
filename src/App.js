import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [personajes, setPersonaje] = useState([]);

  //peticion a la api
 useEffect(()=>{
  const personajes = fetch('https://swapi.dev/api/people/')
  .then (res => res.json())
  .then((p) => {
    console.log(p);
    setPersonaje(p.results)
  })
  .catch(err => alert(err))

 },[])
  
  return (
    <main>
    <table>
      <tbody>
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
      <tr>
        <th>
          {personajes && personajes.map (
            personaje => (
              <td>{personaje.name}</td>,
              <td>{personaje.height}</td>,
              <td>{personaje.mass}</td>,
              <td>{personaje.hair_color}</td>,
              <td>{personaje.skin_color}</td>,
              <td>{personaje.eye_color}</td>,
              <td>{personaje.birth_year}</td>,
              <td>{personaje.gender}</td>,
              <td>{personaje.homeworld}</td>
            ) 
          )}
        </th>
      </tr>
      </tbody>
    </table>
    </main>
  )
}

export default App;
