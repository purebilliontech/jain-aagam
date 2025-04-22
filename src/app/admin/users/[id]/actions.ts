"use server";

import { handleServerActionError } from "@/helpers/error";
import { authorizeUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { permissionDTOSchema } from "@/schema/permissions";
import { UserDTOSchema, UserWithPermissionSchema, type CreateUser, type UpdateUser, type UserDTO, type UserWithPermission } from "@/schema/user";
import { encryptPassword, hashData } from "@/utils/crypto";

export const getUserById = async (id: string) => {
    try {
        const authuser = await authorizeUser(["view:user"]);
        if (!authuser.success) {
            throw new Error(authuser.message);
        }

        if (id === "new") {
            return { success: true, data: null };
        }
        const user = await db.users.findUnique({
            where: {
                id,
            },
            include: {
                permissions: true
            }
        });

        return {
            success: true,
            data: UserWithPermissionSchema.parse(user)
        }
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: null
        };
    }
}

export const createUser = async (data: CreateUser) => {
    try {
        const user = await authorizeUser(["modify:user"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        const hashedPassword = await encryptPassword(data.password);
        const newUser = await db.users.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
                lastLogin: new Date(),
                permissions: {
                    create: data.permissions.map(permission => ({
                        permissionName: permission
                    })) || []
                }
            },
            include: {
                permissions: true
            }
        });
        return {
            success: true,
            data: UserWithPermissionSchema.parse(newUser)
        }
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: null
        };
    }
}

export const updateUserById = async (id: string, data: UpdateUser) => {
    try {
        const user = await authorizeUser(["modify:user"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        // Update user basic info
        const updatedUser = await db.users.update({
            where: { id },
            data: {
                name: data.name,
                email: data.email,
                permissions: {
                    deleteMany: {
                        userId: id
                    },
                    createMany: {
                        data: data.permissions.map(permission => ({
                            permissionName: permission
                        }))
                    }
                }
            },
            include: {
                permissions: true
            }
        });

        return {
            success: true,
            data: UserWithPermissionSchema.parse(updatedUser)
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: null
        };
    }
}

export const deleteUser = async (id: string) => {
    try {
        const user = await authorizeUser(["modify:user"]);
        if (!user.success) {
            throw new Error(user.message);
        }
        // First delete user permissions
        await db.userPermissions.deleteMany({
            where: {
                userId: id
            }
        });

        // Then delete the user
        await db.users.delete({
            where: {
                id
            }
        });

        return {
            success: true,
            data: null
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: null
        };
    }
}

export const getAllPermissions = async () => {
    try {

        const user = await authorizeUser(["view:user"]);
        if (!user.success) {
            throw new Error(user.message);
        }

        const permissions = await db.permissions.findMany({
            orderBy: {
                name: 'asc'
            }
        });

        const validatedPermissions = permissions.map((p) => permissionDTOSchema.parse(p));

        return {
            success: true,
            data: validatedPermissions
        };
    } catch (error) {
        handleServerActionError(error);
        return {
            success: false,
            data: []
        };
    }
}