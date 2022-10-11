-- CreateTable
CREATE TABLE "Dream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "dreamedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "narration" TEXT NOT NULL,
    "interpretation" TEXT
);

-- CreateTable
CREATE TABLE "DreamSymbol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isUniversal" BOOLEAN NOT NULL,
    "referenceCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DreamDreamSymbol" (
    "dreamId" INTEGER NOT NULL,
    "symbolId" INTEGER NOT NULL,

    PRIMARY KEY ("dreamId", "symbolId"),
    CONSTRAINT "DreamDreamSymbol_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "Dream" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DreamDreamSymbol_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "DreamSymbol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
