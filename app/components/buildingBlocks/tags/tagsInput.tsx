import {
  useState,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import VStack from "../vStack";
import Input from "../input";
import Flex from "../flex";
import Wrap from "../wrap";
import TagBadge from "./tagBadge";
import HStack from "../hStack";
import Button from "../button";
import Heading from "../headingText";

interface TagsInputProps {
  onTagsChange: (tags: string[]) => void;
  wrapHeight?: string;
  tags: string[];
}

export default function TagsInput({
  onTagsChange,
  tags,
  wrapHeight = "h-full max-h-[15vh]",
}: TagsInputProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [localTags, setLocalTags] = useState<string[]>(tags); // initialize with external tags

  // Effect to sync external tags with local state
  useEffect(() => {
    setLocalTags(tags);
  }, [tags]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    // Check if the 'Enter' key was pressed
    if (event.key === "Enter") {
      // Prevent the default action to stop the form from being submitted
      event.preventDefault();

      // Only proceed if there's text entered (not just whitespace)
      if (inputValue.trim()) {
        // Check if the tag is not already included
        if (!localTags.includes(inputValue)) {
          const newTags = [inputValue, ...localTags];
          setLocalTags(newTags);
          onTagsChange(newTags); // send the new tags back to the parent component
        }
        // Clear the input field
        setInputValue("");
      }
    }
  };

  const handleAddTag = () => {
    // Only proceed if there's text entered (not just whitespace)
    if (inputValue.trim()) {
      // Check if the tag is not already included
      if (!localTags.includes(inputValue)) {
        const newTags = [inputValue, ...localTags];
        setLocalTags(newTags);
        onTagsChange(newTags); // send the new tags back to the parent component
      }
      // Clear the input field
      setInputValue("");
    }
  };

  const removeTag = (index: number) => {
    const newTags = localTags.filter((_, idx) => idx !== index);
    setLocalTags(newTags);
    onTagsChange(newTags);
  };

  return (
    <VStack className={`w-full`}>
      <VStack className={`w-full h-full text-gray-100 gap-[1vh]`} align="start">
        <HStack className="w-full items-center">
          <Input
            value={inputValue}
            placeholder="Add tags"
            onKeyDown={handleInputKeyDown}
            onChange={handleInputChange}
          />
          <Button
            width="w-fit"
            onClick={handleAddTag}
            buttonText="Add"
            type="smallNormal"
          />
        </HStack>
        <Flex
          className={`w-full overflow-y-auto overflow-x-hidden insetShadowMd inputStyles ${wrapHeight}`}
        >
          <Wrap
            className={`w-full h-full gap-x-[1vh] gap-y-[1vh] justify-start p-[1vh]`}
          >
            {localTags.length === 0 && (
              <Flex className={`text-sm h-fit w-fit textShadow`}>
                <Heading text="There are currently no tags." />
              </Flex>
            )}
            {localTags.map((tag, index) => (
              <TagBadge
                key={index}
                tag={tag}
                onClick={removeTag}
                index={index}
                bgColor="bg-col-200"
                // bgColor={tagColors[index % tagColors.length]}
              />
            ))}
          </Wrap>
        </Flex>
      </VStack>
    </VStack>
  );
}
