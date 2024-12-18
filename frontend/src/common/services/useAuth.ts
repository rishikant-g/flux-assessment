import { request } from "./http";

import { ISignUpRequest } from "../type/body/ISignUpRequest";
import { ISignUpResponse } from "../type/model/ISignUpResponse";
import { useMutation } from "@tanstack/react-query";
import { IAxiosError } from "../type/model/IAxiosError";
import { MutationOpt } from "../type/IRequest";

export const useSingUp = (
  url: string,
  options?: MutationOpt<ISignUpRequest, ISignUpResponse>,
) => {
  const fn = (params: ISignUpRequest) =>
    request<ISignUpRequest, ISignUpResponse>({
      url,
      method: "POST",
      params,
      useData: true,
      isEncryption: true,
    });

  return useMutation<ISignUpResponse, IAxiosError, ISignUpRequest>({
    mutationKey: ["SIGN_UP"],
    mutationFn: fn,
    ...options,
  });
};
