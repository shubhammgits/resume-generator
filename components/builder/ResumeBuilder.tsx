"use client";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import toast from "react-hot-toast";
import { STEPS } from "@/constants/steps";
import { sanitizeFileName } from "@/lib/utils";
import { useStepValidation } from "@/hooks/useStepValidation";
import { generatePDF } from "@/components/pdf/generatePDF";
import ResumePDFRenderer from "@/components/pdf/ResumePDFRenderer";
import ThreeBackground from "@/components/layout/ThreeBackground";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StepProgress from "@/components/builder/StepProgress";
import FormNavigation from "@/components/builder/FormNavigation";
import Step1PersonalInfo from "@/components/builder/steps/Step1PersonalInfo";
import Step2Education from "@/components/builder/steps/Step2Education";
import Step3Summary from "@/components/builder/steps/Step3Summary";
import Step4Experience from "@/components/builder/steps/Step4Experience";
import Step5Projects from "@/components/builder/steps/Step5Projects";
import Step6Skills from "@/components/builder/steps/Step6Skills";
import Step7Certifications from "@/components/builder/steps/Step7Certifications";
import Step8Extras from "@/components/builder/steps/Step8Extras";
import ResumePreview from "@/components/preview/ResumePreview";
import MobilePreviewOverlay from "@/components/preview/MobilePreviewOverlay";
import ResetConfirmModal from "@/components/modals/ResetConfirmModal";
import SuccessModal from "@/components/modals/SuccessModal";
import { Button } from "@/components/ui/button";
import { useResumeStore } from "@/store/resumeStore";

const STEP_PREFIX_MAP: Record<number, string> = {
  2: "education",
  4: "experience",
  5: "projects",
  7: "certifications"
};

function toDomErrorField(step: number, errorPath: string | null): string | null {
  if (!errorPath) return null;
  if (/^\d+\./.test(errorPath)) {
    const prefix = STEP_PREFIX_MAP[step];
    return prefix ? `${prefix}.${errorPath}` : errorPath;
  }
  return errorPath;
}

