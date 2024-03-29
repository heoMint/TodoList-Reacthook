import './Header.css';
import { memo } from 'react';
const Header = () => {
    return (
        <div className="Header">
            <h1>{new Date().toDateString()}</h1>
        </div>
    );
};

// 불필요한 상황에서 렌더링 되지 않도록 Memo를 이용
// 인수로 컴포넌트를 전달받아서 새로운 컴포넌트를 반환하는 메서드
// 최적화 된 컴포넌트를 반환함
export default memo(Header);

// 제공받는 Props가 변경되지 않으면 부모가 리렌더링 되더라도 리렌더 되지 않음
