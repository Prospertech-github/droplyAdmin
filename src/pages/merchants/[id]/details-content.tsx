type Props = {
  data: Organization;
};

export default function MerchantDetailsContent({ data }: Props) {
  //  if (isLoading) {
  //    return (
  //      <div className="space-y-4">
  //        <div className="animate-pulse flex h-32 bg-black-200"></div>
  //        <div className="animate-pulse flex h-32 bg-black-200"></div>
  //        <div className="animate-pulse flex h-32 bg-black-200"></div>
  //      </div>
  //    );
  //  }
  //  if (!data) {
  //    return (
  //      <div className="text-center justify-center flex items-center h-32 bg-white">
  //        We couldn't find the merchant you're looking for.
  //      </div>
  //    );
  //  }
  return (
    <>
      <div className="grid gap-4 2xl:gap-6 xl:grid-cols-2">
        <div className="p-4 rounded-lg border border-gray-200 xl:p-6 bg-white">
          <h2 className="text-lg">Company details</h2>
          <div>
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr>
                  <th>Name</th>
                  <td>{data.name}</td>
                </tr>
                <tr>
                  <th>Address</th>
                  <td>{data.address}</td>
                </tr>
                <tr>
                  <th>Description</th>
                  <td>{data.description}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 xl:p-6 bg-white">
          <h2 className="text-lg">Contact details</h2>
          <div>
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr>
                  <th>Contact Person</th>
                  <td>
                    {data.user_info.first_name} {data.user_info.last_name}
                  </td>
                </tr>
                <tr>
                  <th>Email</th>
                  <td>{data.user_info.email}</td>
                </tr>
                <tr>
                  <th>Phone</th>
                  <td>{data.user_info.phone}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 xl:p-6 bg-white">
          <h2 className="text-lg">Milage & Commission</h2>
          <div>
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr>
                  <th>Commission</th>
                  <td>{data.commission}</td>
                </tr>
                <tr>
                  <th>Price for first KM</th>
                  <td>{data.price_per_km}</td>
                </tr>
                <tr>
                  <th>Price for succeeding KM</th>
                  <td>{data.additional_km}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 xl:p-6 bg-white">
          <h2 className="text-lg">Bank details</h2>
          <div>
            <table className="w-full border-collapse table-auto">
              <tbody>
                <tr>
                  <th>Bank Name</th>
                  <td>{data.bank_info?.bank_name || "------"}</td>
                </tr>
                <tr>
                  <th>Account Name</th>
                  <td>{data.bank_info?.account_name || "------"}</td>
                </tr>
                <tr>
                  <th>Account Number</th>
                  <td>{data.bank_info?.account_number || "------"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="p-4 rounded-lg border border-gray-200 xl:p-6 bg-white col-span-full">
          <h2 className="text-lg">CAC Document</h2>
          <div
            style={{
              height: "500px",
            }}
          >
            <img
              src={data.cac_doc}
              className="w-full h-full objc"
              alt="cac docs"
            />
          </div>
        </div>
      </div>
    </>
  );
}
