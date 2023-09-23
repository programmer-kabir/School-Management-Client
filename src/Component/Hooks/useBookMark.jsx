import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from './useAuth';

const useBookMark = () => {
  const {user} = useAuth()
    const {refetch, data: booked = [], isLoading:loading} = useQuery({
        queryKey: ["booked"],
        queryFn:async()=>{
          const res = await fetch(`${import.meta.env.VITE_LOCALHOST_KEY}/booked?userEmail=${user.email}`);
          return res.json(
          );
        }
      })
      return [booked,refetch,loading,]
};

export default useBookMark;