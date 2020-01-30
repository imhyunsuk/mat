import { useEffect } from 'react';
import Router from 'next/router';
import Cookies from 'js-cookie';

export const signin = ({ user, token }) => {
  Cookies.set('token', token, { expires: 7 });
  Cookies.set('username', user.username)
  Router.push('/mobile/map');
};

export const auth = ctx => {
  const cookie = ctx.req && ctx.req.heders && ctx.req.headers.cookie
  if (!cookie) {
    return undefined;
  }

  const token = ctx.req.headers.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");

  // If there's no token, it means the user is not logged in.
  if (!token) {
    if (typeof window === 'undefined') {
      ctx.res.writeHead(302, { Location: '/mobile/login' });
      ctx.res.end();
    } else {
      Router.push('/mobile/login');
    }
  }

  return token;
};

export const signout = () => {
  Cookies.remove('token');
  Cookies.remove("username");
  window.localStorage.setItem("logout", Date.now()); // new

  Router.push('/mobile/login');
};

export const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const syncLogout = event => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));

    return { ...componentProps, token };
  };

  return Wrapper;
};
