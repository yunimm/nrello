import { Validator } from '#nuxt-server-utils';
import BoardSchema from '~/schemas/Board.schema';
import { Board } from '~/server/models/Board.model';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    Validator.validateSchema(BoardSchema, body);

    const board = await Board.create({ ...body });

    return 'Hello Nitro';
});
