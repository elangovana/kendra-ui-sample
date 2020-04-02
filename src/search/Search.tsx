import React from "react";

import { QueryResultType } from "./constants";
import { isNullOrUndefined } from "./utils";
import { Spinner } from "react-bootstrap";
import {
  QueryResult,
  QueryResultItem,
  QueryResultItemList
} from "./kendraTypes";

import SearchBar from "./searchBar/SearchBar";
import ResultPanel from "./resultsPanel/ResultPanel";
import Pagination from "./pagination/Pagination";
import config from '../config';

import "bootstrap/dist/css/bootstrap.min.css";
import "./search.scss";
interface SearchProps {}

interface SearchState {
  dataReady: boolean;
  searchResults: QueryResult;
  topResults: QueryResultItemList;
  faqResults: QueryResultItemList;
  docResults: QueryResultItemList;
  currentPageNumber: number;
  queryText: string;
}

export default class Search extends React.Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);

    this.state = {
      dataReady: false,
      searchResults: {},
      topResults: [],
      faqResults: [],
      docResults: [],
      currentPageNumber: 1,
      queryText: ""
    };
  }

  getResults = async (queryText: string, pageNumber: number = 1) => {
    this.setState({ dataReady: false });

    let results: any = {};
    try {
      const response = await fetch(`${config.baseUrl}/?queryText=${queryText}&pageNumber=${pageNumber}`);
      results = await response.json();
    }catch(error){
      console.log(error);
    }

    const tempTopResults: QueryResultItemList = [];
    const tempFAQResults: QueryResultItemList = [];
    const tempDocumentResults: QueryResultItemList = [];
    if (results && results.ResultItems) {
      results.ResultItems.forEach((result: QueryResultItem) => {
        switch (result.Type) {
          case QueryResultType.Answer:
            tempTopResults.push(result);
            break;
          case QueryResultType.QuestionAnswer:
            tempFAQResults.push(result);
            break;
          case QueryResultType.Document:
            tempDocumentResults.push(result);
            break;
          default:
            break;
        }
      });
      this.setState({
        searchResults: results,
        topResults: tempTopResults,
        faqResults: tempFAQResults,
        docResults: tempDocumentResults,
        dataReady: true
      });
    } else {
      this.setState({
        searchResults: {},
        topResults: tempTopResults,
        faqResults: tempFAQResults,
        docResults: tempDocumentResults,
        dataReady: true
      });
    }
    this.setState({
      currentPageNumber: pageNumber,
      queryText: queryText
    });
  };

  render() {
    return (
      <div>
        <SearchBar onSubmit={this.getResults} />
        {this.state.queryText &&
          this.state.dataReady &&
          !isNullOrUndefined(this.state.searchResults) && (
            <div>
              <ResultPanel
                results={this.state.searchResults}
                topResults={this.state.topResults}
                faqResults={this.state.faqResults}
                docResults={this.state.docResults}
                dataReady={this.state.dataReady}
                currentPageNumber={this.state.currentPageNumber}
              />
              <Pagination
                queryText={this.state.queryText}
                currentPageNumber={this.state.currentPageNumber}
                onSubmit={this.getResults}
                results={this.state.searchResults}
              />
            </div>
          )}

        {this.state.queryText && !this.state.dataReady && (
          <div className="results-section center-align">
            <Spinner animation="border" variant="secondary" />
          </div>
        )}
        {this.state.dataReady &&
          this.state.searchResults.TotalNumberOfResults === 0 && (
            <div className="results-section empty-results">
              Kendra didn't match any results to your query.
            </div>
          )}
      </div>
    );
  }
}
