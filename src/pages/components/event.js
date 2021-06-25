import ReactSwipe from 'react-swipe';
import {PassiveListener} from 'react-event-injector';
import useForceUpdate from 'use-force-update';
import Cookies from 'universal-cookie';


const Event =(props)=>{
  const [events,setEvents] = props.events
  var actDay = props.actDay
  var touchStart = 0
  var currentEvent = ''
  var forceUpdate = useForceUpdate()
  const cookies = new Cookies();
  var index
  var [completed,setCompleted] = props.completed
  
  const handleTouchEnd=(e)=>{
    let task=events
    let newCompleted = completed
    var days = ['Sunday', "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"]

    if(touchStart-e.changedTouches[0].clientX>=150){
      for( let i = 0; i < task[actDay]['events'].length; i++){ 
        if ( task[actDay]['events'][i] === currentEvent) { 
          if ( task[actDay][task[actDay]['events'][i]]['Inherited'] === 'Yes'){
            if ( actDay==='Saturday'){
              index=0
            }
            else if ( actDay!=='Saturday'){
              index = days.indexOf(actDay)+1
            }
            task[days[index]]['events'].push(task[actDay]['events'][i])
            task[days[index]][currentEvent]=task[actDay][currentEvent]
            task[actDay]['events'].splice(i, 1);
            delete task[actDay][currentEvent]
        }
      
        else if(task[actDay][task[actDay]['events'][i]]['Inherited'] === 'No'){
          
          if ( actDay==='Saturday'){
            index=0
          }
          else if ( actDay!=='Saturday'){
            index = days.indexOf(actDay)+1
          }
          newCompleted['events'].push(task[actDay]['events'][i])
          newCompleted[currentEvent]=task[actDay][currentEvent]
          task[actDay]['events'].splice(i, 1);
          delete task[actDay][currentEvent]


        }
      }
    }
     

    }
    
    setCompleted(newCompleted)
    setEvents(task)
    cookies.set('events',events, {path:'/'})
    cookies.set('completed',completed, {path:'/'})
    forceUpdate()
  }

  return (
    <scroll className="scroll">
        {events[actDay]['events'].map((event)=>{
          if (events[actDay][event]['Expiry Date']>Date.now()){
            return(
                <ReactSwipe childCount={3}>
                  <PassiveListener>
                  <div onTouchStart={(e)=>{touchStart=e.changedTouches[0].clientX;currentEvent=event}} onTouchEnd={handleTouchEnd} className="event" key={events[actDay][event]["id"]} style={{'background':events[actDay][event]["Importance"]}}>
                    <p className="eventContent">{events[actDay][event]['Title']}</p>
                    <div className="group" style={{'background':events[actDay][event]["Group"]}}></div>
                  </div>
                  </PassiveListener>
                </ReactSwipe>
            )
          }
          else{
            for( let i = 0; i < events[actDay]['events'].length; i++){ 
              if ( events[actDay]['events'][i] === event) { 
                  events[actDay]['events'].splice(i, 1);
                  delete events[actDay][event]
              }
            }
            return""
          }
        })}
    </scroll>
  )
}

export default Event

