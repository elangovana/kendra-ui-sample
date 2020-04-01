import React from "react";

import { isNullOrEmpty, isNullOrUndefined } from "./../../utils";

import TextHighlights from "./TextWithHighlight";
import "../../search.scss";

interface ResultTitleProps {
  queryResultItem: any;
  attributes: any;
}

export default class ResultTitle extends React.Component<ResultTitleProps, {}> {
  render() {
    const { queryResultItem } = this.props;

    // title is not guaranteed to exist, show nothing if that's the case
    if (
      isNullOrUndefined(queryResultItem.DocumentTitle) ||
      isNullOrEmpty(queryResultItem.DocumentTitle.Text)
    ) {
      return null;
    }

    let resultTitle = (
      <TextHighlights textWithHighlights={queryResultItem.DocumentTitle} />
    );

    const uri = queryResultItem.FormattedSourceUri;
    if (!isNullOrEmpty(uri)) {
      resultTitle = (
        <a className="action-link" href={uri} target="_blank">
          {resultTitle}
        </a>
      );
    }

    return <div>{resultTitle}</div>;
  }
}
