import TransitionFullScreen from "~/components/buildingBlocks/transitionFullScreen";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HorizontalParallaxCarousel from "~/components/specialty/horizontalParallaxCarousel";
import DemoNav from "./components/demoNav";

export default function HorizontalParallaxCarouselPage() {
  const images = [
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
    `https://picsum.photos/seed/${
      Math.floor(Math.random() * 100) + 1
    }/1000/1000`,
  ];
  return (
    <TransitionFullScreen>
      <DemoNav heading="Horizontal Parallax Carousel 😍" />
      <FlexFull>
        <VStackFull className="pt-[10vh]">
          <FlexFull className="overflow-x-auto">
            <HorizontalParallaxCarousel
              images={images}
              height="h-[70vh] md:h-[80vh]"
              includeModal
            />
          </FlexFull>
        </VStackFull>
      </FlexFull>
    </TransitionFullScreen>
  );
}
