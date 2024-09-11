import { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import styles from "../styles.module.css";
import Modal from "@/components/ui/Modal";
import useDecideOrganization from "@/mutations/organizations";
import MerchantDetailsContent from "./details-content";

export default function MerchantDetails() {
  const { id } = useParams() as { id: string };
  const { merchant: data } = useLoaderData() as {
    merchant: Organization;
    title: string;
  };
  const [decision, setDecision] = useState<"approve" | "decline">();
  const { mutateAsync: decide, isLoading } = useDecideOrganization(id);

  return (
    <div className={styles.table}>
      <div className="flex items-center gap-4 p-4 my-4 bg-white flex-wrap justify-end">
        <h1 className="text-xl mr-auto">Merchant Details</h1>
        {data && (
          <>
            {data.status === "pending" && (
              <>
                <button
                  disabled={isLoading}
                  onClick={() => setDecision("approve")}
                  className="btn btn-primary"
                >
                  Approve
                </button>
                <button
                  disabled={isLoading}
                  onClick={() => setDecision("decline")}
                  className="btn btn-danger"
                >
                  Decline
                </button>
              </>
            )}
            {data.status === "approved" && (
              <small className="text-green-600 font-semibold">Approved</small>
            )}
            {data.status === "declined" && (
              <small className="text-red-600 font-semibold">Declined</small>
            )}
          </>
        )}
      </div>
      <MerchantDetailsContent data={data} />
      <Modal
        activeModal={!!decision}
        onClose={() => setDecision(undefined)}
        title={`${decision || "Decide on"} Merchant`}
        centered
      >
        <p>
          Are you sure you want to {decision} this merchant? Doing so will send
          an email to the merchant informing them of your decision.
        </p>
        <div className="mt-4 flex items-center justify-end gap-4">
          <button
            className="btn btn-primary"
            onClick={() => setDecision(undefined)}
          >
            Cancel
          </button>
          <button
            disabled={isLoading}
            onClick={async () => {
              await decide({
                decision: decision as "approve" | "decline",
              });

              setDecision(undefined);
            }}
            className="btn btn-danger"
          >
            {isLoading ? "Loading..." : decision || "Decide"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
