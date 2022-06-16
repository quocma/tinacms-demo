/** @jsxRuntime classic */
/** @jsx jsx */
import {
  jsx,
  Box,
  Container,
  Heading,
  Text,
  Label,
  Image,
  Button,
} from 'theme-ui';
import Input from 'components/input';

import { rgba } from 'polished';

import bannerDefaultImg from 'assets/blocks/undraw_medicine_b-1-ol.svg'; 
import bannerPreview from 'assets/previews/bannerPreview.png'

import { TinaMarkdown } from 'tinacms/dist/rich-text'

const Banner = ({data, parentField}) => {

  if(!data) {
    return null;
  }

  return (
    <Box as="section" sx={styles.section}>
      <Container>
        <Box sx={styles.contentWrapper}>
          <Box sx={styles.content}>
            {data.headline && 
              <Heading as="h1" data-tinafield={`${parentField}.headline`}>
                {data.headline}
              </Heading>
            }
            {data.text && 
              <div data-tinafield={`${parentField}.text`}>
                <TinaMarkdown content={data.text} />
              </div>
            } 
            { data.cta &&
              <Box sx={styles.subscribe} data-tinafield={`${parentField}.cta`}>
                <Button variant="primary">{data.cta}</Button>
              </Box>
            }
          </Box>
          <Box as="figure" sx={styles.illustration}>
            <Image src={bannerDefaultImg} alt="banner" />
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;

const styles = {
  contentWrapper: {
    display: ['block', null, null, null, 'grid', 'flex'],
    gridTemplateColumns: ['1fr 1fr', null, null, null, '0.9fr 1.1fr'],
    gap: [0, 0, 0, 0, 40],
    alignItems: 'center',
    minHeight: [null, null, '100vh', '70vh', '50vh', '100vh'],
    pt: ['100px', null, null, '130px', '25px', null, 0],
    textAlign: ['center', null, 'left'],
  },
  content: {
    maxWidth: [null, null, null, '75%', '100%'],
    margin: [null, null, null, '0 auto', 0],
    textAlign: [null, null, null, 'center', 'left'],
    h1: {
      color: 'textSecondary',
      fontFamily: 'Crimson Text, Serif',
      fontWeight: 600,
      fontSize: ['34px', '34px', '34px', '44px', '40px', '49px', '62px'],
      lineHeight: [1.26, 1.26, 1.11, 1.4, 1.11],
    },
    p: {
      maxWidth: [450, null, null, 'none', 450],
      fontSize: ['14px', null, '18px', 17, '16px', '15px', '18px'],
      lineHeight: [1.87, 1.87, 2.33, 2.33, 2],
      mt: ['25px', null, null, null, 4],
    },
  },
  subscribe: {
    display: 'flex',
    alignItems: 'center',
    mt: ['30px'],
    input: {
      mr: ['15px'],
      minHeight: ['45px', null, null, 60, 50, null, 60],
    },
    button: {
      minHeight: ['45px', null, null, 60, 50, null, 60],
      fontSize: ['14px', '14px', '16px'],
    },
  },
  sponsoredBy: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: ['center', null, null, null, 'unset'],
    mt: ['30px', '30px', '40px', '40px', '30px'],
    span: {
      color: rgba('#566272', 0.6),
      fontSize: ['14px', '16px', '16px'],
    },
  },
  logos: {
    display: 'flex',
    alignItems: 'center',
    figure: {
      ml: ['10px', '16px', '28px', '16px', '16px'],
    },
    img: {
      maxWidth: ['69px', '85px', '100%', '100%', '79px', '100px', '100%'],
    },
  },
  illustration: {
    ml: [0, 0, '30px', 0, 0],
    mt: ['50px', null, null, null, 0],
    minWidth: ['auto', null, null, null, null, '600px'],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    img: {
      maxWidth: ['100%', null, null, '80%', '100%'],
    },
  },
};

export const bannerBlockSchema = {
  name: 'banner',
  label: 'Banner',
  ui: {
    previewSrc: bannerPreview,
    defaultItem: {
      headline: "Your banner headline",
      // default rich-text content
      text: {
        type: "root",
        children: [
          {
            type: "p",
            children: [
                {
                  type: "text",
                  text: "Your banner description"
                }
              ]
          }
        ]
      },
      cta: 'CTA button'
    }
  },
  fields: [
    {
      name: "headline",
      label: "Headline",
      type: "string",
    },
    {
      name: "text",
      label: "Text",
      type: "rich-text",
    },
    {
      name: "cta",
      label: "Call to Action",
      type: "string",
    },
    {
      name: "image",
      label: "Image",
      type: "image",
    },
  ]
}
