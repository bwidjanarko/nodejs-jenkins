import { useState } from 'react';

export default function useRole() {

  const getRole = () => {
    const roleString = localStorage.getItem('role');
    const userRole = JSON.parse(roleString);
    if (userRole) {
       console.log("Get Role : "+userRole);
    } else {
       console.log("Get Role : null");
    }
    //return userToken?.token
    return userRole
  };

  const [role, setRole] = useState(getRole());

  const saveRole = userRole => {
    localStorage.setItem('role', JSON.stringify(userRole))
    if (userRole) {
       console.log("Save Role : "+JSON.stringify(userRole));
    } else {
       console.log("Save Role : null");
    }
    setRole(userRole.role);
  };

  return {
    setRole: saveRole,
    role
  }
}
