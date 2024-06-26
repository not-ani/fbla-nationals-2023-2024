import { PartnerPage } from "@/components/partner-page";
import Modal from "@/components/ui/modal";
import React from "react";

export default function Page({
  params,
}: {
  params: {
    id: string;
  };
}) {
  const { id } = params;

  if (!id) {
    return null;
  }
  return (
    <Modal>
      <PartnerPage id={id} />
    </Modal>
  );
}
