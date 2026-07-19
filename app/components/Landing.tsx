"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { Splash } from "./Splash";

export function Landing({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  // Lock scroll while the splash is up.
  useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  const handleDone = useCallback(() => setReady(true), []);

  return (
    <>
      <AnimatePresence>
        {!ready && <Splash key="splash" onDone={handleDone} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.6, delay: ready ? 0.2 : 0 }}
      >
        {children}
      </motion.div>
    </>
  );
}
