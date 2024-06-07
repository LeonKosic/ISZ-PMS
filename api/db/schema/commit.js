import { mysqlTable, bigint, varchar, boolean } from 'drizzle-orm/mysql-core';

export const commit = mysqlTable('commit', {
  id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),

})