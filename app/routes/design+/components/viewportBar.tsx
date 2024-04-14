import HStackFull from "~/components/buildingBlocks/hStackFull";
import Text from "~/components/buildingBlocks/text";
import {
  GetGalleryRowHeight,
  useWindowSize,
} from "~/utils/viewportCalculation";

export default function ViewportBar() {
  const { width } = useWindowSize();
  const { viewportWidth, itemsPerRow } = GetGalleryRowHeight(width);

  return (
    <HStackFull
      className="fixed z-50 bottom-0 right-0  bg-col-980 rounded-none text-col-100 text-xs-normal md:text-lg xl:text-xl justify-around px-[1vh]"
      gap="gap-[2vh]"
    >
      <Text>window width: {viewportWidth}px</Text>
      {/* <Text>row height: {rowHeight}px</Text> */}
      <Text>items per row: {itemsPerRow}</Text>
    </HStackFull>
  );
}
