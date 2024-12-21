import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

export const httpBaseUrlInterceptor = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const req = request.clone({ url: `api/${request.url}` });
  return next(req);
};
