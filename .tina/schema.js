
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
            {
              type: "string",
              label: "Color",
              name: "color",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
              ],
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
          ],
        },
        {
          type: "object",
          label: "Footer",
          name: "footer",
          fields: [
            {
              type: "string",
              label: "Color",
              name: "color",
              options: [
                { label: "Default", value: "default" },
                { label: "Primary", value: "primary" },
              ],
            },
            {
              type: "object",
              label: "Social Links",
              name: "social",
              fields: [
                {
                  type: "string",
                  label: "Facebook",
                  name: "facebook",
                },
                {
                  type: "string",
                  label: "Twitter",
                  name: "twitter",
                },
                {
                  type: "string",
                  label: "Instagram",
                  name: "instagram",
                },
                {
                  type: "string",
                  label: "Github",
                  name: "github",
                },
              ],
            },
          ],
        },
        {
          type: "object",
          label: "Theme",
          name: "theme",
          fields: [
            {
              type: "string",
              label: "Primary Color",
              name: "color",
              options: [
                {
                  label: "Blue",
                  value: "blue",
                },
                {
                  label: "Teal",
                  value: "teal",
                },
                {
                  label: "Green",
                  value: "green",
                },
                {
                  label: "Red",
                  value: "red",
                },
                {
                  label: "Pink",
                  value: "pink",
                },
                {
                  label: "Purple",
                  value: "purple",
                },
                {
                  label: "Orange",
                  value: "orange",
                },
                {
                  label: "Yellow",
                  value: "yellow",
                },
              ],
            },
            {
              type: "string",
              name: "font",
              label: "Font Family",
              options: [
                {
                  label: "System Sans",
                  value: "sans",
                },
                {
                  label: "Nunito",
                  value: "nunito",
                },
                {
                  label: "Lato",
                  value: "lato",
                },
              ],
            },
            {
              type: "string",
              name: "icon",
              label: "Icon Set",
              options: [
                {
                  label: "Boxicons",
                  value: "boxicon",
                },
                {
                  label: "Heroicons",
                  value: "heroicon",
                },
              ],
            },
            {
              type: "string",
              name: "darkMode",
              label: "Dark Mode",
              options: [
                {
                  label: "System",
                  value: "system",
                },
                {
                  label: "Light",
                  value: "light",
                },
                {
                  label: "Dark",
                  value: "dark",
                },
              ],
            },
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
const branch = 'main'
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
