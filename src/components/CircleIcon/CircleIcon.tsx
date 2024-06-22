interface ICircleIconProps {
  width: number;
  height: number;
  color: string;
  isFilled: boolean;
}

export const CircleIcon = (props: ICircleIconProps) => {
  const { width, height, color, isFilled } = props;

  const filledCircleStyles = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: color,
    borderRadius: "50%",
  };

  const outlinedCircleStyles = {
    width: `${width}px`,
    height: `${height}px`,
    border: `2px solid ${color}`,
    borderRadius: "50%",
  };

  return isFilled ? (
    <div style={filledCircleStyles} />
  ) : (
    <div style={outlinedCircleStyles} />
  );
};
