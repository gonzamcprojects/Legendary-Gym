CREATE TABLE `contact_requests` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`method` text NOT NULL,
	`contact` text NOT NULL,
	`preferred_date` text NOT NULL,
	`time_window` text NOT NULL,
	`interest` text NOT NULL,
	`message` text NOT NULL,
	`consent_at` text NOT NULL,
	`created_at` text NOT NULL
);
