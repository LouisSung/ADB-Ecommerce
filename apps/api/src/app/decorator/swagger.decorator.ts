import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { PaginationDto } from '#libs/dto/pagination.dto';


export const ApiPaginatedResponse = <TModel extends Type>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          {
            properties: {
              items: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
          { $ref: getSchemaPath(PaginationDto) },
        ],
      },
    }),
  );
};
