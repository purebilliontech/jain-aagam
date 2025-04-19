import { z } from "zod";
import { Prisma } from "@prisma/client";
import { genericDTOSchema, genericSchema } from "./generic";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type PermissionModel = Prisma.PermissionsGetPayload<{}>;

export const permissionSchema = genericSchema.extend({
    name: z.string(),
}) satisfies z.Schema<PermissionModel>;

export const permissionDTOSchema = permissionSchema.merge(genericDTOSchema).omit({
    id: true,
});
export type PermissionDTO = z.infer<typeof permissionDTOSchema>;



export type UserPermissionModel = Prisma.UserPermissionsGetPayload<{}>;

export const userPermissionSchema = genericSchema.extend({
    userId: z.string().cuid(),
    permissionName: z.string(),
});

export const userPermissionDTOSchema = userPermissionSchema.merge(genericDTOSchema).omit({
    id: true,
});
