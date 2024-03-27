import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DoneIcon from '-!svg-react-loader!./DoneIcon.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PlusIcon from '-!svg-react-loader!./PlusIcon.svg';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const TodayInfo = () => {

    const days = ["Pon", "Wt", "Śr", "Czw", "Pt", "Sob", "Nie"]
    const months = ["sty.", "lut.", "mar.", "kwi.", "maj", "cze.", "lip.", "sie.", "wrz.", "paź.", "lis.", "gru."];

    const Today : Date = new Date();

    const [unusualHoliday, setUnusualHoliday] = useState<string>("");

    useEffect(() => {
        const fetchUnusualHoliday = async () => {
            const url = `https://pniedzwiedzinski.github.io/kalendarz-swiat-nietypowych/${Today.getMonth()+1}/${Today.getDate()}.json`;
            try {
                const data = await fetch(url);
                if(!data.ok){
                    throw new Error("error while fetching data")
                }

                const unusualHoliday = await data.json();
                setUnusualHoliday(unusualHoliday[Math.floor(Math.random()*unusualHoliday.length)].name);
            }catch(error){
                console.log(error);
            }
        }

        fetchUnusualHoliday();
    }, [])

    return (
        <div className='flex ml-4 mt-6 flex-wrap'>
            <div id='first-row' className='flex w-full'>
                <p id='day' className='text-6xl mr-3'>{days[Today.getDay()-1]}</p>
                <p id='dayNum' className='text-6xl mr-3'>{Today.getDate()}</p>
                <p id='monthName' className='text-6xl mr-3'>{months[Today.getMonth()]}</p>
            </div>
            <div id='second-row'>
                <p id='unusualHoliday' className='text-xl'>{unusualHoliday}</p>
            </div>
        </div>
    )
}

type ToDoProp = {
    Time : string,
    Task : string,
}
const TodoEntity = ({Time, Task} : ToDoProp) => {
    return(
        <div className='w-10/12 shadow-xl pl-3.5 pb-3 pt-3 rounded-3xl border-2 border-cyan-700 hover:scale-110 transition mb-5'>
            <div id='taskInfoContainer' className='w-4/5 float-left mt-auto mb-auto'>
                <p>{Time}</p>
                <p className='text-2xl'>{Task}</p>
            </div>
            <div id='completeButton-container' className='w-1/5 float-left h-full flex justify-end items-center'>
                <DoneIcon className='fill-cyan-700 h-12 hover:fill-cyan-500'/>
            </div>
        </div>
    );
}

const todos = [
    {time: "16:00", name: "Silłownia"},
    {time: "20:00", name: "Spacer z psem"}
];

const TasksForToday = () => {
    return(
        <div className='mt-8'>
            <p className='ml-4 text-4xl'>Zadania na dzisiaj</p>
            <div id='toosList' className='flex w-full justify-center mt-8 flex-wrap'>
                {todos.map(todo => {
                    return TodoEntity({Time: todo.time, Task: todo.name});
                })}
            </div>
        </div>
    );
}

const AddTaskButton = () => {
    return (
        <div className='absolute bottom-5 right-5 rounded-full w-20 h-20 bg-cyan-700 hover:bg-cyan-500 flex justify-center items-center'><PlusIcon className='fill-white h-1/2'/></div>
    );
}

root.render(
  <React.StrictMode>
      <TodayInfo/>
      <TasksForToday/>
      <AddTaskButton/>
  </React.StrictMode>
);
