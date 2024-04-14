import CenterFull from "~/components/buildingBlocks/centerFull";
import { motion } from "framer-motion";

export default function Test() {
  return (
    <CenterFull className="relative">
      {/* <Box
          className={`${position} hover:cursor-pointer shadowBroadLooser border-970-md rounded-[2vh]`}
          onClick={() => setModalOpen(true)}
        > */}
      <motion.div
        whileHover={{
          scale: 1.2,
          rotate: -5,
          transition: { duration: 0.3 },
        }}
        whileTap={{
          rotate: 5,
          scale: 0.85,
          transition: { duration: 0.3 },
        }}
        className="w-[70vh] rounded-[2vh] hover:cursor-pointer z-10 bg-red-300"
      >
        Image
        {/* <Image
              src={imageLink}
              alt={title}
              className="w-full h-full  rounded-[1.8vh]"
            /> */}
      </motion.div>
      {/* </Box> */}
    </CenterFull>
  );
}
