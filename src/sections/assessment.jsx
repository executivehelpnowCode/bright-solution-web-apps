import { useEffect, useState } from "react";
import Button from "../components/button";
import { assessmentQuestions } from "../ constants";
import Input from "../components/input";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Confetti from "react-confetti-boom";

export default function Assessment({ setOpenModal }) {
  const [result, setResult] = useState(null);

  const [asssessmentForm, setAsssessmentForm] = useState(
    assessmentQuestions.map((q) => ({
      id: q.id,
      grade: null,
      description: null,
    }))
  );

  const handleSubmitAssessment = () => {
    // Extract grades from the assessmentForm
    const grades = asssessmentForm.map((item) => item.grade);

    // Check if any grade is null or not selected
    if (grades.some((grade) => grade === null)) {
      alert("Please answer all questions.");
      return;
    }

    console.log("Grades:", grades);

    // Calculate average
    const avg =
      grades.reduce((acc, val) => acc + Number(val), 0) / grades.length;

    let innovation = "";
    let ai = "";

    if (avg >= 1 && avg < 2) {
      innovation = "Level 1: Basic Digital";
      ai = "Exploring";
    } else if (avg >= 2 && avg < 3) {
      innovation = "Level 2: Connected";
      ai = "Planning";
    } else if (avg >= 3 && avg < 4) {
      innovation = "Level 3: Integrated";
      ai = "Implementing";
    } else if (avg >= 4 && avg < 5) {
      innovation = "Level 4: Intelligence Driven";
      ai = "Scaling";
    } else if (avg === 5) {
      innovation = "Level 5: Transformed";
      ai = "Embedded";
    }

    setResult({
      average: avg.toFixed(1),
      innovation,
      ai,
    });
  };

  const handleAnswerSelect = (assessmentId, grade, answer) => {
    setAsssessmentForm((prev) =>
      prev.map((item) =>
        item.id === assessmentId
          ? { ...item, grade: grade, description: answer }
          : item
      )
    );
  };

  useEffect(() => {
    console.clear();
    console.table(asssessmentForm);
  }, [asssessmentForm]);

  return (
    <div className="bg-white p-6 rounded-xl shadow-xl w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-red-900">
          Innovation & AI Readiness Assessment
        </h2>
        <Button
          className="h-7  text-white"
          onClick={setOpenModal.bind(this, false)}
          color="crimson"
        >
          <X size={24} />
        </Button>
      </div>

      {/* Old Jsx here */}
      {/* Old Jsx here */}

      {assessmentQuestions?.map((assessment) => {
        const assessmentOptions = assessment.options.map((option) => ({
          id: option?.id,
          name: option?.text,
        }));

        return (
          <div className="flex flex-col gap-10 my-2">
            <div
              key={assessment.id}
              className="font-semibold text-gray-800"
            ></div>
            <div>
              <Input
                name={assessment.question}
                type="combobox"
                label={`Question ${assessment.id}: ${assessment.question}`}
                placeholder="Select answer..."
                options={assessmentOptions}
                value={
                  asssessmentForm.find((item) => item.id === assessment.id)
                    ?.description || ""
                }
                onOptionSelect={(option) => {
                  handleAnswerSelect(assessment.id, option.id, option.name);
                }}
              />
            </div>
          </div>
        );
      })}

      {/* SUBMIT */}
      <Button
        className="h-12 text-white w-full mt-5"
        onClick={handleSubmitAssessment}
        color="crimson"
      >
        Submit Assessment
      </Button>
      {/* RESULTS */}
      {result && (
        <AnimatePresence>
          <motion.div
            key="assessment-result"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duraion: 0.5 }}
          >
            <div className="flex bg-gray-100 p-4 rounded-lg items-center justify-between mt-5">
              <div className="flex flex-col">
                <p className="mt-2 flex flex-col">
                  <span className="font-bold">Innovation Maturity</span>
                  <span>{result.innovation}</span>
                </p>

                <p className="mt-2 flex flex-col">
                  <span className="font-bold">AI Readiness</span>
                  <span> {result.ai}</span>
                </p>
              </div>

              <div
                className={`
              ${
                result.average >= 4 && result.average <= 5
                  ? " bg-green-700 "
                  : ""
              },
              ${
                result.average >= 3 && result.average < 4
                  ? " bg-orange-400 "
                  : ""
              },
               ${
                 result.average >= 1 && result.average < 3
                   ? " bg-crimson-900 "
                   : ""
               }, w-32 h-28 shadow-md font-semibold flex flex-col items-center justify-center text-white rounded-lg`}
              >
                {result.average == 5 && (
                  <div className=" z-10">
                    <Confetti mode="boom" particleCount={150} />
                  </div>
                )}
                <span>Your average</span>
                <span className=" text-5xl font-extrabold">
                  {result.average}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
