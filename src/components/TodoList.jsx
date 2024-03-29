import { useMemo, useState, useContext } from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';
import { TodoStateContext } from '../TodoContext';

const TodoList = () => {
    const todos = useContext(TodoStateContext);
    const [search, setSearch] = useState('');

    const onSearch = (e) => {
        setSearch(e.target.value);
    };

    const filterTodos = () => {
        if (search === '') {
            return todos;
        }
        return todos.filter((todo) => todo.content.toLowerCase().includes(search.toLowerCase()));
    };

    // search가 실행 될 때마다 실행되기때문에 좋지 않다.
    // const getAnalyzedTodoData = () => {
    //     console.log('todo 분석함수 호출');
    //     const totalCount = todos.length;
    //     const doneCount = todos.filter((todo) => todo.isDone).length;
    //     const notDoneCount = totalCount - doneCount;
    //     return {
    //         totalCount,
    //         doneCount,
    //         notDoneCount,
    //     };
    // };

    // 1. todos의 값이 변경 되었을 때만 useMemo의 콜백함수를 다시 실행시킨다.
    // 2. 첫번 째 인수로 전달한 콜백함수가 반환하는 값만! 반환한다.
    const { totalCount, doneCount, notDoneCount } = useMemo(() => {
        // 매우 오래걸리는 비싼 연산
        const totalCount = todos.length;
        const doneCount = todos.filter((todo) => todo.isDone).length;
        const notDoneCount = totalCount - doneCount;
        return {
            totalCount,
            doneCount,
            notDoneCount,
        };
    }, [todos]);

    return (
        <div className="TodoList">
            <h4>Todos</h4>
            <div>
                <div>all todo : {totalCount}</div>
                <div>complete : {doneCount}</div>
                <div>not completed : {notDoneCount}</div>
            </div>
            <input value={search} onChange={onSearch} placeholder="검색어를 입력하세요" />
            <div className="todos_wrapper">
                {filterTodos().map((todo) => (
                    <TodoItem key={todo.id} {...todo} />
                ))}
            </div>
        </div>
    );
};

export default TodoList;
