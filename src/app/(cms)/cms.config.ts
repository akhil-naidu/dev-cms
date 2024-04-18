const contentTypeConfig = {
  label: 'Blog Post',
  fields: [
    {
      name: 'test',
      label: 'Test',
      type: 'textarea',
      required: true,
    },
    {
      name: 'content',
      label: 'Content',
      type: 'textarea',
      required: true,
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
    },
    {
      name: 'publishedDate',
      label: 'Published Date',
      type: 'date',
      required: true,
    },
  ],
};

export default contentTypeConfig;
