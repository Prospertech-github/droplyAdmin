import { useQueryClient, useMutation } from "@tanstack/react-query";
import { axios } from "@/utils/api";

export default function useDecideOrganization() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, decision }: { id: string; decision: "approve" | "decline" }) =>
      axios.patch(`/organizations/${id}/respond/`, { status: `${decision}d` }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["organizations"]);
      },
    }
  );
}
