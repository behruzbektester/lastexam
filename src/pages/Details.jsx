import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteById, getInvoice, updateById } from "../request";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadje from "../components/StatusBadje";
import { Button, buttonVariants } from "../components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "sonner";
import { useAppStore } from "../lib/zustand";
import { ArrowLeft } from "lucide-react";

export default function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateInvoices, setEditedData, setSheetOpen } = useAppStore();
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [invoice, setInvoice] = useState({});

  useEffect(() => {
    setLoading(true);
    getInvoice(id)
      .then((res) => setInvoice(res))
      .catch(({ message }) => setError(message))
      .finally(() => setLoading(false));
  }, [id]);

  function handleDelete(id) {
    setDeleteLoading(true);
    deleteById(id)
      .then((res) => {
        updateInvoices(res);
        navigate("/");
      })
      .catch(({ message }) => toast.error(message))
      .finally(() => setDeleteLoading(false));
  }

  function handleUpdate(id, data) {
    setUpdateLoading(true);
    updateById(id, data)
      .then((res) => {
        updateInvoices(res);
        navigate(-1);
      })
      .catch(({ message }) => toast.error(message))
      .finally(() => setUpdateLoading(false));
  }

  function handleEdit(data) {
    setSheetOpen();
    setEditedData(data);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const {
    id: invoiceId,
    senderAddress = {},
    clientAddress = {},
    createdAt,
    paymentTerms,
    clientName,
    clientEmail,
    items = [],
    total,
    status,
  } = invoice;

  const paymentDue = createdAt
    ? new Date(
        new Date(createdAt).getTime() + paymentTerms * 24 * 60 * 60 * 1000
      )
        .toISOString()
        .split("T")[0]
    : "";

  return (
    <div className="py-5">
      <div className="base-container flex flex-col gap-6">
        <Button
          onClick={() => navigate(-1)}
          variant="ghost"
          className="cursor-pointer bg-transparent text-left flex justify-start hover:bg-transparent"
        >
          <ArrowLeft /> Go back
        </Button>
        <Card>
          <CardContent className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <StatusBadje status={status} />
            </div>
            <div className="flex items-center gap-3">
              <Button
                className="bg-[#F9FAFE] rounded-3xl text-[#7E88C3] py-4 px-6 hover:bg-[#DFE3FA] cursor-pointer"
                onClick={() => handleEdit(invoice)}
                variant="ghost"
              >
                Edit
              </Button>

              <Dialog>
                <DialogTrigger>
                  <Button className="bg-[#EC5757] w-[89px] rounded-3xl hover:bg-[#FF9797] cursor-pointer">
                    Delete
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogDescription>
                      Are you sure you want to delete invoice #{invoiceId}? This
                      action cannot be undone.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-center">
                    <DialogClose
                      className={buttonVariants({ variant: "ghost" })}
                    >
                      Cancel
                    </DialogClose>
                    <Button
                      onClick={() => handleDelete(invoiceId)}
                      variant="destructive"
                      disabled={deleteLoading}
                    >
                      {deleteLoading ? "Loading..." : "Delete"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              {status === "pending" && (
                <Button
                  onClick={() => handleUpdate(invoiceId, { status: "paid" })}
                  className="bg-[#7C5DFA] w-[131px] h-12 hover:bg-[#9277FF] rounded-3xl cursor-pointer"
                >
                  {updateLoading ? "Loading..." : "Mark as Paid"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Invoice Card */}
        <Card className="p-12" key={invoiceId}>
          <CardHeader className="flex justify-between">
            <div>
              <CardTitle>
                <span>#</span>
                {invoiceId}
              </CardTitle>
              <CardDescription>Graphic Design</CardDescription>
            </div>
            <div className="w-[94px] text-right text-[11px] text-[#7E88C3]">
              <p>{senderAddress.street}</p>
              <p>{senderAddress.city}</p>
              <p>{senderAddress.postCode}</p>
              <p>{senderAddress.country}</p>
            </div>
          </CardHeader>

          <CardContent className="flex justify-between items-start">
            <div>
              <div className="flex flex-col">
                <p className="text-[#7E88C3] text-xs">Invoice Date</p>
                <h3 className="text-sm font-bold">{createdAt || "N/A"}</h3>
              </div>
              <div className="flex flex-col">
                <p className="text-[#7E88C3] text-xs">Payment Due</p>
                <h3 className="text-sm font-bold">{paymentDue}</h3>
              </div>
            </div>

            <div>
              <p className="text-[#7E88C3] text-xs">Bill To</p>
              <h3 className="text-[15px] font-bold pb-3">{clientName}</h3>
              <p className="text-[#7E88C3] text-[11px]">
                {clientAddress.street}
              </p>
              <p className="text-[#7E88C3] text-[11px]">{clientAddress.city}</p>
              <p className="text-[#7E88C3] text-[11px]">
                {clientAddress.postCode}
              </p>
              <p className="text-[#7E88C3] text-[11px]">
                {clientAddress.country}
              </p>
            </div>

            <div>
              <p className="text-[#7E88C3] text-xs">Sent to</p>
              <h3 className="text-[15px] font-bold">{clientEmail}</h3>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col w-full">
            <div className="flex items-center justify-between bg-[#F9FAFE] w-full p-8 rounded-t-[8px]">
              <div className="flex flex-col gap-8">
                <p className="text-[#7E88C3] text-[11px]">Item Name</p>
                {items.map((item) => (
                  <h3 className="text-xs font-bold" key={item.name}>
                    {item.name}
                  </h3>
                ))}
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-[#7E88C3] text-[11px]">QTY.</p>
                {items.map((item, index) => (
                  <h3 className="text-xs font-bold text-[#7E88C3]" key={index}>
                    {item.quantity}
                  </h3>
                ))}
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-[#7E88C3] text-[11px]">Price</p>
                {items.map((item, index) => (
                  <h3 className="text-xs font-bold text-[#7E88C3]" key={index}>
                    £ {item.price}
                  </h3>
                ))}
              </div>
              <div className="flex flex-col gap-8">
                <p className="text-[#7E88C3] text-[11px]">Total</p>
                {items.map((item, index) => (
                  <h3 className="text-xs font-bold" key={index}>
                    £ {item.total}
                  </h3>
                ))}
              </div>
            </div>

            <div className="bg-[#373B53] h-20 w-full text-white flex items-center justify-between px-8 py-6 rounded-b-[8px]">
              <p className="text-[11px] font-normal">Amount Due</p>
              <h2 className="text-2xl font-bold">£ {total}</h2>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
