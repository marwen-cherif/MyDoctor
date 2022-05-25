export interface FailureResponse {
  type: string;
  reason: string;
}

export const isFailureResponse = (
  objectToDetermine: any
): objectToDetermine is FailureResponse => {
  return "type" in objectToDetermine && "reason" in objectToDetermine;
};
