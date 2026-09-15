CREATE TABLE IF NOT EXISTS "cms_examples" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(220) NOT NULL,
	"eyebrow" varchar(120) DEFAULT '' NOT NULL,
	"category" varchar(40) NOT NULL,
	"description" text NOT NULL,
	"capabilities" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"stack" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"timeline" varchar(80) DEFAULT '' NOT NULL,
	"media" text DEFAULT '' NOT NULL,
	"metric" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms_services" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(180) NOT NULL,
	"slug" varchar(180) NOT NULL,
	"description" text NOT NULL,
	"detailed_description" text DEFAULT '' NOT NULL,
	"icon" varchar(40) DEFAULT 'spark' NOT NULL,
	"technologies" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"offerings" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"case_study" text DEFAULT '' NOT NULL,
	"case_metric" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "cms_services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms_solutions" (
	"id" text PRIMARY KEY NOT NULL,
	"title" varchar(180) NOT NULL,
	"description" text NOT NULL,
	"industry" varchar(120) DEFAULT '' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cms_technologies" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(180) NOT NULL,
	"description" text NOT NULL,
	"category" varchar(120) DEFAULT '' NOT NULL,
	"icon" varchar(40) DEFAULT 'spark' NOT NULL,
	"image" text DEFAULT '' NOT NULL,
	"case_study" text DEFAULT '' NOT NULL,
	"case_metric" text DEFAULT '' NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "media_assets" (
	"id" text PRIMARY KEY NOT NULL,
	"path" text NOT NULL,
	"original_name" varchar(255) NOT NULL,
	"mime_type" varchar(100) NOT NULL,
	"size_bytes" integer DEFAULT 0 NOT NULL,
	"alt" text DEFAULT '' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "media_assets_path_unique" UNIQUE("path")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cms_examples_sort_idx" ON "cms_examples" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cms_examples_category_idx" ON "cms_examples" USING btree ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cms_services_sort_idx" ON "cms_services" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cms_solutions_sort_idx" ON "cms_solutions" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "cms_technologies_sort_idx" ON "cms_technologies" USING btree ("sort_order");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "media_assets_created_idx" ON "media_assets" USING btree ("created_at");