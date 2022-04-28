import React, {useState} from 'react';
import './App.css';

function App() { 

  // Hooks definatins
  const [formData, setFormData] = useState({
    "tag":[],
    "location": []
  })
  const [isKeyReleased, setIsKeyReleased] = useState(false);
  const [tag, setTag] = useState([]);
  const [location, setLocation] = useState([]);

  // on KEY press for tags and location
  const onKeyDown = (e) => {
    const trimmedInput = location.trim();
    if ((e.key === ','|| e.key === 'Enter') && trimmedInput.length && !formData[e.target.name].includes(trimmedInput)) {
      e.preventDefault();
      console.log(e.target.name);
      setFormData((prevState)=>{
        return {
          ...formData,
          [e.target.name]:[...prevState[e.target.name],trimmedInput]
        }
      })
      if(e.target.name==='location') setLocation('');
      else setTag('');
    }
    if(e.key === 'Enter') e.preventDefault();
    setIsKeyReleased(false);
  };
  
  // key up for tags and location
  const onKeyUp = () => {
    setIsKeyReleased(true);
  }
  // handle changes in tags/location
  const handleChangeTag = (e) => {
    (e.target.name==='location')? setLocation(e.target.value) : setTag(e.target.value);
  };
  // delete tag takes in name and index (name = location,tag)
  const deleteTag = (e,name,index) => {
    e.preventDefault()
    let temData = formData[name];
    temData = temData.filter((tag,i)=> i!==index)
    setFormData({
      ...formData,
      [name]:   temData
    })
  }
  // handle change for inputs
  const handleChange = (e) => { 
    e.preventDefault()
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  //onSubmit API call is made in here.
  const addPost = async (e) => {
    e.preventDefault();
    try {
      if (!formData.location.length) {
        alert("Add Location")
        return;
      }
      alert(JSON.stringify(formData));

      await fetch('https://localhost:8001/v1jobs/job', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        });
        console.log(JSON.stringify(formData));
    } catch (error) {
      console.log(JSON.stringify(formData))
      console.log(error.message);
    }
  };

  // return
  return (
    <div className="App">
      <h3 style={{fontSize:"20px"}}>Post Job</h3>
      <h2 className='tittle'>Basic Details</h2>
      <hr/>
      <form onSubmit={(e) => addPost(e)}>
        <label htmlFor="Id">Job Tittle *</label>
        <input
          className='input-form'
          placeholder='Write a little that appropriately describes your job'
          id="name"
          name="name"
          type="text"
          onChange={handleChange}
          required
        />
        <br/> <br/>
        <div className='tags'>
          <label htmlFor="location">Location * </label>
          <div className='tagshow'>
            {formData.location.map((location, index) =>
              <div className="tag">
                {location} 
                <button onClick={(e) => deleteTag(e,'location',index)}>x</button>
              </div>
            )}
          </div>
          <div className="container">
            <input
              value={location}
              name='location'
              placeholder="+ Add Location"
              onKeyDown={onKeyDown}
              onChange={handleChangeTag}
            />
          </div>
        </div>
        <br/>
        <label htmlFor="experience">Years of Experience* </label>
        <br/>
        <div className='experience'>
          <select className='input-form custom-select' placeholder='Select Min' name='minExperience' onChange={handleChange} required>
            <option value="" disabled selected>Select Min</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </select>
          <select className='input-form dropdown' placeholder='Select Max' name='maxExperience' onChange={handleChange} required>
            <option value="" disabled selected>Select Max</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <br/>
        <label htmlFor="Name">Job Description*</label>
        <br/>
        <input
          className='input-form'
          id="description"
          name="description"
          type="text"
          onChange={handleChange}
          required
        />
        <br/>

        <h2 className='tittle'>Targeting</h2>
        <hr/>
        <div className='experience'>
          <div className='wrap'>
            <label htmlFor="category">Category* </label>
            <br/>
            <select className='input-form' id='c' placeholder='Select Min' name='category' onChange={handleChange} required>
            <option value="" disabled selected>Select</option>
              <option value="web">Web Development</option>
              <option value="android">Android Development</option>
              <option value="ios">iOS Development</option>
            </select>
          </div>
          <div className='wrap '>
            <label htmlFor="functional">Functional Area* </label>
            <br/>
            <select className='input-form' id='f' placeholder='Select Max' name='functional' onChange={handleChange} required>
              <option value="" disabled selected>Select</option>
              <option value="cse">CSE</option>
              <option value="it">IT</option>
              <option value="other">other</option>
            </select>
          </div>
        </div>
        <br/>
        <label htmlFor="graduating">Graduating Year* </label>
        <br/>
        <div className='experience'>
          <select className='input-form' placeholder='Select Min' name='minGraduating' onChange={handleChange} required>
            <option value="" disabled selected>Min Batch</option>
            <option value="2018">2016</option>
            <option value="2019">2017</option>
            <option value="2020">2018</option>
          </select>

          <select className='input-form' placeholder='Select Max' name='maxGraduating' onChange={handleChange} required>
            <option value="" disabled selected>Max Batch</option>
            <option value="2022">2023</option>
            <option value="2023">2024</option>
            <option value="2024">2025</option>
          </select>
        </div>
        <br/>
        <div className='tags'>
          <label htmlFor="graduating">Tags* </label>
          <div className='tagshow'>
            {formData.tag.map((tag, index) => <div className="tag">
              {tag}
              <button onClick={(e) => deleteTag(e,'tag',index)}>x</button>
            </div>)}
          </div>
          <div className="container">
            <input
              value={tag}
              name='tag'
              placeholder="+ Add Tag"
              onKeyDown={onKeyDown}
              onChange={handleChangeTag}
            />
          </div>
        </div>
        <br/>
        <input className='submit post' type="submit" value="Post Job"/>
        <button className='submit another' type="submit" >Post Job and Add Another Job</button>
        <button className='submit cancel' type="submit" >Cancel</button>

      </form>
      <br/><br/>
    </div>
  )
}

export default App;
