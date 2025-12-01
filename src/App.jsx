import "./App.css";
import Hero from "./sections/hero";
import Filters from "./sections/filters";
import { pillars } from "./constants";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Card from "./components/card";
import Button from "./components/button";
import Modal from "./components/modal";
import Assessment from "./sections/assessment";
import Footer from "./sections/footer";
import Testimonials from "./sections/testimonials";

function App() {
  const [filters, setFilters] = useState({
    search: "",
    pillar: "",
    type: "",
    level: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [expandedAccordion, setExpandedAccordion] = useState(false);

  // Accordion on click handler
  const handleAccordionClick = () => {
    setExpandedAccordion(!expandedAccordion);
  };

  useEffect(() => {
    console.clear();
    console.log("Accordion is expanded: ", expandedAccordion);
  }, [expandedAccordion]);

  // Check if any filter is active
  const hasActiveFilters =
    filters.search || filters.pillar || filters.type || filters.level;

  const filteredPillars = pillars.filter((pillar) => {
    // If no filters active, show all
    if (!hasActiveFilters) return true;

    // Check pillar-level filter
    if (filters.pillar && pillar.title !== filters.pillar) {
      return false;
    }

    // Check search filter against pillar title
    if (
      filters.search &&
      !pillar.title.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }

    // If type or level filter is active, check subcontents
    if (filters.type || filters.level) {
      const hasMatchingSubcontent = pillar.subcontents?.some((subcontent) => {
        // Check type filter
        if (filters.type && subcontent.title !== filters.type) {
          return false;
        }

        // Check search filter against subcontent title
        if (
          filters.search &&
          !subcontent.title.toLowerCase().includes(filters.search.toLowerCase())
        ) {
          return false;
        }

        // Check level filter
        if (filters.level && subcontent.items) {
          return subcontent.items.some((item) => item.title === filters.level);
        }

        return true;
      });

      return hasMatchingSubcontent;
    }

    return true;
  });

  // Filter subcontents within each pillar
  const getFilteredSubcontents = (pillar) => {
    if (!hasActiveFilters) return pillar.subcontents;

    return pillar.subcontents?.filter((subcontent) => {
      // Check type filter
      if (filters.type && subcontent.title !== filters.type) {
        return false;
      }

      // Check search filter
      if (
        filters.search &&
        !subcontent.title.toLowerCase().includes(filters.search.toLowerCase())
      ) {
        return false;
      }

      // Check level filter
      if (filters.level && subcontent.items) {
        return subcontent.items.some((item) => item.title === filters.level);
      }

      return true;
    });
  };

  // Filter items within subcontents
  const getFilteredItems = (items) => {
    if (!filters.level || !items) return items;

    return items.filter((item) => item.title === filters.level);
  };

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
    <div>
      <Hero />
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
            {filteredPillars?.length === 0 && (
              <div className="w-full flex items-center justify-center">
                No matches found.
              </div>
            )}

            {filteredPillars?.map((pillar) => {
              const filteredSubcontents = getFilteredSubcontents(pillar);

              return (
                <div className="flex flex-col" key={pillar.id}>
                  <div
                    className={`flex flex-col mb-6 ${
                      pillar.id != 1 ? "mt-12" : ""
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
                            {filteredSubcontents?.map((subcontent) => {
                              const filteredItems = getFilteredItems(
                                subcontent.items
                              );
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
                                        
                                        className="hover:scale-110 hover:transition-all hover:duration-300 p-6 w-6/12 rounded-lg"
                                      />
                                      
                                      
                                    </div>
                                  )}

                                  {subcontent?.component && (
                                    <div className="mt-6">
                                      <Button
                                        className="h-12"
                                        onClick={() => setOpenModal(true)}
                                        color="crimson"
                                      >
                                        Take the assessment
                                      </Button>
                                    </div>
                                  )}

                                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                                    {filteredItems?.length > 0 &&
                                      filteredItems?.map((item) => {
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
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            {filteredSubcontents?.map((subcontent) => {
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
                        {/* 
                        {pillar?.id === 3 && (
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
                                    {filteredSubcontents?.map((subcontent) => {
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
                        )} */}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
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
