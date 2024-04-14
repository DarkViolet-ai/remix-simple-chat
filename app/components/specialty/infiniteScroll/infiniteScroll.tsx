import { useEffect, useState, useRef } from "react";
import Wrap from "~/components/buildingBlocks/wrap";
import Flex from "~/components/buildingBlocks/flex";
import { Item, LoadingBar, TestBox } from "./inifiniteScrollDemoComponents";
import Text from "~/components/buildingBlocks/text";
import HStack from "~/components/buildingBlocks/hStack";
import BouncingDots from "~/components/specialty/bouncingDots";
import { HomeIcon, ReturnPathIcon } from "styles";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStackFull from "~/components/buildingBlocks/hStackFull";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";

// Simulates fetching items from an API
const fetchItems = (startIndex: number, limit: number = 20): Item[] => {
  return Array.from({ length: limit }, (_, index) => ({
    id: startIndex + index,
    text: `Item ${startIndex + index}`,
  }));
};

export default function InfiniteScroll() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Initially load some items
    setItems(fetchItems(0));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = Number(entry.target.getAttribute("data-id"));

          setVisibleItems((prevVisibleItems) => {
            const updatedVisibleItems = new Set(prevVisibleItems);
            if (entry.isIntersecting) {
              updatedVisibleItems.add(id);
            } else {
              updatedVisibleItems.delete(id);
            }
            return updatedVisibleItems;
          });
        });
      },
      {
        rootMargin: "0px",
        threshold: 0.1, // Adjust based on when you consider the item to be visible
      }
    );

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      itemRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [items]);

  // Log the array of currently visible items
  useEffect(() => {
    console.log(
      "Visible Items:",
      Array.from(visibleItems).map((id) => `${id}`)
    );
  }, [visibleItems]); // This useEffect is specifically for logging

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true);
          setTimeout(() => {
            setItems((prevItems) => {
              const newItems = [...prevItems, ...fetchItems(prevItems.length)];
              itemRefs.current = itemRefs.current
                .slice(0, prevItems.length)
                .concat(
                  new Array(newItems.length - prevItems.length).fill(null)
                );
              return newItems;
            });
            setLoading(false);
          }, 2500); // Simulate network delay
        }
      },
      {
        rootMargin: "100px",
      }
    );

    // Target element for observing
    const target = document.querySelector("#scroll-down-trigger");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [loading]);

  return (
    <>
      <Flex className="fixed top-0 left-0 h-[6vh] bg-100-radial1op75 rounded-none text-col-900 w-full text-center shadowNarrowTight justify-center items-center gap-[2vh]">
        <HStack className="w-fit absolute top-[0.7vh] left-[1vh] flex-shrink-0">
          <NavIconButton icon={HomeIcon} to="/" />
          <NavIconButton icon={ReturnPathIcon} to="/design/components" />
        </HStack>
        <HStackFull className="h-full justify-center items-center">
          <Flex className="w-35% justify-end boldTextGlow ">
            <Text className="text-md-tighter">Intersection Observer - </Text>
          </Flex>
          <Flex className="w-65% text-left items-end">
            <Text className="text-md-tight lightTextShadow font-semibold h-full">
              items: {Array.from(visibleItems).map((id) => `${id} | `)}
            </Text>
          </Flex>
        </HStackFull>
      </Flex>
      <Wrap className="justify-around items-start gap-5vh px-[2vh] pt-[7vh] gap-y-[1vh] h-[100vh] overflow-y-auto bg-100-linear6op75">
        {items.map((item, index) => (
          <TestBox item={item} itemRefs={itemRefs} index={index} key={index} />
        ))}
        {!loading && (
          <div id="scroll-down-trigger" style={{ height: "20px" }} />
        )}
        <FlexFull className="justify-center pb-[2vh]">
          <LoadingBar>
            {loading && (
              <HStack>
                <Text className="text-lg-tight">Loading more items...</Text>
                <BouncingDots />
              </HStack>
            )}
          </LoadingBar>
        </FlexFull>
      </Wrap>
    </>
  );
}
