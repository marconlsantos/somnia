import { Dream, Prisma, PrismaClient } from "@prisma/client";

export default class DreamRepository {
    private static client = new PrismaClient();

    async getPage(searchFilter: string, pageSize: number, currentPage: number): Promise<Dream[]> {

        let result: Dream[] = [];

        const commonCriteria = {
            take: pageSize,
            skip: pageSize * (currentPage - 1),
            orderBy: { dreamedAt: Prisma.SortOrder.desc }
        };

        try {
            if (isNullOrWhiteSpace(searchFilter)) {
                result = await DreamRepository.client.dream.findMany(commonCriteria);
            } else {
                const argsWithFilter = { ...commonCriteria, ...this.getCriteriaFor(searchFilter) };

                result = await DreamRepository.client.dream.findMany(argsWithFilter);
            }

        } catch (error) {
            console.error(error);
        }
        finally {
            DreamRepository.client.$disconnect;
        }

        return result;
    }

    async getPageCount(searchFilter: string, pageSize: number): Promise<number> {
        let result = 0;

        try {
            if (isNullOrWhiteSpace(searchFilter)) {
                result = await DreamRepository.client.dream.count();
            } else {
                result = await DreamRepository.client.dream.count(this.getCriteriaFor(searchFilter));
            }

            result = Math.ceil(result / pageSize);
        } catch (error) {
            console.error(error);
        }
        finally {
            DreamRepository.client.$disconnect;
        }

        return result;
    }

    async saveDream(dream: Dream): Promise<boolean> {
        try {
            if (!dream.id || dream.id === 0) {
                //create data to make sure new id is generated 
                await DreamRepository.client.dream.create({
                    data: {
                        dreamedAt: dream.dreamedAt,
                        title: dream.title,
                        narration: dream.narration,
                        interpretation: dream.interpretation
                    }
                });
            }
            else {
                await DreamRepository.client.dream.update({ where: { id: dream.id }, data: dream });
            }
        } catch (error) {
            return false;
        }

        return true;
    }

    async getDream(dreamId: number): Promise<Dream | null> {
        let result: Dream | null = null;

        try {
            result = await DreamRepository.client.dream.findUniqueOrThrow({ where: { id: dreamId } });
        } catch (error) {
            console.error(error);
        }
        finally {
            DreamRepository.client.$disconnect;
        }

        return result;
    }

    async deleteDream(dreamId: number): Promise<boolean> {
        try {
            await DreamRepository.client.dream.delete({ where: { id: dreamId } });
        } catch (error) {
            return false;
        }

        return true;
    }

    private getCriteriaFor(filter: string) {
        return {
            where: {
                OR: [
                    { title: { contains: filter } },
                    { narration: { contains: filter } },
                    { interpretation: { contains: filter } }
                ]
            }
        };
    }
}

function isNullOrWhiteSpace(filter: string) {
    return !filter || filter.trim().length === 0;
}
