import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

export const useActions = () => {
  const dispatch = useDispatch();
  const allActions = {};

  return bindActionCreators(allActions, dispatch);
};