export default function ResumeBuilder() {
  const state = useResumeStore();
  const {
    currentStep,
    setCurrentStep,
    resetAll,
    personal,
    education,
    summary,
    hasExperience,
    experience,
    projects,
    skills,
    hasCertifications,
    certifications,
    hasExtras,
    extras
  } = state;

  const [direction, setDirection] = useState(1);
  const [errorMap, setErrorMap] = useState<Record<string, string>>({});
  const [shake, setShake] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [showRestoreBanner, setShowRestoreBanner] = useState(false);

  const { validateStep } = useStepValidation(state);

  useEffect(() => {
    const hasStoredData =
      typeof window !== "undefined" && window.localStorage.getItem("resume-builder-v1") !== null;
    setShowRestoreBanner(hasStoredData);
  }, []);

  const previewData = useMemo(() => state, [state]);

  const validateAndMoveNext = () => {
    const result = validateStep(currentStep);
    if (!result.valid) {
      setErrorMap(result.errorMap);
      setShake(true);
      window.setTimeout(() => setShake(false), 320);
      const domField = toDomErrorField(currentStep, result.firstErrorPath);
      if (domField) {
        const element = document.querySelector(`[data-field='${domField}']`) as HTMLElement | null;
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      toast.error("Please fix highlighted fields before continuing.");
      return;
    }

    setErrorMap({});
    setDirection(1);
    setCurrentStep(currentStep + 1);
  };

  const goBack = () => {
    setDirection(-1);
    setCurrentStep(currentStep - 1);
    setErrorMap({});
  };

  const forceGenerate = async () => {
    const validationChecks = Array.from({ length: STEPS.length }, (_, index) => validateStep(index + 1));
    const firstInvalidIndex = validationChecks.findIndex((check) => !check.valid);

    if (firstInvalidIndex !== -1) {
      const stepNumber = firstInvalidIndex + 1;
      setCurrentStep(stepNumber);
      setDirection(stepNumber < currentStep ? -1 : 1);
      setErrorMap(validationChecks[firstInvalidIndex].errorMap);
      toast.error(`Step ${stepNumber} needs attention before PDF generation.`);
      return;
    }

    try {
      setIsGenerating(true);
      const fileName = `${sanitizeFileName(personal.fullName)}-Resume.pdf`;
      await generatePDF("resume-pdf-target", fileName);
      setShowSuccessModal(true);
      toast.success("Resume PDF generated successfully!");
    } catch (error) {
      const message = error instanceof Error ? error.message : "Failed to generate PDF";
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  const renderStep = () => {
    if (currentStep === 1) return <Step1PersonalInfo externalErrors={errorMap} shake={shake} />;
    if (currentStep === 2) return <Step2Education externalErrors={errorMap} shake={shake} />;
    if (currentStep === 3) return <Step3Summary externalErrors={errorMap} shake={shake} />;
    if (currentStep === 4) return <Step4Experience externalErrors={errorMap} shake={shake} />;
    if (currentStep === 5) return <Step5Projects externalErrors={errorMap} shake={shake} />;
    if (currentStep === 6) return <Step6Skills shake={shake} />;
    if (currentStep === 7) return <Step7Certifications externalErrors={errorMap} shake={shake} />;
    return (
      <Step8Extras
        externalErrors={errorMap}
        shake={shake}
        onGenerate={forceGenerate}
        loading={isGenerating}
      />
    );
  };

  return (
    <>
      <ThreeBackground />
      <div className="min-h-screen">
        <Navbar
          currentStep={currentStep}
          onOpenReset={() => setShowResetModal(true)}
          onOpenMobilePreview={() => setShowMobilePreview(true)}
        />

        <StepProgress
          currentStep={currentStep}
          onSelectStep={(step) => {
            if (step <= currentStep) {
              setDirection(step > currentStep ? 1 : -1);
              setCurrentStep(step);
            }
          }}
        />

        <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 lg:grid-cols-[55%_45%]">
          <section className="px-4 pb-8 pt-[120px] md:px-6">
            <div className="mx-auto w-full max-w-[680px]">
              <AnimatePresence>
                {showRestoreBanner ? (
                  <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    className="mb-4 flex items-center justify-between rounded-xl border border-accent/30 bg-accent/15 px-4 py-3 text-sm"
                  >
                    <span>📂 Resume data restored from last session</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        resetAll();
                        window.localStorage.removeItem("resume-builder-v1");
                        setShowRestoreBanner(false);
                        toast.success("Started fresh.");
                      }}
                    >
                      Start Fresh
                    </Button>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  initial={{ x: direction > 0 ? 40 : -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: direction > 0 ? -40 : 40, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderStep()}
                </motion.div>
              </AnimatePresence>

              <FormNavigation
                currentStep={currentStep}
                totalSteps={STEPS.length}
                loading={isGenerating}
                onBack={goBack}
                onNext={validateAndMoveNext}
                onGenerate={forceGenerate}
              />
            </div>
          </section>

          <div className="sticky top-0 hidden h-screen overflow-hidden lg:block">
            <ResumePreview data={previewData} onDownload={forceGenerate} />
          </div>
        </div>

        <Footer />
      </div>

      <MobilePreviewOverlay open={showMobilePreview} onClose={() => setShowMobilePreview(false)} onDownload={forceGenerate}>
        <div style={{ background: "#fff", padding: "16px" }}>
          <ResumePreview data={previewData} onDownload={forceGenerate} />
        </div>
      </MobilePreviewOverlay>

      <ResumePDFRenderer
        data={{
          ...state,
          currentStep,
          personal,
          education,
          summary,
          hasExperience,
          experience,
          projects,
          skills,
          hasCertifications,
          certifications,
          hasExtras,
          extras
        }}
      />

      <ResetConfirmModal
        open={showResetModal}
        onClose={() => setShowResetModal(false)}
        onConfirm={() => {
          resetAll();
          window.localStorage.removeItem("resume-builder-v1");
          setShowRestoreBanner(false);
          toast.success("All resume data cleared.");
        }}
      />

      <SuccessModal open={showSuccessModal} onClose={() => setShowSuccessModal(false)} onDownloadAgain={forceGenerate} />
    </>
  );
}
