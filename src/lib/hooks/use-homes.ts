import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { homesApi } from "../api/homes";

export function useHomes() {
  return useQuery({
    queryKey: ["homes"],
    queryFn: () => homesApi.getHomes(),
  });
}

export function useHome(id: number) {
  return useQuery({
    queryKey: ["home", id],
    queryFn: () => homesApi.getHome(id),
    enabled: !!id,
  });
}

export function useHomeMembers(homeId: number) {
  return useQuery({
    queryKey: ["home", homeId, "members"],
    queryFn: () => homesApi.getHomeMembers(homeId),
    enabled: !!homeId,
  });
}

export function useCreateHome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: homesApi.createHome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homes"] });
    },
  });
}

export function useUpdateHome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: number;
      updates: Parameters<typeof homesApi.updateHome>[1];
    }) => homesApi.updateHome(id, updates),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["home", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["homes"] });
    },
  });
}

export function useDeleteHome() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: homesApi.deleteHome,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["homes"] });
    },
  });
}
