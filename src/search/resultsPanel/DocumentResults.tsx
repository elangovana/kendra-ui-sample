import React from "react";

import { DocumentAttributeKeys } from "../constants";
import { isNullOrUndefined, selectMostRecentUpdatedTimestamp } from "../utils";
import { QueryResultItem, QueryResultItemList } from "./../kendraTypes";

import ResultTitle from "./components/ResultTitle";
import ResultText from "./components/ResultText";
import ResultFooter from "./components/ResultFooter";
import "../search.scss";

interface DocumentResultsProps {
  results: QueryResultItemList;
}

export default class DocumentResults extends React.Component<
  DocumentResultsProps,
  {}
> {
  // All results in this component has QueryResultType === "ANSWER"
  private renderResults = (result: QueryResultItem) => {
    let attributes = Object();
    if (!isNullOrUndefined(result.DocumentAttributes)) {
      result.DocumentAttributes!.forEach(attribute => {
        attributes[attribute.Key] = attribute.Value;
      });
    }

    const lastUpdated = selectMostRecentUpdatedTimestamp(attributes);

    return (
      <div className="container-body" key={result.Id}>
        <ResultTitle queryResultItem={result} attributes={attributes} />
        <ResultText
          className="small-margin-bottom"
          text={result.DocumentExcerpt!}
          lastUpdated={lastUpdated}
        />
        <ResultFooter queryResultItem={result} attributes={attributes} />
      </div>
    );
  };

  render() {
    const { results } = this.props;

    if (isNullOrUndefined(results) || results.length === 0) {
      return null;
    }

    return (
      <div className="document-results-section">
        {results.map(this.renderResults)}
      </div>
    );
  }
}
