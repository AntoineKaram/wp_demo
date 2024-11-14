import { CommunicationProtocolEnum, DaprClient, HttpMethod } from '@dapr/dapr';
const daprHost = process.env.DAPR_HTTP_HOST || 'http://localhost';
const daprPort = process.env.DAPR_HTTP_PORT || '3500';

const daprClient = new DaprClient({
  daprHost,
  daprPort,
  communicationProtocol: CommunicationProtocolEnum.HTTP,
});
const DATA_SERVICE_APP_ID = 'data-service';

export const getSuppliers = async (page: number, limit: number) => {
  const queryParams = `?page=${page}&limit=${limit}`;
  return daprClient.invoker.invoke(
    DATA_SERVICE_APP_ID,
    `suppliers${queryParams}`,
    HttpMethod.GET
  );
};

export const getSupplierById = async (id: string) => {
  return daprClient.invoker.invoke(
    DATA_SERVICE_APP_ID,
    `suppliers/${id}`,
    HttpMethod.GET
  );
};

export const createSupplier = async (data: {
  name: string;
  vatNumber: string;
}) => {
  return daprClient.invoker.invoke(
    DATA_SERVICE_APP_ID,
    'suppliers',
    HttpMethod.POST,
    data
  );
};

export const updateSupplier = async (id: string, data: any) => {
  return daprClient.invoker.invoke(
    DATA_SERVICE_APP_ID,
    `suppliers/${id}`,
    HttpMethod.PUT,
    data
  );
};

export const deleteSupplier = async (id: string) => {
  return daprClient.invoker.invoke(
    DATA_SERVICE_APP_ID,
    `suppliers/${id}`,
    HttpMethod.DELETE
  );
};
