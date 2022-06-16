/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';
import Header from './header/header';
import Footer from './footer/footer';

export default function Layout({ children, data }) {

  if(!data) {
    return null;
  }

  return (
    <React.Fragment>
      {data.header && 
        <div data-tinaField='header'>
          <Header data={data.header} parentField='header' />
        </div>
      }
      <main
        sx={{
          variant: 'layout.main',
        }}
      >
        {children}
      </main>
      { data.footer &&
        <div data-tinafield={`footer`}>
          <Footer data={data.footer} />
        </div>
      }
    </React.Fragment>
  );
}
