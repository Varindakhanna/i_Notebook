import React , {useContext, useEffect} from 'react'
import noteContext from '../Context/notes/noteContext'

const About = ()=> {

  const a = useContext(noteContext)
   
   return (
     <div>
    <h3>this is about page</h3>
    </div>
  )
}

export default About;


