# Migration `20200619193944-first`

This migration has been generated at 6/19/2020, 7:39:44 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Store" (
"amount" INTEGER NOT NULL DEFAULT 0 ,"coordinates" TEXT   ,"date" DATE NOT NULL  ,"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"location" TEXT   ,"storename" TEXT NOT NULL  )

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200619193944-first
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,20 @@
+// This is your Prisma schema file,
+// learn more about it in the docs: https://pris.ly/d/prisma-schema
+
+datasource db {
+  provider = "sqlite"
+  url      = "file:dev.db"
+}
+
+generator client {
+  provider = "prisma-client-js"
+}
+
+model Store {
+  coordinates   String?
+  date          DateTime
+  id            Int             @default(autoincrement()) @id
+  location      String?
+  storename     String
+  amount        Int     @default(value: 0)
+}
```


