import { Menu, Container, Image, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import NProgress from 'nprogress';
import { handleLogout } from '../../utils/auth';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

function Header({ user }) {
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;

  function isActive(route) {
    return router.pathname === route;
  }

  return (
    <Menu stackable fluid id="menu" inverted>
      <Container text>
        <Link href='/'>
          <Menu.Item header active={isActive('/')}>
            <Image size='mini' src='/static/logo.svg' style={{ marginRight: '1em' }} />
            ReactReserve
          </Menu.Item>
        </Link>

        <Link href='/cart'>
          <Menu.Item header active={isActive('/cart')}>
            <Icon name='cart' size='large' />
            Cart
          </Menu.Item>
        </Link>

        {isRootOrAdmin && <Link href='/create'>
          <Menu.Item header active={isActive('/create')}>
            <Icon name='add square' size='large' />
            Create
          </Menu.Item>
        </Link>}

        {user ? (<>
          <Link href='/account'>
            <Menu.Item header active={isActive('/account')}>
              <Icon name='user' size='large' />
              Account
          </Menu.Item>
          </Link>

          <Menu.Item onClick={handleLogout} header>
            <Icon name='sign out' size='large' />
            Logout
        </Menu.Item>
        </>)
          :
          (<>
            <Link href='/login'>
              <Menu.Item header active={isActive('/login')}>
                <Icon name='sign in' size='large' />
                Login
          </Menu.Item>
            </Link>

            <Link href='/signup'>
              <Menu.Item header active={isActive('/signup')}>
                <Icon name='signup' size='large' />
                Signup
          </Menu.Item>
            </Link>
          </>)}
      </Container>
    </Menu>
  );
}

export default Header;

