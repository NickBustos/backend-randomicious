import { Document } from 'mongoose';
export interface UserUpdated extends Document{
    _id:                string;
    name:               string;
    image?: {
        data:           Buffer;
        contentType:    string;
    }
}