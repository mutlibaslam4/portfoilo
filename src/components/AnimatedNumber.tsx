"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function AnimatedNumber({ value, prefix = "" }: { value: number; prefix?: string }) {
  const spring = useSpring(value, { stiffness: 90, damping: 20 });
  const text = useTransform(spring, (v) => `${prefix}${Math.round(v).toLocaleString("en-US")}`);
  useEffect(() => {
    spring.set(value);
  }, [spring, value]);
  return <motion.span>{text}</motion.span>;
}
