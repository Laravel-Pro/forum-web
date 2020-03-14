const seed = require("./dbSeeder");

seed(
  "channels",
  ["id", "name", "slug"],
  [
    [1, "Vim", "vim"],
    [2, "Idea", "idea"],
    [3, "课程", "course"],
    [4, "远程工作", "remote-working"],
    [5, "招聘", "jobs"],
    [6, "技术", "tech"]
  ]
);
seed(
  "users",
  [
    "id",
    "username",
    "name",
    "email",
    "email_verified_at",
    "avatar",
    "avatar_original",
    "password"
  ],
  [
    [
      1,
      "testUser1",
      "testUser1",
      "lilf@135.com",
      "2020-02-01 14:33:22",
      "default-avatar.png",
      "default-avatar.png",
      "$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi"
    ]
  ]
);

seed('threads',
  ['id', 'author_id', 'channel_id', 'title', 'body', 'rendered', 'replies_count', 'activity_at', 'created_at'],
  [
    [1, 1, 1, 'the first thread', '# the first thread', '<h1>the first thread</h1>', 0, '2020-02-01 15:00:00', '2020-02-01 15:00:00'],
    [2, 1, 2, 'the second thread', '## the second thread', '<h2>the second thread</h2>', 0, '2020-02-01 16:00:00', '2020-02-01 15:00:00'],
  ]
)
