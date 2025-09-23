import _ from "lodash";

export const dummy = (blogs) => {
  return 1;
};

export const totalLikes = (blogs) => {
  return blogs.reduce((acc, blog) => blog.likes + acc, 0);
};

export const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return [];

  return blogs.reduce((acc, blog) => {
    return blog.likes > acc.likes ? blog : acc;
  }, blogs[0]);
};

export const mostBlogs = (blogs) => {
  const grouped = _.groupBy(blogs, "author");

  const counts = _.mapValues(grouped, (group) => group.length);

  const author = _.maxBy(Object.entries(counts), ([, count]) => count)[0];

  return { author, blogs: counts[author] };
};

export const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, "author");

  const likesByAuthor = _.map(grouped, (authorBlogs, author) => ({
    author,
    likes: _.sumBy(authorBlogs, "likes"),
  }));

  return _.maxBy(likesByAuthor, 'likes')
};
