import * as React from "react";
import Svg, { SvgProps, Rect } from "react-native-svg";
const MenuIcon = () => (
  <Svg width={17} height={16} fill="none">
    <Rect width={10} height={1.65} x={0.96} fill="#AFB2BF" rx={0.825} />
    <Rect
      width={16}
      height={1.65}
      x={0.96}
      y={4.65}
      fill="#AFB2BF"
      rx={0.825}
    />
    <Rect width={12} height={1.65} x={0.96} y={9.3} fill="#AFB2BF" rx={0.825} />
    <Rect
      width={16}
      height={1.65}
      x={0.96}
      y={13.95}
      fill="#AFB2BF"
      rx={0.825}
    />
  </Svg>
);
export default MenuIcon;
