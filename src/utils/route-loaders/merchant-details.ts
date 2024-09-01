import { queryClient } from "@/providers/react-query";

const merchantDetailsLoader = async ({
  params: { id },
  request,
}: {
  params: { id: string };
  request: Request;
}) => {
  const queryKey = ["organizations", id];
  await queryClient.prefetchQuery({
    queryKey,
  });

  const merchant = queryClient.getQueryData<Organization>(queryKey);
  queryClient.setQueryData(["page-title", request.url], merchant?.name);

  if (merchant) return { merchant, title: merchant.name };

  return null;
};

export default merchantDetailsLoader;
