import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useOrganization(
  id: string,
  option?: UseQueryOptions<Organization>
) {
  return useQuery<Organization>(["organizations", id], option);
}
