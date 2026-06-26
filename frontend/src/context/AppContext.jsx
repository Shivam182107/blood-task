import { createContext, useState } from "react";
import DonorsData from "../../data";

export const appContext = createContext();

export const AppContext = ({ children }) => {
  const [ReceiverFormData, setReceiverFormData] = useState({
    name: "",
    age: "",
    weight: "",
    phone: "",
    bloodGroup: "",
    city: "",
    state: "",
    country: "",
    address: "",
  });

  const [User, setUser] = useState({ lat: null, lng: null });
  const [Donors, setDonors] = useState([]);

  return (
    <appContext.Provider value={{
      ReceiverFormData, setReceiverFormData,
      User , setUser,
      Donors, setDonors,
      DonorsData
    }}>
      {children}
    </appContext.Provider>
  );
};