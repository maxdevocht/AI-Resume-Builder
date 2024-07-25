import { CirclePlusFill } from "akar-icons";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

const AddResume = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState();

  const onCreate = () => {
    const uuid = uuidv4();
  };

  return (
    <div>
      <div
        className="p-40 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <CirclePlusFill />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title</p>
              <Input
                className="my-2"
                placeholder="Job title"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle} onClick={onCreate()}>
                Create
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
