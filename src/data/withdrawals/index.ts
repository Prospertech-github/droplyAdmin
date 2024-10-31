import { useQuery } from "@tanstack/react-query";

export function useWithdrawalRequest() {
  return useQuery<any>(["withdrawal/requests/"]);
}
