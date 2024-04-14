import { FaUserPlus } from "react-icons/fa";
import { HomeIcon, ReturnPathIcon } from "styles";
import TransitionFull from "~/components/buildingBlocks/TransitionFull";
import CenterFull from "~/components/buildingBlocks/centerFull";
import FlexFull from "~/components/buildingBlocks/flexFull";
import HStack from "~/components/buildingBlocks/hStack";
import Heading from "~/components/buildingBlocks/headingText";
import NavContainer from "~/components/buildingBlocks/navContainer";
import NavIconButton from "~/components/buildingBlocks/navLinkIconButton";
import Table from "~/components/buildingBlocks/table";
import VStackFull from "~/components/buildingBlocks/vStackFull";
import AnimatedInPlaceText from "~/components/specialty/animateInPlaceText";
import GradientBorderFull from "~/components/specialty/gradientBorderFullPage";
import FormatDate from "~/utils/formatDate";

const userData = [
  { email: "user1@example.com", name: "User 1", created: "2023-06-01" },
  { email: "user2@example.com", name: "User 2", created: "2023-05-15" },
  { email: "user3@example.com", name: "User 3", created: "2023-06-05" },
  { email: "user4@example.com", name: "User 4", created: "2023-05-20" },
  { email: "user5@example.com", name: "User 5", created: "2023-06-10" },
  { email: "user6@example.com", name: "User 6", created: "2023-05-25" },
  { email: "user7@example.com", name: "User 7", created: "2023-06-15" },
  { email: "user8@example.com", name: "User 8", created: "2023-05-30" },
  { email: "user9@example.com", name: "User 9", created: "2023-06-20" },
  { email: "user10@example.com", name: "User 10", created: "2023-06-01" },
  { email: "user11@example.com", name: "User 11", created: "2023-05-15" },
  { email: "user12@example.com", name: "User 12", created: "2023-06-05" },
];

const userColumns = [
  { title: "Email", dataIndex: "email" },
  { title: "Name", dataIndex: "name" },
  {
    title: "Created",
    dataIndex: "created",
    render: (value: string) => <FormatDate inputDate={value} />,
  },
];

export default function Test() {
  const handleRemoveUser = (user) => {
    console.log("Removing user:", user.name);
    // Here you would add logic to remove the user, e.g., calling an API
  };

  const handleAddAdmin = (user) => {
    console.log("Adding admin:", user.name);
    // Here you would add logic to make the user an admin, e.g., calling an API
  };

  return (
    <TransitionFull className="relative">
      <NavContainer bg="bg-col-990" className="h-[8vh]">
        <HStack className="w-fit pl-[2vh] flex-shrink-0">
          <NavIconButton icon={HomeIcon} to="/" />
          <NavIconButton icon={ReturnPathIcon} to="/design/components" />
        </HStack>
        <FlexFull className="justify-center pl-[6vh]">
          <Heading
            text="Sortable Table Demo"
            layout="text-xl-loose sm:text-xxl-loose md:text-xxxl-loose "
            color="text-col-100"
            className="text-stroke-5-100"
          />
        </FlexFull>
      </NavContainer>
      <CenterFull className="relative px-[1.5vh] pt-[6vh]">
        <GradientBorderFull
          className="relative mainInset"
          gradientBorder="bg-300-linear2op75"
          innerBg="bg-100-linear6op75"
        >
          <VStackFull>
            <AnimatedInPlaceText
              text="Admin Panel"
              isScale
              gradient="defaultTextGradient"
              waveSize={13}
              textShadow=""
            />
            <FlexFull className="p-[1vh] overflow-hidden">
              <FlexFull className="shadowBroadTight bg-col-900 overflow-auto">
                <Table
                  data={userData}
                  columns={userColumns}
                  removeColumn={true}
                  removeFunction={handleRemoveUser}
                  additionalColumn={true}
                  additionalIcon={FaUserPlus}
                  additionalFunction={handleAddAdmin}
                  additionalTitle="Add Admin"
                />
              </FlexFull>
            </FlexFull>
          </VStackFull>
        </GradientBorderFull>
      </CenterFull>
    </TransitionFull>
  );
}
