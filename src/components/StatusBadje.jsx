import { buttonVariants } from "./ui/button";

export default function StatusBadje({ status = "draft" }) {
  const style = {
    draft: {
      dote: "bg-[rgba(55,59,83,1)]",
      text: "text-[rgb(55,59,83,1)]",
      bg: "rgba(55,59,83,0.05)",
    },
    paid: {
      dote: "bg-[#33D69F]",
      text: "text-[#33D69F]",
      bg: "rgba(51,214,159,0.05)",
    },
    pending: {
      dote: "bg-[#FF8F00]",
      text: "text-[#FF8F00]",
      bg: "rgba(255,143,0,0.05)",
    },
  };

  const current = style[status] || style["draft"]; // fallback to "draft" style

  return (
    <span
      className={`${buttonVariants({
        variant: "outline",
      })} min-w-[104px] border-none`}
      style={{
        backgroundColor: current.bg,
      }}
    >
      <span
        className={`inline-block w-2 h-2 rounded-full ${current.dote}`}
      ></span>
      <span className={`capitalize ${current.text}`}>{status}</span>
    </span>
  );
}
