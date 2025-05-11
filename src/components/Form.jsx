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

export default function Form({ info }) {
  const {
    senderAddress,
    clientAddress,
    clientEmail,
    clientName,
    paymentTerms,
    description,
    paymentDue,
    createdAt,
    items,
  } = info || {};
  return (
    <form className="p-4 pt-14">
      {/* Bill From */}
      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill From</h3>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="senderAddress-street">Street Address</Label>
            <Input
              type="text"
              defaultValue={info && senderAddress.street}
              id="senderAddress-street"
              name="senderAddress-street"
              placeholder="Street Address"
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-city">City</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.city}
                id="senderAddress-city"
                name="senderAddress-city"
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-postCode">Post Code</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.postCode}
                id="senderAddress-postCode"
                name="senderAddress-postCode"
                placeholder="Post Code"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="senderAddress-country">Country</Label>
              <Input
                type="text"
                defaultValue={info && senderAddress.country}
                id="senderAddress-country"
                name="senderAddress-country"
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bill To */}

      <div className="mb-10">
        <h3 className="text-2xl font-medium mb-5">Bill To</h3>
        <div className="flex flex-col gap-5 mb-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientEmail">Client's Email</Label>
            <Input
              type="text"
              id="clientEmail"
              name="clientEmail"
              defaultValue={info && clientEmail}
              placeholder="Client's Email"
            />
          </div>

          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientName">Client's Name</Label>
            <Input
              type="text"
              id="clientName"
              name="clientName"
              defaultValue={info && clientName}
              placeholder="Client's Name"
            />
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="clientAddress-street">Street Address</Label>
            <Input
              type="text"
              id="clientAddress-street"
              name="clientAddress-street"
              defaultValue={info && clientAddress.street}
              placeholder="Street Address"
            />
          </div>
          <div className="flex justify-between gap-5">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-city">City</Label>
              <Input
                type="text"
                id="clientAddress-city"
                name="clientAddress-city"
                defaultValue={info && clientAddress.city}
                placeholder="City"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-postCode">Post Code</Label>
              <Input
                type="text"
                id="clientAddress-postCode"
                name="clientAddress-postCode"
                defaultValue={info && clientAddress.postCode}
                placeholder="Post Code"
              />
            </div>

            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="clientAddress-country">Country</Label>
              <Input
                type="text"
                id="clientAddress-country"
                name="clientAddress-country"
                defaultValue={info && clientAddress.country}
                placeholder="Country"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date */}
      <div className="flex flex-col gap-5 mb-10">
        <div className="flex gap-10 items-end">
          <div className="grid w-full max-w-full items-center gap-1.5">
            <Label htmlFor="createdAt">Invoice Date</Label>
            <Input
              type="date"
              id="createdAt"
              defaultValue={info && createdAt}
              name="createdAt"
              placeholder="Invoice Date"
            />
          </div>
          <Select
            name="paymentTerms"
            defaultValue={info && paymentTerms.toString()}
          >
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

        <div className="grid w-full max-w-full items-center gap-1.5">
          <Label htmlFor="description">Project Description</Label>
          <Input
            type="text"
            id="description"
            defaultValue={info && description}
            name="description"
            placeholder="Project Description"
          />
        </div>
      </div>

      <ItemList info={info && info.items} />

      {info ? (
        <div className="flex justify-end gap-5 mt-10">
          <Button variant={"outline"}>Cancel</Button>
          <Button>Save Changes</Button>
        </div>
      ) : (
        <div className="flex justify-end gap-5 mt-10">
          <Button variant={"outline"}>Discard</Button>
          <Button variant={"secondary"}>Save as Draft</Button>
          <Button>Save & Send</Button>
        </div>
      )}
    </form>
  );
}
