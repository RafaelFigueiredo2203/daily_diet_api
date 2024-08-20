-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Snack" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDiet" BOOLEAN NOT NULL,
    "updatedAt" DATETIME,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Snack_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Snack" ("createdAt", "description", "id", "isDiet", "name", "updatedAt", "userId") SELECT "createdAt", "description", "id", "isDiet", "name", "updatedAt", "userId" FROM "Snack";
DROP TABLE "Snack";
ALTER TABLE "new_Snack" RENAME TO "Snack";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
