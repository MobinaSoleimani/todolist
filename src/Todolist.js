import React,{useState}  from 'react';
import DoneIcon from '@mui/icons-material/Done';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import FormControl from '@mui/material/FormControl';
import styles from "./Todolist.module.css"; 

const Todolist = () => {

    const [all,setAll]= useState([]);
    const [completed,setCompleted]= useState([]);
    const [uncompleted,setUnCompleted]= useState([]);
    const [newName, setNewName] = useState("");
    const [number, setNumber] = useState('1');

    const addAll=()=>{
        setAll([newName, ...all]);
        setUnCompleted([newName, ...uncompleted]);
    }
    const addCompleted=(index)=>{
        setCompleted([all[index], ...completed]);
        uncompleted.splice(index, 1)
        setUnCompleted([...uncompleted]);
    }
    const deleteHandler=(index)=>{
       all.splice(index, 1)
        setAll([...all]);
        uncompleted.splice(index, 1)
        setUnCompleted([...uncompleted]);
    }

    const submitHandler=(event)=>{
        event.preventDefault()
        setNewName("");
    }
    return (
        <div className={styles.body}>
            
            <h1>Todo List</h1>

            <form onSubmit={submitHandler}>
           <input type="text" placeholder="Write your new work"  value={newName} onChange={(e) => setNewName(e.target.value)}/>
           <button type='submit' className={styles.add} onClick={addAll}><AddBoxIcon fontSize="large"/></button>
           </form>

           <FormControl className={styles.form}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
            CASE
            </InputLabel>
            <NativeSelect
                value={number}
                inputProps={{
                name: 'CASE',
                id: 'uncontrolled-native',
                }}
                onChange={(e) => setNumber(e.target.value)}
            >
                <option value={1}>All</option>
                <option value={2}>Completed</option>
                <option value={3}>UnCompleted</option>
            </NativeSelect>
            </FormControl>
     
            { 
            number === '1' &&
                all.map((item,index) => { 
                    return(
                    <div key={index} className={styles.main}>
                  <div className={completed.includes(item) && styles.tick}> 
                  <span className={styles.text}>{item}</span>
                  <span className={styles.done} onClick={() => addCompleted(index)}><DoneIcon/></span>
                  <span className={styles.trash} onClick={() => deleteHandler(index)}><DeleteIcon/></span>
                  </div>
                    </div>
                    )}) 
          }  


            {  
            number === '2' &&
                    completed.map((item,index) => { return(
                        <div key={index} className={styles.main}>
                      <div className={styles.tick}> 
                      <span className={styles.text}>{item}</span>
                      <span className={styles.done} onClick={() => addCompleted(index)}><DoneIcon/></span>
                      <span className={styles.trash} onClick={() => deleteHandler(index)}><DeleteIcon/></span>
                      </div>
                        </div>
                        )}) 
            }

            {  
            number === '3' &&
                    uncompleted.map((item,index) => { return(
                        <div key={index}>
                      <div className={styles.main}> 
                      <span className={styles.text}>{item}</span>
                      <span className={styles.done} onClick={() => addCompleted(index)}><DoneIcon/></span>
                      <span className={styles.trash} onClick={() => deleteHandler(index)}><DeleteIcon/></span>
                      </div>
                        </div>
                        )}) 
            }

        </div>
    );
};

export default Todolist;