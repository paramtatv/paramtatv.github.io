-- NOT executed by any tool here; owner reviews, then runs once.
CREATE TABLE IF NOT EXISTS posts (
  id           BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slug         VARCHAR(120)  NOT NULL,
  title        VARCHAR(255)  NOT NULL,
  body_md      MEDIUMTEXT    NOT NULL,
  lang         ENUM('hi','sa','en') NOT NULL,
  translation_of VARCHAR(120) NULL,  -- slug of the source post; links language versions
  author       VARCHAR(120)  NOT NULL DEFAULT '',
  tags         JSON          NULL,
  status       ENUM('draft','published') NOT NULL DEFAULT 'draft',
  published_at DATETIME      NULL,
  created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  UNIQUE KEY uq_posts_slug (slug),
  KEY ix_posts_tr (translation_of),
  KEY ix_posts_status_pub (status, published_at)
) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
