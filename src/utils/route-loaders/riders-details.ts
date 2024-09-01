import { queryClient } from "@/providers/react-query";

const riderDetailsLoader = async ({
  params: { id },
  request,
}: {
  params: { id: string };
  request: Request;
}) => {
  const queryKey = ["riders", id];
  await queryClient.prefetchQuery({
    queryKey,
  });

  const rider = queryClient.getQueryData<Rider>(queryKey);

  const title = `${rider?.user?.first_name} ${rider?.user?.last_name}`;

  queryClient.setQueryData(["page-title", request.url], title);

  if (rider) return { rider, title };

  return null;
};

export default riderDetailsLoader;
