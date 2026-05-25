"use client";

import { useEffect, useRef, useState } from "react";
import Splide from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import "@splidejs/splide/css";
import Image from "next/image";
import { getClientsService } from "@/services/clients.service";
export function ClientsSlider() {
const [clients, setClients] = useState([]);

  const splideRef = useRef(null);

useEffect(() => {
    const fetchClients = async () => {
        const response = await getClientsService();
        // console.log(response.data);
        setClients(response.data)
    }
    fetchClients();
}, [])
  useEffect(() => {
    const splide = new Splide(splideRef.current, {
      type: "loop",
      drag: false,
      arrows: false,
      pagination: false,
      autoWidth: true,
      gap: "40px",

      speed: 0, // IMPORTANT: remove slide animation feel
      autoScroll: {
        speed: 1, // controls smooth continuous motion
        pauseOnHover: false,
        pauseOnFocus: false,
      },
    });

    splide.mount({ AutoScroll });

    return () => splide.destroy();
  }, []);

  return (
    <div className="w-full overflow-hidden relative ">
      {/* LEFT FADE */}
      <div
        className="hidden lg:block pointer-events-none absolute left-0 top-0 h-full w-24 z-10
        bg-linear-to-r from-white to-transparent"
      />

      {/* RIGHT FADE */}
      <div
        className="hidden lg:block pointer-events-none absolute right-0 top-0 h-full w-24 z-10
        bg-linear-to-l from-white to-transparent"
      />

      {/* SPLIDE */}
      <div className="splide" ref={splideRef}>
        <div className="splide__track">
          <div className="splide__list flex items-center ">
            {clients.map((client, i) => (
              <div
                key={i}
                className="splide__slide whitespace-nowrap uppercase text-5xl md:text-8xl font-bold text-black/10"
              >
                <Image src={client?.coverImage?.url} alt={`Client ${i + 1}`} width={100} height={100} className=""  />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
