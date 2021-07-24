import React from 'react';
// import moment from 'moment';
import Head from 'next/head'
import withRedux from 'next-redux-wrapper';
import 'react-notifications/lib/notifications.css';
import 'antd/dist/antd.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "../public/vendors/style";
import "../styles/style.css"
import "../firebaseConfig/index"

import initStore from '../redux/store';
import {Provider} from "react-redux";
import LocaleProvider from "../app/core/LocaleProvider";
import AppLayout from "../app/core/Layout";
import {ProvideAuth} from "../util/use-auth";
import { ConfigProvider } from 'antd';
import locale from 'antd/lib/locale/th_TH';


// moment.locale('th');
const Page = ({Component, pageProps, store}) => {

  return (
    <React.Fragment>
      <Head>
        <title>HR System</title>
      </Head>
      <Provider store={store}>
        <LocaleProvider>
          <ProvideAuth>
          <ConfigProvider locale={locale}>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
            </ConfigProvider>
          </ProvideAuth>
        </LocaleProvider>
      </Provider>
    </React.Fragment>
  );
};

export default withRedux(initStore)(Page);

Page.getInitialProps = async ({Component, ctx}) => {
  return {
    pageProps: {
      ...(Component.getInitialProps
        ? await Component.getInitialProps(ctx)
        : {}),
    },
  };
};
