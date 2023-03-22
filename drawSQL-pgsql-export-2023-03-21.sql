CREATE TABLE "Workspaces"(
    "workspace_id" BIGINT NOT NULL,
    "user_id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL
);
ALTER TABLE
    "Workspaces" ADD PRIMARY KEY("workspace_id");
CREATE TABLE "Blocks"(
    "block_id" BIGINT NOT NULL,
    "page_id" BIGINT NOT NULL,
    "parent_block_id" BIGINT NOT NULL,
    "type_id" BIGINT NOT NULL,
    "text_content" JSON NOT NULL,
    "code_content" JSON NOT NULL,
    "list_items" JSON NOT NULL,
    "chart_data" JSON NOT NULL,
    "block_order" BIGINT NOT NULL
);
ALTER TABLE
    "Blocks" ADD PRIMARY KEY("block_id");
CREATE TABLE "BlockTypes"(
    "type_id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL
);
ALTER TABLE
    "BlockTypes" ADD PRIMARY KEY("type_id");
CREATE TABLE "Pages"(
    "page_id" BIGINT NOT NULL,
    "workspace_id" BIGINT NOT NULL,
    "template_id" BIGINT NOT NULL,
    "parent_id" BIGINT NOT NULL
);
ALTER TABLE
    "Pages" ADD PRIMARY KEY("page_id");
CREATE TABLE "Users"(
    "user_id" BIGINT NOT NULL,
    "name" BIGINT NOT NULL,
    "email_address" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "Users" ADD PRIMARY KEY("user_id");
CREATE TABLE "Templates"(
    "template_id" BIGINT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "content" JSON NOT NULL
);
ALTER TABLE
    "Templates" ADD PRIMARY KEY("template_id");
ALTER TABLE
    "Workspaces" ADD CONSTRAINT "workspaces_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "Users"("user_id");
ALTER TABLE
    "Blocks" ADD CONSTRAINT "blocks_page_id_foreign" FOREIGN KEY("page_id") REFERENCES "Pages"("page_id");
ALTER TABLE
    "Blocks" ADD CONSTRAINT "blocks_type_id_foreign" FOREIGN KEY("type_id") REFERENCES "BlockTypes"("type_id");
ALTER TABLE
    "Pages" ADD CONSTRAINT "pages_template_id_foreign" FOREIGN KEY("template_id") REFERENCES "Templates"("template_id");
ALTER TABLE
    "Pages" ADD CONSTRAINT "pages_workspace_id_foreign" FOREIGN KEY("workspace_id") REFERENCES "Workspaces"("workspace_id");