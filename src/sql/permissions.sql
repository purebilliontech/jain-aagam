INSERT INTO permissions (name) VALUES
('view:user'),
('modify:user'),
('view:media'),
('modify:media'),
('view:blog-tag'),
('modify:blog-tag'),
('view:blog'),
('modify:blog'),
('view:video-tag'),
('modify:video-tag'),
('view:video'),
('modify:video'),
('view:playlist'),
('modify:playlist'),
('modify:homepage'),
('modify:bhagwan-mahavir-page');
ON CONFLICT DO NOTHING;