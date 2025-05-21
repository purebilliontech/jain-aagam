import type { Prisma } from "@prisma/client";
import { z } from "zod";
import { dateDTOSchema, genericDTOSchema, GenericOmit, genericSchema } from "./generic";
import { userPermissionDTOSchema } from "./permissions";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type UserModel = Prisma.UsersGetPayload<{}>;

// for checking prisma validations
export const UserSchema = genericSchema.extend({
    name: z.string().min(2, { message: "Name must be at least 2 characters" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(4, { message: "Password must be at least 4 characters" }),
    lastLogin: z.date(),
}) satisfies z.Schema<UserModel>;

export type User = z.infer<typeof UserSchema>;

// for returning response
export const UserDTOSchema =
    UserSchema.merge(genericDTOSchema).extend({ lastLogin: dateDTOSchema });

export type UserDTO = z.infer<typeof UserDTOSchema>;

// for creating user
export const CreateUserSchema = UserSchema.omit({ ...GenericOmit, lastLogin: true })
    .extend({
        permissions: z.array(z.string()),
    });
export type CreateUser = z.infer<typeof CreateUserSchema>;

// for updating user
export const UpdateUserSchema = UserSchema.omit({ ...GenericOmit, lastLogin: true, password: true })
    .extend({
        permissions: z.array(z.string()),
    });
export type UpdateUser = z.infer<typeof UpdateUserSchema>;

export const UserWithPermissionSchema = UserDTOSchema.extend({
    permissions: z.array(userPermissionDTOSchema),
});

export type UserWithPermission = z.infer<typeof UserWithPermissionSchema>;