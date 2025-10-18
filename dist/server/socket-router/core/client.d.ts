import { Namespace, Socket } from '../types';
export declare class Client<TBody extends unknown[]> {
    #private;
    body: TBody;
    event: string;
    space: Namespace;
    socket: Socket;
    get isDone(): boolean;
    get hasSendFn(): boolean;
    constructor(space: Namespace, socket: Socket, args: unknown[]);
    emit(...args: unknown[]): void;
    return(...args: unknown[]): void;
}
