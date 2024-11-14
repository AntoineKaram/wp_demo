import React, { ReactElement } from "react";
import { OverlayTrigger, Tooltip as BSTooltip } from "react-bootstrap";

const renderTooltip = ({ text }: { text: string }) => (
  <BSTooltip id="button-tooltip">
    <div>{text}</div>
  </BSTooltip>
);

const Tooltip: React.FC<{
  text: string | undefined;
  children: ReactElement;
  className?: string;
}> = ({ text, children, className }) => {
  if (!text || text.toString().trim() === "") {
    return children;
  }

  return (
    <OverlayTrigger
      placement="auto"
      delay={{ show: 250, hide: 0 }}
      overlay={renderTooltip({ text: text })}
    >
      <span className={className}>{children}</span>
    </OverlayTrigger>
  );
};

export default Tooltip;
