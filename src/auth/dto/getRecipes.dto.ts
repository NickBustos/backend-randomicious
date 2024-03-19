import { IsNotEmpty, IsString } from 'class-validator';

export class UserRecipeDto {
    
    @IsNotEmpty()
    @IsString()
    userId: string;
}
