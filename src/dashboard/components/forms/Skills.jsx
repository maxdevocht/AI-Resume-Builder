import { Input } from "@/components/ui/input";
import React, { useContext, useEffect, useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import GlobalApi from "/service/GlobalApi";
import { LoaderCircle } from "lucide-react";

const Skills = () => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  //   const [loading, setLoading] = useState(false);
  const [skillsList, setSkillsList] = useState([
    {
      name: "",
      rating: 0,
    },
  ]);

  const addNewSkills = () => {
    setSkillsList([
      ...skillsList,
      {
        name: "",
        rating: 0,
      },
    ]);
  };
  const removeSkills = () => {
    setSkillsList((skillsList) => skillsList.slice(0, -1));
  };

  const handleChange = (index, name, value) => {
    const newEntries = skillsList.slice();
    newEntries[index][name] = value;
    setSkillsList(newEntries);
  };

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      skills: skillsList,
    });
  }, [skillsList]);

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Skills</h2>
      <p>Add your skills</p>

      <div>
        {skillsList.map((item, index) => (
          <div className="flex justify-between border rounded-lg p-3 my-5">
            <div>
              <label htmlFor="" className="text-xs">
                Name
              </label>
              <Input
                className="w-full"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <Rating
              style={{ maxWidth: 120 }}
              value={item.rating}
              onChange={(v) => handleChange(index, "rating", v)}
            />
          </div>
        ))}
        <div className="flex justify-between">
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="text-primary"
              onClick={addNewSkills}
            >
              + Add More Skills
            </Button>
            <Button
              variant="outline"
              className="text-primary"
              onClick={removeSkills}
            >
              - Remove
            </Button>
          </div>
          {/* <Button disabled={loading} onClick={() => onSave()}>
            {loading ? <LoaderCircle className="animate-spin" /> : "Save"}
          </Button> */}
        </div>
      </div>
    </div>
  );
};

export default Skills;
