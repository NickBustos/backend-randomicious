import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  _id?: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ minlength: 6, required: true })
  password?: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ type: [String], default: ['user'] })
  roles: string[];

  @Prop({ default: '0' })
  followers: string;

  @Prop({ default: '0' })
  follows: string;

  @Prop({ default: '0' })
  recipesCreated: string;

  @Prop({ default: '0' })
  savedRecipes: string;

  @Prop({ default: '' })
  description: string;

  // @Prop({ type: { data: Buffer, contentType: String, required: false } })
  // image: {
  //   data: Buffer;
  //   contentType: string;
  // };
}

export const UserSchema = SchemaFactory.createForClass(User);
