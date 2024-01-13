import { Schema, model } from 'mongoose';
import type { Document } from 'mongoose';

export interface BoardDocument extends Document {
    name: string;
    lists: string[];
    owners: string;
    coverImage: string;
}

const boardSchema = new Schema(
    {
        name: {
            type: String,
            default: 'Untitled board',
        },
        lists: [
            {
                type: Schema.Types.ObjectId,
                ref: 'List',
            },
        ],
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        coverImage: {
            type: String,
            default: null,
        },
    },
    {
        timestamps: true,
    },
);

export const Board = model<BoardDocument>("Board", boardSchema);