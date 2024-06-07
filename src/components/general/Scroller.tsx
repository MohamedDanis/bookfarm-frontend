import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from "framer-motion";
import { wrap } from "framer-motion";
import rec31 from '../../assets/imgs/rectangle-31.png'


function ParallaxText({ children, baseVelocity = 100 }:any) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const directionFactor = useRef(1);
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000);
    console.log(t);
    
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1;
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1;
    }

    moveBy += directionFactor.current * moveBy * velocityFactor.get();

    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  );
}

export default function Scroller() {
  return (

    <ParallaxText baseVelocity={1}>
        <div className="flex gap-[50px] sm:gap-[20px] items-center">
        <div className=" relative w-[200px] h-[300px] mr-8 rounded-xl" style={{background:`linear-gradient(180deg, rgba(255, 255, 255, 0.00) 49.18%, #604C4C 100%)`}}>
        <img src={rec31} alt=""  className="mr-8 h-full"/>
        </div>
        <div className=" relative w-[200px] h-[300px] mr-8 rounded-xl" style={{background:`linear-gradient(180deg, rgba(255, 255, 255, 0.00) 49.18%, #604C4C 100%)`}}>
        <img src={rec31} alt=""  className="mr-8 h-full"/>
        </div>
        <div className=" relative w-[200px] h-[300px] mr-8 rounded-xl" style={{background:`linear-gradient(180deg, rgba(255, 255, 255, 0.00) 49.18%, #604C4C 100%)`}}>
        <img src={rec31} alt=""  className="mr-8 h-full"/>
        </div>
        <div className=" relative w-[200px] h-[300px] mr-8 rounded-xl" style={{background:`linear-gradient(180deg, rgba(255, 255, 255, 0.00) 49.18%, #604C4C 100%)`}}>
        <img src={rec31} alt=""  className="mr-8 h-full"/>
        </div>
        <div className=" relative w-[200px] h-[300px] mr-8 rounded-xl" style={{background:`linear-gradient(180deg, rgba(255, 255, 255, 0.00) 49.18%, #604C4C 100%)`}}>
        <img src={rec31} alt=""  className="mr-8 h-full"/>
        </div>
        </div>
      </ParallaxText>

  );
}