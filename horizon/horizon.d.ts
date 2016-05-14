// Type definitions for Horizon v0.3.2
// Project: http://horizon.io
// GitHub: https://github.com/rethinkdb/horizon
// Definitions by: Marshall Cottrell <http://github.com/marshall007>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped


/// <reference path="../rx/rx.d.ts" />


declare var Horizon: horizon.IHorizonStatic;

// Support AMD require
declare module 'horizon' {
    export = Horizon;
}

declare namespace horizon {

    ////////////////////////////////////////////
    // Horizon
    ////////////////////////////////////////////

    interface IHorizonOptions {
        host?: string;
        secure?: boolean;
        path?: string;
        lazyWrites?: boolean;
        authType?: string;
    }

    interface IHorizonInstance {
        (collection: string): ICollection;

        connect(callback: Function): void;
        disconnect(callback: Function): void;

        status(observer: Rx.Observer<any>): Rx.Observable<any>;

        onDisconnected(observer: Rx.Observer<any>): Rx.Observable<any>;
        onConnected(observer: Rx.Observer<any>): Rx.Observable<any>;
        onReady(observer: Rx.Observer<any>): Rx.Observable<any>;
        onSocketError(observer: Rx.Observer<any>): Rx.Observable<any>;

        authEndpoint(observer: Rx.Observer<any>): Rx.Observable<any>;
        hasAuthToken(): boolean;
    }

    interface IHorizonStatic {
        new(options: IHorizonOptions): IHorizonInstance;

        log(...args: any[]): void;
        logError(...args: any[]): void;
        enableLogging(enable: boolean): void;

        clearAuthTokens(): string;
    }


    ////////////////////////////////////////////
    // TermBase & Collections
    ////////////////////////////////////////////

    type QuerySort = 'ascending' | 'descending';
    type QueryBounds = 'open' | 'closed';

    interface IQueryOptions {
        rawChanges: boolean;
    }

    interface ITermBase {
        fetch(options?: IQueryOptions): Rx.Observable<any>;
        watch(options?: IQueryOptions): Rx.Observable<any>;

        findAll(fieldValue: Object): ITermBase;
        findAll(...fieldValues: Object[]): ITermBase;
        findAll(...fieldValues: any[]): ITermBase;

        find(id: any): ITermBase;
        find(id: any[]): ITermBase;

        order(field: string, order?: QuerySort): ITermBase;
        order(fields: string[], order?: QuerySort): ITermBase;

        above(fieldValue: Object, bound?: QueryBounds): ITermBase;
        below(fieldValue: Object, bound?: QueryBounds): ITermBase;

        limit(size: number): ITermBase;
    }

    interface ICollection extends ITermBase {
        store(...documents: Object[]): ICollection;
        upsert(...documents: Object[]): ICollection;
        insert(...documents: Object[]): ICollection;
        replace(...documents: Object[]): ICollection;
        update(...documents: Object[]): ICollection;

        remove(id: any): ICollection;
        remove(document: Object): ICollection;

        removeAll(ids: any[]): ICollection;
        removeAll(documents: Object[]): ICollection;
    }
}
