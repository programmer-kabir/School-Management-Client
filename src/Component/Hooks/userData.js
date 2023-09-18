import { fetchUsers } from '../../Pages/Redux/Users/UsersSlice';
import store  from '../../Pages/Redux/store';
 import { useDispatch } from "react-redux";
 // data.js
 export let usersData = [];

 
 export const loadUsersData = async () => {
    try {
      const resultAction = await store.dispatch(fetchUsers());
    
      if (fetchUsers.fulfilled.match(resultAction)) {
        usersData = resultAction.payload;
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  };