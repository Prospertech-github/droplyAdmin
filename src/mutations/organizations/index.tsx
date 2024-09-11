import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from "@/utils/api";
import { toast } from "react-toastify";
import { isAxiosError } from "axios";

export default function useDecideOrganization(id: string) {
  const queryClient = useQueryClient();
  return useMutation(
    ({ decision }: { decision: "approve" | "decline" }) =>
      axios.patch(`/organizations/${id}/respond/`, { status: `${decision}d` }),
    {
      onSuccess: () => {
        toast.success(`Merchant status updated`);
        queryClient.invalidateQueries(["organizations"]);
        queryClient.invalidateQueries(["organizations", id]);
      },
      onError: (error) => {
        if (isAxiosError(error)) {
          toast.error(
            error.message || `Something went wrong. Please try again.`
          );
        }
      },
    }
  );
}
