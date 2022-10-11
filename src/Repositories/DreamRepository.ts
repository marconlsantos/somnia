import { Dream, PrismaClient } from "@prisma/client";

export default class DreamRepository {
    async getDreams(): Promise<Dream[]> {
        const client = new PrismaClient();

        const result = await client.dream.findMany();

        return result;
    }
}