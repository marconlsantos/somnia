-- CreateTable
CREATE TABLE "Dream" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "title" TEXT NOT NULL,
    "narration" TEXT NOT NULL,
    "interpretation" TEXT
);

-- CreateTable
CREATE TABLE "Symbol" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "isUniversal" BOOLEAN NOT NULL,
    "referenceCode" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "DreamSymbol" (
    "dreamId" INTEGER NOT NULL,
    "symbolId" INTEGER NOT NULL,

    PRIMARY KEY ("dreamId", "symbolId"),
    CONSTRAINT "DreamSymbol_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "Dream" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "DreamSymbol_symbolId_fkey" FOREIGN KEY ("symbolId") REFERENCES "Symbol" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
