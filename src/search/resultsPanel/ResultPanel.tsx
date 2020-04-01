import React from "react";

import DocumentResults from "./DocumentResults";
import FAQResults from "./FAQResults";
import TopResults from "./TopResults";

import { PAGE_SIZE } from "./../constants";
import { QueryResult, QueryResultItemList } from "./../kendraTypes";
import { isNullOrUndefined } from "../utils";
import "../search.scss";

interface ResultsPanelProps {
  results: QueryResult;
  topResults: QueryResultItemList;
  faqResults: QueryResultItemList;
  docResults: QueryResultItemList;
  dataReady: boolean;
  currentPageNumber: number;
}

export default class ResultsPanel extends React.Component<
  ResultsPanelProps,
  {}
> {
  private renderPageIndex = () => {
    const { currentPageNumber, dataReady, results } = this.props;

    // Ensure spacing is always correct
    let pageIndex = <span>&nbsp;</span>;

    if (
      dataReady &&
      !isNullOrUndefined(results) &&
      results.TotalNumberOfResults! > 0
    ) {
      const pageStart = (currentPageNumber - 1) * PAGE_SIZE + 1;
      const pageEnd = pageStart + (results.ResultItems!.length - 1);

      // Actually populate if ready
      const PRECISION = 3;
      let resultsLength: string = `${results.TotalNumberOfResults}`;
      if (resultsLength.length > PRECISION) {
        // Only get three most significant digits
        resultsLength =
          resultsLength.substr(0, PRECISION) +
          "0".repeat(resultsLength.length - PRECISION);
        // Add commas based on locale
        resultsLength = parseInt(resultsLength).toLocaleString();
      }

      if (resultsLength.length > PRECISION) {
        pageIndex = (
          <span>
            &nbsp;
            {pageStart}-{pageEnd} of about {resultsLength}
          </span>
        );
      } else {
        pageIndex = (
          <span>
            {pageStart}-{pageEnd} of {resultsLength} results
          </span>
        );
      }
    }

    return <div>{pageIndex}</div>;
  };

  render() {
    const { topResults, faqResults, docResults, dataReady } = this.props;

    if (dataReady) {
      return (
        <div className="results-section">
          <div className="results-number">{this.renderPageIndex()}</div>

          <TopResults results={topResults} />
          <FAQResults results={faqResults} />
          <DocumentResults results={docResults} />
        </div>
      );
    } else {
      return undefined;
    }
  }
}
