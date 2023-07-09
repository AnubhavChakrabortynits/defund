import create from '../assets/create.png';
import dash from "../assets/dash.png"
import logout from "../assets/logout.png"
import withdraw from "../assets/withdraw.png"
import payment from "../assets/eth.png";
import profile from '../assets/profile.png'

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dash,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: create,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
];