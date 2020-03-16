const seed = require('./dbSeeder');

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

const threads = [
  /*in Vim*/ [1, 1, 1, 'the thread in Vim', '# the first thread', '', 0, '2020-02-02 15:00:00', '2020-02-01 15:00:00'],
  /*in Idea*/ [2, 1, 2, 'the thread in Idea', '## the second thread', '', 0, '2020-02-02 16:00:00', '2020-02-01 15:00:00'],
];

for (let i = 3; i < 80; i++) {
  threads.push(
    [i, 1, (i % 2) + 1, 'the example thread', '# the example thread', '', 0, '2020-02-01 15:00:00', '2020-02-01 15:00:00'],
  )
}

seed('threads',
  ['id', 'author_id', 'channel_id', 'title', 'body', 'rendered', 'replies_count', 'activity_at', 'created_at'],
  threads,
)
