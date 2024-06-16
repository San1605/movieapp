import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import MovieDetail from './Pages/MovieDetail'
import Video from './Pages/Video'

function App() {
 
  return (
      <Routes>
        <Route path="/" element={<Layout><Home/></Layout>}/>
        <Route path="/movie/:id" element={<Layout><MovieDetail/></Layout>}/>
        <Route path="/video/:videoKey" element={<Layout><Video/></Layout>}/>
      </Routes>
  )
}

export default App
