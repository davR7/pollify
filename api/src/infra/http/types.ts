import { ParamsDictionary as Params, Query, Request, Response } from "express-serve-static-core";

export type ExpressRequest<
  TBody,
  TParams extends Params = Params,
  TQuery extends Query = Query,
  TRes = unknown,
> = Request<TParams, TRes, TBody, TQuery>;
export type ExpressResponse<TRes> = Response<TRes>;
