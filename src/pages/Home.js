import { useEffect,useState } from "react";
import {useAuthContext} from '../hooks/useAuthContext';



const Home = () => {
    const [workouts, setWorkouts] = useState(null);
    const [title, setTitle] = useState('');
    const [load, setLoad] = useState('');
    const [reps, setReps] = useState('');
    const [error,setError] = useState(null);

    const {user} = useAuthContext();

    const handleSubmit = async (e) =>
    {
        e.preventDefault()
        
        if(!user) {
          setError('You must be logged in ');
          return ;
        }

        const workout = {title,load,reps}
        const response = await fetch('/api/workouts', {
          method: 'POST',
          body: JSON.stringify(workout),//converting to JSON
          headers: {
            'Content-Type':'application/json',
            'Authorization' : `Bearer ${user.token}`
          }
        })
        const json = response.json();
        if(!response.ok)
        {
          setError(json.error);
        }
        if(response.ok)
        {
          setTitle('');
          setLoad('');
          setReps('');
          setError(null);
          
        }
        
    }

    const handleDelete = async({workout}) => {
      if(!user) return;
      let id = workout._id;
      console.log(id);
      const response  = await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization' : `Bearer ${user.token}`
        }
      });
      const json = await response.json();

      if(response.ok) {
        setWorkouts(json)
      }
    }
      
    

    useEffect(() => {
        const fetchWorkouts = async () => {
            const response = await fetch('/api/workouts', {
              headers: {
                'Authorization' : `Bearer ${user.token}`
              }
            })
            const json = await response.json();
           
            if (response.ok) {
                setWorkouts(json);
            
            }
        }
        if(user) {
          fetchWorkouts();
        }
        
    }, [workouts, user])


    return (
        <div className="home">
         <div className="workouts">
             {workouts && workouts.map((workout) => (
                 <div className="workout-details">
                 <h4>{workout.title}</h4>
                 <p><strong>Load (kg): </strong>{workout.load}</p>
                 <p><strong>reps: </strong>{workout.reps}</p>
                 <p>{workout.createdAt}</p>
                 <span onClick={() =>handleDelete({workout})}>Delete</span>
             </div>
             ))}
         </div>
         <form  className="create" onSubmit={handleSubmit}>
             <h3>Add a new Workout</h3>
     
             <label>Excercise Title:</label>
             <input 
               type="text"
               onChange={(e) => setTitle(e.target.value)}
               value = {title}
             />
     
             <label>Load (in Kg):</label>
             <input 
               type="number"
               onChange={(e) => setLoad(e.target.value)}
               value = {load}
             />
     
             <label>Reps:</label>
             <input 
               type="number"
               onChange={(e) => setReps(e.target.value)}
               value = {reps}
             />
     
             <button>Add Workout</button>

             {error && <p>You must be Logged in </p>}
         </form>
        </div>
       )
     
}

  

export default Home