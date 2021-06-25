import './App.css';
import React from 'react'
import {useRef, useEffect} from 'react'
import {ReactComponent as Menu} from './components/menu_bar.svg';
import {ReactComponent as ZH} from './components/ZH.svg';

const Completed =(props)=>{
  const pageRef = useRef(null)
  //eslint-disable-next-line
  const [secondPage, setSecondPage] = props.page;
  //eslint-disable-next-line
  let [gotoPage,setGotoPage]=props.goto
 
  let [completed,setCompleted]=props.completed


  useEffect(()=>{
    pageRef.current.scrollIntoView({behavior:'smooth'})
  },[])
  
  return(
    <div className='app' ref={pageRef}>
      <Menu className="nav" onClick={()=>{setGotoPage('main');setTimeout(()=>setSecondPage('none'), 500)}}></Menu>

      <div className="completed">Completed</div>
      <scroll className="compScroll">
        {completed['events'].map((event)=>{
          if (completed[event]['Expiry Date']>Date.now()){
            return(
                  <div className="event" key={completed[event]["id"]} style={{'background':completed[event]["Importance"]}}>
                    <p className="eventContent">{completed[event]['Title']}</p>
                    <div className="group" style={{'background':completed[event]["Group"]}}></div>
                  </div>
            )
          }
          else{
            for( let i = 0; i < completed['events'].length; i++){ 
              if ( completed['events'][i] === event) { 
                  completed['events'].splice(i, 1);
                  delete completed[event]
              }
            }
            return""
          }
        })}
    </scroll>
      <ZH className="ZH"></ZH>
    </div>
  )
}

export default Completed;