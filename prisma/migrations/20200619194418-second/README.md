# Migration `20200619194418-second`

This migration has been generated at 6/19/2020, 7:44:18 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "quaint"."Item" (
"id" INTEGER NOT NULL  PRIMARY KEY AUTOINCREMENT,"item" TEXT NOT NULL  ,"number" TEXT NOT NULL  )

CREATE TABLE "quaint"."StoresOnItems" (
"itemId" INTEGER NOT NULL  ,"storeId" INTEGER NOT NULL  ,
    PRIMARY KEY ("storeId","itemId"),FOREIGN KEY ("itemId") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("storeId") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE TABLE "quaint"."_ItemToStore" (
"A" INTEGER NOT NULL  ,"B" INTEGER NOT NULL  ,FOREIGN KEY ("A") REFERENCES "Item"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("B") REFERENCES "Store"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "quaint"."_ItemToStore_AB_unique" ON "_ItemToStore"("A","B")

CREATE  INDEX "quaint"."_ItemToStore_B_index" ON "_ItemToStore"("B")

PRAGMA "quaint".foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200619193944-first..20200619194418-second
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "sqlite"
-  url = "***"
+  url      = "file:dev.db"
 }
 generator client {
   provider = "prisma-client-js"
@@ -15,6 +15,24 @@
   date          DateTime
   id            Int             @default(autoincrement()) @id
   location      String?
   storename     String
-  amount        Int     @default(value: 0)
+  StoresOnItems StoresOnItems[]
+  Item          Item[]          @relation(references: [id])
+  amount        Int             @default(value: 0)
 }
+
+model Item {
+  id            Int             @default(autoincrement()) @id
+  item          String
+  number        String
+  StoresOnItems StoresOnItems[]
+  Store         Store[]         @relation(references: [id])
+}
+
+model StoresOnItems {
+  itemId  Int
+  storeId Int
+  Item    Item  @relation(fields: [itemId], references: [id])
+  Store   Store @relation(fields: [storeId], references: [id])
+  @@id([storeId, itemId])
+}
```


