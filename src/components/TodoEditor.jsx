import { useRef, useState, useContext } from 'react';
import './TodoEditor.css';
import { TodoDispatchContext } from '../TodoContext';

const TodoEditor = () => {
    const { onCreateTodos } = useContext(TodoDispatchContext);

    const [content, setContent] = useState('');
    const inputRef = useRef();

    const onChangeContent = (e) => {
        setContent(e.target.value);
    };

    const onClick = () => {
        if (content === '') {
            inputRef.current.focus();
            return;
        }
        onCreateTodos(content);
        setContent('');
    };

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            onClick();
        }
    };
    return (
        <div className="TodoEditor">
            <input
                ref={inputRef}
                value={content}
                onChange={onChangeContent}
                onKeyDown={onKeyDown}
                placeholder="new Todo task..."
            />
            <button onClick={onClick}>추가</button>
        </div>
    );
};

export default TodoEditor;
