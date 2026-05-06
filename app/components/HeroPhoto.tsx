"use client";

import Image from "next/image";
import { useState } from "react";

export function HeroPhoto() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="heroPhotoFrame">
      {!loaded && <div className="heroPhotoFallback">CC</div>}
      <Image
        src="/photo.jpeg"
        alt="Collins Chibuike"
        width={280}
        height={280}
        priority
        onLoad={() => setLoaded(true)}
        style={{
          display: loaded ? "block" : "none",
          objectFit: "cover",
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
}
