import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header/Header';
import Peliculas from './Peliculas/Peliculas';
import Login from './Login/Login';
import Register from './Register/Register';
import Reservaciones from './Reservaciones/Reservaciones';
import ErrorPage from './ErrorPage/ErrorPage';
import { useState } from 'react';
import Reserva from './Reserva/Reserva';
import Admin from './Admin/Admin';
import Users from './Admin/Users';
import Footer from './Footer/Footer';
import axios from 'axios';
import { useEffect } from 'react';
import Header2 from './Header2/Header2';
import Asientos from './Asientos/Asientos';

const Main = () => {
  const [dato, setDato] = useState('');
  const [precio, setPrecio] = useState('');
  const [name, setName] = useState("")

  const token = localStorage.getItem('token')

  useEffect(() => {
    if (token) {
      axios.get(`https://backhollycinema.onrender.com/user`, {
        headers: {
          token: token
        }
      })
        .then(({ data }) => setName(data.nombre))
        .catch(error => console.error(error))
    }

  }, [token]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<>{name ? <Header2 /> : <Header />}<Peliculas setDato={setDato} setPrecio={setPrecio} /><Footer /> </>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reserva" element={<> <Reserva dato={dato} precio={precio} /> <Asientos precio={precio} pel={dato} /></>} />
        <Route path="/reservaciones" element={<> <Reservaciones /> <Footer /> </>} />
        <Route path="/*" element={<ErrorPage />} />
        <Route path='/admin/movies' element={<><Admin /></>} />
        <Route path='/admin/users' element={<><Users /></>} />
      </Routes>
    </Router>
  )
}

export default Main
