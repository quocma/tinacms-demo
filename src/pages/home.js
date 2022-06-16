import React, { useEffect } from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from 'theme';
import SEO from 'components/seo';
import Layout from 'components/layout';

import { staticRequest } from 'tinacms';
import { useTina } from 'tinacms/dist/edit-state';
import SectionsRenderer from 'sections/sections-renderer';

import ExcitingFeatures from 'sections/exciting-features';
import WorkHard from 'sections/work-hard';
import UltimateFeatures from 'sections/ultimate-features';
import HappyCustomer from 'sections/happy-customer';
import Blog from 'sections/blog';
import SubscribeUs from 'sections/subscribe-us';


const { PagePartsFragmentDoc, GlobalPartsFragmentDoc  } = require('../../.tina/__generated__/types.ts');


export default function IndexPage({data, variables, query }) {

  const {data: realtimeData} = useTina({
    data,
    variables,
    query
  })

  React.useEffect(() => {
    console.log('data change', realtimeData);
  }, [realtimeData])

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Startup hosting provider landing"
          description="Collection of free top of the line startup landing templates built using react/ next js. Free to download, simply edit and deploy! Updated weekly!"
        />
        <SectionsRenderer {...realtimeData?.page || {}} />
        <ExcitingFeatures />
        <WorkHard />
        <UltimateFeatures />
        <HappyCustomer />
        <Blog />
        <SubscribeUs />
      </Layout>
    </ThemeProvider>
  );
}

// export const getStaticProps = async() => {

//   const query = `
//     ${PagePartsFragmentDoc}
//     query Page ($relativePath: String) {
//       page(relativePath: $relativePath) {
//         ...PageParts
//       }
//     } 
//   `;

//   const variables = { relativePath: "home.md"}

//   let data = {}
//   try {
//     data = await staticRequest({
//       query,
//       variables,
//     })
//   } catch {
//     // swallow errors related to document creation
//   }

//   return {
//     props: {
//       data,
//       query,
//       variables
//     }
//   }
// }

export const getServerSideProps = async() => {

  const query = `
    ${PagePartsFragmentDoc}
    ${GlobalPartsFragmentDoc}
    query PageContent ($relativePath: String) {
      global(relativePath: "index.json") {
        ...GlobalParts
      }
      page(relativePath: $relativePath) {
        ...PageParts
      }
    } 
  `;

  const variables = { relativePath: "home.md"}

  let data = {}
  try {
    data = await staticRequest({
      query,
      variables,
    })
  } catch {
    // swallow errors related to document creation
  }

  return {
    props: {
      data,
      query,
      variables
    }
  }
}