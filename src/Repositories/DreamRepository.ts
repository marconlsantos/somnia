import { Dream, Prisma, PrismaClient } from "@prisma/client";

export default class DreamRepository {
    private static client = new PrismaClient();

    async getPage(searchFilter: string, pageSize: number, currentPage: number): Promise<Dream[]> {

        let result: Dream[] = [];

        try {
            const pagingArgs = {
                take: pageSize,
                skip: pageSize * (currentPage - 1)
            };

            if (isNullOrWhiteSpace(searchFilter)) {
                const argsWithFilter = { ...pagingArgs, ...this.GetSubsetFrom(searchFilter) };

                result = await DreamRepository.client.dream.findMany(argsWithFilter);
            } else {
                result = await DreamRepository.client.dream.findMany(pagingArgs);
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
                result = await DreamRepository.client.dream.count(this.GetSubsetFrom(searchFilter));
            } else {
                result = await DreamRepository.client.dream.count();
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

    async deleteDream(dreamId: number): Promise<boolean> {
        try {
            await DreamRepository.client.dream.delete({ where: { id: dreamId } });
        } catch (error) {
            return false;
        }

        return true;
    }

    private GetSubsetFrom(searchFilter: string): Prisma.Subset<{ where: { OR: ({ title: { contains: string; }; } | { narration: { contains: string; }; } | { interpretation: { contains: string; }; })[]; }; }, { where?: Prisma.DreamWhereInput | undefined; orderBy?: Prisma.Enumerable<Prisma.DreamOrderByWithRelationInput> | undefined; cursor?: Prisma.DreamWhereUniqueInput | undefined; take?: number | undefined; skip?: number | undefined; distinct?: Prisma.Enumerable<Prisma.DreamScalarFieldEnum> | undefined; select?: true | Prisma.DreamCountAggregateInputType | undefined; }> | undefined {
        return {
            where: {
                OR: [
                    { title: { contains: searchFilter } },
                    { narration: { contains: searchFilter } },
                    { interpretation: { contains: searchFilter } }
                ]
            }
        };
    }
}

function isNullOrWhiteSpace(searchFilter: string) {
    return searchFilter && searchFilter.trim().length;
}
