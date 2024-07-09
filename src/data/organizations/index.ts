import { useQuery } from "@tanstack/react-query";

export function useOrganization(id: string) {
  return useQuery<Organization>(['organizations', id, ''])
}