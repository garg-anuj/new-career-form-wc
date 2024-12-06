const Heading = (props) => {
  const {
    tag: HtmlTagName,
    text,
    fontWeight,
    color,
    fontSize,
    style,
    className,
    lineHeight,
    showLine,
  } = props;

  // const blogTextContainer = {
  //   minHeight: "44px",
  //   overflow: "hidden",
  //   lineHeight: " 1rem",
  //   textOverflow: "ellipsis",
  //   display: "-webkit-box",
  //   WebkitBoxOrient: " vertical",
  //   WebkitLineClamp: "5",
  //   maxHeight: "calc(4 * 1.25em)",
  //   margin: "0.25rem",
  // };

  const TagType = HtmlTagName ? HtmlTagName : "div";

  const fontStyle = {
    fontSize: fontSize ? fontSize : "2.5rem",
    color: `${color}`,
    fontWeight: fontWeight,
    // maxHeight: "calc(2 * 1.25em)",
    lineHeight: lineHeight ? `${lineHeight}` : "1.2",

    // max-height: calc(1.5em * 6);
    maxHeight:
      lineHeight && showLine
        ? `calc(${lineHeight} * ${showLine})`
        : "calc(2 * 1.25em)",

    // overflow: overflow || "hidden",
    ...style,
  };

  return (
    <TagType className={className} style={fontStyle}>
      {text}
    </TagType>
  );
};

export default Heading;
