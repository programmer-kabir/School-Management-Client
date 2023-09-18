import { useQuery } from '@tanstack/react-query';
import React from 'react';

const useBookMark = () => {
    const {refetch, data: bookmark = [], isLoading:loading} = useQuery({
        queryKey: ["bookmark"],
        queryFn:async()=>{
          const res = await fetch(`${import.meta.env.VITE_LOCALHOST_KEY}/bookmark`);
          return res.json(
          );
        }
      })
      return [bookmark,loading,refetch]
};

export default useBookMark;