import React, { Fragment } from 'react';

import { Routes,Route } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute';

import AuthLayout from './components/layouts/AuthLayout';
import UserLayout from './components/layouts/UserLayout';

import LoginPage from './pages/Login/index';
import RegisterPage from './pages/Register';
import AdminDashboard from './pages/AdminPage/Dashboard/Dashboard';
import StoreDashboard from './pages/StorePage/Dashboard/Dashboard';
import StationDashboard from './pages/StationPage/Dashboard/Dashboard';
import OrderManagementContainer from './pages/StationPage/OrderManagement/DataContainer/OrderManagementContainer';
import AccountManagementContainer from './pages/AdminPage/AccountManagement/DataContainer/AccountManagementContainer';
import AdminLayout from './components/layouts/AdminLayout';
import HistoryContainer from './pages/StationPage/History/DataContainer/HistoryContainer';


import StationPackagemanagementContainer from './pages/StationPage/PackageManagement/DataContainer/PackagemanagementContainer';
import StorePackagemanagementContainer from './pages/StorePage/PackageManagement/DataContainer/PackagemanagementContainer';

import HomePage from './pages/UserPage/Home/HomePage';
import HistoryUserContainer from './pages/UserPage/History/DataContainer/HistoryContainer';
import OrderContainer from './pages/UserPage/Order/DataContainer/OrderContainer';

import NotFound from './pages/NotFound/NotFound'

import { ROLE_VALUES } from './utils/Constant';
import ProfileContainer from './pages/UserPage/Profile/DataContainer/ProfileContainer';
import ServiceManagementContainer from './pages/AdminPage/ServiceManagement/DataContainer/ServiceManagementContainer';
import VerificationSuccess from './pages/Success/Success';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';

const withAuth=PrivateRoute("/login");

const HomePageWrap=()=>(
	<UserLayout defaultSelectedKeys='home' breadCrumbs={[{label:'Trang chủ',path:'/'}]}>
		<HomePage />
	</UserLayout>
)
const HistoryPageWrap=()=>(
	<UserLayout defaultSelectedKeys='history-user' breadCrumbs={[{label:'Trang chủ',path:'/'},{label:'Lịch sử',path:'/history-user'}]}>
		<HistoryUserContainer />
	</UserLayout>
)
const LoginPageWrap=()=>(
	<AuthLayout>
		<LoginPage />
	</AuthLayout>
)
const RegisterPageWrap=()=>(
	<AuthLayout>
		<RegisterPage />
	</AuthLayout>
)
const AdminDashBoardWrap=()=>(
	<AdminLayout>
		<AdminDashboard />
	</AdminLayout>
)
const StoreDashBoardWrap=()=>(
	<AdminLayout>
		<StoreDashboard />
	</AdminLayout>
)
const StationDashBoardWrap=()=>(
	<AdminLayout>
		<StationDashboard />
	</AdminLayout>
)
const OrderManagementWrap=()=>(
	<AdminLayout>
		<OrderManagementContainer />
	</AdminLayout>
)
const AccountManagementWrap=()=>(
	<AdminLayout>
		<AccountManagementContainer />
	</AdminLayout>
)
const OrderPageWrap=()=>(
	<UserLayout defaultSelectedKeys='order' breadCrumbs={[{label:'Trang chủ',path:'/'},{label:'Order',path:'/order'}]}>
		<OrderContainer />
	</UserLayout>
)
const StationPackageWrap=()=>(
	<AdminLayout>
		<StationPackagemanagementContainer />
	</AdminLayout>
)
const StorePackageWrap=()=>(
	<AdminLayout>
		<StorePackagemanagementContainer />
	</AdminLayout>
)
const ProfilePageWrap=()=>(
	<UserLayout defaultSelectedKeys='' breadCrumbs={[{label:'Trang chủ',path:'/'},{label:'Thông tin cá nhân',path:'/profile'}]}>
		<ProfileContainer />
	</UserLayout>
	
)
const ServiceManagementWrap=()=>(
	<AdminLayout>
		<ServiceManagementContainer />
	</AdminLayout>
)

const StationHistoryWrap=()=>(
	<AdminLayout>
		<HistoryContainer />
	</AdminLayout>
)



const routes = [
	{
		path: '/reset-password',
		element: ResetPassword
	},
	{
		path: '/forgot-password',
		element: ForgotPassword
	},
	{
		path: '/verify/:id',
		element: VerificationSuccess
	},
	{
		path: '/services-management',
		element: withAuth(ServiceManagementWrap,[ROLE_VALUES.ADMIN])
	},
	{
		path: '/profile',
		element: withAuth(ProfilePageWrap,[ROLE_VALUES.CUSTOMER])
	},
    {
		path: '/',
		element: withAuth(HomePageWrap,[ROLE_VALUES.GUEST])
	},
	{
		path: '/history-user',
		element: withAuth(HistoryPageWrap,[ROLE_VALUES.CUSTOMER]),
	},
	{
		path: '/login',
		element: LoginPageWrap,
	},
	{
		path: '/register',
		element: RegisterPageWrap,
	},
	{
		path: '/admin-dashboard',
		element: withAuth(AdminDashBoardWrap,[ROLE_VALUES.ADMIN]),
	},
	{
		path: '/store-dashboard',
		element: withAuth(StoreDashBoardWrap,[ROLE_VALUES.STORE]),
	},
	{
		path: '/station-dashboard',
		element: withAuth(StationDashBoardWrap,[ROLE_VALUES.MANAGER]),
	},
	{
		path: '/order-management',
		element: withAuth(OrderManagementWrap,[ROLE_VALUES.MANAGER]),
	},
	{
		path: '/account-management',
		element: withAuth(AccountManagementWrap,[ROLE_VALUES.ADMIN])
	},
	{
		path: '/station-package-management',
		element: withAuth(StationPackageWrap,[ROLE_VALUES.MANAGER]),
	},
	{
		path: '/store-package-management',
		element: withAuth(StorePackageWrap,[ROLE_VALUES.STORE]),
	},
	{
		path: '/station-history',
		element: withAuth(StationHistoryWrap,[ROLE_VALUES.MANAGER]),
	},
	// {
	// 	path: '/package-details',
	// 	element: <PackageDetailsContainer />,
	// },
	{
		path: '/order',
		element: withAuth(OrderPageWrap,[ROLE_VALUES.CUSTOMER]),
	},
  ];
  const renderRoutes = (routes) => {
	return (
	  <Routes>
		{routes.map((route, i) => {
		  const { path, element: Element } = route;
		  return <Route key={i} path={path} element={<Element />} />;
		})}
		{/* <Route path="/profile" element={<ProfilePage />} /> */}
		 <Route path="*" element={<NotFound />} />
	  </Routes>
	);
  };

// const renderRoutes = (routes) =>
//   routes.map(({ path, element, title }) => (
//     <Route key={path} path={path} element={element} title={title} />
// ));
// const ProtectedRoutes = ({routes}) => (
// 	<>
// 	  {
// 	  	routes.map(({ path, element }) => (
// 				<PrivateRoute
// 					key={path}
// 					path={path}
// 					element={element}
// 					isAuthenticated={path=='/' ? false : true} // or false, depending on your app's authentication state
// 					redirectTo="/login" // optional: specify the route to redirect to if the user is not authenticated
// 				/>
// 		))
// 	  }
// 	</>
//   );
// const renderRoutes = (routes) =>(
//     <Routes>
//       <Route path="/" element={<ProtectedRoutes routes={routes}/>} 
// 	  />
//       <Route path="*" element={<NotFound />} />
//     </Routes>
// )
  
export { routes, renderRoutes };