interface IUseBatchMultipleDeleteEntityQueryArgs<TDataArray> {
  useDeleteEntityQueryMutation: any;
  entityDataIdField: string;
  dataArray: TDataArray[];
  batchSize: number;
}

export const useBatchMultipleDeleteEntityQuery = <TDataArray>(
  args: IUseBatchMultipleDeleteEntityQueryArgs<TDataArray>
) => {
  const {
    useDeleteEntityQueryMutation,
    entityDataIdField,
    dataArray,
    batchSize,
  } = args;

  const [deleteEntity, { isLoading: isBatchMultipleDeleteEntityLoading }] =
    useDeleteEntityQueryMutation();

  const handleBatchMultipleDeleteEntityFinish = async () => {
    try {
      if (dataArray?.length) {
        for (let i = 0; i < dataArray?.length; i += batchSize) {
          const batch = dataArray.slice(i, i + batchSize);

          const deletedData = (dataElement: TDataArray) => {
            return {
              [entityDataIdField]: dataElement?.id ?? "",
            };
          };

          await Promise.all(
            batch.map((dataElement) => {
              return deleteEntity(deletedData(dataElement)).unwrap();
            })
          );
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  return {
    handleBatchMultipleDeleteEntityFinish,
    isBatchMultipleDeleteEntityLoading,
  };
};
