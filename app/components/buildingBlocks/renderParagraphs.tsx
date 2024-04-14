import Flex from "./flex";
import Text from "./text";
import VStack from "./vStack";

interface RenderParagraphsProps {
  textItem?: string | number | readonly string[] | undefined;
  paragraphWidth?: string;
  textClassName?: string;
  paragraphClassName?: string;
  containerClassName?: string;
  paragraphSpacing?: string;
}

export default function RenderParagraphs({
  textItem,
  paragraphWidth = "w-full",
  textClassName = "",
  paragraphClassName = "",
  containerClassName = "",
  paragraphSpacing = "gap-[1vh]",
}: RenderParagraphsProps) {
  const textItemString = textItem as string;
  const paragraphs = textItemString.split("\n");
  return (
    <VStack className={`${paragraphSpacing} ${containerClassName}`}>
      {paragraphs.map((paragraph: string, index: number) => (
        <Flex key={index} className={`${paragraphWidth} ${paragraphClassName}`}>
          <Text className={`${textClassName}`}>{paragraph.trim()}</Text>
        </Flex>
      ))}
    </VStack>
  );
}
