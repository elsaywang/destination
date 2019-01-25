export const portalUrl = `http://localhost:8000/portal`; //TODO, change to '/portal' once lambda setup;
export const apiUrl = `http://localhost:3003/api`; //TODO, change to `/api` once lambda setup;

export const editDestinationUrl = id =>
    `${portalUrl}/Segments/ManageDestination.ddx?destinationId=${id}#edit`;
