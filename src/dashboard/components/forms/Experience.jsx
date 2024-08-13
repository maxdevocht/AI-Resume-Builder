import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import GlobalApi from "/service/GlobalApi";
import { useParams } from "react-router-dom";

const formField = {
  title: "",
  companyName: "",
  city: "",
  state: "",
  startDate: "",
  endDate: "",
  workSummary: "",
};

const Experience = () => {
  const [experienceList, setExperienceList] = useState([formField]);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("resumeInfo:", resumeInfo);
    console.log("resumeInfo.Experience:", resumeInfo?.Experience);
    if (resumeInfo?.Experience && resumeInfo.Experience.length > 0) {
      setExperienceList(resumeInfo.Experience);
    }
  }, [resumeInfo]);

  const handleChange = (index, e) => {
    const newEntries = experienceList.slice();
    const { name, value } = e.target;
    newEntries[index][name] = value;
    console.log(newEntries);
    setExperienceList(newEntries);
  };

  const addNewExperience = () => {
    setExperienceList([...experienceList, formField]);
  };

  const removeExperience = () => {
    setExperienceList((experienceList) => experienceList.slice(0, -1));
  };

  const onSave = () => {
    setLoading(true);
    const data = {
      data: {
        Experience: experienceList.map(({ id, ...rest }) => rest),
      },
    };

    console.log(experienceList);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      (res) => {
        console.log(res);
        setLoading(false);
        toast("Details updated !");
      },
      (error) => {
        setLoading(false);
      }
    );
  };

  const handleRichtextEditor = (e, name, index) => {
    const newEntries = experienceList.slice();
    newEntries[index][name] = e.target.value;
    setExperienceList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      experience: experienceList,
    });
  }, [experienceList]);

  return (
    <div>
      <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
        <h2 className="font-bold text-lg">Professional Experience</h2>
        <p>Add your previous job experience</p>

        <div>
          {experienceList.map((item, index) => (
            <div key={index}>
              <div className="grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg">
                <div>
                  <label htmlFor="" className="text-xs">
                    Position Title
                  </label>
                  <Input
                    value={item.title}
                    name="title"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    Company Name
                  </label>
                  <Input
                    value={item.companyName}
                    name="companyName"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    City
                  </label>
                  <Input
                    value={item.city}
                    name="city"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    State
                  </label>
                  <Input
                    value={item.state}
                    name="state"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    Start Date
                  </label>
                  <Input
                    type="date"
                    value={item.startDate}
                    name="startDate"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div>
                  <label htmlFor="" className="text-xs">
                    End Date
                  </label>
                  <Input
                    type="date"
                    value={item.endDate}
                    name="endDate"
                    onChange={(e) => handleChange(index, e)}
                  />
                </div>
                <div className="col-span-2">
                  <RichTextEditor
                    index={index}
                    defaultValue={item?.workSummery}
                    onRichTextEditorChange={(e) =>
                      handleRichtextEditor(e, "workSummary", index)
                    }
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between">
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="text-primary"
                onClick={addNewExperience}
              >
                + Add More Experience
              </Button>
              <Button
                variant="outline"
                className="text-primary"
                onClick={removeExperience}
              >
                - Remove
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
