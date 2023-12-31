import create from '../assets/create.png';
import dash from "../assets/dash.png"
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
    name: 'payments',
    imgUrl: payment,
    link: '/payments',
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