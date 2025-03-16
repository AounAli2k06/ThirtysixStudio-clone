import React, { useRef, useEffect } from "react";
import canvasImages from "./images";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Canvas = ({ data }) => {
  const { startIndex, numImages, duration, size, top, left, zIndex } = data;
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  useGSAP((k) => {
    gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration,
      ease: "linear",
      repeat: -1,
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });
  });
  useEffect(() => {
    const scale = window.devicePixelRatio;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    const image = new Image();
    image.src = canvasImages[index.value];
    image.onload = () => {
      canvas.width = canvas.offsetWidth * scale;
      canvas.height = canvas.offsetHeight * scale;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
      context.scale(scale, scale);

      context.drawImage(image, 0, 0, canvas.offsetWidth,canvas.offsetHeight);
    };
  }, [index.value]);

  return (
    <canvas
      data-scroll
      data-scroll-speed={Math.random().toFixed(2)}
      ref={canvasRef}
      style={{
        width: `${size * 1.2}px`,
        height: `${size * 1.2}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex,
      }}
      className="absolute"
    />
  );
};

export default Canvas;
