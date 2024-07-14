export interface IAdditionalParams {
  refetchData?: () => void;
  closeEdit?: () => void;
  fields: Record<string, string | undefined>;
}
