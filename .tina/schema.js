
import { defineSchema, defineConfig } from "tinacms";

import { bannerBlockSchema } from '../src/sections/banner';
import { servicesBlockSchema } from "sections/services";

const schema = defineSchema({
  collections: [
    {
      label: "Pages",
      name: "page",
      path: "/content/pages",
      fields: [
        {
          type: "object",
          list: true,
          name: "blocks",
          label: "Sections",
          ui: {
            visualSelector: true,
          },
          templates: [
            bannerBlockSchema,
            servicesBlockSchema
          ]
        }
      ]
    },
    {
      label: "Global",
      name: "global",
      path: "content/global",
      format: "json",
      fields: [
        {
          type: "object",
          label: "Header",
          name: "header",
          fields: [
            // color field
            {
              type: "string",
              name: 'background',
              component: 'color',
              label: 'Background Color',
              description: 'Edit the header background color here',
              colorFormat: 'hex',
              colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
              widget: 'sketch',
            },
            {
              type: "object",
              label: "Nav Links",
              name: "nav",
              list: true,
              ui: {
                itemProps: (item) => {
                  return { label: item?.label };
                },
                defaultItem: {
                  href: "home",
                  label: "Home",
                },
              },
              fields: [
                {
                  type: "string",
                  label: "Link",
                  name: "href",
                },
                {
                  type: "string",
                  label: "Label",
                  name: "label",
                },
              ],
            },
            {
              name: "actions",
              label: "Actions",
              type: "object",
              list: true,
              ui: {
                defaultItem: {
                  label: 'Button Label',
                  type: 'button',
                  link: '/'
                }
              },
              fields: [
                {
                  name: "label",
                  type: "string",
                  label: "Label"
                },
                {
                  name: "type",
                  type: "string",
                  label: "Label",
                  options: [
                    { label: "Button", value: "button" },
                    { label: "Link", value: "link" },
                  ]
                },
                {
                  label: "Link",
                  name: "link",
                  type: "string",
                },
              ]
            }
          ],
        },
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            // color field
            {
              type: "string",
              name: 'background',
              component: 'color',
              label: 'Background Color',
              description: 'Edit the header background color here',
              colorFormat: 'hex',
              colors: ['#EC4815', '#241748', '#B4F4E0', '#E6FAF8'],
              widget: 'sketch',
            },
            {
              name: 'blocks',
              type: 'object',
              label: 'Blocks',
              list: true,
              templates: [
                {
                  name: "logoBlock",
                  label: 'Footer Logo Block',
                  fields: [
                    {
                      type: 'string',
                      name: "Image",
                      label: 'Image',
                      component: 'image',
                      // Generate the frontmatter value based on the filename
                      parse: media => `/static/${media.filename}`,
                
                      // Decide the file upload directory for the post
                      uploadDir: () => {return '/public/static/'},
                
                      // Generate the src attribute for the preview image.
                      previewSrc: fullSrc => fullSrc.replace('/public', ''),
                    }
                  ]
                },
                {
                  name: "normalblock",
                  label: 'normalBlock',
                  fields: [
                    {
                      name: 'title',
                      label: 'Block title',
                      type: 'string',
                    },
                    {
                      name: 'links',
                      label: 'Links',
                      type: 'object',
                      list: true,
                      templates: [
                        {
                          name: 'normalLink',
                          label: 'Normal Link',
                          fields: [
                            {
                              name: 'label',
                              label: 'Label',
                              type: 'string',
                            },
                            {
                              name: 'href',
                              label: 'Href',
                              type: 'string',
                            },
                          ]
                        },
                        {
                          name: 'iconLink',
                          label: 'Icon Link',
                          fields: [
                            {
                              type: 'string',
                              name: 'icon',
                              label: 'Icon',
                              component: 'image',
                              // Generate the frontmatter value based on the filename
                              parse: media => `/static/${media.filename}`,
                              // Decide the file upload directory for the post
                              uploadDir: () => '/public/static/',
                              // Generate the src attribute for the preview image.
                              previewSrc: fullSrc => fullSrc.replace('/public', ''),
                            },
                            {
                              name: 'label',
                              label: 'Label',
                              type: 'string',
                            },
                            {
                              name: 'href',
                              label: 'Href',
                              type: 'string',
                            },
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            },
          ],
        },
        {
          type: "object",
          label: "Theme",
          name: "theme",
          fields: [
            {
              name: 'colors',
              label: 'Colors',
              type: 'object',
              fields: [
                // color field
                {
                  type: "string",
                  name: 'primary',
                  component: 'color',
                  label: 'Primay Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'secondary',
                  component: 'color',
                  label: 'Secondary Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'accent',
                  component: 'color',
                  label: 'Accent Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'muted',
                  component: 'color',
                  label: 'Muted Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'dark',
                  component: 'color',
                  label: 'Dark Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'link',
                  component: 'color',
                  label: 'Link Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'text',
                  component: 'color',
                  label: 'Text Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'textSecondary',
                  component: 'color',
                  label: 'Text Secondary Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'heading',
                  component: 'color',
                  label: 'Heading Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'headingSecondary',
                  component: 'color',
                  label: 'Heading Secondary Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'background',
                  component: 'color',
                  label: 'Background Color',
                  colorFormat: 'hex',
                },
                {
                  type: "string",
                  name: 'backgroundSecondary',
                  component: 'color',
                  label: 'Background Secondary Color',
                  colorFormat: 'hex',
                },
              ]
            },
            {
              name: 'modes',
              label: 'Theme Modes',
              type: "string"
            }
          ],
        },
      ],
    },
    {
      label: "Blog Posts",
      name: "posts",
      path: "content/posts",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
        },
        {
          type: "rich-text",
          label: "Blog Post Body",
          name: "body",
          isBody: true,
          templates: [
            {
              name: "PageSection",
              label: "Page Section",
              fields: [
                {
                  type: "string",
                  name: "heading",
                  label: "Heading",
                },
                {
                  type: "string",
                  name: "content",
                  label: "Content",
                  ui: {
                    component: "textarea"
                  }
                }
              ],
            },
          ]
        },
      ],
    },
  ],
});

export default schema

// Your tina config
// ==============
const branch = process.env.NEXT_PUBLIC_SRC_BRANCH
// When working locally, hit our local filesystem.
// On a Vercel deployment, hit the Tina Cloud API
const apiURL = 
  process.env.NODE_ENV == 'development'
    ? `http://localhost:4001/graphql`
    : `https://content.tinajs.io/content/${process.env.NEXT_PUBLIC_TINA_CLIENT_ID}/github/${branch}`

export const tinaConfig = defineConfig({
  apiURL,
  schema,
  mediaStore: async () => {
    const pack = await import('next-tinacms-cloudinary');

    return pack.TinaCloudCloudinaryMediaStore;
  },
  cmsCallback: (cms) => {
    //  add your CMS callback code here (if you want)

    // The Route Mapper
    /**
     * 1. Import `tinacms` and `RouteMappingPlugin`
     **/
    import("tinacms").then(({ RouteMappingPlugin }) => {
      /**
       * 2. Define the `RouteMappingPlugin` see https://tina.io/docs/tinacms-context/#the-routemappingplugin for more details
       **/
      const RouteMapping = new RouteMappingPlugin((collection, document) => {
        
        if (["pages"].includes(collection.name)) {
          if (document._sys.filename === "home") {
            return `/`;
          }
          if (document._sys.filename === "about") {
            return `/about`;
          }
        }

        return undefined;
      });
      /**
       * 3. Add the `RouteMappingPlugin` to the `cms`.
       **/
      cms.plugins.add(RouteMapping);
    });

    return cms;
  },
});
