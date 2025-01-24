import { createContext, useContext, useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [session, setSession] = useState(null);
    const [user, setUser] = useState(null);

    //  console.log("the session is this : ",user)

    useEffect(() => {
        const fetchSession = async () => {
            const sessionData = await getSession();
            setSession(sessionData);
        };
        fetchSession();
    }, [user,session]);

    useEffect(()=>{
        if(user){
         return;
        }else{
         const getData = localStorage.getItem("user");
         const parsedData = JSON.parse(getData);
         setUser(parsedData)
        }
     },[])

    return (
        <AuthContext.Provider value={{ session, user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
