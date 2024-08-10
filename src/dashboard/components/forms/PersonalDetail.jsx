import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import React, { useContext } from "react";

const PersonalDetail = ({ enableNext }) => {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = (e) => {
    enableNext(false);
    e.preventDefault();
    enableNext(true);
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Personal Details</h2>
      <p>Get started with the basic information</p>

      <form action="" onSubmit={onSave}>
        <div className="grid grid-cols-2 mt-5 gap-3">
          <div>
            <label htmlFor="" className="text-sm">
              First Name
            </label>
            <Input name="firstName" required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Last Name
            </label>
            <Input name="lastName" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label htmlFor="" className="text-sm">
              Job Title
            </label>
            <Input name="jobTitle" required onChange={handleInputChange} />
          </div>
          <div className="col-span-2">
            <label htmlFor="" className="text-sm">
              Address
            </label>
            <Input name="address" required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Phone
            </label>
            <Input name="phone" required onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="" className="text-sm">
              Email
            </label>
            <Input name="email" required onChange={handleInputChange} />
          </div>
        </div>
        <div className="mt-3 flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetail;
