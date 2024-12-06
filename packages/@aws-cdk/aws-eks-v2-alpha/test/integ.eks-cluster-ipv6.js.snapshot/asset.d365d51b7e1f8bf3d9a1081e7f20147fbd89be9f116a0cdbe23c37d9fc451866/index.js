"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onEvent = onEvent;
exports.isComplete = isComplete;
/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
const client_eks_1 = require("@aws-sdk/client-eks");
// eslint-disable-next-line import/no-extraneous-dependencies
const credential_providers_1 = require("@aws-sdk/credential-providers");
// eslint-disable-next-line import/no-extraneous-dependencies
const node_http_handler_1 = require("@smithy/node-http-handler");
// eslint-disable-next-line import/no-extraneous-dependencies
const proxy_agent_1 = require("proxy-agent");
const cluster_1 = require("./cluster");
const consts = require("./consts");
const proxyAgent = new proxy_agent_1.ProxyAgent();
const awsConfig = {
    logger: console,
    requestHandler: new node_http_handler_1.NodeHttpHandler({
        httpAgent: proxyAgent,
        httpsAgent: proxyAgent,
    }),
};
let eks;
const defaultEksClient = {
    createCluster: req => getEksClient().createCluster(req),
    deleteCluster: req => getEksClient().deleteCluster(req),
    describeCluster: req => getEksClient().describeCluster(req),
    describeUpdate: req => getEksClient().describeUpdate(req),
    updateClusterConfig: req => getEksClient().updateClusterConfig(req),
    updateClusterVersion: req => getEksClient().updateClusterVersion(req),
    createFargateProfile: req => getEksClient().createFargateProfile(req),
    deleteFargateProfile: req => getEksClient().deleteFargateProfile(req),
    describeFargateProfile: req => getEksClient().describeFargateProfile(req),
    tagResource: req => getEksClient().tagResource(req),
    untagResource: req => getEksClient().untagResource(req),
    configureAssumeRole: (req) => {
        eks = new client_eks_1.EKS({
            ...awsConfig,
            credentials: (0, credential_providers_1.fromTemporaryCredentials)({
                params: req,
            }),
        });
    },
};
function getEksClient() {
    if (!eks) {
        throw new Error('EKS client not initialized (call "configureAssumeRole")');
    }
    return eks;
}
async function onEvent(event) {
    const provider = createResourceHandler(event);
    return provider.onEvent();
}
async function isComplete(event) {
    const provider = createResourceHandler(event);
    return provider.isComplete();
}
function createResourceHandler(event) {
    switch (event.ResourceType) {
        case consts.CLUSTER_RESOURCE_TYPE: return new cluster_1.ClusterResourceHandler(defaultEksClient, event);
        default:
            throw new Error(`Unsupported resource type "${event.ResourceType}`);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQXVEQSwwQkFHQztBQUVELGdDQUdDO0FBL0RELCtCQUErQjtBQUMvQiw2REFBNkQ7QUFDN0Qsb0RBQTBDO0FBQzFDLDZEQUE2RDtBQUM3RCx3RUFBeUU7QUFDekUsNkRBQTZEO0FBQzdELGlFQUE0RDtBQUM1RCw2REFBNkQ7QUFDN0QsNkNBQXlDO0FBQ3pDLHVDQUFtRDtBQUVuRCxtQ0FBbUM7QUFHbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSx3QkFBVSxFQUFFLENBQUM7QUFDcEMsTUFBTSxTQUFTLEdBQUc7SUFDaEIsTUFBTSxFQUFFLE9BQU87SUFDZixjQUFjLEVBQUUsSUFBSSxtQ0FBZSxDQUFDO1FBQ2xDLFNBQVMsRUFBRSxVQUFVO1FBQ3JCLFVBQVUsRUFBRSxVQUFVO0tBQ3ZCLENBQVE7Q0FDVixDQUFDO0FBRUYsSUFBSSxHQUFvQixDQUFDO0FBRXpCLE1BQU0sZ0JBQWdCLEdBQWM7SUFDbEMsYUFBYSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQztJQUN2RCxhQUFhLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDO0lBQ3ZELGVBQWUsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUM7SUFDM0QsY0FBYyxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztJQUN6RCxtQkFBbUIsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztJQUNuRSxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztJQUNyRSxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztJQUNyRSxvQkFBb0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQztJQUNyRSxzQkFBc0IsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQztJQUN6RSxXQUFXLEVBQUUsR0FBRyxDQUFDLEVBQUUsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO0lBQ25ELGFBQWEsRUFBRSxHQUFHLENBQUMsRUFBRSxDQUFDLFlBQVksRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUM7SUFDdkQsbUJBQW1CLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMzQixHQUFHLEdBQUcsSUFBSSxnQkFBRyxDQUFDO1lBQ1osR0FBRyxTQUFTO1lBQ1osV0FBVyxFQUFFLElBQUEsK0NBQXdCLEVBQUM7Z0JBQ3BDLE1BQU0sRUFBRSxHQUFHO2FBQ1osQ0FBQztTQUNILENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRixDQUFDO0FBRUYsU0FBUyxZQUFZO0lBQ25CLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBRU0sS0FBSyxVQUFVLE9BQU8sQ0FBQyxLQUFrRDtJQUM5RSxNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBRU0sS0FBSyxVQUFVLFVBQVUsQ0FBQyxLQUFrRDtJQUNqRixNQUFNLFFBQVEsR0FBRyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM5QyxPQUFPLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUMvQixDQUFDO0FBRUQsU0FBUyxxQkFBcUIsQ0FBQyxLQUFrRDtJQUMvRSxRQUFRLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixLQUFLLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLE9BQU8sSUFBSSxnQ0FBc0IsQ0FBQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5RjtZQUNFLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGltcG9ydC9uby1leHRyYW5lb3VzLWRlcGVuZGVuY2llc1xuaW1wb3J0IHsgRUtTIH0gZnJvbSAnQGF3cy1zZGsvY2xpZW50LWVrcyc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBmcm9tVGVtcG9yYXJ5Q3JlZGVudGlhbHMgfSBmcm9tICdAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVycyc7XG4vLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgaW1wb3J0L25vLWV4dHJhbmVvdXMtZGVwZW5kZW5jaWVzXG5pbXBvcnQgeyBOb2RlSHR0cEhhbmRsZXIgfSBmcm9tICdAc21pdGh5L25vZGUtaHR0cC1oYW5kbGVyJztcbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbmltcG9ydCB7IFByb3h5QWdlbnQgfSBmcm9tICdwcm94eS1hZ2VudCc7XG5pbXBvcnQgeyBDbHVzdGVyUmVzb3VyY2VIYW5kbGVyIH0gZnJvbSAnLi9jbHVzdGVyJztcbmltcG9ydCB7IEVrc0NsaWVudCB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCAqIGFzIGNvbnN0cyBmcm9tICcuL2NvbnN0cyc7XG5pbXBvcnQgeyBJc0NvbXBsZXRlUmVzcG9uc2UgfSBmcm9tICdhd3MtY2RrLWxpYi9jdXN0b20tcmVzb3VyY2VzL2xpYi9wcm92aWRlci1mcmFtZXdvcmsvdHlwZXMnO1xuXG5jb25zdCBwcm94eUFnZW50ID0gbmV3IFByb3h5QWdlbnQoKTtcbmNvbnN0IGF3c0NvbmZpZyA9IHtcbiAgbG9nZ2VyOiBjb25zb2xlLFxuICByZXF1ZXN0SGFuZGxlcjogbmV3IE5vZGVIdHRwSGFuZGxlcih7XG4gICAgaHR0cEFnZW50OiBwcm94eUFnZW50LFxuICAgIGh0dHBzQWdlbnQ6IHByb3h5QWdlbnQsXG4gIH0pIGFzIGFueSxcbn07XG5cbmxldCBla3M6IEVLUyB8IHVuZGVmaW5lZDtcblxuY29uc3QgZGVmYXVsdEVrc0NsaWVudDogRWtzQ2xpZW50ID0ge1xuICBjcmVhdGVDbHVzdGVyOiByZXEgPT4gZ2V0RWtzQ2xpZW50KCkuY3JlYXRlQ2x1c3RlcihyZXEpLFxuICBkZWxldGVDbHVzdGVyOiByZXEgPT4gZ2V0RWtzQ2xpZW50KCkuZGVsZXRlQ2x1c3RlcihyZXEpLFxuICBkZXNjcmliZUNsdXN0ZXI6IHJlcSA9PiBnZXRFa3NDbGllbnQoKS5kZXNjcmliZUNsdXN0ZXIocmVxKSxcbiAgZGVzY3JpYmVVcGRhdGU6IHJlcSA9PiBnZXRFa3NDbGllbnQoKS5kZXNjcmliZVVwZGF0ZShyZXEpLFxuICB1cGRhdGVDbHVzdGVyQ29uZmlnOiByZXEgPT4gZ2V0RWtzQ2xpZW50KCkudXBkYXRlQ2x1c3RlckNvbmZpZyhyZXEpLFxuICB1cGRhdGVDbHVzdGVyVmVyc2lvbjogcmVxID0+IGdldEVrc0NsaWVudCgpLnVwZGF0ZUNsdXN0ZXJWZXJzaW9uKHJlcSksXG4gIGNyZWF0ZUZhcmdhdGVQcm9maWxlOiByZXEgPT4gZ2V0RWtzQ2xpZW50KCkuY3JlYXRlRmFyZ2F0ZVByb2ZpbGUocmVxKSxcbiAgZGVsZXRlRmFyZ2F0ZVByb2ZpbGU6IHJlcSA9PiBnZXRFa3NDbGllbnQoKS5kZWxldGVGYXJnYXRlUHJvZmlsZShyZXEpLFxuICBkZXNjcmliZUZhcmdhdGVQcm9maWxlOiByZXEgPT4gZ2V0RWtzQ2xpZW50KCkuZGVzY3JpYmVGYXJnYXRlUHJvZmlsZShyZXEpLFxuICB0YWdSZXNvdXJjZTogcmVxID0+IGdldEVrc0NsaWVudCgpLnRhZ1Jlc291cmNlKHJlcSksXG4gIHVudGFnUmVzb3VyY2U6IHJlcSA9PiBnZXRFa3NDbGllbnQoKS51bnRhZ1Jlc291cmNlKHJlcSksXG4gIGNvbmZpZ3VyZUFzc3VtZVJvbGU6IChyZXEpID0+IHtcbiAgICBla3MgPSBuZXcgRUtTKHtcbiAgICAgIC4uLmF3c0NvbmZpZyxcbiAgICAgIGNyZWRlbnRpYWxzOiBmcm9tVGVtcG9yYXJ5Q3JlZGVudGlhbHMoe1xuICAgICAgICBwYXJhbXM6IHJlcSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICB9LFxufTtcblxuZnVuY3Rpb24gZ2V0RWtzQ2xpZW50KCkge1xuICBpZiAoIWVrcykge1xuICAgIHRocm93IG5ldyBFcnJvcignRUtTIGNsaWVudCBub3QgaW5pdGlhbGl6ZWQgKGNhbGwgXCJjb25maWd1cmVBc3N1bWVSb2xlXCIpJyk7XG4gIH1cblxuICByZXR1cm4gZWtzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gb25FdmVudChldmVudDogQVdTTGFtYmRhLkNsb3VkRm9ybWF0aW9uQ3VzdG9tUmVzb3VyY2VFdmVudCkge1xuICBjb25zdCBwcm92aWRlciA9IGNyZWF0ZVJlc291cmNlSGFuZGxlcihldmVudCk7XG4gIHJldHVybiBwcm92aWRlci5vbkV2ZW50KCk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0NvbXBsZXRlKGV2ZW50OiBBV1NMYW1iZGEuQ2xvdWRGb3JtYXRpb25DdXN0b21SZXNvdXJjZUV2ZW50KTogUHJvbWlzZTxJc0NvbXBsZXRlUmVzcG9uc2U+IHtcbiAgY29uc3QgcHJvdmlkZXIgPSBjcmVhdGVSZXNvdXJjZUhhbmRsZXIoZXZlbnQpO1xuICByZXR1cm4gcHJvdmlkZXIuaXNDb21wbGV0ZSgpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSZXNvdXJjZUhhbmRsZXIoZXZlbnQ6IEFXU0xhbWJkYS5DbG91ZEZvcm1hdGlvbkN1c3RvbVJlc291cmNlRXZlbnQpIHtcbiAgc3dpdGNoIChldmVudC5SZXNvdXJjZVR5cGUpIHtcbiAgICBjYXNlIGNvbnN0cy5DTFVTVEVSX1JFU09VUkNFX1RZUEU6IHJldHVybiBuZXcgQ2x1c3RlclJlc291cmNlSGFuZGxlcihkZWZhdWx0RWtzQ2xpZW50LCBldmVudCk7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgcmVzb3VyY2UgdHlwZSBcIiR7ZXZlbnQuUmVzb3VyY2VUeXBlfWApO1xuICB9XG59XG4iXX0=