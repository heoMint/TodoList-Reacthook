import { useReducer, useRef, useCallback, useMemo } from 'react';
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';
import { TodoDispatchContext, TodoStateContext } from './TodoContext';

const mockData = [
    { id: 1, isDone: false, content: '리액트 공부하기', date: new Date().getTime() },
    { id: 2, isDone: false, content: '케이크 촛불불기', date: new Date().getTime() },
    { id: 3, isDone: false, content: '네이티브 공부하기', date: new Date().getTime() },
];

function reducer(state, action) {
    switch (action.type) {
        case 'CREATE': {
            return [action.data, ...state];
        }
        case 'UPDATE': {
            return state.map((it) => (it.id === action.data ? { ...it, isDone: !it.isDone } : it));
        }
        case 'DELETE': {
            return state.filter((it) => it.id !== action.data);
        }
    }
}
function App() {
    const [todos, dispatch] = useReducer(reducer, mockData);
    const idRef = useRef(4);

    const onCreateTodos = (content) => {
        dispatch({
            type: 'CREATE',
            data: { id: idRef.current++, isDone: false, content, date: new Date().getTime() },
        });
    };

    const onUpdate = useCallback((targetId) => {
        dispatch({
            type: 'UPDATE',
            data: targetId,
        });
    }, []);
    const onDelete = useCallback((targetId) => {
        dispatch({
            type: 'DELETE',
            data: targetId,
        });
    }, []);
    const memoizedDispatches = useMemo(() => {
        return {
            onCreateTodos,
            onUpdate,
            onDelete,
        };
    }, []);
    return (
        <div className="App">
            <Header />
            <TodoStateContext.Provider value={todos}>
                <TodoDispatchContext.Provider value={memoizedDispatches}>
                    <TodoEditor />
                    <TodoList />
                </TodoDispatchContext.Provider>
            </TodoStateContext.Provider>
        </div>
    );
}

export default App;
