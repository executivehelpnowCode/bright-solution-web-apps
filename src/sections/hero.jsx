import Button from "../components/button";
import Section from "../components/container";
import { AnimatePresence, motion } from "motion/react";
import Assessment from "./assessment";
import { useEffect, useState } from "react";
import Modal from "../components/modal";

export default function Hero({ onScrollToSection }) {
  const [openModal, setOpenModal] = useState(false);
  // Prevent user from scrolling in background while modal is visible
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [openModal]);

  return (
    <div
      className="text-white flex flex-col justify-center items-center px-4 md:px-8 min-h-screen
      bg-gradient-to-br from-crimson-1400 via-crimson-1200 to-crimson-1000 pb-4 lg:pb-7"
    >
      <AnimatePresence>
        {/* Hero Header */}
        <motion.div
          key="hero-header"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          <div className="px-3 py-1.5 text-xs sm:text-sm text-crimson-1200 bg-white rounded-full my-4">
            Bright Solutions AI Toolkit
          </div>

          <div className="flex flex-col gap-3 items-center text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold">
              Senior Living AI Toolkit
            </h1>
            <h2 className="text-sm sm:text-base md:text-xl max-w-md sm:max-w-lg md:max-w-2xl">
              Your hub for responsible, scalable, human‑centered AI adoption.
            </h2>
          </div>
        </motion.div>

        {/* Hero Video */}
        <motion.div
          key="hero-video"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
          className="w-full flex justify-center my-6"
        >
          <div className="w-full max-w-full sm:max-w-[600px] md:max-w-[800px] lg:max-w-[976px] aspect-video rounded-2xl overflow-hidden bg-[#282828]">
            <iframe
              src="https://www.youtube.com/embed/YYjF878CnrM?start=1"
              className="w-full h-full"
              title="Generative AI Video"
              allowFullScreen
            />
          </div>
        </motion.div>

        {/* Hero Buttons */}
        <motion.div
          key="hero-buttons"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Button
            className="h-12"
            onClick={() => setOpenModal(true)}
            color="crimson"
          >
            Take the assessment
          </Button>

          <Button className="h-12" onClick={onScrollToSection} color="white">
            Jump to Generative AI Toolkit
          </Button>
        </motion.div>
      </AnimatePresence>

      {openModal && (
        <Modal>
          <Assessment setOpenModal={() => setOpenModal(false)} />
        </Modal>
      )}
    </div>
  );
}
