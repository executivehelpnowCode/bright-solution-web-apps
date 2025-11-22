import Input from "../components/input";
import Button from "../components/button";
import { useEffect, useState } from "react";
import { pillars } from "../constants";

export default function Filters({
  onFiltersChange = () => {},
  onFiltersClear = () => {},
}) {
  const [filterForm, setFilterForm] = useState({
    search: "",
    pillars: "",
    types: "",
    levels: "",
  });

  const [typeOptions, setTypeOptions] = useState([]);
  const [levelOptions, setLevelOptions] = useState([]);

  // Update parent component whenever filters change
  useEffect(() => {
    onFiltersChange({
      search: filterForm.search,
      pillar: filterForm.pillars,
      type: filterForm.types,
      level: filterForm.levels,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterForm]);

  const handleResetFilters = () => {
    onFiltersClear();
    setFilterForm({
      search: "",
      pillars: "",
      types: "",
      levels: "",
    });
    setTypeOptions([]);
    setLevelOptions([]);
  };

  const pillarOptions = pillars.map((pillar) => ({
    id: pillar?.id,
    name: pillar?.title,
  }));

  return (
    <div className="flex items-center justify-center bg-gray-100 w-full">
      <div className="lg:w-9/12 w-full px-6 flex py-12 mt-6 gap-x-3 gap-y-10 lg:flex-row flex-col">
        {/* SEARCH */}
        <Input
          name="search"
          type="text"
          label="Search"
          placeholder={"Search resources"}
          value={filterForm.search || ""}
          onInputChange={(value) => {
            setFilterForm((prev) => ({ ...prev, search: value }));
          }}
          onInputClear={handleResetFilters}
        />

        {/* PILLARS DROPDOWN */}
        <Input
          name="pillars"
          type="combobox"
          label="Pillars"
          placeholder={"All pillars"}
          options={pillarOptions || []}
          value={filterForm.pillars || ""}
          onOptionSelect={(option) => {
            const selectedPillar = pillars.find(
              (p) => p.title === option.name
            );

            setTypeOptions(
              selectedPillar?.subcontents?.map((sub) => ({
                id: sub.id,
                name: sub.title,
              })) || []
            );

            setLevelOptions([]);

            setFilterForm((prev) => ({
              ...prev,
              pillars: option.name,
              types: "",
              levels: "",
            }));
          }}
          onInputClear={handleResetFilters}
        />

        {/* TYPES DROPDOWN */}
        <Input
          name="types"
          type="combobox"
          label="Types"
          options={typeOptions}
          placeholder={"All types"}
          value={filterForm.types || ""}
          onOptionSelect={(option) => {
            const selectedPillar = pillars.find(
              (p) => p.title === filterForm.pillars
            );

            const selectedType = selectedPillar?.subcontents?.find(
              (t) => t.title === option.name
            );

            if (selectedType?.items?.length > 0) {
              setLevelOptions(
                selectedType.items.map((lvl) => ({
                  id: lvl.id,
                  name: lvl.title,
                }))
              );
            } else {
              setLevelOptions([]);
            }

            setFilterForm((prev) => ({
              ...prev,
              types: option.name,
              levels: "",
            }));
          }}
          onInputClear={handleResetFilters}
        />

        {/* LEVELS DROPDOWN */}
        <Input
          name="levels"
          type="combobox"
          label="Levels"
          options={levelOptions}
          placeholder={"All levels"}
          value={filterForm.levels || ""}
          onOptionSelect={(option) =>
            setFilterForm((prev) => ({
              ...prev,
              levels: option.name,
            }))
          }
          onInputClear={handleResetFilters}
        />

        <Button
          className="h-11 text-white"
          onClick={handleResetFilters}
          color="crimson"
        >
          Reset
        </Button>
      </div>
    </div>
  );
}