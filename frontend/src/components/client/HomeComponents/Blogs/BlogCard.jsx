import { LinkBtn } from "@/shared/ClickAble";
import React from "react";
import bottomCorner from "@/assets/svg/bottomCorner.svg";
import Image from "next/image";
export const BlogCard = () => {
  return (
    <div className=" relative bg-white h-[300px] flex flex-col gap-6 justify-center rounded-3xl pl-10 p-8 ">
      <div className="absolute -bottom-1 -right-1">
        <Image src={bottomCorner} alt="bottom corner" width={77} height={77} />
      </div>
      <span className="text-xs text-black/60">10th-Oct-2025</span>
      <h3 className="text-2xl font-semibold text-black">
        10 Principles Of Effective Web Design
      </h3>
      <LinkBtn link="/" children="Read More" />
    </div>
  );
};
