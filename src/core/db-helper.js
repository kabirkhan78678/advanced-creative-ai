//db-helper.js
import db from "../config/db.js";

/**
 * Run raw SQL queries (JOINs, FEEDs, analytics)
 *
 * @param {string} sql
 * @param {Array} params
 * @returns {Promise<any[]>}
 */

export const runQuery = async (sql, params = []) => {
  return db.query(sql, params);
};


/**
 * Insert a new row into any table.
 *
 * @param {string} table - Name of the table.
 * @param {Object} data - Key-value object representing columns & values.
 * @returns {Promise<any>} MySQL insert result.
 *
 * @example
 * await insertData("users", {
 *   name: "Faraz",
 *   email: "test@gmail.com"
 * });
 */
export const insertData = async (table, data) => {
  const sql = `INSERT INTO ${table} SET ?`;
  return db.query(sql, data);
};

/**
 * Update existing rows in any table.
 *
 * @param {string} table - Table name.
 * @param {Object} data - Data to update.
 * @param {string} where - WHERE clause (example: "WHERE id = 5").
 * @returns {Promise<any>} MySQL update response.
 *
 * @example
 * await updateData("users", { name: "New Name" }, "WHERE id = 10");
 */
export const updateData = async (table, data, where) => {
  const sql = `UPDATE ${table} SET ? ${where}`;
  return db.query(sql, data);
};

/** 
 * Fetch all or filtered rows from a table.
 *
 * @param {string} table - Table name.
 * @param {string} [where=""] - Optional WHERE clause.
 * @returns {Promise<any[]>} List of rows.
 *
 * @example
 * const users = await getData("users", "WHERE status = 'active'");
 */
export const getData = async (table, where = "") => {
  const sql = `SELECT * FROM ${table} ${where}`;
  return db.query(sql);
};

/**
 * Fetch specific columns or distinct values from a table.
 *
 * @param {string} columns - Column names ("id,name" or "DISTINCT category").
 * @param {string} table - Table name.
 * @param {string} [where=""] - WHERE clause.
 * @returns {Promise<any[]>}
 *
 * @example
 * const categories = await getDistinctData("DISTINCT category", "products");
 */
export const getDistinctData = async (columns, table, where = "") => {
  const sql = `SELECT ${columns} FROM ${table} ${where}`;
  return db.query(sql);
};

/**
 * Delete rows from any table.
 *
 * @param {string} table - Table name.
 * @param {string} where - WHERE clause (MUST include conditions).
 * @returns {Promise<any>}
 *
 * @example
 * await deleteData("users", "WHERE id = 5");
 */
export const deleteData = async (table, where) => {
  const sql = `DELETE FROM ${table} ${where}`;
  return db.query(sql);
};

/**
 * Count rows in any table.
 *
 * @param {string} table - Table name.
 * @param {string} [where=""] - Optional filter.
 * @returns {Promise<{ total: number }[]>}
 *
 * @example
 * const count = await fetchCount("orders", "WHERE status = 'pending'");
 */
export const fetchCount = async (table, where = "") => {
  const sql = `SELECT COUNT(*) AS total FROM ${table} ${where}`;
  return db.query(sql);
};

/**
 * Select specific columns from a table.
 *
 * @param {string} columns - Column list ("id,name,status").
 * @param {string} table - Table name.
 * @param {string} [where=""] - WHERE clause.
 * @returns {Promise<any[]>}
 *
 * @example
 * const names = await getSelectedColumn("name,email", "users");
 */
export const getSelectedColumn = async (columns, table, where = "") => {
  const sql = `SELECT ${columns} FROM ${table} ${where}`;
  return db.query(sql);
};



/**
 * Increment / Decrement numeric column safely (LIKE, DISLIKE, SHARE, VIEW)
 *
 * @param {string} table
 * @param {string} column
 * @param {number} step  (+1 / -1)
 * @param {string} where
 */
export const updateCounter = async (table, column, step, where) => {
  const sql = `
    UPDATE ${table}
    SET ${column} = ${column} + (${step})
    ${where}
  `;
  return db.query(sql);
};