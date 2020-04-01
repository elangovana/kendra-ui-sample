import { DocumentAttributeValue } from "./kendraTypes";
export const PAGE_SIZE = 10;

export const CHARACTER_WIDTH = 13;

export const COLLAPSED_LINES = 2;

export const FAQ_MATCHES = "Kendra found questions like yours";

export interface FAQExpandedMapType {
  expanded: boolean;
}

export enum QueryResultType {
  All = "ALL",
  Answer = "ANSWER",
  QuestionAnswer = "QUESTION_ANSWER",
  Document = "DOCUMENT"
}

export enum DocumentAttributeKeys {
  Author = "Author",
  Category = "Category",
  CreatedAt = "CreatedAt",
  Format = "FileFormat",
  SourceUri = "SourceURI",
  UpdatedAt = "UpdatedAt",
  Version = "Version"
}

export type AttributeMap = {
  [key in DocumentAttributeKeys]: DocumentAttributeValue
};

export enum AdditionalResultAttributeKeys {
  QuestionText = "QuestionText",
  AnswerText = "AnswerText"
}

export type AdditionalResultAttributeMap = {
  [key in AdditionalResultAttributeKeys]: {};
};

export enum Relevance {
  Relevant = "RELEVANT",
  NotRelevant = "NOT_RELEVANT"
}
