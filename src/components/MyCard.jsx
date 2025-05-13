import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import StatusBadje from "./StatusBadje";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MyCard({
  createdAt = "Due 19 Aug 2021",
  clientName = "Jensen Huang",
  total = "1,800.90",
  status = "draft",
  id = "1",
}) {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => {
        navigate(`/${id}`);
      }}
      className="border-2 border-transparent hover:border-blue-400 transition-colors cursor-pointer"
    >
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>#{id}</CardTitle>
          <CardDescription className="text-[#888EB0]">
            {createdAt}
          </CardDescription>
          <span className="w-[110px] text-[#888EB0]">{clientName}</span>
          <span>£{total}</span>
          <StatusBadje status={status} />
          <ArrowRight className="text-[#7C5DFA]" />
        </div>
      </CardHeader>
    </Card>
  );
}
