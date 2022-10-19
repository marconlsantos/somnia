import { Dream, PrismaClient } from "@prisma/client";

export default class DreamRepository {
    async getPage(pageSize: number, currentPage: number): Promise<Dream[]> {
        const client = new PrismaClient();

        let result: Dream[] = [];

        try {
            const findArgs = {
                take: pageSize,
                skip: pageSize * (currentPage - 1),

            };
            result = await client.dream.findMany(findArgs);
        } catch (error) {
            console.error(error);
        }
        finally {
            client.$disconnect;
        }

        return result;
    }

    async getPageCount(pageSize: number): Promise<number> {
        const client = new PrismaClient();

        let result = 0;

        try {
            result = await client.dream.count();

            result = Math.ceil(result / pageSize);
        } catch (error) {
            console.error(error);
        }
        finally {
            client.$disconnect;
        }

        return result;
    }
}