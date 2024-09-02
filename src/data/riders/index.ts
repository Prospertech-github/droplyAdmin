import { useQuery, UseQueryOptions } from "@tanstack/react-query";

type Activity = {
  action: string;
  date: string;
};

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

export function useRiderActivity(
  id: string,
  options?: UseQueryOptions<Activity[]>
) {
  return useQuery<Activity[]>([`activity-logs/${id}/`], options);
}
