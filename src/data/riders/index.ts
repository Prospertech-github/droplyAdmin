import { useQuery } from "@tanstack/react-query";


export function useRiders() {
  return useQuery<Rider[]>(['riders', ""])
}

export function useRider(id: string) {
  return useQuery<Rider>(['riders', id])
}