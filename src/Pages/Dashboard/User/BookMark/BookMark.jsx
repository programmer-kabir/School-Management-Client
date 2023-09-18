import React from 'react';
import useBookMark from '../../../../Component/Hooks/useBookMark';
import { useDispatch, useSelector } from 'react-redux';

const BookMark = () => {
    const [bookmark] = useBookMark()
    console.log(bookmark);
    const { isLoading, class: classData } = useSelector((state) => state.class);
    const dispatch = useDispatch();

    return (
        <div>
            
        </div>
    );
};

export default BookMark;
