// eslint-disable
// this is an auto generated file. This will be overwritten

export const getDrill = `query GetDrill($id: ID!) {
  getDrill(id: $id) {
    id
    name
    description
    ownerEmail
    userId
    storageKey
    createdDate
    updatedDate
  }
}
`;
export const listDrills = `query ListDrills(
  $filter: ModelDrillFilterInput
  $limit: Int
  $nextToken: String
) {
  listDrills(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      description
      ownerEmail
      userId
      storageKey
      createdDate
      updatedDate
    }
    nextToken
  }
}
`;
