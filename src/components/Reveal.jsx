import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1];

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  duration = 0.8,
  y = 24,
  className = "",
}) {
  const Tag = motion[as] ?? motion.div;
  return (
    <Tag
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </Tag>
  );
}
