interface Blob {}

export interface AdditionalResultAttribute {
  Key: String;
  ValueType: AdditionalResultAttributeValueType;
  Value: AdditionalResultAttributeValue;
}

type AdditionalResultAttributeList = AdditionalResultAttribute[];
export interface AdditionalResultAttributeValue {
  TextWithHighlightsValue?: TextWithHighlights;
}

export type AdditionalResultAttributeValueType =
  | "TEXT_WITH_HIGHLIGHTS_VALUE"
  | string;

export interface AttributeFilter {
  AndAllFilters?: AttributeFilterList;
  OrAllFilters?: AttributeFilterList;
  NotFilter?: AttributeFilter;
  EqualsTo?: DocumentAttribute;
  ContainsAll?: DocumentAttribute;
  ContainsAny?: DocumentAttribute;
  GreaterThan?: DocumentAttribute;
  GreaterThanOrEquals?: DocumentAttribute;
  LessThan?: DocumentAttribute;
  LessThanOrEquals?: DocumentAttribute;
}

export type AttributeFilterList = AttributeFilter[];

export interface ClickFeedback {
  ResultId: ResultId;
  ClickTime: Timestamp;
}

export type _Blob = Buffer | Uint8Array | Blob | string;

export type ClickFeedbackList = ClickFeedback[];

export type ContentType =
  | "PDF"
  | "HTML"
  | "MS_WORD"
  | "PLAIN_TEXT"
  | "JSON"
  | "PPT"
  | "EXCEL"
  | string;

export interface DocumentAttribute {
  Key: DocumentAttributeKey;
  Value: DocumentAttributeValue;
}
export type DocumentAttributeKey = string;
export type DocumentAttributeKeyList = DocumentAttributeKey[];
export type DocumentAttributeList = DocumentAttribute[];
export type DocumentAttributeStringListValue = String[];
export type DocumentAttributeStringValue = string;
export interface DocumentAttributeValue {
  StringValue?: DocumentAttributeStringValue;
  StringListValue?: DocumentAttributeStringListValue;
  LongValue?: Long;
  DateValue?: Timestamp;
}
export interface DocumentAttributeValueCountPair {
  DocumentAttributeValue?: DocumentAttributeValue;
  Count?: Integer;
}
export type DocumentAttributeValueCountPairList = DocumentAttributeValueCountPair[];
export type DocumentAttributeValueType =
  | "STRING_VALUE"
  | "STRING_LIST_VALUE"
  | "LONG_VALUE"
  | "DATE_VALUE"
  | string;
export type DocumentId = string;
export type DocumentIdList = DocumentId[];
export type DocumentList = Document[];
export interface Facet {
  DocumentAttributeKey?: DocumentAttributeKey;
}
export type FacetList = Facet[];
export interface FacetResult {
  DocumentAttributeKey?: DocumentAttributeKey;
  DocumentAttributeValueCountPairs?: DocumentAttributeValueCountPairList;
}
export type FacetResultList = FacetResult[];
export interface Highlight {
  BeginOffset: Integer;
  EndOffset: Integer;
  TopAnswer?: Boolean;
}
export type HighlightList = Highlight[];
export type Importance = number;
export type IndexId = string;
export type Integer = number;
export type Long = number;
export type MaxResultsIntegerForListDataSourceSyncJobsRequest = number;
export type MaxResultsIntegerForListDataSourcesRequest = number;
export type MaxResultsIntegerForListFaqsRequest = number;
export type MaxResultsIntegerForListIndicesRequest = number;
export type NextToken = string;
export type Order = "ASCENDING" | "DESCENDING" | string;
export type QueryId = string;
export interface QueryRequest {
  IndexId: IndexId;
  QueryText: QueryText;
  AttributeFilter?: AttributeFilter;
  Facets?: FacetList;
  RequestedDocumentAttributes?: DocumentAttributeKeyList;
  QueryResultTypeFilter?: QueryResultType;
  PageNumber?: Integer;
  PageSize?: Integer;
}

export interface QueryResult {
  QueryId?: QueryId;
  ResultItems?: QueryResultItemList;
  FacetResults?: FacetResultList;
  TotalNumberOfResults?: Integer;
}
export interface QueryResultItem {
  Id?: String;
  Type?: QueryResultType;
  AdditionalAttributes?: AdditionalResultAttributeList;
  DocumentId?: DocumentId;
  DocumentTitle?: TextWithHighlights;
  DocumentExcerpt?: TextWithHighlights;
  DocumentURI?: String;
  DocumentAttributes?: DocumentAttributeList;
}
export type QueryResultItemList = QueryResultItem[];
export type QueryResultType =
  | "DOCUMENT"
  | "QUESTION_ANSWER"
  | "ANSWER"
  | string;
export type QueryText = string;
export type ReadAccessType = "ALLOW" | "DENY" | string;
export interface RelevanceFeedback {
  ResultId: ResultId;
  RelevanceValue: RelevanceType;
}
export type RelevanceFeedbackList = RelevanceFeedback[];
export type RelevanceType = "RELEVANT" | "NOT_RELEVANT" | string;

export type ResultId = string;
export type String = string;
export interface SubmitFeedbackRequest {
  IndexId: IndexId;
  QueryId: QueryId;
  ClickFeedbackItems?: ClickFeedbackList;
  RelevanceFeedbackItems?: RelevanceFeedbackList;
}
export interface TextWithHighlights {
  Text?: String;
  Highlights?: HighlightList;
}
export interface TimeRange {
  StartTime?: Timestamp;
  EndTime?: Timestamp;
}
export type Timestamp = Date;
export type Title = string;
