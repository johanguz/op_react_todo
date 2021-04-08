import React, {useState} from 'react';
import Overview from './components/Overview'


function App() {
    const [value, setValue] = useState('Please Enter a task');
    const [taskArray, setTaskArray] = useState([]);
    const [edit, setEdit] = useState('Enter New Task Name');
    
    function handleChange(event) {
      setValue(event.target.value);
    }

    function handleChangeResubmit(event) {
      setEdit(event.target.value);
    }
  
    function handleSubmit(event) {
      setTaskArray(taskArray => [...taskArray, {value, id: taskArray.length + value, taskNumber: taskArray.length + 1, editState: false}])
      setValue('');
      event.preventDefault();
    }

    const handleRemoveItem = (id) => {
      const updatedArray = taskArray.filter(task => task.id !== id);
      setTaskArray(updatedArray);
    }

    const handleEditItem = (id) => {
      let updatedArray = taskArray.map(task => 
        {
          if (task.id === id) {
            return {...task, editState: !task.editState}
          }
          return task;
      });
    setTaskArray(updatedArray)
    }

    const handleResubmit = (edit, id) => {
      let updatedArray = taskArray.map(task => 
        {
          if (task.id === id) {
            return {...task, value: edit, editState: !task.editState}
          }
          return task;
      });
    setTaskArray(updatedArray)
        // setValue('');
        // event.preventDefault();
      }

    
    // function itemForEdit(task) {
    //   return <div>Edit This</div>
    // }

    const listItems = taskArray.map((task) => 
        {
          if (task.editState) {
            return (
              <li key={task.id} >
              <form onSubmit={() => handleResubmit(edit, task.id)}>
              <label>
              Task Name:
              <input type="text" value={edit} onChange={handleChangeResubmit} />
              </label>
              <input type="submit" value="Submit" />
              </form>
              </li> 
            )
          } 
          else {
            return (
              <li key={task.id} >{task.taskNumber} - {task.value} 
              <button onClick={() => handleRemoveItem(task.id)}> delete </button>
              <button onClick={() => handleEditItem(task.id)}> Edit </button>
              </li> 
            )}
           });
        
  
         
      

    // const listItems = taskArray.map((task) => 
    //  <li key={task.id} >{task.taskNumber} - {task.value} 
    // <button onClick={() => handleRemoveItem(task.id)}> delete </button>
    // <button onClick={() => handleEditItem(task.id)}> Edit </button>
    // </li> 
    // );

  return (
   <div>
     <form onSubmit={handleSubmit}>
      <label>
        Task Name:
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="Submit" />
    </form>
    <Overview tasks={taskArray} list={listItems}/>
   </div>
  );
}

export default App;
