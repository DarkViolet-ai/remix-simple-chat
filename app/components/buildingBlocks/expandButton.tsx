import IconButton from "./iconButton";
import { NavLink } from "@remix-run/react";
import type { TooltipPlacement } from "./tooltip";
import { ExpandIcon } from "styles";

export default function ExpandButton({
  expandLink,
  tooltipPlacement = "top",
  containerClassName,
  iconClassName,
}: {
  expandLink: string;
  containerClassName?: string;
  iconClassName?: string;
  tooltipPlacement?: TooltipPlacement;
  style?: React.CSSProperties;
}) {
  return (
    <NavLink to={expandLink}>
      <IconButton
        label="expand"
        icon={ExpandIcon}
        containerClassName={containerClassName}
        iconClassName={iconClassName}
        tooltipPlacement={tooltipPlacement}
      />
    </NavLink>
  );
}
