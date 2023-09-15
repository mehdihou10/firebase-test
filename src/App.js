import logo from './logo.svg';
import './App.css';
import Auth from './components/Auth';
import { useEffect, useState } from 'react';
import { db,auth, storage } from './config/firebase.config';
import { getDocs,collection,addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';

function App() {

  const [movieList,setMovie] = useState([]);

  const [title,setTitle] = useState("");
  const [name,setName] = useState("");
  const [date,setDate] = useState("");

  const [file,setFile] = useState(null);


  const moviesCollection = collection(db,'movies');

  const getMovieList = async ()=>{

    const data = await getDocs(moviesCollection);

    let filteredData = data.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    }));

    setMovie(filteredData);

  }

  useEffect(()=>{


    getMovieList();

  },[upadteTitle]);

  async function submitMovie(){
    await addDoc(moviesCollection,{title,name,date,userId: auth?.currentUser?.uid});
    getMovieList();
  }

  async function deleteMovie(id){

    const movieDoc = doc(db,"movies",id)
    await deleteDoc(movieDoc);
  }

  async function upadteTitle(id){
    const movieDoc = doc(db,"movies",id);
    await updateDoc(movieDoc,{title: document.getElementById("update").value})
  }


  async function uploadFile(){
    if(file === null) return;

    const fileFolderRef = ref(storage,`projectFiles/${file.name}`)
    await uploadBytes(fileFolderRef,file);
  }

  return (
    <div className="App">
      <Auth />

      <input onChange={(e)=> setTitle(e.target.value)} />
      <input onChange={(e)=> setName(e.target.value)} />
      <input onChange={(e)=> setDate(+e.target.value)} type='number' />
      <button onClick={submitMovie}>Add To Production</button>

      {
        movieList.map(movie => {
          return(
            <div key={movie.id} className='movie'>
              <h1>{movie.title} - {movie.date}</h1>
              <h3>{movie.name}</h3>
              <button onClick={()=> deleteMovie(movie.id)}>DELETE</button>
              <input id="update"/>
              <button onClick={()=> upadteTitle(movie.id)}>CHANGE</button>
              <input type='file' onChange={(e)=> setFile(e.target.files[0])}/>
              <button onClick={uploadFile}>UPLOAD</button>
            </div>
          )
        })
      }

    </div>
  );
}

export default App;
