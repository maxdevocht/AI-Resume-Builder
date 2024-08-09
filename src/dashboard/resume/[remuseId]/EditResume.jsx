import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import FormSection from "@/dashboard/components/FormSection";
import ResumePreview from "@/dashboard/components/previews/ResumePreview";
import dummy from "@/data/dummy";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EditResume = () => {
  const params = useParams();

  const [resumeInfo, setResumeInfo] = useState();

  useEffect(() => {
    setResumeInfo(dummy);
  }, []);

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
};

export default EditResume;
