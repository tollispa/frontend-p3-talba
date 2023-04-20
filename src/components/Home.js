 import {useEffect, useState} from "react"
 import DatePicker from 'react-datepicker';
 import 'react-datepicker/dist/react-datepicker.css';

 import axios from "axios"
 
 const Home = () => {
  let today = new Date().toISOString().slice(0, 10);
   
   

    const [data, setData] = useState([])
    const [showDescription, setShowDescription] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null);
    const [date, setDate] = useState(today)
   

    const url = `http://api.sr.se/api/v2/scheduledepisodes?channelid=164&date=${date}&format=json`
    useEffect(() => {
        axios.get(url, {
          headers: {
            'Accept': 'application/json'
          }
        })
        .then((res) => {
        
         
          setData(res.data.schedule)
          
        }).catch((err) => console.log(err))
    },[url])
   
    const toggleDescription = () => {
    setShowDescription(!showDescription)
   }

   const submitDate = () => {
    const date = new Date(selectedDate);
   const formattedDate = date.toISOString().slice(0, 10);
    setDate(formattedDate)
   }
    
    return (
        <div className="h-screen w-full bg-black relative text-white">
          <h1 className="text-3xl text-green-300 font-bold p-2 h-[100px]" >P3 dagens radio-tablå</h1>
          <p className="font-bold color-gray-800">Av Tollis Papadopoulos</p>
         <div className="absolute top-5 right-5 hidden sm:block">
         <DatePicker className="text-black rounded font-bold"
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="yyyy-MM-dd"
      placeholderText="Select a date"
    />
    <button className="bg-white rounded text-black m-1 p-1 font-bold"
    onClick={submitDate}>Search</button>
          </div> 
    {data.map((program, index) => {
        const startUtc = program?.starttimeutc;
        const startTime = startUtc ? new Date(parseInt(startUtc.substr(6))) : null;
        
  return (
    <p className="border border-gray-300 w-full relative" key={index}>
      <span className="font-bold text-green-400">{program?.program?.name}</span>
      
     <br/><img className="h-[40px] w-[40px] rounded absolute top-0 right-0" alt="/"src={program?.imageurl}></img>
     {
      
     }
     <br/>{showDescription ? program?.description : null}
     <br/>{showDescription ?
      <button className="font-bold text-xl m-2" onClick={toggleDescription}>-</button> : 
      <button className="font-bold text-xl m-2" onClick={toggleDescription}>+</button>

     }
   <br/><span>{program?.subtitle}</span>
    <br/> {startTime?.toLocaleString()}
    </p>
  );
})}
        </div>
    )
}

export default Home;