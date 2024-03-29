import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
import DoneIcon from '-!svg-react-loader!./DoneIcon.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import PlusIcon from '-!svg-react-loader!./PlusIcon.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import CloseIcon from '-!svg-react-loader!./CloseIcon.svg';
// eslint-disable-next-line import/no-webpack-loader-syntax
import SyncIcon from '-!svg-react-loader!./SyncIcon.svg';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const PlannerApp = () => {
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
        }, [Today])

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

    const TodoEntity = ({time, name} : Todo, key : number) => {

        const removeTodo = () => {
            if(todos.length > 1) {
                setTodos(todos.splice(key, 1));
            }else{
                setTodos([]);
            }
        }

        return(
            <div key={key} className='w-10/12 shadow-xl pl-3.5 pb-3 pt-3 rounded-3xl border-2 border-cyan-700 hover:scale-110 transition mb-5'>
                <div id='taskInfoContainer' className='w-4/5 float-left mt-auto mb-auto'>
                    <p>{time}</p>
                    <p className='text-2xl'>{name}</p>
                </div>
                <div id='completeButton-container' className='w-1/5 float-left h-full flex items-center justify-end'>
                    <DoneIcon className='fill-cyan-700 h-12 hover:fill-cyan-500 w-12 mr-5 cursor-pointer transition' onClick={removeTodo}/>
                </div>
            </div>
        );
    }

    type Todo = {
        time: string,
        name: string,
    };

     const [todos, setTodos] = useState<Todo[]>([]);

    const TasksForToday = () => {

        return (
            <div className='mt-8'>
                <p className='ml-4 text-4xl'>Zadania na dzisiaj</p>
                <div id='toosList' className='flex w-full justify-center mt-8 flex-wrap'>
                    {todos.map((todo, key) => {
                        return TodoEntity({time: todo.time, name: todo.name}, key);
                    })}
                </div>
            </div>
        );
    }

    const TaskInput = () => {

        const [taskInputVisible, setTaskInputVisible] = useState<boolean>(false);

        const disableTaskInput = (e : React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setTaskInputVisible(false);
        }

        const enableTaskInput = (e : React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setTaskInputVisible(true);
        }

        const AddTaskButton = () => {
            return (
                <div onClick={enableTaskInput} className='absolute bottom-5 right-5 rounded-full w-20 h-20 bg-cyan-700 hover:bg-cyan-500 flex justify-center items-center cursor-pointer transition'><PlusIcon className='fill-white h-1/2'/></div>
            );
        }

        const newTodo = {time: "", name: ""};

        const handleNameInput = (e : React.FormEvent<HTMLInputElement>) => {
            e.preventDefault();
            newTodo.name = (e.target as HTMLInputElement).value;
        }

        const handleTimeInput = (e : React.FormEvent<HTMLInputElement>) => {
            e.preventDefault();
            newTodo.time = (e.target as HTMLInputElement).value;
        }

        const validateTime = (time: string)  => {
            const timeRegex = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
            return timeRegex.test(time);
        }

        const addTodo = () => {
            if(validateTime(newTodo.time) && newTodo.name !== ""){
                setTodos(prevTodos => [...prevTodos, newTodo]);
            }
        }

        const SyncButton = () => {
            const [syncInputState, setSyncInput] = useState(false);

            const setSyncInputActive = () => {
                if(!syncInputState) {
                    setSyncInput(true);
                }
            }

            const setSyncInputNotActive = () => {
                setSyncInput(false);
                console.log(syncInputState);
            }

            return(
                <div onClick={setSyncInputActive} className={!syncInputState ? 'absolute right-5 bottom-32 bg-cyan-700 w-20 h-20 rounded-full transition-all flex justify-center items-center cursor-pointer' : 'absolute right-5 bottom-32 bg-cyan-700 w-72 rounded-2xl transition-all'}>
                    <SyncIcon className={!syncInputState ? 'w-3/4 h-3/4 fill-white' : 'hidden'}/>
                    <div className={syncInputState ? 'w-3/4 h-14 bg-cyan-500 flex justify-center items-center mr-auto ml-auto rounded-full mt-5 cursor-pointer' : 'hidden'}>
                        Wygeneruj kod
                    </div>

                    <div className={syncInputState ? 'w-3/4 h-14 mt-5 mr-auto ml-auto mb-5' : 'hidden'}>
                        <input type='text' placeholder='Wpisz kod' className='w-full h-full rounded-full pl-2'></input>
                    </div>

                    <div onClick={setSyncInputNotActive} className={syncInputState ? 'w-14 h-14 bg-cyan-500 rounded-full mb-5 ml-auto mr-auto flex justify-center items-center cursor-pointer' : 'hidden'}>
                        <CloseIcon onClick={setSyncInputNotActive} className='w-3/4 h-3/4 fill-white'/>
                    </div>
                </div>
            )
        }

        return(
            <div>
                <AddTaskButton/>
                <SyncButton/>
                <div className={taskInputVisible ? 'absolute top-0 right-0 w-80 h-screen z-10 bg-white shadow-2xl border-l-2 border-cyan-700 transition-all' : 'absolute top-0 w-0 h-screen z-10 bg-white -right-96 border-cyan-700 transition-all'}>
                    <div className={taskInputVisible ? 'flex items-center justify-stretch' : 'hidden'}>
                        <p className='text-4xl mt-2 ml-2 float-left'>Dodaj zadanie</p>
                        <div onClick={disableTaskInput} className='w-12 h-12 rounded-full bg-cyan-700 float-left mt-2 ml-auto mr-auto flex justify-center items-center hover:bg-cyan-500 transition cursor-pointer'>
                            <CloseIcon className='fill-white w-3/4 h-3/4'/>
                        </div>
                    </div>
                    <div className={taskInputVisible ? 'w-full' : 'hidden'}>
                        <div className='flex w-full justify-center flex-wrap mt-5'>
                            <p className='w-full pl-10'>Nazwa zadania</p>
                            <input type='text' className='border-2 border-cyan-700 rounded-xl w-3/4 text-xl' onInput={handleNameInput}></input></div>
                        <div className='flex w-full justify-center flex-wrap mt-2'>
                            <p className='w-full pl-10'>Godzina</p>
                            <input type='time' className='border-2 border-cyan-700 rounded-xl w-3/4 text-xl' onInput={handleTimeInput}></input>
                        </div>
                        <div className='w-full flex justify-center mt-5'>
                            <div onClick={addTodo} className='w-1/2 flex justify-center items-center bg-cyan-700 text-white pt-3 pb-3 rounded-full text-xl hover:bg-cyan-500 cursor-pointer transition'>Dodaj zadanie</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <React.StrictMode>
            <TodayInfo/>
            <TasksForToday/>
            <TaskInput/>
        </React.StrictMode>
    )
}

root.render(
    <PlannerApp/>
);
