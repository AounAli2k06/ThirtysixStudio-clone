import Canvas from "./Canvas";
import "./App.css";
import data from "./data";
import { useRef, useEffect, useState } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import gsap from "gsap";

function App() {
  const scrollRef = useRef(null);
  const headingref = useRef(null);
  const [showCanvas, setShowCanvas] = useState(false);
  const growingSpan = useRef(null);
  
  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 1,
      lerp: 0.05,
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleClick = (e) => {
      setShowCanvas((prevShowCanvas) => {
        if (!prevShowCanvas) {
          gsap.set(growingSpan.current, {
            top: e.clientY,
            left: e.clientX,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });
          
          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 2,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        } else {
          gsap.to("body", {
            color: "#fff",
            backgroundColor: "#000",
            duration: 1.2,
            ease: "power2.inOut",
          });
        }

        return !prevShowCanvas;
      });
    };

    const headingElement = headingref.current;
    headingElement.addEventListener("click", handleClick);

    // Clean up event listener on unmount
    return () => headingElement.removeEventListener("click", handleClick);
  }, []);
  

  return (
    <main data-scroll-container ref={scrollRef}>
         <span
        ref={growingSpan}
        className="growing rounded-full block fixed top-[-20px] left-[-20px] w-5 h-5 bg-[#fd2c2a]"
      ></span>
      <div
        className="w-full min-h-screen text-white relative"
        data-scroll-section
      >
        {data[0].map((item, index) => (
          <Canvas key={index} data={item} />
        ))}
        <div className="w-full h-screen z-[1]">
          <nav className="w-full p-8 flex justify-between z-50">
            <div className="brand text-2xl font-md">thirtysixstudios</div>
            <div className="links flex gap-10">
              {[
                "What we do",
                "Who we are",
                "How we give back",
                "Talk to us",
              ].map((link, index) => (
                <a
                  key={index}
                  href={`#${link.toLowerCase()}`}
                  className="text-md hover:text-gray-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </nav>
          <div className="textcontainer  w-full px-[20%]">
            <div className="text w-[50%]">
              <h3 className="text-4xl leading-[1.2]">
                At Thirtysixstudio, we build immersive digital experiences for
                brands with a purpose.
              </h3>
              <p className="text-lg w-[80%] mt-10 font-normal">
                We are a team of designers, developers, and strategists who are
                passionate about creating digital experiences that are both
                beautiful and functional.
              </p>
              <p className="text-md mt-10">scroll</p>
            </div>
          </div>
          <div className="w-full absolute bottom-0 left-0">
            <h1
              ref={headingref}
              className="text-[12rem] font-normal tracking-tight cursor-pointer leading-none pl-5"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>
      </div>
      <div className="w-full relative h-screen  mt-32 px-10">
        {showCanvas &&
          data[1].map((canvasdets, index) => (
            <div key={index}>
              <Canvas data={canvasdets} />
            </div>
          ))}
        <h1 className="text-8xl tracking-tighter">about the brand</h1>
        <p className="text-4xl leading-[1.8] w-[80%] mt-10 font-light">
          we are a team of designers, developers, and strategists who are
          passionate about creating digital experiences that are both beautiful
          and functional, we are a team of designers, developers, and
          strategists who are passionate about creating digital experiences that
          are both beautiful and functional.
        </p>

        <img
          className="w-[80%] mt-10"
          src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
          alt=""
        />
      </div>
    </main>
  );
}

export default App;
