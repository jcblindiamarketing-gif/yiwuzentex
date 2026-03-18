import { cn } from "@/utils/utils"
import { motion } from "framer-motion"


export function Skeleton({ className, ...props }) {
  return (
    <motion.div
      className={cn(
        "animate-pulse rounded-md bg-muted relative overflow-hidden",
        className
      )}
      {...props}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "linear",
        }}
      />
    </motion.div>
  )
}
