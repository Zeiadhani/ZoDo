import './App.css';
import React from 'react'
import {useState, useRef} from 'react'
import moment from 'moment';
import Event from './components/event';
import {ReactComponent as Menu} from './components/menu_bar.svg';
import {ReactComponent as Add} from './components/add.svg';
import {ReactComponent as ZH} from './components/ZH.svg';


const Main =(props)=>{
  console.log(`
  ...................................................................................................
  ...................................................................................................
  ...................................................................................................
  ............................................._',;;;,'__............................................
  ......................................._i](rnnnrrffrrrrf1-l_.......................................
  ...................................._+furf/////////////////f1<_....................................
  ...................................-vr/////////////////////////+_..................................
  ................................._ru////////////////////////////}_.................................
  .................................(n//////////////////////////////+.................................
  .................................nf//////////////////////////////}.................................
  .................................}f/////////////////////////////(<.................................
  ................................._1////////////////////////////(-_.................................
  ...................................i1////////////////////////(}l...................................
  .....................................;-1//////////////////(}+;.....................................
  ........................................'l<]}1(((((((1}-<l'........................................
  ..............................................._____...............................................
  .............................._,<-}1((((((((//(((//////((((((((1]+i,_..............................
  ...........................,-funff/////////////////////////////////ff1+,...........................
  .........................;fur///////////////////////////////////////////],.........................
  ..........................;<}(//////////////////////////////////////(1]i,..........................
  ............................._;<-1(////////////////////////////(1}+i,_.............................
  .................................._,;i+]}1((((((((((((((11}-+i;'_..................................
  ...........................................__'''''''''_............................................
  ...................................................................................................
  ...................................................................................................
  ...................................................................................................
























`)


  //eslint-disable-next-line
  const [dayClicked, setDayClicked] = useState(false)
  const [day, setDay] = useState(moment().format('dddd'));
  const pageRef = useRef(null)
  const [actDay,setActDay]=props.actDay;
  //eslint-disable-next-line
  const [events,setEvents] = props.events;
  var [completed,setCompleted] = props.completed;
  //eslint-disable-next-line
  const [secondPage, setSecondPage] = props.page;
  let [gotoPage,setGotoPage]=props.goto

  const dayer=(e)=>{
    var days = ['Sunday', "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"]
    var dayDivs = []
    
    setDayClicked(!dayClicked)
    if(dayClicked===true){
      for (let i = 0; i<days.length; i++){dayDivs.push(<div className="dayList" key={i} onClick={()=>{setDay(days[i]);setActDay(days[i])}}>{days[i]}</div>)}

      setDay(
        <scroll className="daysList">
          {dayDivs}
        </scroll>
      )
    }
  }

  if(gotoPage==='main'){
    pageRef.current.scrollIntoView({behavior:'smooth'})
  }
  
  return(
    <div className="app" ref={pageRef}>
      <div className="day" onClick={dayer}>{day}</div>
      <div className="date">Date: {moment().format('l')}</div>

      <Menu className="nav" onClick={()=>{setGotoPage('comp');setSecondPage('comp')}}></Menu>
      <Event events={[events,setEvents]} actDay={actDay} completed={[completed,setCompleted]}></Event>
      <Add className="add" onClick={()=>{setGotoPage('add');setSecondPage('add')}}/>
      <ZH className="ZH"></ZH>
    </div>
  )
}

export default Main;