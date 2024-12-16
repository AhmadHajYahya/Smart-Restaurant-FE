import React, { createContext, useState, useContext } from "react";

// Create a context for the data
const DataContext = createContext(null);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [assignedTable, setAssignedTable] = useState("");
  const [mealOrderID, setMealOrderID] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [preparingTime, setPreparingTime] = useState(0);
  const addItem = (item) => {
    setData((prevData) => [...prevData, item]);
  };

  const removeItem = (id) => {
    setData((prevData) => prevData.filter((item) => item !== id));
  };

  const clearDataContext = () => {
    setData([]);
    setAssignedTable("");
    setMealOrderID("");
    setTotalPrice(0);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        assignedTable,
        setAssignedTable,
        mealOrderID,
        setMealOrderID,
        addItem,
        removeItem,
        setTotalPrice,
        totalPrice,
        setData,
        clearDataContext,
        preparingTime,
        setPreparingTime,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
