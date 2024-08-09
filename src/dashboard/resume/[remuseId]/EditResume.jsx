import FormSection from "@/dashboard/components/FormSection";
import ResumePreview from "@/dashboard/components/ResumePreview";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditResume = () => {
  const params = useParams();

  useEffect(() => {
    console.log(params.resumeId);
  }, []);

  return (
    <div className="grid grid-cols-1 mg:grid-cols-2 p-10 gap-10">
      <FormSection />
      <ResumePreview />
    </div>
  );
};

export default EditResume;
