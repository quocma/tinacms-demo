import React from 'react';
import Banner from './banner';
import Services from './services';
import ExcitingFeatures from './exciting-features';
import WorkHard from './work-hard';
import UltimateFeatures from './ultimate-features';
import HappyCustomer from './happy-customer';
import Blog from './blog';
import SubscribeUs from './subscribe-us';

const SectionsRenderer = ({ blocks, _values, values }) => {
  
  if(!blocks?.length) {
    return null;
  }

  // const blocksValue = values || _values;

  return blocks.map((block, i) => {
    switch(block.__typename) {
      case "PageBlocksBanner": 
      {
        return (
          <div
            data-tinafield={`blocks.${i}`}
            key={i + block.__typename}
          >
            <Banner data={block} parentField={`blocks.${i}`} />
          </div>
        )
      }
      case "PageBlocksServices": 
      {
        return (
          <div
            data-tinafield={`blocks.${i}`}
            key={i + block.__typename}
          >
            <Services data={block} parentField={`blocks.${i}`} />
          </div>
        )
      }

      default: return null;
    }
  })
}

export default SectionsRenderer