import { useEffect, useRef } from "react";
import moment from 'moment';
import {ReactComponent as ZH} from './components/ZH.svg';

const Add =(props)=>{
    const pageRef = useRef(null)
    const [events, setEvents] = props.events;
    //eslint-disable-next-line
    const [actDay,setActDay]=props.actDay;
    //eslint-disable-next-line
    const [secondPage, setSecondPage] = props.page;
    //eslint-disable-next-line
    let [gotoPage,setGotoPage]=props.goto


    // const [cookies,setCookies,removeCookies] = useCookies['events']

    useEffect(()=>{
        pageRef.current.scrollIntoView({behavior:'smooth'})
    },[])

    let titles = ['Title','Expiry Date','Inherited','Group','Description','Importance','Repeating']
    let inputs = ['text','date','select','color','textarea','color','select',]
    let selects = [[false,'Yes','No'],[true,'Sunday', "Monday", 'Tuesday', "Wednesday", "Thursday", "Friday", "Saturday"]]

    const inputer =()=> {
        let elements = []
        let row = 4
        let selectNum = 0
        
        for (let i = 0; i<titles.length; i++){
            if (inputs[i] !== 'select' ){

                if (inputs[i]!=='textarea')
                    { elements.push(
                        <div style={{gridColumn:'2',gridRow:row}} key={titles[i]+'t'}>{titles[i]}</div>
                    )
                    elements.push(
                        <input required={true} className='addInput' style={{gridColumn:'5',gridRow:row}} name={titles[i]} type={inputs[i]} id={titles[i]+'i'} key={titles[i]+'i'}  />
                    )}
            }
            if(titles[i]==='Description'){
                elements.push(
                    <div style={{gridColumn:'2',gridRow:row}} key={titles[i]+'t'}>{titles[i]}</div>
                )
                elements.push(
                    <textarea className='addInput' style={{gridColumn:'5',gridRow:row}} name={titles[i]} type={inputs[i]} id={titles[i]+'i'} key={titles[i]+'i'}  ></textarea>
                )
            }

            else if(inputs[i] === 'select'){
                let options = []

                for (let j =  1; j<selects[selectNum].length;j++){
                    options.push(
                        <option className="addInput" value={selects[selectNum][j]} key={titles[i]+'i'+toString(j)}>{selects[selectNum][j]}</option>
                    )
                }

                elements.push(
                    <div style={{gridColumn:'2',gridRow:row}} key={titles[i]+'t'}>{titles[i]}</div>
                )


                elements.push(
                    <select required={true} style={{gridColumn:'5',gridRow:row}} className="addInput" name={titles[i]} id={titles[i]+'i'} key={titles[i]+'i'} multiple={selects[selectNum][0]}  > 
                        {options}
                    </select>
                )

                selectNum++
            }
            row = row + 2
        }

        return elements
    }

    const handleDone=()=>{
        let now = Date.now()
        let newEvents=events
        var day = []; Array.from(document.getElementById('Repeatingi').options).filter(option=>option.selected).map(option=>day.push(option));
        for (let i=0;i<day.length;i++){
            
            newEvents[day[i].value]['events'].push(now);
            newEvents[day[i].value][now]={
                'Title':document.getElementById('Titlei').value,
                'Expiry Date':moment(document.getElementById('Expiry Datei').value, 'YYYY.MM.DD').unix()*1000,
                'Inherited':document.getElementById('Inheritedi').value,
                'Group':document.getElementById('Groupi').value,
                'Description':document.getElementById('Descriptioni').value,
                'Importance':document.getElementById('Importancei').value,
                'Repeating':document.getElementById('Repeatingi').value,
                'id':now
            };
        }
        setEvents(newEvents)
        console.log(events)
        setGotoPage('main')
        setTimeout(()=>setSecondPage('none'), 500);
    }

    return(
        <form onSubmit={(e)=>{e.preventDefault();handleDone()}}>
        <div className="addPage" ref={pageRef}>
            <div className="addTitle">Add Events</div>

                {inputer()}

                <input type='submit' className="addDone" value='Done'/>
                <div className="addBack" onClick={()=>{setGotoPage('main');setTimeout(()=>setSecondPage('none'), 500);}}><u>Go Back!</u></div>
                <ZH className="ZH"></ZH>
        </div>
        </form>
    )
}

export default Add