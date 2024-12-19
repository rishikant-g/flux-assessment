import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import { MutationOpt, QueryOpt } from "../type/IRequest";

export const useGetTask = (
  url: string,
  params: object,
  options?: QueryOpt<any>,
) => {
  const fn = () =>
    request<IEmpty, any>({
      url,
      method: "GET",
      params,
    });

  return useQuery({
    queryKey: ["GET_TASK"],
    queryFn: fn,
    ...options,
  });
};

export const usePostTask = (url: string, options?: MutationOpt<any, any>) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_TASK"],
    mutationFn: fn,
    ...options,
  });
};
