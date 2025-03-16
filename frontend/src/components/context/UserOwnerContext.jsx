import { createContext, useEffect, useState } from "react";

// Named Export (Ensures React Fast Refresh works)
export const UserOwnerContextObj = createContext(null);

function UserOwnerContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("currentUser");
            return storedUser
                ? JSON.parse(storedUser)
                : {
                    firstName: "",
                    lastName: "",
                    email: "",
                    profileImageUrl: "",
                    role: "",
                    address: "",
                    mobile: ""
                };
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            return {
                firstName: "",
                lastName: "",
                email: "",
                profileImageUrl: "",
                role: "",
                address: "",
                mobile: ""
            };
        }
    });

    useEffect(() => {
        if (currentUser?.email) {
            try {
                localStorage.setItem("currentUser", JSON.stringify(currentUser));
            } catch (error) {
                console.error("Error saving user data to localStorage:", error);
            }
        }
    }, [currentUser]);

    return (
        <UserOwnerContextObj.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserOwnerContextObj.Provider>
    );
}

// ✅ Consistently Export as Default & Named Export
export default UserOwnerContextProvider;