import React from "react";

import { DocumentAttributeValue, TextWithHighlights } from "../../kendraTypes";
import { isNullOrUndefined, localizedDate } from "../../utils";

import TextHighlights from "./TextWithHighlight";
import "./../../search.scss";

interface ResultTextProps {
  lastUpdated?: Date;
  text: TextWithHighlights;
  className?: string;
}

export default class ResultText extends React.Component<ResultTextProps, {}> {
  constructor(props: ResultTextProps) {
    super(props);
  }

  /**
   * Render text without truncation
   */
  private renderNotTruncated = (text: TextWithHighlights) => {
    return (
      <span>
        <TextHighlights textWithHighlights={text} />
      </span>
    );
  };

  private renderResult = () => {
    const { text } = this.props;

    if (isNullOrUndefined(text)) {
      return null;
    } else {
      return this.renderNotTruncated(text);
    }
  };

  public formatDateString = (dateStr: Date) => {
    const date = localizedDate(new Date(dateStr), {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });

    return `${date} - `;
  };

  render() {
    const { lastUpdated } = this.props;

    const date = lastUpdated ? this.formatDateString(lastUpdated) : undefined;

    return (
      <div className={this.props.className}>
        {date && <span>{date} </span>}
        <span>{this.renderResult()}</span>
      </div>
    );
  }
}
