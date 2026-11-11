import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Devuelve el id del usuario autenticado (lo carga el AuthGuard a partir del token).
 * Usar siempre esto en lugar de un userId que mande el cliente.
 */
export const CurrentUserId = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): string => {
    const request = ctx.switchToHttp().getRequest();
    return String(request.user._id);
  },
);
