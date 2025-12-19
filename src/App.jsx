import "./App.css";
import Hero from "./sections/hero";
import Filters from "./sections/filters";
import { pillars } from "./constants";
import React, { useEffect, useState, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import Card from "./components/card";
import Button from "./components/button";
import Modal from "./components/modal";
import Assessment from "./sections/assessment";
import Footer from "./sections/footer";
import Testimonials from "./sections/testimonials";
import Maintenance from "./components/maintinance";
// import { useTestimonials } from "./useTestimonials";

function App() {
  const isMaintenance = false;

  if (isMaintenance) {
    return <Maintenance />;
  }

  const [filters, setFilters] = useState({
    search: "",
    pillar: "",
    type: "",
    level: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const sectionRef = useRef(null);

  // Accordion on click handler (kept for reference)
  // const handleAccordionClick = () => {
  //   setExpandedAccordion(!expandedAccordion);
  // };

  // useEffect(() => {
  //   console.clear();
  //   console.log("Accordion is expanded: ", expandedAccordion);
  // }, [expandedAccordion]);

  // --- HELPER: Checks if text contains the search term (Case Insensitive) ---
  const textMatches = (text) => {
    if (!filters.search) return true; // If no search, everything matches
    return text?.toLowerCase().includes(filters.search.toLowerCase());
  };

  // --- MAIN FILTERING LOGIC (Deep Search) ---
  // This replaces the old filtering functions to search deeper into nested items
  const processedPillars = useMemo(() => {
    if (!pillars) return [];

    return pillars
      .map((pillar) => {
        // 1. Check Pillar Filter
        if (filters.pillar && pillar.title !== filters.pillar) return null;

        // 2. Filter Subcontents
        const filteredSubcontents = pillar.subcontents
          ?.map((subcontent) => {
            // Check Type Filter
            if (filters.type && subcontent.title !== filters.type) return null;

            // 3. Filter Items inside Subcontent
            const filteredItems = subcontent.items?.filter((item) => {
              // Check Level Filter
              if (filters.level && item.title !== filters.level) return false;

              // Check Search (Title OR Description)
              const itemMatchesSearch =
                textMatches(item.title) || textMatches(item.description);

              return itemMatchesSearch;
            });

            // 4. Decide if we keep this Subcontent
            // Keep if: (Subcontent Matches Search) OR (It has matching Children)
            const subcontentSelfMatches =
              textMatches(subcontent.title) ||
              textMatches(subcontent.description);

            const hasMatchingItems = filteredItems && filteredItems.length > 0;

            if (subcontentSelfMatches || hasMatchingItems) {
              // Return copy with filtered items
              return { ...subcontent, items: filteredItems };
            }

            return null;
          })
          .filter(Boolean); // Remove nulls

        // 5. Decide if we keep this Pillar
        // Keep if: (Pillar Matches Search) OR (It has matching Subcontents)
        const pillarSelfMatches =
          textMatches(pillar.title) || textMatches(pillar.description);

        const hasMatchingSubcontents =
          filteredSubcontents && filteredSubcontents.length > 0;

        if (pillarSelfMatches || hasMatchingSubcontents) {
          return { ...pillar, subcontents: filteredSubcontents };
        }

        return null;
      })
      .filter(Boolean);
  }, [filters, pillars]); // Only re-run when filters or data change

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

  const scrollToSection = () => {
    sectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <Hero onScrollToSection={scrollToSection} />
      <div>
        <Testimonials />
        <Filters
          onFiltersChange={setFilters}
          onFiltersClear={() => {
            setFilters({
              search: "",
              pillar: "",
              type: "",
              level: "",
            });
          }}
        />

        <div
          id="main"
          className="py-10 flex items-center justify-center lg:px-56 px-6 "
        >
          <div className="w-full">
            {processedPillars.length === 0 && (
              <div className="w-full flex items-center justify-center">
                No matches found.
              </div>
            )}

            {processedPillars.map((pillar) => {
              // We use the pre-filtered subcontents from useMemo
              const subcontents = pillar.subcontents;

              return (
                <div className="flex flex-col" key={pillar.id}>
                  <div
                    className={`flex flex-col mb-6 ${
                      pillar.id !== 1 ? "mt-12" : ""
                    }`}
                  >
                    <h2 className="text-3xl font-bold text-red-950">
                      {pillar?.title}
                    </h2>
                    <p className="text-gray-500">{pillar?.description}</p>
                  </div>
                  <AnimatePresence>
                    <motion.div
                      key={`pillar-${pillar.id}`}
                      initial={{ opacity: 0, y: 100 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: 0.12,
                        ease: "easeOut",
                      }}
                      className="flex flex-col sm:flex-row"
                    >
                      <div className="flex flex-col w-full">
                        {pillar?.id === 1 && (
                          <div className="flex flex-col gap-6">
                            {subcontents?.map((subcontent) => {
                              // Use the items filtered in useMemo
                              const items = subcontent.items;

                              return (
                                <Card
                                  key={subcontent.id}
                                  title={subcontent.title}
                                  description={subcontent.description}
                                >
                                  {subcontent.img && (
                                    <div className="rounded-xl flex items-center justify-center shadow-lg overflow-hidden">
                                      <img
                                        src={subcontent.img}
                                        alt={subcontent.title}
                                        className={`${
                                          subcontent.id === 1
                                            ? "w-full"
                                            : "w-12/12"
                                        } hover:scale-110 hover:transition-all hover:duration-300 p-6 rounded-lg`}
                                      />
                                    </div>
                                  )}
                                  {/* ✅ YOUTUBE VIDEO */}
                                  {subcontent.videoUrl && (
                                    <div className="mt-6 w-full aspect-video rounded-2xl overflow-hidden bg-[#282828]">
                                      <iframe
                                        src={subcontent.videoUrl}
                                        className="w-full h-full"
                                        title={subcontent.title}
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        loading="lazy"
                                      />
                                    </div>
                                  )}

                                  {subcontent?.component && (
                                    // ✅ RESPONSIVE BUTTON FIX APPLIED HERE
                                    <div className="relative z-10 bottom-0 left-0 flex justify-center md:block md:-top-[120px] md:left-[220px]">
                                      <Button
                                        className="h-12 w-full max-w-xs md:w-auto"
                                        onClick={() => setOpenModal(true)}
                                        color="crimson"
                                      >
                                        Take the assessment
                                      </Button>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {items?.length > 0 &&
                                      items?.map((item) => {
                                        return (
                                          <Card
                                            key={item?.id}
                                            title={item?.title}
                                            description={item?.description}
                                            className="flex flex-col justify-between w-full h-full hover:-translate-y-1 hover:shadow-[0px_13px_15px_5px_rgba(0,0,0,0.1)] transition-all duration-200 rounded-xl border border-gray-200 bg-white p-6"
                                          >
                                            <a
                                              href={item.url}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="font-semibold text-red-700 hover:underline"
                                            >
                                              {item?.label}
                                            </a>
                                          </Card>
                                        );
                                      })}
                                  </div>
                                </Card>
                              );
                            })}
                          </div>
                        )}

                        {pillar?.id === 2 && (
                          <div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
                            ref={sectionRef}
                          >
                            {subcontents?.map((subcontent) => {
                              return (
                                <Card
                                  key={subcontent.id}
                                  icon={
                                    subcontent.icon
                                      ? React.createElement(subcontent.icon, {
                                          className: "w-4 h-4 text-red-900",
                                        })
                                      : null
                                  }
                                  title={subcontent.title}
                                  titleColor="text-red-950"
                                  description={subcontent.description}
                                  className="flex flex-col justify-between w-full h-full hover:-translate-y-1 hover:shadow-[0px_13px_15px_5px_rgba(0,0,0,0.1)] transition-all duration-200 rounded-xl border border-gray-200 bg-white p-6"
                                >
                                  <a
                                    href={subcontent.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-semibold text-red-700 hover:underline"
                                  >
                                    {subcontent.label}
                                  </a>
                                </Card>
                              );
                            })}
                          </div>
                        )}

                        {/* {pillar?.id === 3 && (
                           <div
                             className={`-mt-12 p-4 border-2 rounded-xl shadow-sm ${
                               expandedAccordion ? "" : "hover:bg-gray-100"
                             } `}
                           >
                             <div
                               onClick={handleAccordionClick}
                               className={`flex justify-between items-center cursor-pointer ${
                                 expandedAccordion ? "mb-6 " : ""
                               }`}
                             >
                               <div className="flex flex-col">
                                 <h2 className="text-3xl font-bold text-red-950">
                                   {pillar?.title}
                                 </h2>
                                 <p className="text-gray-500">
                                   {pillar?.description}
                                 </p>
                               </div>
                               <ChevronDown
                                 size={48}
                                 className={`${
                                   expandedAccordion ? "-rotate-180 " : ""
                                 } ml-2 transition-all duration-500 cursor-pointer text-red-950`}
                               />
                             </div>
                             {expandedAccordion && (
                               <AnimatePresence>
                                 <motion.div
                                   key={`pillar-${pillar.id}`}
                                   initial={{ opacity: 0, y: -20 }}
                                   animate={{ opacity: 1, y: 0 }}
                                   transition={{
                                     duration: 0.3,
                                     ease: "easeOut",
                                   }}
                                   className="flex flex-col sm:flex-row"
                                 >
                                   <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full">
                                     {subcontents?.map((subcontent) => {
                                       return (
                                         <Card
                                           key={subcontent.id}
                                           icon={
                                             subcontent.icon
                                               ? React.createElement(
                                                   subcontent.icon,
                                                   {
                                                     className:
                                                       "w-4 h-4 text-red-900",
                                                   }
                                                 )
                                               : null
                                           }
                                           title={subcontent.title}
                                           titleColor="text-red-950"
                                           description={subcontent.description}
                                           className="flex flex-col justify-between w-full h-full hover:-translate-y-1 hover:shadow-[0px_13px_15px_5px_rgba(0,0,0,0.1)] transition-all duration-200 rounded-xl border border-gray-200 bg-white p-6"
                                         >
                                           <a
                                             href={subcontent.url}
                                             className="font-semibold text-red-700 hover:underline"
                                           >
                                             {subcontent.label}
                                           </a>
                                         </Card>
                                       );
                                     })}
                                   </div>
                                 </motion.div>
                               </AnimatePresence>
                             )}
                           </div>
                         )} 
                        */}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {/* 🔴 FLOATING FEEDBACK WIDGET */}
      <div className="fixed top-1/2 right-0 -translate-y-1/2 z-50">
        <a
          href="https://docs.google.com/forms/d/e/1FAIpQLSeVs_cqrQuqrrjuL-6O-AbnF9RHCvt3Z3B_HIG2lNDTO_I4aQ/viewform?pli=1"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-crimson-900 hover:bg-crimson-1000
                      text-white text-sm font-medium
                      px-3 py-2
                      rounded-l-lg
                      shadow-lg
                      flex items-center justify-center"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
        >
          Feedback
        </a>
      </div>

      {openModal && (
        <Modal>
          <Assessment setOpenModal={() => setOpenModal(false)} />
        </Modal>
      )}

      <Footer />
    </div>
  );
}

export default App;