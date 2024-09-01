import { useQuery, UseQueryOptions } from "@tanstack/react-query";

export function useRiders() {
  return useQuery<Rider[]>(["riders", ""]);
}

export function useRider(id: string) {
  return useQuery<Rider>(["riders", id]);
}

export function useRiderDeliveriesChart(
  riderId: string,
  options?: UseQueryOptions<any>
) {
  return useQuery<any>(
    [`analytics/admin/${riderId}/rider-deliveries/`],
    options
  );
}
