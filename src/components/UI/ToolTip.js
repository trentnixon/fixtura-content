import { Tooltip, useMantineTheme } from "@mantine/core";
import PropTypes from 'prop-types';

const FixturaTooltip = ({ label, tooltipColor, position, children }) => {
  const theme = useMantineTheme();
  const finalTooltipColor = tooltipColor || theme.colors.cyan[3];
  return (
    <Tooltip
      label={label}
      color={finalTooltipColor}
      position={position || "bottom-start"}
      withArrow
    >
      {children}
    </Tooltip>
  );
};

FixturaTooltip.propTypes = {
  label: PropTypes.string.isRequired,
  tooltipColor: PropTypes.string,
  position: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FixturaTooltip;
