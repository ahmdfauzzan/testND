import axios from "axios";
import { API_ENDPOINT } from "../endpoint/api-endpoint";
import { useMutation } from "@tanstack/react-query";

export const loginUser = async (input) => {
  const response = await axios.post(API_ENDPOINT.LOGIN_USER, input);
  return response.data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
  });
};
