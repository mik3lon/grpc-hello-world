import { GreeterClient } from '../generated/proto/HelloworldServiceClientPb';
import { HelloRequest } from '../generated/proto/helloworld_pb';

// Create the client with the URL of the Envoy proxy (assuming it runs on port 8080)
const client = new GreeterClient('http://envoy-proxy:8080', null, null);

// Function to call SayHello RPC
export const sayHello = (name: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        const request = new HelloRequest();
        request.setName(name);

        client.sayHello(request, {}, (err, response) => {
            if (err) {
                reject(err.message || 'Error calling gRPC service');
            } else {
                resolve(response.getMessage());
            }
        });
    });
};
