import { useContext } from "react";
import { PopUpContext } from "../context/PopUpContext";

const usePopUpContext = () => {
  return useContext(PopUpContext);
};
export default usePopUpContext;
