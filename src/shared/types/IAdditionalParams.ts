export interface IAdditionalParams {
  refetchData?: () => void;
  closeEdit?: () => void;
  fields: Record<string, string | undefined>;
  additionalQuery?: {
    query: any;
    fields: Record<string, string | undefined>;
  };
}
