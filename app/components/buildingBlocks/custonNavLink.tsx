import { NavLink, useLocation } from "@remix-run/react";

import Box from "./box";

interface CustomNavLinkProps {
  to: string;
  linkText?: string;
  activeStyles?: string;
  inactiveStyles?: string;
  useHash?: boolean;
  useActive?: boolean;
  className?: string;
}

export default function CustomNavLink({
  to,
  linkText,

  className,
}: CustomNavLinkProps) {
  const hash = useLocation().hash;
  console.log(hash);

  return (
    <Box className={className}>
      <NavLink to={to} className={className}>
        {linkText}
      </NavLink>
    </Box>
  );
}
