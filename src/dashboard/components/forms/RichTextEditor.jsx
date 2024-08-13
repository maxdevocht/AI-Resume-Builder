import { Button } from "@/components/ui/button";
import { ResumeInfoContext } from "@/context/ResumeInfoContext";
import { LoaderCircle, Sparkles } from "lucide-react";
import React, { useContext, useState } from "react";
import {
  EditorProvider,
  Editor,
  Toolbar,
  BtnBold,
  BtnItalic,
  BtnStrikeThrough,
  BtnUnderline,
  Separator,
  BtnNumberedList,
  BtnBulletList,
  BtnLink,
} from "react-simple-wysiwyg";
import { AIChatSession } from "/service/AIModel";
import { toast } from "sonner";

const PROMPT =
  "position title: {positionTitle} , Depends on position title give me 5-7 bullet points for my experience in resume (Please do not add experience level and No JSON array) , give me result in HTML tags";

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const generateSummaryFromAI = async () => {
    if (
      !resumeInfo.experience ||
      !resumeInfo.experience[index] ||
      !resumeInfo.experience[index].title
    ) {
      toast("Please Add Position Title");
      return;
    }

    setLoading(true);
    try {
      const prompt = PROMPT.replace(
        "{positionTitle}",
        resumeInfo.experience[index].title
      );

      const result = await AIChatSession.sendMessage(prompt);

      // Await and process the response
      const resp = await result.response.text();

      // Remove unwanted brackets from the response
      setValue(resp.replace("[", "").replace("]", ""));
    } catch (error) {
      // Handle any errors that occur during the API call
      console.error("Error generating summary:", error);
      toast("Google Gemini AI is not available in your Country.");
    } finally {
      // Always set loading to false in the finally block
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label htmlFor="" className="text-xs">
          Summary
        </label>
        <Button
          onClick={generateSummaryFromAI}
          variant="outline"
          size="sm"
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Sparkles className="h-5 w-5" />
              Generate from AI
            </>
          )}
        </Button>
      </div>
      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
