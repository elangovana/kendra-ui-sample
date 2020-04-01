import React from "react";

import { QueryResultItem } from "../../kendraTypes";
import { isNullOrEmpty, isNullOrUndefined, truncateString } from "../../utils";
import "../../search.scss";

import Feedback from "./Feedback";

const IgnoreFormats = ["PLAIN_TEXT"];
const MAX_URI_LENGTH = 30;

interface ResultFooterProps {
  queryResultItem: QueryResultItem;
  attributes: any;
}

export default class ResultFooter extends React.Component<
  ResultFooterProps,
  {}
> {
  render() {
    const { attributes, queryResultItem } = this.props;

    const fileFormatName = attributes.FileFormat
      ? attributes.FileFormat.StringValue
      : undefined;

    let fileFormat;
    if (
      !isNullOrUndefined(fileFormatName) &&
      IgnoreFormats.indexOf(fileFormatName) === -1
    ) {
      fileFormat = (
        <div className="display-inline">
          {fileFormatName.toUpperCase()}
          <div className="file-format-divider-wrapper">
            <div className="file-format-divider" />
          </div>
        </div>
      );
    }

    let sourceLink;
    const uri = queryResultItem.DocumentURI!;
    if (!isNullOrEmpty(uri)) {
      sourceLink = (
        <div className="display-inline action-link">
          <a href={uri} target="_blank">
            {truncateString(uri, MAX_URI_LENGTH)}
          </a>
        </div>
      );
    }

    return (
      <div className="result-footer">
        <div className="footer-left-text">
          {fileFormat}
          {sourceLink}
        </div>
        <Feedback queryResultItem={queryResultItem} />
      </div>
    );
  }
}
