import React from "react";

import { Highlight } from "../../kendraTypes";
import { isNullOrUndefined } from "../../utils";
import "../../search.scss";

interface HighlightedTextProps {
  text: string | undefined;
  highlight: Highlight;
}

export default class HighlightedText extends React.Component<
  HighlightedTextProps,
  {}
> {
  render() {
    const { text, highlight } = this.props;

    // all highlights are bolded
    // if TopAnswer is provided and true, it has a yellow background
    return (
      <strong
        className={
          !isNullOrUndefined(highlight.TopAnswer) && highlight.TopAnswer
            ? "top-answer"
            : ""
        }
      >
        {!isNullOrUndefined(text) &&
          text!.substring(highlight.BeginOffset, highlight.EndOffset)}
      </strong>
    );
  }
}
