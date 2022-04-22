import PlayIcon from '../assets/images/play.png';
import ReplayTenIcon from '../assets/images/replay_10.png';
import ArrowRightIcon from '../assets/images/arrow-right.png';
import ArrowLeftIcon from '../assets/images/arrow-left.png';
import HeartIcon from '../assets/images/heart.png';
import PauseIcon from '../assets/images/pause.png';
import ShuffleIcon from '../assets/images/shuffle.png';
import focusIcon from '../assets/images/time-square.png';
import ChevronLeftIcon from '../assets/images/chevron-left.png';
import {Bookmark, Home, Send, Setting} from 'react-native-iconly';

const icons = {
  PlayIcon,
  ReplayTenIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  HeartIcon,
  PauseIcon,
  ShuffleIcon,
  ChevronLeftIcon,
};

export const navIcons = {
  home: Home,
  playlist: Bookmark,
  share: Send,
  setting: Setting,
  focus: focusIcon,
};

export default icons;
