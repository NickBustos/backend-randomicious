import { Document } from 'mongoose';
export interface UserUpdated extends Document{
    name:               string;
    image?: {
        data:           Buffer;
        contentType:    string;
    }
}