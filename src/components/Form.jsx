import { useEffect, useState } from "react";
import { prepareData } from "../lib/utils";
import { useAppStore } from "../lib/zustand";
import { addInvoice, updateById } from "../request";
import ItemList from "./ItemList";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Form({ info, setSheetOpen }) {
  const { items: zustandItems, updateInvoices } = useAppStore();
  const [sending, setSending] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const submitter = e.nativeEvent.submitter;
    const status = submitter.id === "edit" ? "edit" : submitter.id;

    const formData = new FormData(e.target);
    const result = {};

    if (!info) {
      result.status = status;
    }

    formData.forEach((value, key) => {
      if (["quantity", "price", "paymentTerms"].includes(key)) {
        result[key] = Number(value);
      } else {
        result[key] = value;
      }
    });

    result.items = zustandItems;
    const readyData = prepareData(result);

    setSending({
      mode: info ? "edit" : "add",
      data: readyData,
      id: info?.id,
    });
  }

  useEffect(() => {
    if (sending) {
      setLoading(true);
      const action =
        sending.mode === "edit"
          ? updateById(sending.id, sending.data)
          : addInvoice(sending.data);

      action
        .then((res) => {
          updateInvoices(res);
          toast.success(
            `${sending.mode === "edit" ? "Edited" : "Added"} successfully ✅`
          );
          setSheetOpen(false);
          if (sending.mode === "edit") navigate(-1);
        })
        .catch(({ message }) => toast.error(message))
        .finally(() => {
          setLoading(false);
          setSending(null);
        });
    }
  }, [sending]);

  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    createdAt,
  } = info || {};

  return (
    <form onSubmit={handleSubmit} className="p-4 pt-14 ">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={senderAddress?.street}
              id="senderAddress-street"
              name="senderAddress-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex gap-5">
            {["city", "postCode", "country"].map((field) => (
              <div key={field} className="grid w-full max-w-sm gap-1.5">
                <Label htmlFor={`senderAddress-${field}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  type="text"
                  id={`senderAddress-${field}`}
                  name={`senderAddress-${field}`}
                  defaultValue={senderAddress?.[field]}
                  placeholder={field}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              type="text"
              id="clientEmail"
              name="clientEmail"
              defaultValue={clientEmail}
              placeholder="Client's Email"
            />
          </div>

          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={clientName}
              placeholder="Client's Name"
            />
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              defaultValue={clientAddress?.street}
              placeholder="Street Address"
            />
          </div>
          <div className="flex gap-5">
            {["city", "postCode", "country"].map((field) => (
              <div key={field} className="grid w-full max-w-sm gap-1.5">
                <Label htmlFor={`clientAddress-${field}`}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Label>
                <Input
                  type="text"
                  id={`clientAddress-${field}`}
                  name={`clientAddress-${field}`}
                  defaultValue={clientAddress?.[field]}
                  placeholder={field}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dates & Description */}
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex gap-10 items-end">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              type="date"
              id="createdAt"
              name="createdAt"
              defaultValue={createdAt}
            />
          </div>
          <Select name="paymentTerms" defaultValue={paymentTerms?.toString()}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Payment Terms" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Terms</SelectLabel>
                <SelectItem value="1">Net 1 Day</SelectItem>
                <SelectItem value="7">Net 7 Day</SelectItem>
                <SelectItem value="14">Net 14 Day</SelectItem>
                <SelectItem value="30">Net 30 Day</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid w-full gap-1.5">
          <Label htmlFor="description">Project Description</Label>
          <Input
            type="text"
            id="description"
            name="description"
            defaultValue={description}
            placeholder="Project Description"
          />
        </div>
      </div>

      {/* Item List */}
      <ItemList info={info?.items} />

      {/* Buttons */}
      <div className="flex justify-end gap-5 mt-10">
        {info ? (
          <>
            <Button variant="outline">Cancel</Button>
            <Button id="edit" disabled={loading}>
              {loading ? "Loading..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <>
            <Button type="button" variant="outline">
              Discard
            </Button>
            <Button id="draft" variant="secondary" disabled={loading}>
              {loading ? "Loading..." : "Save as Draft"}
            </Button>
            <Button id="pending" disabled={loading}>
              {loading ? "Loading..." : "Save & Send"}
            </Button>
          </>
        )}
      </div>
    </form>
  );
}
