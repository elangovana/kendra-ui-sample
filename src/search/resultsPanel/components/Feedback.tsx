import React from "react";

import { Relevance } from "../../constants";
import { QueryResultItem } from "../../kendraTypes";
import blueThumbsUp from "../../images/blue-thumb-up.svg";
import blueThumbsDown from "../../images/blue-thumb-down.svg";
import whiteThumbsUp from "../../images/white-thumb-up.svg";
import whiteThumbsDown from "../../images/white-thumb-down.svg";
import "../../search.scss";

interface FeedbackProps {
  queryResultItem: QueryResultItem;
}

interface FeedbackState {
  relevance: Relevance;
}

export default class Feedback extends React.Component<
  FeedbackProps,
  FeedbackState
> {
  constructor(props: FeedbackProps) {
    super(props);

    this.state = {
      relevance: Object()
    };
  }

  private setRelevance(relevance: Relevance) {
    this.setState({ ...this.state, relevance });
  }

  private submitFeedback = (relevance: Relevance) => () => {
    //api call to submit feedback
    console.log("submitting feedback");
  };

  render() {
    const { relevance } = this.state;

    return (
      <span className="feedback-buttons">
        <img
          src={relevance === Relevance.Relevant ? blueThumbsUp : whiteThumbsUp}
          onMouseOver={event => {
            event.currentTarget.src = blueThumbsUp;
          }}
          onMouseOut={event => {
            if (relevance !== Relevance.Relevant) {
              event.currentTarget.src = whiteThumbsUp;
            }
          }}
          onClick={this.submitFeedback(Relevance.Relevant)}
        />
        <img
          src={
            relevance === Relevance.NotRelevant
              ? blueThumbsDown
              : whiteThumbsDown
          }
          onMouseOver={event => {
            event.currentTarget.src = blueThumbsDown;
          }}
          onMouseOut={event => {
            if (relevance !== Relevance.NotRelevant) {
              event.currentTarget.src = whiteThumbsDown;
            }
          }}
          onClick={this.submitFeedback(Relevance.NotRelevant)}
        />
      </span>
    );
  }
}
