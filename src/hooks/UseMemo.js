import React, {useMemo} from 'react';

// 使用useMemo减少不必要的渲染
export default function UseMemo({a, b}) {
    const child1 = useMemo(() => <div>{a}1</div>, [a]);
    const child2 = useMemo(() => <div>{b}2</div>, [b]);
    
    return <>
        {child1}
        {child2}
    </> 
} 