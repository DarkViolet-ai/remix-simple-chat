import Wrap from "../wrap";
import TagBadge from "./tagBadge";

export default function TagsWrap({
  tags,
  overflowY = "overflow-y-auto",
  p = "p-[1vh] pb-[2vh]",
  gap = "gap-x-[1vh] gap-y-[0.2vh]",
  className = "",
}: {
  tags: string[];
  overflowY?: string;
  className?: string;
  p?: string;
  gap?: string;
}) {
  return (
    <Wrap
      className={`${overflowY} overflow-x-hidden justify-start ${p} ${gap} ${className}`}
    >
      {!tags ? (
        <TagBadge tag="No tags" index={0} className="px-[0.3vh] pb-[0.2vh]" />
      ) : (
        tags.map((tag, index) => (
          <TagBadge
            key={index}
            tag={tag}
            index={index}
            className="px-[0.3vh] pb-[0.2vh]"
          />
        ))
      )}
    </Wrap>
  );
}
