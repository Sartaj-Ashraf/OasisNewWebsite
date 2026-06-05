import Image from "next/image";
import topright from "@/assets/svg/angle-top-right.svg";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LinkBtn } from "@/shared/ClickAble";
export const ServiceCard = ({ service }) => {
  const {
    title,
    description,
    bg,
    titleColor,
    descColor,
    btnBorder,
    iconColor,
    ServiceIcon,
  } = service;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl p-8 flex flex-col gap-5 w-full lg:h-96 ${bg}`}
    >
      <div className="absolute -right-1 top-0 z-10">
        <Image src={topright} alt="" width={100} height={100} />
      </div>

      {/* decorative circles */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/20 pointer-events-none" />
      <div className="absolute -bottom-14 -left-8 w-52 h-52 rounded-full bg-white/10 pointer-events-none" />

      {/* icon */}
      <div className=" flex items-center ">
        <ServiceIcon size={62} color={iconColor} strokeWidth={1.4} />
      </div>

      {/* content */}
      <h3 className={`text-3xl! font-medium tracking-tight mt-auto ${titleColor}`}>
        {title}
      </h3>
      <p className={`text-sm leading-relaxed ${descColor}`}>{description}</p>

      {/* button */}
      <LinkBtn
        link="#"
        className="flex items-center gap-1 button bg-primary/90 "
      >
        Learn More <ArrowRight size={18} />
      </LinkBtn>
    </div>
  );
};
