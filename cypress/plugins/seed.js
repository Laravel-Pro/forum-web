const seed = require('./dbSeeder');

seed('channels', ['id', 'name', 'slug'], [
  [1, 'Vim', 'vim'],
  [2, 'Idea', 'idea'],
  [3, '课程', 'course'],
  [4, '远程工作', 'remote-working'],
  [5, '招聘', 'jobs'],
  [6, '技术', 'tech'],
]);
