import { createContext } from "react";

//@ts-ignore
const AppContext = createContext();

const AppProvider = AppContext.Provider;
const AppConsumer = AppContext.Consumer;

export { AppConsumer, AppProvider };
