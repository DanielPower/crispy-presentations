import React from "react";
import styled from "styled-components";
import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";

const Pre = styled.pre`
  text-align: left;
  margin: 1em 0;
  padding: 0.5em;
  overflow-wrap: anywhere;
  font-size: 1.15rem;
`;

const Line = styled.div`
  display: table-row;
`;

const HighlightLine = styled.div`
  display: table-row;
  background-color: rgba(255, 255, 0, 0.2);
`;

const LineNo = styled.span`
  display: table-cell;
  text-align: right;
  padding-right: 1em;
  user-select: none;
  opacity: 0.5;
`;

const LineContent = styled.span`
  display: table-cell;
  width: 100%;
`;

const CodeBlock = ({ children, language, highlightRanges }) => (
  <Highlight
    {...defaultProps}
    theme={theme}
    code={children.split("\n").slice(0, -1).join("\n")}
    language={language}
  >
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => {
          const LineComponent =
            highlightRanges &&
            highlightRanges.find(([min, max]) => min <= i + 1 && max >= i + 1)
              ? HighlightLine
              : Line;
          return (
            <LineComponent key={i} {...getLineProps({ line, key: i })}>
              <LineNo>{i + 1}</LineNo>
              <LineContent>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token, key })} />
                ))}
              </LineContent>
            </LineComponent>
          );
        })}
      </Pre>
    )}
  </Highlight>
);

export default CodeBlock;
