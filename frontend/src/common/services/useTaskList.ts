import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import ITaskListResponse from "../type/model/ITaskListResponse";
import { MutationOpt } from "../type/IRequest";

export const useGetTaskList = (url: string) => {
  const fn = () =>
    request<IEmpty, ITaskListResponse>({
      url,
      method: "GET",
      handleError: false,
    });

  return useQuery({
    queryKey: ["GET_TASK_LIST"],
    queryFn: fn,
  });
};

export const usePostTaskList = (
  url: string,
  options?: MutationOpt<any, any>,
) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_TASK_LIST"],
    mutationFn: fn,
    ...options,
  });
};
