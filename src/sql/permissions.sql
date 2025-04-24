INSERT INTO permissions (name) VALUES
('view:user'),
('modify:user'),
('view:media'),
('modify:media'),
('view:blog-tag'),
('modify:blog-tag'),
('view:blog-post'),
('modify:blog-post'),
('view:video-tag'),
('modify:video-tag'),
('view:video'),
('modify:video'),
('view:playlist'),
('modify:playlist')
ON CONFLICT DO NOTHING;