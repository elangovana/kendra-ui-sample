import React from "react";
import { isNullOrUndefined, unionSortedHighlights } from "../../utils";

import { TextWithHighlights } from "../../kendraTypes";
import HighlightedText from "./Highlight";
import "../../search.scss";

interface TextHighlightsProps {
  className?: string;
  textWithHighlights: TextWithHighlights;
}

export default class TextHighlights extends React.Component<
  TextHighlightsProps,
  {}
> {
  constructor(props: TextHighlightsProps) {
    super(props);
  }

  render() {
    const { className, textWithHighlights } = this.props;

    if (isNullOrUndefined(textWithHighlights)) {
      return null;
    }

    const text = textWithHighlights.Text;
    if (isNullOrUndefined(textWithHighlights.Highlights)) {
      return <span>{text}</span>;
    }

    // TopAnswer will be out of order, sort the highlights
    const sortedHighlights = unionSortedHighlights(
      textWithHighlights.Highlights!.sort(
        (highlight1: any, highlight2: any) =>
          highlight1.BeginOffset - highlight2.BeginOffset
      )
    );
    const lastHighlight = sortedHighlights[sortedHighlights.length - 1];

    return (
      <span className={className}>
        {sortedHighlights.map((highlight: any, idx: number) => (
          <span key={idx}>
            <span>
              {text!.substring(
                idx === 0 ? 0 : sortedHighlights[idx - 1].EndOffset,
                highlight.BeginOffset
              )}
            </span>
            <HighlightedText text={text} highlight={highlight} />
          </span>
        ))}
        <span>{text!.substring(lastHighlight.EndOffset)}</span>
      </span>
    );
  }
}
