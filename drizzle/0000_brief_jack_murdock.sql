CREATE TABLE IF NOT EXISTS "leads" (
	"id" text PRIMARY KEY NOT NULL,
	"first_name" varchar(100) NOT NULL,
	"last_name" varchar(100) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(50) DEFAULT '' NOT NULL,
	"company" varchar(180) NOT NULL,
	"message" text NOT NULL,
	"preferred_date" varchar(30) DEFAULT '' NOT NULL,
	"status" varchar(20) DEFAULT 'new' NOT NULL,
	"submitted_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_status_idx" ON "leads" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "leads_submitted_at_idx" ON "leads" USING btree ("submitted_at");