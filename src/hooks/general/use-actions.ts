import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import { imageUrlActions } from "store/slices/imageUrlSlice";

export const useActions = () => {
  const dispatch = useDispatch();
  const allActions = {
    ...imageUrlActions,
  };

  return bindActionCreators(allActions, dispatch);
};
