// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
export const contactRequests = sqliteTable("contact_requests", {
 id: text("id").primaryKey(), name: text("name").notNull(), method: text("method").notNull(), contact: text("contact").notNull(), preferredDate: text("preferred_date").notNull(), timeWindow: text("time_window").notNull(), interest: text("interest").notNull(), message: text("message").notNull(), consentAt: text("consent_at").notNull(), createdAt: text("created_at").notNull(),
});
