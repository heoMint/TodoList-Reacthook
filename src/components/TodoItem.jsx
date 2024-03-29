import { TodoDispatchContext } from '../TodoContext';
import './TodoItem.css';
import { memo, useContext } from 'react';

const TodoItem = ({ id, isDone, content, date }) => {
    const { onUpdate, onDelete } = useContext(TodoDispatchContext);
    const onChangeCheckbox = () => {
        onUpdate(id);
    };
    const onClickDeleteButton = () => {
        onDelete(id);
    };
    return (
        <div className="TodoItem">
            <input onChange={onChangeCheckbox} type="checkbox" checked={isDone} />
            <div className="content">{content}</div>
            <div className="date">{new Date(date).toLocaleDateString()}</div>
            <button onClick={onClickDeleteButton}>삭제</button>
        </div>
    );
};

export default memo(TodoItem);
